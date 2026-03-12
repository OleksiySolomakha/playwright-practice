import { test, expect } from '@playwright/test';
let prefix = Date.now();
const validUserData = {
  email: `user${prefix}@example.com`,
  password: "Valid123",
  firstName: "John",
  lastName: "Doe"
};
const invalidUserData = {
    email: "invalid-email",
    password: "short",
    firstName: "J",
    lastName: "Доу"
};

test.describe('Registration form', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('should create user with correct data', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(validUserData.firstName);
        await page.locator('#signupLastName').fill(validUserData.lastName);
        await page.locator('#signupEmail').fill(validUserData.email);
        await page.locator('#signupPassword').fill(validUserData.password);
        await page.locator('#signupRepeatPassword').fill(validUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeEnabled();
        await page.getByRole('button', {name: 'Register'}).click();
        await expect(page.getByRole('heading', { name: 'Garage', level: 1 })).toBeVisible();
        await page.getByRole('button', {name: 'My profile'}).click();
        await page.getByRole('button', {name: 'Logout'}).click();
        await expect(page.getByRole('heading', { name: 'Do more!', level: 1 })).toBeVisible();
    })

    test('register button should be disabled if we have incorrect name', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(invalidUserData.firstName);
        await page.locator('#signupLastName').fill(validUserData.lastName);
        await page.locator('#signupEmail').fill(validUserData.email);
        await page.locator('#signupPassword').fill(validUserData.password);
        await page.locator('#signupRepeatPassword').fill(validUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect last name', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(validUserData.firstName);
        await page.locator('#signupLastName').fill(invalidUserData.lastName);
        await page.locator('#signupEmail').fill(validUserData.email);
        await page.locator('#signupPassword').fill(validUserData.password);
        await page.locator('#signupRepeatPassword').fill(validUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect email', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(validUserData.firstName);
        await page.locator('#signupLastName').fill(validUserData.lastName);
        await page.locator('#signupEmail').fill(invalidUserData.email);
        await page.locator('#signupPassword').fill(validUserData.password);
        await page.locator('#signupRepeatPassword').fill(validUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect password', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(validUserData.firstName);
        await page.locator('#signupLastName').fill(validUserData.lastName);
        await page.locator('#signupEmail').fill(validUserData.email);
        await page.locator('#signupPassword').fill(invalidUserData.password);
        await page.locator('#signupRepeatPassword').fill(validUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    })

    test('register button should be disabled if we have incorrect re-password', async({page}) => {
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
        await page.locator('#signupName').fill(validUserData.firstName);
        await page.locator('#signupLastName').fill(validUserData.lastName);
        await page.locator('#signupEmail').fill(validUserData.email);
        await page.locator('#signupPassword').fill(validUserData.password);
        await page.locator('#signupRepeatPassword').fill(invalidUserData.password);
        await expect(page.getByRole('button', {name: 'Register'})).toBeDisabled();
    })
})