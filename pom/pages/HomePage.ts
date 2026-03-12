import { Locator, Page } from "@playwright/test"

class HomePage {
    private readonly page: Page;
    public signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = this.page.locator('.header_signin');
    }
}

export default HomePage;