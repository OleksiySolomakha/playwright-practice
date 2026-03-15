import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/homePage';
import SignUpForm from '../pom/form/SignUpForm';
import GaragePage from '../pom/pages/GaragePage';
import { REGISTRATION_VALID_USER_DATA } from '../test-data/users';

test.describe('Registration', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);

        await page.goto('/');
        await homePage.signUpButton.click();
    })

    test.describe('Sign up', () => {
        test('Create new user', async({page}) => {
            homePage = new HomePage(page);
            signUpForm = new SignUpForm(page);
            garagePage = new GaragePage(page);
    
            await signUpForm.registration(
                REGISTRATION_VALID_USER_DATA.firstName,
                REGISTRATION_VALID_USER_DATA.lastName,
                REGISTRATION_VALID_USER_DATA.email,
                REGISTRATION_VALID_USER_DATA.password);
    
            await expect(garagePage.title).toHaveText('Garage');
    
            await garagePage.logout.click();
            await expect(homePage.signInButton).toHaveText('Sign In');
            await expect(homePage.title).toBeVisible();
        })
    })
})
