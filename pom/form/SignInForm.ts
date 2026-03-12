import { Locator, Page } from "@playwright/test"

class SignInForm {
    private readonly page: Page;
    public title: Locator;
    public emailField: Locator;
    public passwordField: Locator;
    public rememberMeCheckBox: Locator;
    public forgotPassword: Locator;
    public registrationButton: Locator;
    public error: Locator;
    public alert: Locator;
    public loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('.modal-title');
        this.emailField = this.page.locator('#signinEmail');
        this.passwordField = this.page.locator('#signinPassword');
        this.rememberMeCheckBox = this.page.locator('#remember');
        this.forgotPassword = this.page.getByRole('button' ,{name: 'Forgot password'});
        this.registrationButton = this.page.getByRole('button', {name: 'Registration'});
        this.error = this.page.locator('.invalid-feedback');
        this.alert = this.page.locator('.alert-danger');
        this.loginButton = this.page.getByRole('button', {name: 'Login'});
    }

    async login(email: string, password: string){
        await this.emailField.fill(email);
        await this.passwordField.fill(password);

        await this.loginButton.click();
    }

}

export default SignInForm;