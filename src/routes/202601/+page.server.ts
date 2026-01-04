import { parseMarkdown } from '$lib/utils/markdown';
import articleContent from '$lib/data/articles/2026-01-01.md?raw';

export const load = async () => {
  // Markdownファイルをパース
  const article = parseMarkdown(articleContent);

  return {
    article: {
      metadata: article.metadata,
      html: article.html
    }
  };
};
