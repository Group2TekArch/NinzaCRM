class UserLandingPage{
    constructor(page){
        this.page = page;
        this.adminConsoleLink = page.locator("//li[text()='Admin Console']");
        this.createUserLink=page.locator("//div[text()='Create User']");
        this.Products=page.locator("//a[text()='Products']");
        this.addProductsButton=page.locator("//span[text()='Add Product']");
        this.campaignsModule = page.locator("//a[text()='Campaigns']");
        this.contacts=page.locator("//a[text()='Contacts']");
        this.createContactLink = page.locator("//span[text()='Create Contact']");   
        this.LeadsTab= page.locator("//a[text()='Leads']");
        this.createLeadButton = page.locator("//span[text()='Create Lead']");
        this.opportunityModule = page.locator("//a[text()='Opportunities']");
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

    async clickCampaignsModule(){

        await this.campaignsModule.click();
        await this.page.waitForLoadState('networkidle');


    }

      async clickCreateLeadLink(){
        await this.LeadsTab.click();
        await this.createLeadButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickCreateContactLink() {
        await this.contacts.click();
        await this.createContactLink.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickOpportunityModule(){

        await this.opportunityModule.click();
        await this.page.waitForLoadState('networkidle');


    }
}

module.exports = {UserLandingPage};