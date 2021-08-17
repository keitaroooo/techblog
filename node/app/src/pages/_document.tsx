import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      // ドキュメントの言語が日本語であることを宣言
      <Html lang="ja-JP">
        <Head>
          {/* テーマカラーを指定 */}
          <meta name="theme-color" content="#333" />
          {/* TwitterでのOGP設定 */}
          {/* Twitter上での表示タイプを指定 */}
          <meta name="twitter:card" content="summary_large_image" />
          {/* コンテンツ作成者のTwitterユーザーIDを入力 */}
          <meta name="twitter:creator" content="@keitaroudon" />
          <meta name="format-detection" content="telephone=no" />
          {/* ファビコン画像の指定 */}
          <link rel="icon" href="/logo.svg" />
          {/* スマホでホームにサイトを追加したときに表示するアイコン画像の指定 */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          {/* マニフェストの展開，PWAに必要な情報を提供 */}
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
