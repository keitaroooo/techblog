---
title: "VSCodeの拡張機能と設定"
date: "2022-08-28"
---

# 全体

環境構築の際，コピペやとりあえず入れておくことが多く，拡張機能や`settings.json`が複雑になっていたので，調べて整理しました．
まだまだ便利な拡張機能はあると思いますが，
個人的にできるだけ小さい状態の方がが好きなので，VSCode の基本機能を信じて，一旦これでいきます．

導入した拡張機能は以下の通りです．

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)
- [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- [ToDo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

`settings.json`は以下の通りです．

```json
{
  /* VSCodeの設定 */
  "window.openFoldersInNewWindow": "on", // 新規ワークスペースを別ウインドウで開く
  "window.zoomLevel": -1.5, // 画面全体の表示サイズを制御する
  "workbench.editor.tabSizing": "shrink", // タブの表示設定
  "workbench.startupEditor": "none", // Welcome Page を表示しない
  "explorer.confirmDragAndDrop": false, // エクスプローラーでドラッグアンドドロップするときに確認しない
  "extensions.ignoreRecommendations": true, //拡張機能の推奨を無視する
  "search.exclude": {
    // 検索対象外にするファイル設定（ files.exclude のファイルも含む）
    "**/tmp": true
  },
  "terminal.integrated.defaultProfile.linux": "fish", // デフォルトシェルをfishにする

  /* ファイルやエディターの設定 */
  "files.autoSave": "off", // 自動保存の設定（自動保存しない）
  "editor.tabSize": 2, // タブのサイズ変更
  "editor.wordWrap": "on", // エディターの幅で折り返し
  "editor.minimap.enabled": false, // ミニマップを非表示にする
  "editor.renderControlCharacters": true, // 制御文字を表示する
  "editor.fontFamily": "'Fira Code', Hasklig, Consolas, 'Courier New', monospace", // フォントファミリーを制御する
  "editor.fontLigatures": true, // 合字を有効化する
  "editor.fontSize": 15, // フォントサイズを制御する
  "editor.renderLineHighlight": "all", // 選択行の行番号をハイライトする
  "editor.cursorStyle": "block", // カーソルの外観をブロックに変更する
  "files.autoGuessEncoding": true, // ファイルの自動エンコードを実施する
  "editor.bracketPairColorization.enabled": true, // 括弧の対応を色付ける
  "editor.renderWhitespace": "boundary", // ホワイトスペースを表示する（単語間の単一スペースは表示しない）
  "editor.tokenColorCustomizations": {
    "comments": "#0de229" // コメントの色を緑色にする
  },
  // 任意の拡張子を指定したファイル形式として取り扱う
  "files.associations": {
    ".*lintrc": "json",
    "*.rmd": "markdown"
  },
  // 特定の文字でのみunicodeハイライトをOFFにする
  "editor.unicodeHighlight.allowedCharacters": {
    "：": true
  },

  /* Git */
  "diffEditor.renderSideBySide": false, // Gitの差分を横に並べて表示ではなく行内に表示する行内に表示
  "git.autofetch": true,

  /* コード補完 */
  "editor.snippetSuggestions": "top", // Emmetなどのスニペット候補を優先して表示する
  /* Emmet */
  "emmet.showSuggestionsAsSnippets": true, // Emmetの候補を表示する
  "emmet.triggerExpansionOnTab": true, // TABキーでEmmetを展開できるようにする
  "emmet.variables": {
    "lang": "ja" // Emmetで展開されるHTMLの言語を変更する
  },
  // 入力中のクイックサジェスト表示を制御する
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "editor.suggestSelection": "recentlyUsed", // サジェスト一覧が表示されたとき最近使用したサジェストが選択された状態にする

  /* Formatter */
  /* 全般 */
  "editor.formatOnSave": true, // ファイル保存時に自動でフォーマット
  "editor.formatOnPaste": true, // ペースト時に自動でフォーマット
  "editor.formatOnType": true, // 入力した行を自動でフォーマット

  // ファイル保存時に実行する処理
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // ESLintに対応しているファイルをESLintでフォーマットする
  },
  "eslint.format.enable": true, // Shift+Alt+FでESLint機能拡張のフォーマットを行えるようにする
  /* Prettier */
  // "editor.defaultFormatter": "esbenp.prettier-vscode", // 拡張機能Prettierを有効にする
  /* markdown */
  "[markdown]": {
    "files.trimTrailingWhitespace": false, // Markdown のファイルは行末の空白をトリミングしない
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  /* HTML */
  "html.format.contentUnformatted": "pre, code, textarea, title, h1, h2, h3, h4, h5, h6, p", // タグ内の記述はフォーマットしない
  "html.format.extraLiners": "", // head, body, /html タグの前に改行を入れない
  "html.format.unformatted": null, // フレージング・コンテンツ（旧インライン要素のようなタグ）はフォーマットしない
  "html.format.wrapLineLength": 0, // 行の文字数制限を無くし自動で改行させない
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[xml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  /* clang-format */
  "[c]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  "[cpp]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  "C_Cpp.clang_format_style": "{ BasedOnStyle: Google, BreakBeforeBraces: Attach, SpaceBeforeParens: Never, IndentWidth: 4 }",

  /* Others */
  "todohighlight.keywords": [
    "DEBUG:",
    "REVIEW:",
    {
      "text": "NOTE:",
      "color": "#ff0000",
      "backgroundColor": "yellow",
      "overviewRulerColor": "grey"
    },
    {
      "text": "HACK:",
      "color": "#000",
      "isWholeLine": false
    },
    {
      "text": "TODO:",
      "color": "red",
      "border": "1px solid red",
      "borderRadius": "2px", //NOTE: using borderRadius along with `border` or you will see nothing change
      "backgroundColor": "rgba(0,0,0,.2)"
      //other styling properties goes here ...
    }
  ],

  "sync.gist": "<Gist ID>", // Settings Syncの設定
  "workbench.iconTheme": "material-icon-theme",
  "vim.useCtrlKeys": false // vimでctrlキーを使用しない
}
```

これ以降の記述は，導入した拡張機能と設定の組み合わせを，テーマごとに区切ったものです．

# VSCode の設定

拡張機能は導入していません．

`settings.json`は以下の通りです．

```json
{
  /* VSCodeの設定 */
  "window.openFoldersInNewWindow": "on", // 新規ワークスペースを別ウインドウで開く
  "window.zoomLevel": -1.5, // 画面全体の表示サイズを制御する
  "workbench.editor.tabSizing": "shrink", // タブの表示設定
  "workbench.startupEditor": "none", // Welcome Page を表示しない
  "explorer.confirmDragAndDrop": false, // エクスプローラーでドラッグアンドドロップするときに確認しない
  "extensions.ignoreRecommendations": true, //拡張機能の推奨を無視する
  "search.exclude": {
    // 検索対象外にするファイル設定（ files.exclude のファイルも含む）
    "**/tmp": true
  },
  "terminal.integrated.defaultProfile.linux": "fish", // デフォルトシェルをfishにする

  ...
```

# ファイルやエディターの設定

拡張機能は導入していません．

`settings.json`は以下の通りです．

```json
  ...

  /* ファイルやエディターの設定 */
  "files.autoSave": "off", // 自動保存の設定（自動保存しない）
  "editor.tabSize": 2, // タブのサイズ変更
  "editor.wordWrap": "on", // エディターの幅で折り返し
  "editor.minimap.enabled": false, // ミニマップを非表示にする
  "editor.renderControlCharacters": true, // 制御文字を表示する
  "editor.fontFamily": "'Fira Code', Hasklig, Consolas, 'Courier New', monospace", // フォントファミリーを制御する
  "editor.fontLigatures": true, // 合字を有効化する
  "editor.fontSize": 15, // フォントサイズを制御する
  "editor.renderLineHighlight": "all", // 選択行の行番号をハイライトする
  "editor.cursorStyle": "block", // カーソルの外観をブロックに変更する
  "files.autoGuessEncoding": true, // ファイルの自動エンコードを実施する
  "editor.bracketPairColorization.enabled": true, // 括弧の対応を色付ける
  "editor.renderWhitespace": "boundary", // ホワイトスペースを表示する（単語間の単一スペースは表示しない）
  "editor.tokenColorCustomizations": {
    "comments": "#0de229" // コメントの色を緑色にする
  },
  // 任意の拡張子を指定したファイル形式として取り扱う
  "files.associations": {
    ".*lintrc": "json",
    "*.rmd": "markdown"
  },
  // 特定の文字でのみunicodeハイライトをOFFにする
  "editor.unicodeHighlight.allowedCharacters": {
    "：": true
  },

  ...
```

# バージョン管理の設定

導入した拡張機能は以下の通りです．

- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

`settings.json`は以下の通りです．

```json
  ...

  /* Git */
  "diffEditor.renderSideBySide": false, // Gitの差分を横に並べて表示ではなく行内に表示する行内に表示
  "git.autofetch": true,

  ...
```

# コード補完の設定

拡張機能は導入していません．

`settings.json`は以下の通りです．

```json
  ...

  /* コード補完 */
  "editor.snippetSuggestions": "top", // Emmetなどのスニペット候補を優先して表示する
  /* Emmet */
  "emmet.showSuggestionsAsSnippets": true, // Emmetの候補を表示する
  "emmet.triggerExpansionOnTab": true, // TABキーでEmmetを展開できるようにする
  "emmet.variables": {
    "lang": "ja" // Emmetで展開されるHTMLの言語を変更する
  },
  // 入力中のクイックサジェスト表示を制御する
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "editor.suggestSelection": "recentlyUsed", // サジェスト一覧が表示されたとき最近使用したサジェストが選択された状態にする

  ...
```

# Linter と Formatter の設定

## 全般

導入した拡張機能は以下の通りです．

- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

EditorConfig の設定ファイル`.editorconfig`は以下の通りです．

```bash
# editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

```

`settings.json`は以下の通りです．

```json
  ...

  /* Formatter */
  /* 全般 */
  "editor.formatOnSave": true, // ファイル保存時に自動でフォーマット
  "editor.formatOnPaste": true, // ペースト時に自動でフォーマット
  "editor.formatOnType": true, // 入力した行を自動でフォーマット

  ...
```

## フロントエンド

導入した拡張機能は以下の通りです．

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Prettier の設定ファイル`.prettierrc.js`は以下の通りです．

```js
module.exports = {
  singleQuote: true,
};
```

ESLint の設定ファイル`.eslintrc.yml`は以下の通りです．

```yml
root: true
env:
  browser: true
  node: true
  es2021: true
  jest: true
parser: "@typescript-eslint/parser"
parserOptions:
  ecmaFeatures:
    jsx: true
  ecmaVersion: 2021 # same as 12
  project: ./tsconfig.json # プロジェクト内の型認識に使用
  sourceType: module # use import/export
plugins:
  - "@typescript-eslint"
extends:
  - eslint:recommended
  - plugin:@typescript-eslint/eslint-recommended
  - plugin:@typescript-eslint/recommended
  - plugin:react/recommended
  - plugin:react-hooks/recommended
  - plugin:jest/recommended
  - prettier
```

`settings.json`は以下の通りです．

```json
  ...

  // ファイル保存時に実行する処理
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true // ESLintに対応しているファイルをESLintでフォーマットする
  },
  "eslint.format.enable": true, // Shift+Alt+FでESLint機能拡張のフォーマットを行えるようにする
  /* Prettier */
  // "editor.defaultFormatter": "esbenp.prettier-vscode", // 拡張機能Prettierを有効にする
  /* markdown */
  "[markdown]": {
    "files.trimTrailingWhitespace": false, // Markdown のファイルは行末の空白をトリミングしない
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  /* HTML */
  "html.format.contentUnformatted": "pre, code, textarea, title, h1, h2, h3, h4, h5, h6, p", // タグ内の記述はフォーマットしない
  "html.format.extraLiners": "", // head, body, /html タグの前に改行を入れない
  "html.format.unformatted": null, // フレージング・コンテンツ（旧インライン要素のようなタグ）はフォーマットしない
  "html.format.wrapLineLength": 0, // 行の文字数制限を無くし自動で改行させない
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[xml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  ...

```

## C, C++

導入した拡張機能は以下の通りです．

- [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

`settings.json`は以下の通りです．

```json
  ...

  /* clang-format */
  "[c]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  "[cpp]": {
    "editor.defaultFormatter": "ms-vscode.cpptools"
  },
  "C_Cpp.clang_format_style": "{ BasedOnStyle: Google, BreakBeforeBraces: Attach, SpaceBeforeParens: Never, IndentWidth: 4 }",

  ...
```

## Python

導入した拡張機能は以下の通りです．

- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance)

## LaTeX

導入した拡張機能は以下の通りです．

- [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)

# その他の拡張機能

導入した拡張機能は以下の通りです．

- [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)

`settings.json`は以下の通りです．

```json
  ...

  /* Others */
  "todohighlight.keywords": [
    "DEBUG:",
    "REVIEW:",
    {
      "text": "NOTE:",
      "color": "#ff0000",
      "backgroundColor": "yellow",
      "overviewRulerColor": "grey"
    },
    {
      "text": "HACK:",
      "color": "#000",
      "isWholeLine": false
    },
    {
      "text": "TODO:",
      "color": "red",
      "border": "1px solid red",
      "borderRadius": "2px", //NOTE: using borderRadius along with `border` or you will see nothing change
      "backgroundColor": "rgba(0,0,0,.2)"
      //other styling properties goes here ...
    }
  ],

  "sync.gist": "<Gist ID>", // Settings Syncの設定
  "workbench.iconTheme": "material-icon-theme",
  "vim.useCtrlKeys": false // vimでctrlキーを使用しない
}
```

- [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
- [ToDo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

# あとがき

C/C++, Python, LaTeX の VSCode に依存しない最小限の環境構築については，別の記事でまとめたいと考えています．

# 参考

- [VSCode おすすめ設定大公開！！おすすめ拡張機能も](https://qiita.com/papi_tokei/items/c639dc7d1e0f5ad68a74)
- [ESLint 設定を作成する技術](https://zenn.dev/januswel/articles/402774d76424e71ac906)
- [ESLint の設定ファイル (.eslintrc) の各プロパティの意味を理解する](https://maku.blog/p/j6iu7it/)
