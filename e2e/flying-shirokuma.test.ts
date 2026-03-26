import { expect, test } from '@playwright/test';

test('flying-shirokuma page has expected h1', async ({ page }) => {
  await page.goto('/flying-shirokuma');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Flying Shirokuma');
});

test('flying-shirokuma page has article content', async ({ page }) => {
  await page.goto('/flying-shirokuma');
  await expect(page.locator('article')).toBeVisible();
  await expect(page.locator('.article-content')).toContainText('On the Fly');
});

test('scrollState transitions with scroll position', async ({ page }) => {
  await page.goto('/flying-shirokuma');

  const article = page.locator('article.article');

  // 初期状態は ready
  await expect(article).toHaveAttribute('data-state', 'ready');

  // 2枚目のスナップポイント (スクロール量 25%〜75% の範囲) → step1
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight, behavior: 'instant' }));
  await expect(article).toHaveAttribute('data-state', 'step1');

  // 3枚目のスナップポイント (スクロール量 75% 超) → step2
  await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'instant' }));
  await expect(article).toHaveAttribute('data-state', 'step2');
});
