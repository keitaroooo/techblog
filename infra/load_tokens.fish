#!/usr/bin/env fish
# Vercel Terraform 用 TF_VAR（$HOME/.config/vercel/terraform.fish）

set -l secret "$HOME/.config/vercel/terraform.fish"
if not test -f $secret
    echo "error: $secret がありません" >&2
    echo "  cp keitaro-yamaguchi/infra/secrets.example/vercel/terraform.fish.example $secret" >&2
    echo "  chmod 600 $secret" >&2
    exit 1
end
source $secret
echo "✓ Vercel TF_VAR をセットしました ($secret)"
