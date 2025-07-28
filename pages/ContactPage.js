
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
        this.updateContactBtn = page.locator("//button[text()='Update Contact']");
    }

    async fillAllFields(organization, title, department, officePhone, contactName, mobile, email, campaign) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        await this.email.fill(email);
        await this.selectCampaign(campaign);
    }

    async fillmandatoryFields(organization, title, contactName, mobile,campaignName) {
        await this.organizaton.fill(organization);
        const organizatonValue = await this.organizaton.inputValue();
        expect(organizatonValue).toBe(organization);
        await this.title.fill(title);
        const titleValue = await this.title.inputValue();
        expect(titleValue).toBe(title);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        const mobileValue = await this.mobile.inputValue();
        expect(mobileValue).toBe(mobile);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
        // await campaignSearchPage.pause();
    }

    async selectCampaign(campaignName){
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }
    
    async fillnonMandatoryFields(department, officePhone, email) {
        await this.department.fill(department);
        const departmentValue = await this.department.inputValue();
        expect(departmentValue).toBe(department);
        await this.officephone.fill(officePhone);
        const officephoneValue = await this.officephone.inputValue();
        expect(officephoneValue).toBe(officePhone);
        await this.email.fill(email);
        const emailValue = await this.email.inputValue();
        expect(emailValue).toBe(email);
    }
    
    async clickAddButton() {
        await this.createContactButton.click();        
    }

    async verifyMessage(){
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('Successfully Added');
      }

      async verifyUpdateMessage(){
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('Modified Successfully');
      }

      async searchContact(contactname,mobile){
        await this.searchOptionSelect.selectOption("contactName");
        await this.searchInput.fill(contactname.trim());
        const rcount = await this.searchTable.count();
        expect(rcount).toBe(1);
        const pname = await this.searchTable.locator('td:nth-child(2)').textContent();
        expect(pname.trim()).toEqual(contactname);
        const mobileno = await this.searchTable.locator('td:nth-child(7)').textContent();
        expect(mobileno.trim()).toEqual(mobile);

     }

     async updateContact(){
        await this.searchTable.locator('td:nth-child(10) > a:nth-child(1)').click();
     }

     async clickUpdateContactButton(){
        await this.updateContactBtn.click();
     }

     async updateFields({
        organization,
        title,
        department,
        officePhone,
        contactName,
        mobile,
        email,
        campaign,
      } = {}) {
        if (organization) await this.organizaton.fill(organization);
        if (title) await this.title.fill(title);
        if (department) await this.department.fill(department);
        if (officePhone) await this.officephone.fill(officePhone);
        if (contactName) await this.contactname.fill(contactName);
        if (mobile) await this.mobile.fill(mobile);
        if (email) await this.email.fill(email);
        if (campaign) await this.selectCampaign(campaign);
      }

}


module .exports = { ContactPage };
