const {expect} = require("@playwright/test")

class OpportunityPage{

    constructor(page){
        this.page=page;
        this.createOpportunity = page.locator("//button[@class='btn btn-info']/span");

        this.label = [
            "Opportunity Name",
            "Amount",
            "Business Type",
            "Assigned To",
            "Expected Close Date",
            "Next Step",
            "Sales Stage",
            "Probability",
            "Lead",
            "Description"
        ];

        this.opportunityName = page.locator("//input[@name='opportunityName']");
        this.amount = page.locator("//input[@name='amount']");
        this.businesstype = page.locator("//input[@name='businessType']");
        this.assignedTo = page.locator("//input[@name='assignedTo']']");
        this.nextStep = page.locator("//input[@name='nextStep']");
        this.salesStage = page.locator("//input[@name='salesStage']");
        this.probability = page.locator("//input[@name='probability']");
        this.lead = page.locator("//div[@class='form-group']//button");
        this.description = page.locator("//textarea[@name='description']");
        this.clickcreateOpp = page.locator("//button[@type='submit']");
        this.tooltipMgs = page.locator("//div[@class='Toastify']//div[@role='alert']");

    }

      async openCreateOpportunityForm() {
        await this.createOpportunity.click();
        await this.page.waitForLoadState('networkidle');

    }

    async verifyUIOpportunityElementsIsPresent() {

        for (const label of this.label) {
            const labelLocator = this.page.locator(`xpath=//label[contains(text(), "${label}")]`);
            await expect(labelLocator).toBeVisible();
            console.log(`Label "${label}" is visible.`);

        }
        console.log("All UI elements are visible on the create opportunity page.");

    }

    
    async verifyMandoratoryFieldAsteriskign() {
        await this.page.locator('label:has-text("Opportunity Name") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Amount") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Business Type") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Next Step") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Sales Stage") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Lead") >> text=*').waitFor({ state: 'visible' });
    }

     async fillOpportunityFormWithValidData(oppName, amount, businessType, nextStep, 
        SalesStage,probability,lead) {
        await this.opportunityName.fill(oppName);
        await this.amount.fill(amount)
        await this.businesstype.fill(businessType);
        await this.nextStep.fill(nextStep);
        await this.salesStage.fill(SalesStage);
        await this.probability.fill(probability);
        await this.selectLead(lead);

    }


     async selectLead(lead){
        const leadPromise = this.page.waitForEvent('popup');
         
        await this.lead.click();
        const leadSearchPage = await leadPromise;
        await leadSearchPage.locator('#search-criteria').selectOption('Lead Name');
        await leadSearchPage.locator("#search-input").fill(lead)
        //const acctleadName = await leadSearchPage.locator("#lead-table tbody > tr:nth-child(4)").locator('td:nth-child(2)').textContent();
        const acctLeadName = await leadSearchPage.locator(`//*[@id="lead-table"]/tbody/tr[4]/td[2]`).textContent();
        expect(acctLeadName).toEqual(lead);
        await leadSearchPage.locator("//button[text()='Select']").first().click();
    }

     async clickcreateOpportunityButton() {
        await this.clickcreateOpp.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifySuccessMessage(OpportunityName) {

        console.log("Verifying campaign created with name: " + OpportunityName);
        
        await this.tooltipMgs.waitFor({ state: 'visible' , timeout: 5000});
        const messageText = await this.tooltipMgs.textContent();
        console.log(messageText);
        // Use expect to assert the success message is present
        expect(messageText).toContain('Successfully Added');



    }




}

module.exports = {OpportunityPage};