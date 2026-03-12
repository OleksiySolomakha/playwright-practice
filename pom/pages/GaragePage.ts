import { Locator, Page } from "@playwright/test"

class GaragePage {
    private readonly page: Page;
    public title: Locator;
    public logout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h1');
        this.logout = this.page.locator('.icon-logout');
        
    }
}

export default GaragePage;