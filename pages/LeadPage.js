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
        this.campaign = page.locator("div[class='form-group'] div input[type='text']");
        this.decsription = page.locator("textarea[name='description']");
        this.createLeadButton = page.locator("button[type='submit']");
        this.toolTipMessage = page.locator("//div[@role='alert']");
           
    }

    async fillAllFields(lname,lcompany,source,indus,annualrev,noOfemp,ph,priemail,secemail,status,lrating,assignto,add,lcity,lcountry,lpostalcode,web,lcampaign,des){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(lsource);
        await this.industry.fill(lsource);
        await this.annualRevenue.fill(annualrev);
        await this.numberOfEmployees.fill(noOfemp);
        await this.phone.fill(ph);
        await this.email.fill(priemail);
        await this.secondaryEmail.fill(secemail);
        await this.leadStatus.fill(status);
        await this.rating.fill(lrating);
        await this.assignedTo.fill(assignto);
        await this.address.fill(add);
        await this.city.fill(lcity);
        await this.country.fill(lcountry);
        await this.postalCode.fill(lpostalcode);
        await this.website.fill(web);
        await this.campaign.fill(lcampaign);
        await this.decsription.fill(des);
    }

    async fillMandatoyFields(lname,lcompany,source,indus,ph,status,lcampaign){
        await this.leadName.fill(lname);
        await this.company.fill(lcompany);
        await this.leadSource.fill(lsource);
        await this.industry.fill(lsource);
        await this.phone.fill(ph);  
        await this.leadStatus.fill(status);
        await this.campaign.fill(lcampaign);
    }

    async clickCreateLeadButton(){
        await this.createLeadButton.click();
    }
}
module .exports = { LeadPage };