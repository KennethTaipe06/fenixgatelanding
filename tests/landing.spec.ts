import { test, expect } from '@playwright/test';

test.describe('FenixGate Landing Page', () => {

  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/FenixGate/);
  });

  test('has all major sections', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#servicios')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#proceso')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#portafolio')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#contacto')).toBeVisible({ timeout: 5000 });
  });

  test('navbar exists and shows links', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('.navbar');
    await expect(nav).toBeVisible();
    const links = nav.locator('a');
    await expect(links.filter({ hasText: 'Servicios' })).toBeVisible();
    await expect(links.filter({ hasText: 'Contacto' })).toBeVisible();
  });

  test('skip-to-content link is present', async ({ page }) => {
    await page.goto('/');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeVisible();
    await expect(skip).toHaveAttribute('href', '#main-content');
  });

  test('hero headline renders', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero-headline')).toBeVisible();
    await expect(page.locator('.hero-headline .ln1')).toContainText('SOFTWARE');
    await expect(page.locator('.hero-headline .ln2')).toContainText('ESCALABLE');
  });

  test('stats section has counters', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.stats-inline')).toBeVisible({ timeout: 5000 });
    // Scroll into view to trigger counter animation
    await page.locator('.stats-inline').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
    const counterText = await page.locator('.stats-inline .counter').first().textContent();
    expect(counterText).toBeTruthy();
  });

  test('service cards are rendered with varied layouts', async ({ page }) => {
    await page.goto('/');
    await page.locator('#servicios').scrollIntoViewIfNeeded();
    const cards = page.locator('.srv-card');
    await expect(cards).toHaveCount(6);
    // Check featured card exists
    await expect(page.locator('.srv-featured')).toBeVisible();
  });

  test('footer renders correctly', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('.footer-logo')).toBeVisible();
  });
});
