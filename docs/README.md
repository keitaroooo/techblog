# docs/

**非公開の技術執筆メモ・バックログ。** Vercel には載らない（`src/posts/` のみビルド対象）。

| 置き場 | 用途 | 公開先 |
|--------|------|--------|
| `docs/` | 下書き索引、記事化前の整理 | git のみ |
| `node/app/src/posts/` | 技術記事 | [techblog.keitaroooo.com](https://techblog.keitaroooo.com) |

旅・日常・資産の雑記は [`blog`](https://github.com/keitaroooo/blog) へ。

## 流れ

```
engineering/ · Cursor セッション  （一次入力）
        ↓ Ingest
techblog/docs/*.md                （整理）
        ↓ 清書
src/posts/*.md                    （公開）
        ↓ main push
Vercel
```
