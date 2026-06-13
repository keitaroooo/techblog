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

## Local

```sh
cd node/app && npm install && npm run dev
```

## Infra

- **デプロイ**: Vercel（`infra/terraform/vercel/`）— `main` push で自動デプロイ
- **DNS**: [`keitaro-yamaguchi`](https://github.com/keitaroooo/keitaro-yamaguchi) で一元管理
- **作業ログ**: [`infra/作業ログ.md`](infra/作業ログ.md)
