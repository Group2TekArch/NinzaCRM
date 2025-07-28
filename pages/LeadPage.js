const {expect} = require('@playwright/test')

class LeadPage{

    constructor(page){
        this.page = page;
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
        this.rating = page.locator("input[value='0'][name='rating']");
        this.assignedTo = page.locator("input[name='assignedTo']");
        this.address = page.locator("textarea[name='address']");
        this.city = page.locator("input[name='city']");
        this.country = page.locator("input[name='country']");
        this.postalCode = page.locator("input[name='postalCode']");
        this.website = page.locator("input[name='website']");
        this.campaignModal = page.locator("#search-criteria");
        this.campaign = page.locator("//div[@class='form-group']//div//button[@type='button']");
        this.description = page.locator("textarea[name='description']");
        this.createLeadButton = page.locator("button[type='submit']");
        this.toolTipMessage = page.locator("//div[@role='alert']");
        this.toolTipMessage = page.locator('.tooltip-inner');

    }

    async fillAllFields(lname,lcompany,lsource,indus,annualrev,noOfemp,ph,priemail,secemail,lstatus,lrating,assignto,add,lcity,lcountry,lpostalcode,web,lcampaign,des){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(lsource);
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
        
    }

    async clickCreateLeadButton(){
        await this.createLeadButton.click();
    }
    async verifyInvalidDataTooltipMessage(locator,expMsg){
        const actualMsg = await locator.evaluate(el => el.validationMessage);
        console.log('Validation Message:', actualMsg);
        expect(actualMsg.trim()).toEqual(expMsg);
    }
}

    module .exports = { LeadPage };