import React from 'react';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';
import Date from '../../components/date';
import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown, { Components } from 'react-markdown';
import { CodeBlock } from '../../components/code';
import { extractHeadings } from '../../lib/extractHeadings';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

// <style jsx></style>ではうまくいかなかった，マークダウンレンダリングのスタイリングはタイミングが違うのかも
const List = styled.ul`
  padding: 0 0 0 1em;
`;

const Body = styled.div<{ $withToc: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$withToc ? 'minmax(0, 1fr) 16rem' : 'minmax(0, 1fr)'};
  column-gap: 2.5rem;
  align-items: start;

  @media (max-width: 1020px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Markdown = styled.div<{ $withToc: boolean }>`
  grid-column: 1;
  grid-row: 1;
  min-width: 0;

  @media (max-width: 1020px) {
    grid-row: ${(props) => (props.$withToc ? 2 : 1)};
  }
`;

const Toc = styled.aside`
  grid-column: 2;
  grid-row: 1;
  position: sticky;
  top: 1rem;
  min-width: 0;

  @media (max-width: 1020px) {
    grid-column: 1;
    grid-row: 1;
    position: static;
    margin-bottom: 1.5rem;
  }
`;

const TocTitle = styled.p`
  margin: 0 0 0.5rem;
  font-weight: bold;
`;

const TocList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TocItem = styled.li<{ $level: 1 | 2 | 3 }>`
  margin: 0.25rem 0 0.25rem ${(props) => (props.$level - 1) + 'rem'};
`;

const Post = ({
  postData,
  id,
}: {
  postData: PostData;
  id: string;
}): React.ReactElement => {
  const headings = extractHeadings(postData.content);
  let headingIndex = 0;
  const takeId = (): string | undefined => {
    const headingId = headings[headingIndex]?.id;
    headingIndex += 1;
    return headingId;
  };

  return (
    <Layout title={postData.title} id={id}>
      <article>
        <h1>{postData.title}</h1>
        <div>
          <Date dateString={postData.date} />
        </div>
        <Body $withToc={headings.length > 0}>
          {headings.length > 0 && (
            <Toc aria-label="目次">
              <TocTitle>目次</TocTitle>
              <TocList>
                {headings.map((item) => (
                  <TocItem key={item.id} $level={item.level}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </TocItem>
                ))}
              </TocList>
            </Toc>
          )}
          <Markdown $withToc={headings.length > 0}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock as Components['code'],
                ul: List as Components['ul'],
                pre: ({ children }) => <>{children}</>,
                h1: ({ children }) => <h1 id={takeId()}>{children}</h1>,
                h2: ({ children }) => <h2 id={takeId()}>{children}</h2>,
                h3: ({ children }) => <h3 id={takeId()}>{children}</h3>,
              }}
            >
              {postData.content}
            </ReactMarkdown>
          </Markdown>
        </Body>
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
