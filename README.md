# techblog

技術ブログ。Next.js + Vercel。

- **URL**: https://techblog.keitaroooo.com
- **App**: `node/app/`

## Local

```sh
cd node/app && npm install && npm run dev
```

## Infra

- **デプロイ**: Vercel（`infra/terraform/vercel/`）— `main` push で自動デプロイ
- **DNS**: [`keitaro-yamaguchi`](https://github.com/keitaroooo/keitaro-yamaguchi) で一元管理
- **作業ログ**: [`infra/作業ログ.md`](infra/作業ログ.md)
