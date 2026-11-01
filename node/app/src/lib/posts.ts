import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { updatedDay } from './updatedDay';
// gray-matterはfront matterと本文を解析してJSONデータに変換するツール
import matter from 'gray-matter';

// pathを結合
// process.cwd()から，nodeコマンド実行時のワーキングディレクトリパスを取得できる
const postsDirectory = path.join(process.cwd(), 'src/posts');

export type AllPostsData = {
  date: string;
  title: string;
  id: string;
}[];

export const getSortedPostsData = (): AllPostsData => {
  // Get file names under /posts，type:string[]
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

type AllPostsIds = {
  params: {
    id: string;
  };
}[];

export const getAllPostIds = (): AllPostsIds => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

export type PostData = {
  id: string;
  content: string;
  title: string;
  date: string;
  updated: string | null;
};

const repoRoot = path.resolve(process.cwd(), '../..');

function loadUpdated(): Map<string, string> {
  const map = new Map<string, string>();
  try {
    // shortcut: a shallow clone has no file history, so updated dates stay empty until that clone includes the commits
    const out = execFileSync(
      'git',
      ['log', '--format=%cI', '--name-only', '--', 'node/app/src/posts'],
      {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    let iso: string | null = null;
    for (const line of out.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
        iso = trimmed;
        continue;
      }
      const base = path.basename(trimmed);
      if (base.endsWith('.md') && iso && !map.has(base)) map.set(base, iso);
    }
  } catch {
    return map;
  }
  return map;
}

const updatedByFile = loadUpdated();

export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);
  const meta = data as { title: string; date: string };

  // Combine the data with the id
  return {
    id,
    content,
    ...meta,
    updated: updatedDay(meta.date, updatedByFile.get(`${id}.md`) ?? null),
  };
};
