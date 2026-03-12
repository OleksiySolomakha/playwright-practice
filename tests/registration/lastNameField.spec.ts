import { test, expect } from '@playwright/test';
const invalidNames = [
    "A",
    "ThisLastNameIsWayTooLongForValidation",
    "Олег",
    "John123",
    "Anna!",
    "@Mike",
    "Änna",
    "Jo hn"
];
const errors = {
    "empty" : "Last name is required",
    "wrongData" : "Last name is invalid",
    "wrongLength" : "Last name has to be from 2 to 20 characters long"
}
const errorColor = "rgb(220, 53, 69)";

test.describe('Last name field', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('shouldn\'t see an error message when filling in the last name field with correct name', async ({page}) => {
        await page.locator('#signupLastName').fill('John');
        await page.keyboard.press('Tab');
        await expect(page.locator('#signupLastName')).toHaveValue('John');
        await expect(page.locator('.invalid-feedback')).toBeHidden();
    });

    test('should see an error message when filling in the last name field with empty name', async ({page}) => {
        await page.locator('#signupLastName').focus();
        await page.keyboard.press('Tab');
        let errorMessageLocator = page.locator('.invalid-feedback');

        await expect(errorMessageLocator).toBeVisible();
        await expect(errorMessageLocator).toHaveCSS('color', errorColor);
        await expect(errorMessageLocator).toHaveText(errors.empty);
    });

    invalidNames.forEach(name => {
        test(`should see an error message when filling in the last name field with incorrect name: ${name}`, async ({page}) => {
            await page.locator('#signupLastName').fill(name);
            await page.keyboard.press('Tab');
            let errorMessageLocator = page.locator('.invalid-feedback');

            if (name.length < 2) {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongLength);
            } else if (name.length > 20) {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongLength);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongData);
            }
        });
    });

    test('should see an erros if we fill last name with space', async ({page}) => {
        await page.locator('#signupLastName').fill(' ');
        await page.keyboard.press('Tab');
        await expect(page.locator('.invalid-feedback')).toHaveCSS('color', errorColor);
        await expect(page.locator('.invalid-feedback')).toHaveText(errors.wrongData + errors.wrongLength);
    });
})