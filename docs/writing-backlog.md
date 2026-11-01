---
title: 技術執筆バックログ
type: moc
updated: 2026-07-26
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
| personal-dev-hosting | [techblog](https://techblog.keitaroooo.com/posts/personal-dev-hosting) |

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

## 記事ネタ（旧 Projects Backlog から移行 · 2026-07-26）

- DNS のまとめと設定方法 — keitaro-yamaguchi `infra/README.md` がソース（keitaro-yamaguchi#151, keitaro-yamaguchi#308）
- Amazon EC2（keitaro-yamaguchi#187）
- ターミナル開発環境構築（keitaro-yamaguchi#252）
- LaTeX の環境構築（keitaro-yamaguchi#303）
- ソフトウェア開発において便利なツール（keitaro-yamaguchi#304）
- VSCode でソフトウェア開発環境構築（keitaro-yamaguchi#305）
- .NET を用いた開発（keitaro-yamaguchi#306）
- Web サイトの構成（keitaro-yamaguchi#307）
- 系列データの分類方法（keitaro-yamaguchi#310）
- Python の環境構築方法（keitaro-yamaguchi#311）
- リモート接続（keitaro-yamaguchi#312）
- 複数のストレージを用いてマルチブート（keitaro-yamaguchi#313）
- Google Analytics を活用する（keitaro-yamaguchi#314）

## 候補の扱い

- アイデアだけ → このファイルに1行追記
- 着手決定 → keitaro-yamaguchi Issue `[Build]` + Projects Ready
- 清書完了 → `src/posts/` に追加、ここから公開済みへ移動
