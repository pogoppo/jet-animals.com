import { parseMarkdownFile } from '$lib/utils/markdown';
import { join } from 'path';

export const load = async () => {
  // Markdownファイルをパース
  const articlePath = join(process.cwd(), 'src/lib/data/articles/2026-01-01.md');
  const article = parseMarkdownFile(articlePath);

  return {
    article: {
      metadata: article.metadata,
      html: article.html
    }
  };
};
