# AGENTS.md

## Build & Test

```fish
cd node/app
npm install
npm run dev      # 開発サーバー（Next.js）
npm run build    # ビルド
npm run test     # Jest テスト
npm run lint     # ESLint
```

## サービス構成

```
node/app/   → Next.js + TypeScript
infra/      → Terraform（ホスティング設定）
```

- フレームワーク: Next.js
- テスト: Jest
- Lint: ESLint + Prettier

## インフラ

- **Terraform**: `infra/terraform/`
- **作業ログ**: `infra/作業ログ.md`
