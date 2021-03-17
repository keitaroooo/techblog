import Layout from '../components/layout';
import { getSortedPostsData, AllPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { GetStaticProps } from 'next';

const Home = ({
  allPostsData,
}: {
  allPostsData: AllPostsData;
}): JSX.Element => {
  return (
    <Layout id="">
      <section>
        <h2>最新記事</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
        <style jsx>
          {`
            small {
              color: #666;
            }

            ul {
              list-style: none;
              padding: 0;
              margin: 0;
            }
          `}
        </style>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
