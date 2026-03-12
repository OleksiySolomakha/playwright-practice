import { test, expect } from '@playwright/test';
const invalidEmails = [
    "",
    " ",
    "plainaddress",
    "@domain.com",
    "user@.com",
    "user@domain",
    "user@domain..com",
    "user@@domain.com"
];
const errors = {
    "empty" : "Email required",
    "wrongData" : "Email is incorrect"
}
const errorColor = "rgb(220, 53, 69)";

test.describe('Email field', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('shouldn\'t see an error message when filling in the email field with correct name', async ({page}) => {
        await page.locator('#signupEmail').fill('some@gmail.com');
        await page.keyboard.press('Tab');
        await expect(page.locator('#signupEmail')).toHaveValue('some@gmail.com');
        await expect(page.locator('.invalid-feedback')).toBeHidden();
    });

    invalidEmails.forEach(email => {
        test(`should see an error message when filling in the email field with incorrect name: ${email}`, async ({page}) => {
            await page.locator('#signupEmail').fill(email);
            await page.keyboard.press('Tab');
            let errorMessageLocator = page.locator('.invalid-feedback');

            if (email === "") {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.empty);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongData);
            }
        });
    });
})