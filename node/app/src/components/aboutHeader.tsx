import React from 'react';
import Link from 'next/link';

const AboutHeader = ({ siteTitle }: { siteTitle: string }): React.ReactElement => {
  return (
    <section>
      <h1>
        <Link href="/">
          {siteTitle}
        </Link>
      </h1>
      <nav>
        <ul>
          <li key="Profile">
            <Link href="/about">
              Profile
            </Link>
          </li>
          <li key="Skills">
            <Link href="/about/skills">
              Skills
            </Link>
          </li>
          <li key="Works">
            <Link href="/about/works">
              Works
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: url('/images/profile2.jpg') top center / cover no-repeat;
        }
        h1 {
          margin: 0;
          padding: 5rem 0;
          font-size: 2em;
        }
        h1 :global(a),
        li :global(a) {
          text-decoration: none;
          color: #d8ebe4;
          -webkit-text-stroke: 0.05em black;
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }
        li {
          margin: 2em;
          font-weight: bolder;
          font-size: 1.2em;
        }
      `}</style>
    </section>
  );
};

export default AboutHeader;
