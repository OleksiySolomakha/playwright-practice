import { test, expect } from '@playwright/test';
import HomePage from '../../pom/pages/homePage';
import SignUpForm from '../../pom/form/SignUpForm';
import GaragePage from '../../pom/pages/GaragePage';
import { REGISTRATION_VALID_USER_DATA, REGISTRATION_INVALID_USER_DATA } from '../../test-data/users';

test.describe('Registration form', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signUpButton.click();
    });

    test('register button should be disabled if we have incorrect name', async({page}) => {
        signUpForm = new SignUpForm(page);

        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.firstNameField.fill(REGISTRATION_INVALID_USER_DATA.firstName);
        await signUpForm.lastNameField.fill(REGISTRATION_VALID_USER_DATA.lastName);
        await signUpForm.emailField.fill(REGISTRATION_VALID_USER_DATA.email);
        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect last name', async({page}) => {
        signUpForm = new SignUpForm(page);

        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.firstNameField.fill(REGISTRATION_VALID_USER_DATA.firstName);
        await signUpForm.lastNameField.fill(REGISTRATION_INVALID_USER_DATA.lastName);
        await signUpForm.emailField.fill(REGISTRATION_VALID_USER_DATA.email);
        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect email', async({page}) => {
        signUpForm = new SignUpForm(page);

        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.firstNameField.fill(REGISTRATION_VALID_USER_DATA.firstName);
        await signUpForm.lastNameField.fill(REGISTRATION_VALID_USER_DATA.lastName);
        await signUpForm.emailField.fill(REGISTRATION_INVALID_USER_DATA.email);
        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect password', async({page}) => {
        signUpForm = new SignUpForm(page);

        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.firstNameField.fill(REGISTRATION_VALID_USER_DATA.firstName);
        await signUpForm.lastNameField.fill(REGISTRATION_VALID_USER_DATA.lastName);
        await signUpForm.emailField.fill(REGISTRATION_VALID_USER_DATA.email);
        await signUpForm.passwordField.fill(REGISTRATION_INVALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await expect(signUpForm.registerButton).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect re-password', async({page}) => {
        signUpForm = new SignUpForm(page);

        await expect(signUpForm.registerButton).toBeDisabled();
        await signUpForm.firstNameField.fill(REGISTRATION_VALID_USER_DATA.firstName);
        await signUpForm.lastNameField.fill(REGISTRATION_VALID_USER_DATA.lastName);
        await signUpForm.emailField.fill(REGISTRATION_VALID_USER_DATA.email);
        await signUpForm.passwordField.fill(REGISTRATION_VALID_USER_DATA.password);
        await signUpForm.rePasswordField.fill(REGISTRATION_INVALID_USER_DATA.password);
        await expect(signUpForm.registerButton).toBeDisabled();
    })
})