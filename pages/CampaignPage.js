
import { expect } from '@playwright/test';


export class CampaignPage {

    constructor(page) {
        this.page = page;
        this.createCampaign = page.locator("//span[text()='Create Campaign']");
        this.label = [
            "Campaign ID:",
            "Campaign Name",
            "Campaign Status",
            "Target Size",
            "Expected Close Date:",
            "Target Audience:",
            "Description:"
        ];

        // this.campaignNameLabel = page.locator("//label[text()='Campaign Name']");
        // this.campaignStatusLabel = page.locator("//label[text()='Campaign Status:']");
        // this.targetSizeLabel = page.locator("//label[text()='Target Size']");
        // this.expectedClosedDateLabel = page.locator("//label[text()='Expected Close Date:']");
        // this.targetAudienceLabel = page.locator("//label[text()='Target Audience:']");
        // this.descriptionLabel = page.locator("//label[text()='Description:']");

        this.campaignNameInput = page.locator(" //input[@name='campaignName']");
        this.campaignStatusInput = page.locator("//input[@name='campaignStatus']");
        this.targetSizeLInput = page.locator("//input[@name='targetSize']");
        this.targetAudienceInput = page.locator("//input[@name='targetAudience']");
        this.descriptionInput = page.locator("//textarea[@name='description']");
        this.createCampaignButton = page.locator("//button[text()='Create Campaign']");
        this.campaignTable = page.locator('.table.table-striped.table-hover');
        this.tooltipMgs = page.locator("//div[@role='alert']");
        this.tooltipTargetSzMgs = page.locator("//div[@class='Toastify__toast-container']");
        this.datePickerIcon = page.locator("//input[@type='date']");

    }

    async openCreateCampaignForm() {
        await this.createCampaign.click();
        await this.page.waitForLoadState('networkidle');


    }

    async verifyUICampaignElements() {

        for (const label of this.label) {
            const labelLocator = this.page.locator(`xpath=//label[contains(text(), "${label}")]`);
            await expect(labelLocator).toBeVisible();
            console.log(`Label "${label}" is visible.`);

        }
        // await expect(this.campaignNameLabel).toBeVisible();
        // await expect(this.campaignStatusLabel).toBeVisible();
        // await expect(this.targetSizeLabel).toBeVisible();
        // await expect(this.expectedClosedDateLabel).toBeVisible();
        // await expect(this.targetAudienceLabel).toBeVisible();
        // await expect(this.descriptionLabel).toBeVisible();
        console.log("All UI elements are visible on the create campaign page.");
    }

    async verifyMandoratoryField() {
        await this.page.locator('label:has-text("Campaign Name") >> text=*').waitFor({ state: 'visible' });
        await this.page.locator('label:has-text("Target Size") >> text=*').waitFor({ state: 'visible' });
    }

    async fillCampaignForm(campName, campStatus, targetSize, tarAudience, desc) {
        await this.campaignNameInput.fill(campName);
        await this.campaignStatusInput.fill(campStatus)
        await this.targetSizeLInput.fill(targetSize);
        await this.targetAudienceInput.fill(tarAudience);
        await this.descriptionInput.fill(desc);

    }

    async fillFormWithMissingData({ CampaignName, CampaignStatus, TargetSize, CampaignAudience, Description }) {
        if (CampaignName !== undefined) await this.campaignNameInput.fill(CampaignName);
        if (CampaignStatus) await this.campaignStatusInput.fill(CampaignStatus);
        if (TargetSize !== undefined) await this.targetSizeLInput.fill(TargetSize);
        if (CampaignAudience) await this.targetAudienceInput.fill(CampaignAudience);
        if (Description) await this.descriptionInput.fill(Description);

    }

    async getFieldValue(fieldName) {
        const map = {
            campaignName: this.campaignNameInput,
            targetSize: this.targetSizeLInput
        };
        return map[fieldName];
    }

    async clickcreateCampaignButton() {
        await this.createCampaignButton.click();
        await this.page.waitForLoadState('networkidle');
    }


    async verifyCampiagnCreated(campaignName) {

        console.log("Verifying campaign created with name: " + campaignName);
        //await this.page.waitForTimeout(2500);

        await this.tooltipMgs.waitFor({ state: 'visible' });
        const messageText = await this.tooltipMgs.textContent();
        console.log(messageText);
        // Use expect to assert the success message is present
        expect(messageText).toContain('Successfully Added');


        //     // Wait for the table to be visible
        //     const table = await this.page.locator('.table');
        //    // await expect(table).waitFor({ state: 'visible' });  

        //     // Locate row that contains the campaign name
        //     const campaignRow = await table.locator(`tr:has(td:has-text("${campaignName}"))`);

        //     // campaignRow.waitFor({ state: 'visible', timeout: 10000 });
        //    // await expect(campaignRow).toHaveCount(1, { timeout: 10000 });
        //     // Get Campaign ID from first cell of the row
        //     const campaignIDCell = campaignRow.locator('td').first();
        //    // campaignIDCell.waitFor({ state: 'visible', timeout: 10000 });

        //     const campaignID = await campaignIDCell.evaluate(el => el.textContent?.trim());
        //      console.log("Campaign ID (evaluate):", campaignID);
        //     expect(campaignID).not.toBe("");  // Assert that campaign ID is not empty
        //     console.log(`✅ Campaign with ID ${campaignID} is created successfully.`);

    }


    async useDatePicker() {

        //await this.datePickerIcon.click(); // Open the date picker
        const today = new Date().toISOString().split('T')[0];
        await this.datePickerIcon.fill(today);
        console.log("Date picker used successfully");

        // Verify it's filled
        const selectedDate = await this.datePickerIcon.inputValue();
        expect(selectedDate).toBe(today);
        console.log(`Date selected: ${selectedDate}`);

    }


    async getTargetSizeValidationMessage() {

        const actualMsg = await locator.evaluate(el => el.validationMessage);
        console.log('Validation Message:', actualMsg);
        expect(actualMsg.trim()).toEqual(expMsg);


        // //await this.tooltipMgs.waitFor({ state: 'visible' });
        // const messageText = "Value must be greater than or equal to 1"
        // //const messageText = this.tooltipTargetSzMgs.textContent();
        // //await this.page.waitForTimeout(2500);
        // console.log("Error Message: " + messageText);
        // // Use expect to assert the success message is present
        // expect(messageText).toContain('Value must be greater than or equal to 1');
    }



}
//module.exports = { CampaignPage };