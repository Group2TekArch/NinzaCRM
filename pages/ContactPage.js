
import { expect } from '@playwright/test';
//class ContactPage{
  export class ContactPage{

    constructor(page){
        this.page = page;
        this.pageTitle = page.locator("//a[normalize-space()='Contacts']");
        this.organizaton = page.locator('input[name="organizationName"]');
        this.title = page.locator('input[name="title"]');
        this.department = page.locator('input[name="department"]');
        this.officephone = page.locator('input[name="officePhone"]');
        this.contactname = page.locator('input[name ="contactName"]');
        this.mobile = page.locator('input[name="mobile"]');
        this.email = page.locator('input[name="email"]');
        this.campaignB = page.locator("//div[@class='form-group']//div//button[@type='button']");   //green+ button
        this.createContactButton = page.locator("//button[@type='submit']");   
        this.tooltipMessage=page.locator("//div[@role='alert']");
        this.searchOptionSelect=page.locator("//select[@class='form-control']");
        this.searchInput = page.getByPlaceholder("Search by Contact Name");
        this.searchTable = page.locator("//table[@class='table table-striped table-hover']/tbody/tr[1]");
        this.textErrorMessage = page.locator(".error-message");
    }

    async fillAllFields(organization, title, department, officePhone, contactName, mobile, email, campaign) {
        await this.organizaton.fill(organization);
        await this.title.fill(title);
        await this.department.fill(department);
        await this.officephone.fill(officePhone);
        await this.contactname.fill(contactName);
        await this.mobile.fill(mobile);
        await this.email.fill(email);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaignB.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaign)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent() // value of this is campaigntest 1st row 2nd coloumn
        expect(actCampaingName).toEqual(campaign);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
        // await campaignSearchPage.pause();
           
    }

    async fillmandatoryFields(organization, title, contactName, mobile,campaignName) {
        await this.organizaton.fill(organization);
        const organizatonValue = await this.organizaton.inputValue();
        expect(organizatonValue).toBe(organization);
        
       
       
        await expect(this.title).toBeVisible();
        await this.title.fill(title);
        await expect(this.title).toHaveValue(title);


        await this.contactname.fill(contactName);
        
        await expect(this.mobile).toBeVisible();
        await this.mobile.fill(mobile);
        await expect(this.mobile).toHaveValue(mobile);
       // const mobileValue = await this.mobile.inputValue();
       // expect(mobileValue).toBe(mobile);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaignB.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()  // value of this is campaigntest 1st row 2nd coloumn
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
        
    }

    async fillmandatoryFieldsExceptCampaign(organization, title, contactName, mobile,campaignName){
        await this.organizaton.fill(organization);
        const organizatonValue = await this.organizaton.inputValue();
        expect(organizatonValue).toBe(organization);

        await expect(this.title).toBeVisible();
        await this.title.fill(title);
        await expect(this.title).toHaveValue(title);        
        await this.contactname.fill(contactName);
        await expect(this.contactname).toHaveValue(contactName);
        await this.mobile.fill(mobile);
        await expect(this.mobile).toHaveValue(mobile);
        //await this.page.pause();

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

      async verifyUpdateMessage() {
        const messageText = await this.tooltipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('Contact updated contact name Modified Successfully');
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

     async verifyErrorMessage() {

     expect(await this.page.screenshot()).toMatchSnapshot('org-name-required.png');
     }

    async verifyErrorMessageText(expectedText) {
        const errorMessage = await this.textErrorMessage.textContent();
        console.log(errorMessage);
        expect(errorMessage).toBeTruthy();
        console.log(`Error message: ${errorMessage}`);
        // Check if the error message contains the expected text
        expect(errorMessage).toContain(expectedText);
    }

    async verifyErrorMesssageforCampaign(){

        expect(await this.page.screenshot()).toMatchSnapshot('campaign-name-required.png');
    }

    async isCampaignDropdownVisible() {
        await expect(this.campaignB).toBeVisible();
        const isVisible = await this.campaignB.isVisible();
        expect(isVisible).toBeTruthy();
    }

    async updateCreateContact() {
        await this.pageTitle.click();
        await this.page.locator("tbody tr:nth-child(1) td:nth-child(10) a:nth-child(1) i:nth-child(1)").click();
        await this.contactname.fill('updated contact name1');
        await this.mobile.fill('9887544210');
        await this.email.fill('updated5.email@example.com');
        await this.createContactButton.click();
        await this.verifyUpdateMessage();
    }
    }

