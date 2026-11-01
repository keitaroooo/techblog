export type TocHeading = {
  level: 2 | 3;
  text: string;
  id: string;
};

const openFence = /^( {0,3})(`{3,}|~{3,})(.*)$/;
const closeFence = /^( {0,3})(`{3,}|~{3,})[ \t]*$/;
const atx = /^( {0,3})(#{2,3})[ \t]+(.*)$/;

function headingText(raw: string): string {
  return raw.replace(/[ \t]+#+\s*$/, '').trim();
}

export function extractHeadings(markdown: string): TocHeading[] {
  const headings: TocHeading[] = [];
  let fence: { char: string; len: number } | null = null;

  for (const line of markdown.split(/\r?\n/)) {
    if (fence) {
      const close = closeFence.exec(line);
      if (
        close &&
        close[2][0] === fence.char &&
        close[2].length >= fence.len
      ) {
        fence = null;
      }
      continue;
    }

    const open = openFence.exec(line);
    if (open && !(open[2][0] === '`' && open[3].includes('`'))) {
      fence = { char: open[2][0], len: open[2].length };
      continue;
    }

    const match = atx.exec(line);
    if (!match) continue;
    const text = headingText(match[3]);
    if (!text) continue;
    const level = match[2].length as 2 | 3;
    headings.push({ level, text, id: `s${headings.length + 1}` });
  }

  return headings;
}
