import { test, expect } from '@playwright/test';
const invalidPasswords = [
    "short1A",
    "alllowercase1",
    "ALLUPPERCASE1",
    "NoNumberHere",
    "TooLooooooooong1A",
    "nouppercase1",
    "NOLOWERCASE1",
    "12345678"
];
const errors = {
    "empty" : "Password required",
    "wrongData" : "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
    "reEmpty": "Re-enter password required",
    "reNotMatch": "Passwords do not match",
}
const errorColor = "rgb(220, 53, 69)";
const correctPass = "Abcdef1234";
const notMatchPass = "Abcde12345";

test.describe('Password and Re-password fields', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('shouldn\'t see an error message when filling in the password field with correct name', async ({page}) => {
        await page.locator('#signupPassword').fill('Abcdef1234');
        await page.keyboard.press('Tab');
        await expect(page.locator('#signupPassword')).toHaveValue(correctPass);
        await expect(page.locator('.invalid-feedback')).toBeHidden();
    });

    test('shouldn\'t see an error message if passwords match', async ({page}) => {
        await page.locator('#signupPassword').fill(correctPass);
        await page.locator('#signupRepeatPassword').fill(correctPass);
        await page.keyboard.press('Tab');
        await expect(page.locator('.invalid-feedback')).toBeHidden();
    });

    test('should see an error if passwords not match', async ({page}) => {

        await page.locator('#signupPassword').fill(correctPass);
        await page.locator('#signupRepeatPassword').fill(notMatchPass);
        await page.keyboard.press('Tab');
        let errorMessageLocator = page.locator('.invalid-feedback');

        await expect(errorMessageLocator).toHaveCSS('color', errorColor);
        await expect(errorMessageLocator).toHaveText(errors.reNotMatch);
    })

    invalidPasswords.forEach(pass => {
        test(`should see an error message when filling in the password field with incorrect name: ${pass}`, async ({page}) => {
            await page.locator('#signupPassword').fill(pass);
            await page.keyboard.press('Tab');
            let errorMessageLocator = page.locator('.invalid-feedback');

            if (pass === "") {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.empty);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongData);
            }
        });
    });

    invalidPasswords.forEach(pass => {
        test(`should see an error message when filling in the re-password field with incorrect name: ${pass}`, async ({page}) => {
            await page.locator('#signupRepeatPassword').fill(pass);
            await page.keyboard.press('Tab');
            let errorMessageLocator = page.locator('.invalid-feedback');

            if (pass === "") {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.reEmpty);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', errorColor);
                await expect(errorMessageLocator).toHaveText(errors.wrongData);
            }
        });
    });
})