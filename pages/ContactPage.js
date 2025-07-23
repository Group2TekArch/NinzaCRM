
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
        this.tooltipMessage=page.locator("//div[@role='alert']");
        this.searchOptionSelect=page.locator("//select[@class='form-control']");
        this.searchInput = page.getByPlaceholder("Search by Contact Name");
        this.searchTable = page.locator("//table[@class='table table-striped table-hover']/tbody/tr[1]");
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

    async fillmandatoryFields(organization, title, department, officePhone, contactName, mobile, email,campaignName) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();;
        // await campaignSearchPage.pause();
    }
    
    async fillnonMandatoryFields(department, officePhone, email) {
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.email.fill(email);
    }
    
    async clickAddButton() {
        await this.createContactButton.click();        
    }

    async verifyMessage(){
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('Successfully Added');
      }

      async searchContact(contactname,mobile){
        await this.searchOptionSelect.selectOption("contactName");
        await this.searchInput.fill(contactname);
        // const rcount = await this.searchTable.count();
        // expect(rcount).toBe(1);
        const pname = await this.searchTable.locator('td:nth-child(2)').textContent();
        expect(pname.trim()).toEqual(prodname);
        const mobileno = await this.searchTable.locator('td:nth-child(7)').textContent();
        expect(mobileno.trim()).toEqual(mobile);

     }
}
module .exports = { ContactPage };
