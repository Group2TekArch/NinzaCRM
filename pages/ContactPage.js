const { expect } = require('@playwright/test');
class ContactPage{

    constructor(page){
        this.page = page;
        this.organizaton = page.locator('input[name="organizationName"]');
        this.title = page.locator('input[name="title"]');
        this.department = page.locator('input[name="department"]');
        this.officephone = page.locator('input[name="officePhone"]');
        this.contactname = page.locator('input[name ="contactName"]');
        this.mobile = page.locator('input[name="mobile"]');
        this.email = page.locator('input[name="email"]');
        this.campaign = page.locator("//div[@class='form-group']//div//button[@type='button']");
        this.createContactButton = page.locator("//button[@type='submit']");    
    }

    async fillAllFields(organization, title, department, officePhone, contactName, mobile, email, campaign) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        await this.email.fill(email);
        await this.campaign.fill(campaign);
    }

    async fillmandatoryFields(organization, title, department, officePhone, contactName, mobile, email) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        await this.campaign.click();
        const campaignOption = this.page.locator("//tbody/tr[2]/td[7]/button[1]");
        await campaignOption.click();
    }
    
    async fillnonMandatoryFields(department, officePhone, email) {
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.email.fill(email);
    }
    
    async clickAddButton() {
        await this.createContactButton.click();
    }
}
module .exports = { ContactPage };