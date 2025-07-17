class UserLandingPage{
    constructor(page){
        this.page = page;
        this.adminConsoleLink = page.locator("//li[text()='Admin Console']");
        this.createUserLink=page.locator("//div[text()='Create User']")
    }

    

    async isAdminConsoleVisible() {
        return await this.adminConsoleLink.isVisible();
      }

    async clickCreateUserLink(){
        await this.adminConsoleLink.click();
        //await this.page.waitForTimeout(1000);
        await this.createUserLink.click({ force: true });
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {UserLandingPage};