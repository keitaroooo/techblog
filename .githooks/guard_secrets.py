#!/usr/bin/env python3
"""Scan git changes for sensitive paths/patterns. Config: guardrails.json"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any

DEFAULTS: dict[str, Any] = {
    "git": {
        "hooks": {
            "pre_commit": {"enabled": True, "mode": "warn"},
            "pre_push": {"enabled": True, "mode": "block"},
        },
        "block_gitignored": True,
        "skip_binary": True,
        "deny_path_fragments": [
            "credentials.env",
            "gcp-oauth.keys.json",
            "client_secret",
            "/.env",
            "tokens.json",
            ".gdrive-server-credentials.json",
            "terraform.tfstate",
        ],
        "secret_patterns": [
            r"BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY",
            r"ghp_[A-Za-z0-9]{20,}",
            r"github_pat_[A-Za-z0-9_]{20,}",
            r"sk-[A-Za-z0-9]{20,}",
            r"xox[baprs]-[A-Za-z0-9-]{10,}",
            r"AKIA[0-9A-Z]{16}",
            r"AIza[0-9A-Za-z_-]{35}",
        ],
    }
}

CONFIG_CANDIDATES = (
    ".agent/guardrails.json",
    "guardrails.json",
    ".githooks/guardrails.json",
)


def repo_root() -> Path:
    out = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        check=True,
        capture_output=True,
        text=True,
    )
    return Path(out.stdout.strip())


def deep_merge(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    merged = dict(base)
    for key, val in override.items():
        if key.startswith("_"):
            continue
        if isinstance(val, dict) and isinstance(merged.get(key), dict):
            merged[key] = deep_merge(merged[key], val)
        else:
            merged[key] = val
    return merged


def load_config(root: Path) -> dict[str, Any]:
    env = __import__("os").environ.get("GUARDRAILS_CONFIG")
    paths = [Path(env)] if env else [root / p for p in CONFIG_CANDIDATES]
    cfg = json.loads(json.dumps(DEFAULTS))
    for path in paths:
        if path.is_file():
            with path.open(encoding="utf-8") as f:
                cfg = deep_merge(cfg, json.load(f))
            break
    return cfg


def git_files(mode: str, range_spec: str, paths: list[str]) -> list[str]:
    if paths:
        return paths
    if mode == "staged":
        cmd = ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR"]
    elif mode == "range":
        cmd = ["git", "diff", "--name-only", range_spec, "--diff-filter=ACMR"]
    else:
        raise SystemExit("unknown mode")
    out = subprocess.run(cmd, check=True, capture_output=True, text=True)
    return [line for line in out.stdout.splitlines() if line.strip()]


def is_binary(path: Path) -> bool:
    try:
        proc = subprocess.run(
            ["file", "-b", str(path)],
            capture_output=True,
            text=True,
            check=False,
        )
        label = proc.stdout.lower()
        return any(x in label for x in ("image", "binary", "archive", "executable"))
    except OSError:
        return False


def is_gitignored(path: str) -> bool:
    proc = subprocess.run(
        ["git", "check-ignore", "-q", path],
        capture_output=False,
    )
    return proc.returncode == 0


def scan_files(files: list[str], git_cfg: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    frags = git_cfg.get("deny_path_fragments") or []
    patterns = [re.compile(p) for p in (git_cfg.get("secret_patterns") or [])]

    for rel in files:
        if not rel:
            continue
        path = Path(rel)
        if not path.is_file():
            continue

        for frag in frags:
            if frag in rel:
                issues.append(f"sensitive path ({frag}): {rel}")

        if git_cfg.get("block_gitignored") and is_gitignored(rel):
            issues.append(f"gitignored file staged: {rel}")
            continue

        if git_cfg.get("skip_binary") and is_binary(path):
            continue

        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue

        for pat in patterns:
            if pat.search(text):
                issues.append(f"secret-like pattern in {rel}")
                break

    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description="Guard secrets before git commit/push")
    parser.add_argument("--staged", action="store_true")
    parser.add_argument("--range", dest="range_spec", default="")
    parser.add_argument("--hook", choices=("pre-commit", "pre-push"), default="")
    parser.add_argument("files", nargs="*")
    args = parser.parse_args()

    root = repo_root()
    cfg = load_config(root)
    git_cfg = cfg.get("git") or {}

    hook_name = args.hook or ("pre-commit" if args.staged else "pre-push")
    hook_key = hook_name.replace("-", "_")
    hook_cfg = (git_cfg.get("hooks") or {}).get(hook_key, {})

    if not hook_cfg.get("enabled", True):
        print(f"guard_secrets: {hook_name} disabled in guardrails.json")
        return 0

    mode = str(hook_cfg.get("mode", "warn")).lower()
    if mode not in ("warn", "block"):
        mode = "warn"

    scan_mode = "staged" if args.staged else "range"
    if args.files:
        scan_mode = "files"
    range_spec = args.range_spec
    if scan_mode == "range" and not range_spec:
        print("guard_secrets: --range required", file=sys.stderr)
        return 2

    files = git_files(scan_mode if scan_mode != "files" else "staged", range_spec, args.files)
    issues = scan_files(files, git_cfg)

    if not issues:
        print("guard_secrets: OK")
        return 0

    prefix = "WARN" if mode == "warn" else "BLOCK"
    for msg in issues:
        print(f"{prefix}: {msg}")

    if mode == "block":
        print("guard_secrets: fix or adjust .agent/guardrails.json (mode: warn to relax)", file=sys.stderr)
        return 1

    print("guard_secrets: warnings only (mode=warn)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
