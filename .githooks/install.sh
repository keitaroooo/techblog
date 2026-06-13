#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
cd "$root"
chmod +x .githooks/guard_secrets.py .githooks/pre-commit .githooks/pre-push .githooks/install.sh
git config core.hooksPath .githooks
echo "✓ core.hooksPath=.githooks"
echo "  config: .githooks/guardrails.json"
