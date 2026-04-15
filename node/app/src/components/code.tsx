import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import styled from 'styled-components';

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

export const CodeBlock = ({ className, children, ...props }: CodeProps): React.ReactElement => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter language={match[1]} style={style}>
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <InlineCode className={className} {...props}>
      {children}
    </InlineCode>
  );
};

// global.css等で指定するのもあり
export const InlineCode = styled.code`
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 4px;
  padding: 0.1em 0.4em;
  margin: 0.1em;
`;
