import { parseMarkdown } from '$lib/utils/markdown';
import articleContent from '$lib/data/articles/flying-shirokuma.md?raw';

export const load = async () => {
  const article = parseMarkdown(articleContent);

  return {
    article: {
      metadata: article.metadata,
      html: article.html
    }
  };
};
