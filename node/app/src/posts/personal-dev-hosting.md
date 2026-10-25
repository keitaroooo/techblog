---
title: '個人開発のホスティング選定'
date: '2026-10-25'
---

この記事は、自分のメモを AI が清書したものです。無料枠の数字は 2026-06 時点のメモで、使う前に公式を確認してください。

新規アプリのフロント、API、データベース、定期実行を選ぶときのメモです。サブドメインの設定手順は [複数のホスティングサービスでサブドメインを設定](/posts/multiple-hosting-service-sub-domain) にあります。

# DNS から分かること

カスタムドメインの CNAME の向き先で、フロントがどのサービスか分かります。

| サブドメイン | 向き先の例 | FE |
|--------------|-----------|-----|
| `www` | `*.pages.dev` | Cloudflare Pages |
| `blog` | `*.netlify.app` | Netlify |
| `techblog` | `cname.vercel-dns.com` | Vercel |

`*.pages.dev` のみのサイトや Workers / D1 は、この DNS には出ません。

# LINE Mini App（LIFF）

LINE のサーバーにフロントは載せられません。Endpoint URL は自前 HTTPS（Pages 等）です。

- [ウェブアプリのミニアプリ化](https://developers.line.biz/ja/docs/line-mini-app/develop/web-to-mini-app/)

# フロントエンド（SPA / 静的）

| サービス | 無料枠（目安） | 期限 | 商用 | 放置停止 | メモ |
|----------|----------------|------|------|----------|------|
| **Cloudflare Pages** | 帯域ほぼ無制限 | なし | OK | なし | **推奨**。LIFF 向き |
| Vercel Hobby | 100GB/月 | なし | **NG** | なし | Next.js 向き |
| Netlify | 帯域 ~100GB/月 | なし | 要確認 | なし | blog で利用 |
| GitHub Pages | ~100GB/月 | なし | OK | なし | 静的のみ |
| Render Static | 100GB/月 | なし | 要確認 | なし | |
| AWS S3 + CloudFront | 100GB/月 | なし | OK | なし | セットアップ重め |

# バックエンド（API / scrape）

| サービス | 無料枠（目安） | 期限 | スリープ | 備考 |
|----------|----------------|------|----------|------|
| **Cloudflare Workers** | 10万 req/日 | なし | なし | Cron 内蔵 |
| Render Web Service | 750h/月 | なし | **15分** | Docker 可 |
| Google Cloud Run | 200万 req/月 | なし | min=0 | 東京可 |
| Fly.io | トライアル中心 | — | — | scrape 向き |
| Railway | $5/30日 | トライアル | — | 永続無料なし |
| AWS Lambda | 100万/月 | なし | — | |

# データベース

| サービス | 種類 | 無料容量 | 期限切れ | スリープ | メモ |
|----------|------|----------|----------|----------|------|
| **Cloudflare D1** | SQLite | 5GB | なし | なし | Workers と一体 |
| **Neon** | Postgres | 0.5GB | なし | アイドル | Render BE と相性良 |
| **Supabase** | Postgres | 500MB | なし | 7日非アクティブ | Auth 込み |
| **TiDB Cloud Starter** | MySQL | 5GB | なし | — | Spending Limit $0 |
| **Turso** | libSQL | 5GB | なし | — | エッジ SQLite |
| **Render Postgres** | Postgres | 1GB | **30日で削除** | — | 本番非推奨 |
| Upstash Redis | Redis | 256MB | なし | — | キャッシュ |

# Cron / 定期ジョブ

| 方式 | 無料 | 備考 |
|------|------|------|
| Workers Cron | Workers 枠内 | |
| Upstash QStash | ~500/日 | HTTP で API を叩く |
| GitHub Actions | 2000分/月 | |
| Render Cron Job | 有料 WS が多い | |
| cron-job.org | あり | 最小 PoC |

# 構成パターン

| パターン | FE | BE | DB | Cron | 例 |
|----------|----|----|-----|------|-----|
| CF 完結 | Pages | Workers | D1 | Workers Cron | realestate-map |
| Vercel + Supabase | Vercel | Supabase Edge | Supabase PG | Vercel Cron | MVP |
| Pages + Render + Neon | CF Pages | Render Web | Neon | QStash / GHA | BE 学習 |
| Hiruge 型 | CF Pages | Cloud Run | TiDB | Cloud Scheduler | 低レイテンシ |
| Render 全部 | Render Static | Render Web | Render PG | Render Cron | **DB 30日**注意 |

# 選定の目安

1. 無料で期限なく DB → D1 / Neon / Supabase / TiDB（Render PG は除く）
2. LIFF の FE → Cloudflare Pages
3. scrape が重い → Cloud Run / Fly / Render
4. keitaroooo.com のサブドメイン → Cloudflare の DNS に CNAME を足す
5. 複数クラウドを学ぶ → FE は Pages のまま BE/DB だけ別サービス

# 参考リンク

| 記事 | 内容 |
|------|------|
| [Hiruge（2026-03）](https://qiita.com/Hiruge/items/262e0645fbfb024ecd4b) | FE=CF Pages, BE=Cloud Run/Render, DB=TiDB |
| [radian462: DB 無料枠](https://zenn.dev/radian462/articles/cf780555dfa4b4) | D1 / Neon / Turso 等 |
| [tak720: 無料縛り 3 パターン](https://zenn.dev/tak720/articles/bac40312c25c06) | CF / Supabase / AWS |
| [pam5596](https://qiita.com/pam5596/items/feab853f3a62a3d3f0a0) | GitHub Pages / Render / Vercel |
| [Render Free Postgres](https://render.com/docs/free) | 30 日で失効 |
