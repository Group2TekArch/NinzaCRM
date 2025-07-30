const {expect, chromium} = require('@playwright/test');
const { threadId } = require('worker_threads');

class LeadPage{

    constructor(page){
        this.page = page;
        this.createLeadPage = page.locator("//h3");
        this.leadName = page.locator("input[name='name']");
        this.company = page.locator("input[name='company']");
        this.leadSource = page.locator("input[name='leadSource']");
        this.industry = page.locator("input[name='industry']");
        this.annualRevenue = page.locator("input[value='0'][name='annualRevenue']");
        this.numberOfEmployees = page.locator("//input[@name='noOfEmployees']");
        this.phone = page.locator("input[name='phone']");
        this.email = page.locator("input[name='email']");
        this.secondaryEmail = page.locator("input[name='secondaryEmail']");
        this.leadStatus = page.locator("input[name='leadStatus']");
        this.rating = page.locator("//input[@name='rating']");
        this.assignedTo = page.locator("input[name='assignedTo']");
        this.address = page.locator("textarea[name='address']");
        this.city = page.locator("input[name='city']");
        this.country = page.locator("input[name='country']");
        this.postalCode = page.locator("input[name='postalCode']");
        this.website = page.locator("input[name='website']");

       // this.campaignModal = page.locator("#search-criteria");
        this.campaign = page.locator("//div[@class='form-group']//div//button[@type='button']");
        this.description = page.locator("textarea[name='description']");
        this.createLeadButton = page.locator("button[type='submit']");
        this.toolTipMessage = page.locator("//div[@role='alert']");
        this.toolTipMessage = page.locator('.tooltip-inner');

        this.emailFormatMessage = page.locator("//div[@class='form-container']//div[1]//div[9]//div[1]");
        this.leadsTableFirstRowPhone= page.locator("//tbody/tr[1]/td[7]");
        this.leadsPageSearchDropDown = page.locator("select[class='form-control']");
        this.leadspageSearchTextBox = page.locator("input[placeholder='Search by Lead Name']");
           
    }

    async fillAllFields(lname,lcompany,lsource,indus,annualrev,noOfemp,ph,priemail,secemail,lstatus,lrating,assignto,add,lcity,lcountry,lpostalcode,web,lcampaign,des){
    
        
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(lsource);

        this.campaign = page.locator("div[class='form-group'] div button[type='button']");
        this.description = page.locator("textarea[name='description']");
        this.createLeadButton = page.locator("button[type='submit']");
        this.toolTipMessage = page.locator("//div[@role='alert']");
        this.emailFormatMessage = page.locator("//div[@class='form-container']//div[1]//div[9]//div[1]");
        this.leadsTableFirstRowPhone= page.locator("//tbody/tr[1]/td[7]");
        this.leadsPageSearchDropDown = page.locator("select[class='form-control']");
        this.leadspageSearchTextBox = page.locator("input[placeholder='Search by Lead Name']");
           
    }

    async fillAllFields(lname,lcompany,source,indus,annualrev,noOfemp,ph,priemail,secemail,status,lrating,assignto,add,lcity,lcountry,lpostalcode,web,des){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.annualRevenue.fill(annualrev);
        await this.numberOfEmployees.fill(noOfemp);
        await this.phone.fill(ph);
        await this.email.fill(priemail);
        await this.secondaryEmail.fill(secemail);
        await this.leadStatus.fill(lstatus);
        await this.rating.fill(lrating);
        await this.assignedTo.fill(assignto);
        await this.address.fill(add);
        await this.city.fill(lcity);
        await this.country.fill(lcountry);
        await this.postalCode.fill(lpostalcode);
        await this.website.fill(web);


        const campaignPopup = this.page.locator(`popup`);
        await this.campaign.click();
        const popup = await campaignPopup;

        await popup.locator('#search-criteria').selectOption('campaignName');
        await popup.locator('#search-input').fill(lcampaign);
        const actualCampaign = await popup.locator('#campaign-table tbody > tr:nth-child(1) td:nth-child(2)').textContent();
        expect(actualCampaign.trim()).toEqual(lcampaign);
        await popup.locator('xpath=//button[text()="Select"]').first().click();

        await this.description.fill(des);
    }

    async fillMandatoyFields(lname,lcompany,lsource,indus,ph,lstatus,lcampaign){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(lsource);
        await this.industry.fill(indus);
        await this.phone.fill(ph); 
        await this.leadStatus.fill(lstatus); 

        const campaignPopup = this.page.waitForEvent('popup');
        await this.campaign.click();
        const popup = await campaignPopup;

        await popup.locator('#search-criteria').selectOption('campaignName');
        await popup.locator('#search-input').fill(lcampaign);

        await popup.locator('#campaign-table tbody').waitFor(); // ensures table is loaded
        const rows = popup.locator(`#campaign-table tbody tr:has-text("${lcampaign}")`);
        const count = await rows.count();
        expect(count).toBeGreaterThan(0);

        await popup.waitForLoadState();
        await popup.locator('//button[text()="Select"]').first().waitFor(); // Wait for the button
        await rows.first().locator('xpath=//button[text()="Select"]').click();
    
        //await this.campaignPlusSign.click(campaign);
        await this.description.fill(des);
    }

    async fillMandatoryFields(lname,lcompany,source,indus,ph,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async emailFieldValidation(lname,lcompany,source,indus,ph,priemail,secemail,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.email.fill(priemail);
        await this.secondaryEmail.fill(secemail);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async invalidEmailFieldValidation(lname,lcompany,source,indus,ph,priemail,secemail,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.email.fill(priemail);
        await this.secondaryEmail.fill(secemail);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async phoneValidation(lname,lcompany,source,indus,ph,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async ratingValidation(lname,lcompany,source,indus,ph,lrating,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.rating.fill(lrating);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

     async blankAddressField(lname,lcompany,source,indus,ph,status,add,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
       await this.address.fill(add);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async ValidWebsite(lname,lcompany,source,indus,ph,status,web,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.website.fill(web);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

     async inValidWebsite(lname,lcompany,source,indus,ph,status,web,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.website.fill(web);
        await this.leadStatus.fill(status);
        //await this.campaignPlusSign.click(campaign);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async defaultValuesValidation(lname,lcompany,source,indus,ph,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph);  
        await this.leadStatus.fill(status);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async emptyCampaignField(lname,lcompany,source,indus,ph,status){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);
        await this.phone.fill(ph); 
        await this.leadStatus.fill(status);
    }

    async emptyPhoneField(lname,lcompany,source,indus,status,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);  
        await this.leadStatus.fill(status);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }

    async emptyLeadStatusField(lname,lcompany,source,indus,ph,campaignName){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(source);
        await this.industry.fill(indus);  
        await this.phone.fill(ph);
        const campaignPromise = this.page.waitForEvent('popup');
        await this.campaign.click();
        const campaignSearchPage = await campaignPromise;
        await campaignSearchPage.locator('#search-criteria').selectOption('campaignName');
        await campaignSearchPage.locator("#search-input").fill(campaignName)
        const actCampaingName = await campaignSearchPage.locator("#campaign-table tbody > tr:nth-child(1)").locator('td:nth-child(2)').textContent()
        expect(actCampaingName).toEqual(campaignName);
        await campaignSearchPage.locator("//button[text()='Select']").first().click();
    }



    async isCreateLeadPageVisible(){
        return await this.createLeadPage.isVisible();

    }

    async clickCreateLeadButton(){
        await this.createLeadButton.click();
    }

    async verifyInvalidDataTooltipMessage(locator,expMsg){
        const actualMsg = await locator.evaluate(el => el.validationMessage);
        console.log('Validation Message:', actualMsg);
        expect(actualMsg.trim()).toEqual(expMsg);
    }


    async verifyMessage(){
        const messageText = await this.toolTipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('Successfully Added');
    }

    async verifyEmailFormatMessage(){
        const message = await this.emailFormatMessage.textContent();
        console.log(message);
        expect(message).toContain("Please enter a valid email address");
    }

    async invalidPhoneValidation(){
        const expected = this.leadsTableFirstRowPhone;
        const actual = this.phone;
        expect(actual).not.toEqual(expected);
        console.log("phone field does not accept non numeric values");
    }

    async duplicateLeadNameCheck(){
        await this.leadsPageSearchDropDown.selectOption("Search by Lead Name");
        await this.leadspageSearchTextBox.fill(this.leadName);
        //td[contains(text(),'Regina')]
        expect(this.leadsTableFirstRowPhone.locator("//td")).toContain(this.leadName);
        console.log("Lead name exists");
        
    }

    // async verifyInvalidRatingTooltipMessage(expMsg){
    //     this.rating.focus();
    //     const actualMsg = await this.rating.evaluate(el => el.validationMessage);
    //     console.log('Validation Message:', actualMsg);
    //     expect(actualMsg.trim()).toEqual(expMsg);
    //   }

     async verifyInvalidDataTooltipMessage(locator,expMsg){
        const actualMsg = await locator.evaluate(el => el.validationMessage);
        console.log('Validation Message:', actualMsg);
        expect(actualMsg.trim()).toEqual(expMsg);
      }

      async verifyDefaultValues(){
        expect(await this.rating.inputValue()).toEqual("0");
        console.log("Rating is 0 by default");
        expect(await this.numberOfEmployees.inputValue()).toEqual("1");
        console.log("Number of Employees is 1 by default");
        expect(await this.annualRevenue.inputValue()).toEqual("0");
        console.log("Annual Revenue is 0 by default");
      }

       async verifyErrorMessageCampaignField(){
        const messageText = await this.toolTipMessage.textContent();
        console.log(messageText);
        expect(messageText).toContain('please select a campaign before submitting');
    }
      

    


    

    

    

}

    module .exports = { LeadPage };