import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import style from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import styled from 'styled-components';

type P = {
  value: string;
  language?: string;
};

export const CodeBlock = ({ value, language }: P): JSX.Element => {
  return (
    <SyntaxHighlighter language={language} style={style}>
      {value}
    </SyntaxHighlighter>
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
