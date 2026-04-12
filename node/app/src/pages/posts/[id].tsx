import React from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';
import Date from '../../components/date';
import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown, { Components } from 'react-markdown';
import { CodeBlock } from '../../components/code';
import remarkGfm from 'remark-gfm';
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
}): React.ReactElement => {
  return (
    <Layout title={postData.title} id={id}>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: CodeBlock as Components['code'],
            ul: List as Components['ul'],
            pre: ({ children }) => <>{children}</>,
          }}
        >
          {postData.content}
        </ReactMarkdown>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params?.id as string);
  const id = params?.id;
  return {
    props: {
      postData,
      id,
    },
  };
};

export default Post;
