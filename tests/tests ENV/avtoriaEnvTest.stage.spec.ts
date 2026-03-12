import { test, expect } from '@playwright/test';

test('Check my car STAGE', async ({ page }) => {
    await page.goto('');

    await expect(page.locator('a[href="https://auto.ria.com/uk/car/bmw/5-series/"]')).toHaveText('5 Серія');
    await page.getByRole('button', { name: ' Пошук '}).click();
    await expect(page.locator('input[value="BMW"]')).toBeVisible();
});
