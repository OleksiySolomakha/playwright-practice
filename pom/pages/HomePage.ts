import { Locator, Page } from "@playwright/test"

class HomePage {
    private readonly page: Page;
    public title: Locator;
    public myProfile: Locator;
    public signInButton: Locator;
    public signUpButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.getByRole('heading', { name: 'Do more!', level: 1 });
        this.signInButton = this.page.locator('.header_signin');
        this.signUpButton = this.page.getByRole('button', { name: 'Sign up' });
    }
}

export default HomePage;