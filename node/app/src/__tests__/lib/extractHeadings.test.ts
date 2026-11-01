/// <reference types="jest" />

import { extractHeadings } from '../../lib/extractHeadings';

it('h2 と h3 を文書順に集め、コードフェンス内は無視し、id を s1 から振る', () => {
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
    { level: 2, text: 'first', id: 's1' },
    { level: 3, text: 'nested', id: 's2' },
    { level: 2, text: 'second', id: 's3' },
    { level: 3, text: 'after', id: 's4' },
  ]);
});
