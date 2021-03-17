import Link from 'next/link';

const Header = ({ siteTitle }: { siteTitle: string }): JSX.Element => {
  return (
    <section>
      <h1>
        <Link href="/">
          <a>{siteTitle}</a>
        </Link>
      </h1>
      <nav>
        <ul>
          <Link href="/about">
            <a>About</a>
          </Link>
        </ul>
      </nav>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
        }
        h1 {
          margin: 0;
          padding: 0;
        }
        a {
          color: #282846;
          text-decoration: none;
        }
        ul {
          list-style: none;
          margin: 0;
          display: flex;
        }
        li {
          margin: 2em 0 0 0;
        }
        nav {
          margin: 0 0 0 auto;
        }
      `}</style>
    </section>
  );
};

export default Header;
