import {test, expect} from '@playwright/test';
import HomePage from '../pom/pages/homePage';
import SignInForm from '../pom/form/signInForm';
import GaragePage from '../pom/pages/GaragePage';
import { VALID_USER1 } from '../test-data/users';

let errorColor = 'rgb(220, 53, 69)';
let alertColor = 'rgb(114, 28, 36)';
let incorrectPassword = 'some123';
let incorrectEmail = 'some@@@example.com';

test.describe('Sign In form', () => {
    let homePage: HomePage;
    let garagePage: GaragePage;
    let signInForm: SignInForm;

    test.beforeEach(async({ page }) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signInButton.click();
    })

    test.describe('Sing Up proces', () => {
        test('Successful sign in', async({page}) => {
            signInForm = new SignInForm(page);
            garagePage = new GaragePage(page);
            garagePage = new GaragePage(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.login(VALID_USER1.email, VALID_USER1.password);

            await expect(garagePage.title).toHaveText('Garage');

            await garagePage.logout.click();
            await expect(homePage.signInButton).toHaveText('Sign In');
        })

        test('Get error for sing in with empty email', async({ page }) => {
            signInForm = new SignInForm(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.emailField.fill('');
            await signInForm.passwordField.fill(VALID_USER1.password);
            await expect(signInForm.emailField).toHaveCSS('border-color', errorColor);
            await expect(signInForm.error).toBeVisible();
            await expect(signInForm.error).toHaveCSS('color', errorColor);
        })

        test('Get error for sing in with empty password', async({ page }) => {
            signInForm = new SignInForm(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.passwordField.fill('');
            await signInForm.emailField.fill(VALID_USER1.email);
            await expect(signInForm.passwordField).toHaveCSS('border-color', errorColor);
            await expect(signInForm.error).toBeVisible();
            await expect(signInForm.error).toHaveCSS('color', errorColor);
        })

        test('Get error for sing in with wrong email', async({ page }) => {
            signInForm = new SignInForm(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.emailField.fill(incorrectEmail);
            await signInForm.passwordField.fill(VALID_USER1.password);
            await expect(signInForm.emailField).toHaveCSS('border-color', errorColor);
            await expect(signInForm.error).toBeVisible();
            await expect(signInForm.error).toHaveCSS('color', errorColor);
        })

        test('Get error for sing in with wrong password', async({ page }) => {
            signInForm = new SignInForm(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.passwordField.fill(incorrectPassword);
            await signInForm.emailField.fill(VALID_USER1.email);
            await expect(signInForm.passwordField).toHaveCSS('border-color', errorColor);
            await expect(signInForm.error).toBeVisible();
            await expect(signInForm.error).toHaveCSS('color', errorColor);
        })

        test('Get error message about wrong email or wrong password', async({ page }) => {
            signInForm = new SignInForm(page);

            await expect(signInForm.title).toHaveText('Log in');
            await signInForm.passwordField.fill(incorrectPassword);
            await signInForm.emailField.fill(VALID_USER1.email);
            await signInForm.loginButton.click();
            await expect(signInForm.alert).toBeVisible();
            await expect(signInForm.alert).toHaveCSS('color', alertColor);
        })

    })
})