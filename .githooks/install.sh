#!/usr/bin/env bash
set -euo pipefail
root="$(git rev-parse --show-toplevel)"
cd "$root"
chmod +x .githooks/guard_secrets.sh .githooks/pre-commit .githooks/pre-push
git config core.hooksPath .githooks
echo "✓ core.hooksPath=.githooks"
