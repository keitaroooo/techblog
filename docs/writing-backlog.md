---
title: 技術執筆バックログ
type: moc
updated: 2026-06-13
tags: [engineering, writing]
---

# 技術執筆バックログ

keitaro-yamaguchi の `engineering/` や Cursor セッションから清書する記事の置き場。
**公開済み** は `src/posts/` を正本とする。

## 公開済み

| 記事 | 公開 URL |
|------|----------|
| multiple-hosting-service-sub-domain | [techblog](https://techblog.keitaroooo.com/posts/multiple-hosting-service-sub-domain) |
| vercel-sub-domain | 同上 slug |
| vscode-extensions-settings | 同上 slug |

## メモから書ける候補

| 優先 | 記事案 | ソース | 粒度 |
|------|--------|--------|------|
| 高 | JJUG CCC 2025 Fall 参加記（セッションまとめ） | [`engineering/jjug-ccc-2025-fall.md`](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/engineering/jjug-ccc-2025-fall.md) | L — セッションごとに分割可 |
| 高 | 仕事で使っている AI ツールと MCP の使い分け | [`engineering/AI.md`](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/engineering/AI.md) 共有会セクション | M |
| 中 | 継続的デリバリー読書会（スライド要約） | [`engineering/slides/継続的デリバリー_slides.md`](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/engineering/slides/継続的デリバリー_slides.md) | M |
| 低 | astphere 仮想通貨コストベース可視化 | astphere 開発 + [`assets/README.md`](https://github.com/keitaroooo/keitaro-yamaguchi/blob/main/assets/README.md) | L — 実装完了後 |

### 清書の流れ

```
keitaro-yamaguchi/engineering/  →  techblog/docs/（main 直 push）
        ↓
src/posts/*.md  →  PR → merge  →  Vercel
```

## 候補の扱い

- アイデアだけ → このファイルに1行追記
- 着手決定 → keitaro-yamaguchi Issue `[Build]` + Projects Ready
- 清書完了 → `src/posts/` に追加、ここから公開済みへ移動
