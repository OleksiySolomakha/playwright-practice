import { test, expect } from '@playwright/test';
import { ERRORS_PASSWORD, ERROR_COLOR } from '../../test-data/errors';
import { INVALID_PASSWORD } from '../../test-data/invaidValues';
import { REGISTRATION_VALID_USER_DATA } from '../../test-data/users';
import HomePage from '../../pom/pages/homePage';
import SignUpForm from '../../pom/form/SignUpForm';

const notMatchPassword = 'Abcde12345';

test.describe('Password and Re-password fields', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signUpButton.click();
    });

    test('shouldn\'t see an error message when filling in the password field with correct name', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await page.keyboard.press('Tab');
        await expect(signUpForm.passwordField).toHaveValue(REGISTRATION_VALID_USER_DATA.password);
        await expect(signUpForm.error).toBeHidden();
    });

    test('shouldn\'t see an error message if passwords match', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await page.keyboard.press('Tab');
        await expect(signUpForm.error).toBeHidden();
    });

    test('should see an error if passwords not match', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(notMatchPassword);
        await page.keyboard.press('Tab');
        let errorMessageLocator = signUpForm.error;

        await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
        await expect(errorMessageLocator).toHaveText(ERRORS_PASSWORD.reNotMatch);
    });

    test('should see an error message when filling in the password field with empty name', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.passwordField.focus();
        await page.keyboard.press('Tab');
        let errorMessageLocator = signUpForm.error;

        await expect(errorMessageLocator).toBeVisible();
        await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
        await expect(errorMessageLocator).toHaveText(ERRORS_PASSWORD.empty);
    });

    INVALID_PASSWORD.forEach(pass => {
        test(`should see an error message when filling in the password field with incorrect name: ${pass}`, async ({page}) => {
            signUpForm = new SignUpForm(page);

            await signUpForm.passwordField.fill(pass);
            await page.keyboard.press('Tab');
            let errorMessageLocator = signUpForm.error;

            await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
            await expect(errorMessageLocator).toHaveText(ERRORS_PASSWORD.wrongData);
        });
    });

    test('should see an error message when filling in the re-password field with empty name', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.rePasswordField.focus();
        await page.keyboard.press('Tab');
        let errorMessageLocator = signUpForm.error;

        await expect(errorMessageLocator).toBeVisible();
        await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
        await expect(errorMessageLocator).toHaveText(ERRORS_PASSWORD.reEmpty);
    });

    INVALID_PASSWORD.forEach(pass => {
        test(`should see an error message when filling in the re-password field with incorrect name: ${pass}`, async ({page}) => {
            signUpForm = new SignUpForm(page);

            await signUpForm.rePasswordField.fill(pass);
            await page.keyboard.press('Tab');
            let errorMessageLocator = signUpForm.error;

            await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
            await expect(errorMessageLocator).toHaveText(ERRORS_PASSWORD.wrongData);
        });
    });
});
