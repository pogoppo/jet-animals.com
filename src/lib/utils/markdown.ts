import { marked } from 'marked';
import matter from 'gray-matter';
import { readFileSync } from 'fs';

export interface MarkdownMetadata {
  title: string;
  date: string;
  [key: string]: unknown;
}

export interface ParsedMarkdown {
  metadata: MarkdownMetadata;
  html: string;
}

export function parseMarkdown(content: string): ParsedMarkdown {
  const { data, content: markdown } = matter(content);
  const html = marked.parse(markdown) as string;

  return {
    metadata: data as MarkdownMetadata,
    html
  };
}

export function parseMarkdownFile(filepath: string): ParsedMarkdown {
  const content = readFileSync(filepath, 'utf-8');
  return parseMarkdown(content);
}
