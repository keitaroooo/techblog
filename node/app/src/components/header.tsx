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
          <li key="About">
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          background-color: #fed049;
          padding: 1rem;
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
          margin: 0 0 0 1rem;
        }
        nav {
          margin: 0 0 0 auto;
          padding: 0 1rem 0 0;
        }
      `}</style>
    </section>
  );
};

export default Header;
