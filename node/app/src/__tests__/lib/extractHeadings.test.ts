/// <reference types="jest" />

import { extractHeadings } from '../../lib/extractHeadings';

it('h1 から h3 を文書順に集め、コードフェンス内は無視し、id を s1 から振る', () => {
  const markdown = [
    '# title',
    '## first',
    '### nested',
    '```',
    '## not a heading',
    '### also not',
    '```',
    '## second',
    '### after',
  ].join('\n');

  expect(extractHeadings(markdown)).toEqual([
    { level: 1, text: 'title', id: 's1' },
    { level: 2, text: 'first', id: 's2' },
    { level: 3, text: 'nested', id: 's3' },
    { level: 2, text: 'second', id: 's4' },
    { level: 3, text: 'after', id: 's5' },
  ]);
});
