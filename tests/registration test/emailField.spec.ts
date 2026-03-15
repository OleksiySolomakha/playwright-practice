import { test, expect } from '@playwright/test';
import HomePage from '../../pom/pages/homePage';
import SignUpForm from '../../pom/form/SignUpForm';
import { REGISTRATION_VALID_USER_DATA } from '../../test-data/users';
import { ERROR_COLOR, ERROR_EMAIL } from '../../test-data/errors';
import { INVALID_EMAILS } from '../../test-data/invaidValues';

test.describe('Email field', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signUpButton.click();
    });

    test('shouldn\'t see an error message when filling in the email field with correct value', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.emailField.fill(REGISTRATION_VALID_USER_DATA.email);
        await page.keyboard.press('Tab');
        await expect(signUpForm.emailField).toHaveValue(REGISTRATION_VALID_USER_DATA.email);
        await expect(signUpForm.error).toBeHidden();
    });

    INVALID_EMAILS.forEach(email => {
        test(`should see an error message when filling in the email field with incorrect name: ${email}`, async ({page}) => {
            signUpForm = new SignUpForm(page);

            await signUpForm.emailField.fill(email);
            await page.keyboard.press('Tab');
            let errorMessageLocator = signUpForm.error;

            if (email === "") {
                await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
                await expect(errorMessageLocator).toHaveText(ERROR_EMAIL.empty);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
                await expect(errorMessageLocator).toHaveText(ERROR_EMAIL.wrongData);
            }
        });
    });
})