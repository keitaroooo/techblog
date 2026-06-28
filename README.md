# techblog

技術ブログ。Next.js + Vercel。

- **URL**: https://techblog.keitaroooo.com
- **App**: `node/app/`

## 執筆の置き場

| パス | 役割 |
|------|------|
| [`docs/`](docs/) | 技術執筆バックログ（非公開） |
| [`node/app/src/posts/`](node/app/src/posts/) | 公開記事（Vercel デプロイ対象） |

雑記・旅は [blog](https://github.com/keitaroooo/blog)。

## Git（公開物だけ PR）

| 変更 | ブランチ | マージ |
|------|----------|--------|
| `docs/` · README · infra | `main` 直 push | 確認不要 |
| `src/posts/` · 公開に効く app 変更 | feature ブランチ → **PR** | レビュー後 merge → Vercel |

```bash
git checkout -b post/example
git push -u origin HEAD && gh pr create --title "post: …" --body "…"
```

## ガードレール

設定: [`.githooks/guardrails.json`](.githooks/guardrails.json)（hooks の warn/block）。`bash .githooks/install.sh` で有効化。

## Local

```sh
cd node/app && npm install && npm run dev
```

## Infra

- **デプロイ**: Vercel（`infra/terraform/vercel/`）— `main` push で自動デプロイ
- **DNS**: [`keitaro-yamaguchi`](https://github.com/keitaroooo/keitaro-yamaguchi) で一元管理

### Terraform

コード: [`infra/terraform/vercel/`](infra/terraform/vercel/)

| リソース | 説明 |
| --- | --- |
| `vercel_project.techblog` | Vercel プロジェクト（Next.js, root: `node/app`） |
| `vercel_project_domain.techblog` | カスタムドメイン `techblog.keitaroooo.com` |

```fish
source infra/load_tokens.fish
cd infra/terraform/vercel
terraform init && terraform plan && terraform apply
```

import ブロックは `main.tf` に記載済み。Bitwarden Item 名は keitaro-yamaguchi / 他リポと同じ。
