class UserLandingPage{
    constructor(page){
        this.page = page;
        this.adminConsoleLink = page.locator("//li[text()='Admin Console']");
        this.createUserLink=page.locator("//div[text()='Create User']");
        this.Products=page.locator("//a[text()='Products']");
        this.addProductsButton=page.locator("//span[text()='Add Product']");
        this.createContactLink = page.locator("//span[text()='Create Contact']");   
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

    async clickAddProductsButton(){
        await this.Products.click();
        await this.addProductsButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async clickCreateContactLink() {
        await this.createContactLink.click();
        await this.page.waitForLoadState('networkidle');
    }
   /* async isContactsVisible() {
        return await this.createContactLink.isVisible();
    }  */ 
}

module.exports = {UserLandingPage};