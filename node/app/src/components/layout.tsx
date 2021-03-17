import Head from 'next/head';
import Header from './header';

type Layout = {
  children: React.ReactNode;
  title?: string;
  id: string;
};

const Layout = (props: Layout): JSX.Element => {
  const { title, id, children } = props;
  const siteTitle = 'KeitarooOO Tech Blog';
  const pageTitle = title ? title : siteTitle;
  const pageDescription = title ? title : 'Tech Blog of KeitarooOO';
  const baseUrl = 'https://blog.keitaroooo.com';
  const url = baseUrl + '/' + id;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        {/* ページの解説。検索結果に表示される。（検索結果の表示が必ずこの内容になるとは限らない
          文書の説明を短文で指定する。ここで指定する値はGoogleの検索結果に表示されるなど、多くの検索エンジンで利用される */}
        <meta name="description" content={pageDescription} />
        {/* OGP設定 */}
        {/* ページのタイプ */}
        <meta property="og:type" content={title ? 'article' : 'blog'} />
        {/* ページのタイトル */}
        <meta property="og:title" content={pageTitle} />
        {/* ページのURL */}
        <meta property="og:url" content={url} />
        {/* ページの説明文 */}
        <meta property="og:description" content={pageDescription} />
        {/* SNSでシェアされた際に表示する画像を指定 */}
        <meta property="og:image" content={`${url}.png`} />
        {/* ページのサイト名 */}
        <meta property="og:site_name" content={siteTitle} />
      </Head>

      <header>
        <Header siteTitle={siteTitle} />
      </header>
      <main>{children}</main>

      <style jsx>
        {`
          main {
            max-width: 60rem;
            padding: 0 1rem;
            margin: 3rem auto 6rem;
          }

          header {
            width: 100%;
            padding: 1rem;
            background-color: #fed049;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
