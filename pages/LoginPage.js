class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('#username');  
      this.passwordInput = page.locator('#inputPassword');
      this.loginButton = page.locator("//button[text()='Sign In']");
    }
  
    async goto() {
      await this.page.goto('/'); // Uses baseURL from config
    }
  
    async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
  
  module.exports = { LoginPage };

