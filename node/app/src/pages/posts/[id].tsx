import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';
import Date from '../../components/date';
import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown/with-html';
import { CodeBlock, InlineCode } from '../../components/code';
import gfm from 'remark-gfm';
import styled from 'styled-components';

// <style jsx></style>ではうまくいかなかった，マークダウンレンダリングのスタイリングはタイミングが違うのかも
const List = styled.ul`
  padding: 0 0 0 1em;
`;

const Post = ({
  postData,
  id,
}: {
  postData: PostData;
  id: string;
}): JSX.Element => {
  return (
    <Layout title={postData.title} id={id}>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          plugins={[gfm]}
          source={postData.content}
          renderers={{ code: CodeBlock, inlineCode: InlineCode, list: List }}
        />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id as string);
  const id = params.id;
  return {
    props: {
      postData,
      id,
    },
  };
};

export default Post;
