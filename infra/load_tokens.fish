#!/usr/bin/env fish
# Vercel Terraform 用の環境変数をロードする
#
# 使い方:
#   source infra/load_tokens.fish
#   cd infra/terraform/vercel && terraform plan

set -gx BW_SESSION (bw unlock --raw)
set -gx TF_VAR_vercel_api_token (bw get password "Vercel API Token")

echo "✓ TF_VAR_vercel_api_token をセットしました"
