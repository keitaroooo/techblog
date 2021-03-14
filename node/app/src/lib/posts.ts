import fs from 'fs';
import path from 'path';
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
};

export const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    content,
    ...(data as { title: string; date: string }),
  };
};
