import { Locator, Page } from "@playwright/test"

class SignUpForm {
    private readonly page: Page;
    public title: Locator;
    public firstNameField: Locator;
    public lastNameField: Locator;
    public emailField: Locator;
    public rePasswordField: Locator;
    public passwordField: Locator;
    public error: Locator;
    public alert: Locator;
    public registerButton: Locator;
    public field: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h4 .modal-title');
        this.firstNameField = this.page.locator('#signupName');
        this.lastNameField = this.page.locator('#signupLastName');
        this.emailField = this.page.locator('#signupEmail');
        this.passwordField = this.page.locator('#signupPassword');        
        this.rePasswordField = this.page.locator('#signupRepeatPassword');
        this.error = this.page.locator('.invalid-feedback');
        this.alert = this.page.locator('.alert-danger');
        this.registerButton = this.page.getByRole('button', {name: 'Register'});
    }

    async registration(firstName: string, lastName: string, email: string, password: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.rePasswordField.fill(password);
        await this.registerButton.click();
    }

}

export default SignUpForm;