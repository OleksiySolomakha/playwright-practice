import { test, expect } from '@playwright/test';

test.describe('Check how does ENV works', () => {

    test('Should not see car from stage on dev', async ({ page }) => {
        await page.goto('');
    
        await expect(page.locator('a[href="https://auto.ria.com/uk/car/bmw/5-series/"]')).toHaveText('5 Серія');
        await page.getByRole('button', { name: ' Пошук '}).click();
        await expect(page.locator('input[value="BMW"]')).toBeVisible();
    });

    test('Check correct card on dev', async({page}) => {
        await page.goto('');
    
        await page.getByRole('button', { name: ' Пошук '}).click();
        await expect(page.locator('input[value="Alfa Romeo"]')).toBeVisible();
        await expect(page.locator('input[value="159"]')).toBeVisible();
    })

})


