import { test, expect } from '@playwright/test';
import { ERRORS_NAME, ERROR_COLOR } from '../../test-data/errors';
import { INVALID_NAMES } from '../../test-data/invaidValues';
import { REGISTRATION_VALID_USER_DATA } from '../../test-data/users';
import HomePage from '../../pom/pages/homePage';
import SignUpForm from '../../pom/form/SignUpForm';

test.describe('Name field', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signUpButton.click();
    });

    test('shouldn\'t see an error message when filling in the name field with correct name', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.firstNameField.fill(REGISTRATION_VALID_USER_DATA.firstName);
        await page.keyboard.press('Tab');
        await expect(signUpForm.firstNameField).toHaveValue(REGISTRATION_VALID_USER_DATA.firstName);
        await expect(signUpForm.error).toBeHidden();
    });

    test('should see an error message when filling in the name field with empty name', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.firstNameField.focus();
        await page.keyboard.press('Tab');
        let errorMessageLocator = signUpForm.error;

        await expect(errorMessageLocator).toBeVisible();
        await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
        await expect(errorMessageLocator).toHaveText(ERRORS_NAME.empty);
    });

    INVALID_NAMES.forEach(name => {
        test(`should see an error message when filling in the name field with incorrect name: ${name}`, async ({page}) => {
            signUpForm = new SignUpForm(page);

            await signUpForm.firstNameField.fill(name);
            await page.keyboard.press('Tab');
            let errorMessageLocator = signUpForm.error;

            if (name.length < 2) {
                await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
                await expect(errorMessageLocator).toHaveText(ERRORS_NAME.wrongLength);
            } else if (name.length > 20) {
                await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
                await expect(errorMessageLocator).toHaveText(ERRORS_NAME.wrongLength);
            } else {
                await expect(errorMessageLocator).toHaveCSS('color', ERROR_COLOR);
                await expect(errorMessageLocator).toHaveText(ERRORS_NAME.wrongData);
            }
        });
    });

    test('should see an erros if we fill name with space', async ({page}) => {
        signUpForm = new SignUpForm(page);

        await signUpForm.firstNameField.fill(' ');
        await page.keyboard.press('Tab');
        await expect(signUpForm.error).toHaveCSS('color', ERROR_COLOR);
        await expect(signUpForm.error).toHaveText(ERRORS_NAME.wrongData + ERRORS_NAME.wrongLength);
    });
})
