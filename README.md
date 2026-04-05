# techblog
技術ブログ

## Links

- Repo: https://github.com/keitaroooo/techblog
- URL: https://techblog.keitaroooo.com

## Structure

- App: `node/app/`（Next.js）

## 技術スタック
- React
- Next.js
- TypeScript
- remark(react-markdown)
- MDX(about page)
- Vercel

## Local Preview

```sh
cd node/app
npm install
npm run dev
```

## Deploy

### Vercel

- Vercel に GitHub リポジトリを接続してデプロイ
- プロジェクトの Root Directory は `node/app` を指定
- `main` への push で自動デプロイ

### Cloudflare（DNS / Proxy）

- `techblog.keitaroooo.com` の DNS レコードは、[**keitaro-yamaguchi**](https://github.com/keitaroooo/keitaro-yamaguchi) リポジトリで一元管理しています。

## Infrastructure (IaC)

Vercel プロジェクトとカスタムドメインの設定を Terraform で管理します。
詳細な手順については、[**keitaro-yamaguchi/infra/作業ログ.md**](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/infra/作業ログ.md) を参照してください。

- **Vercel Project Configuration**: `techblog/infra/terraform/vercel/main.tf` で Vercel プロジェクトとドメインを設定します。
- **DNS Configuration**: `techblog.keitaroooo.com` の DNS 設定は、`keitaro-yamaguchi` リポジトリで一元管理されています。
