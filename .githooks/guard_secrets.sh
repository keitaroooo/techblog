#!/usr/bin/env bash
# Scan files for sensitive paths and secret-like patterns before commit/push.
set -euo pipefail

MODE=staged
RANGE=""
FILES=()

usage() {
  echo "Usage: guard_secrets.sh [--staged | --range A..B | FILE...]" >&2
  exit 2
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --staged) MODE=staged; shift ;;
    --range) MODE=range; RANGE="${2:-}"; shift 2 ;;
    -h|--help) usage ;;
    --) shift; while [[ $# -gt 0 ]]; do FILES+=("$1"); shift; done ;;
    *) FILES+=("$1"); shift ;;
  esac
done

collect_files() {
  if [[ ${#FILES[@]} -gt 0 ]]; then
    printf '%s\n' "${FILES[@]}"
    return
  fi
  case "$MODE" in
    staged) git diff --cached --name-only --diff-filter=ACMR ;;
    range)
      [[ -n "$RANGE" ]] || usage
      git diff --name-only "$RANGE" --diff-filter=ACMR
      ;;
    *) usage ;;
  esac
}

DENY_FRAGMENTS=(
  'credentials.env'
  'gcp-oauth.keys.json'
  'client_secret'
  '/.env'
  'tokens.json'
  '.gdrive-server-credentials.json'
  'terraform.tfstate'
  'terraform.tfstate.backup'
)

PATTERNS=(
  'BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY'
  'ghp_[A-Za-z0-9]{20,}'
  'github_pat_[A-Za-z0-9_]{20,}'
  'sk-[A-Za-z0-9]{20,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
  'AKIA[0-9A-Z]{16}'
  'AIza[0-9A-Za-z_-]{35}'
)

fail=0

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  [[ -f "$file" ]] || continue

  for frag in "${DENY_FRAGMENTS[@]}"; do
    if [[ "$file" == *"$frag"* ]]; then
      echo "BLOCK: sensitive path: $file"
      fail=1
    fi
  done

  if git check-ignore -q "$file" 2>/dev/null; then
    echo "BLOCK: gitignored file staged: $file"
    fail=1
    continue
  fi

  if file -b "$file" 2>/dev/null | grep -qiE 'image|binary|archive|executable'; then
    continue
  fi

  for pat in "${PATTERNS[@]}"; do
    if grep -qE "$pat" "$file" 2>/dev/null; then
      echo "BLOCK: secret-like pattern in $file"
      fail=1
    fi
  done
done < <(collect_files)

if [[ "$fail" -ne 0 ]]; then
  echo "guard_secrets: fix or unstage the above before continuing." >&2
  exit 1
fi

echo "guard_secrets: OK"
