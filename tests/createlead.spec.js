const { test, expect } = require('@playwright/test');
const { leadDataAllFields, leadDataMandotoryFields} = require('../test-data/createLeadData');
const { credentials } = require('../test-data/loginData');
const { POManager } = require('../pages/POManager');
let page,poManager,userLandingPage,leadPage;

  test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext({ storageState: 'storageState.json' });
      page = await context.newPage();
      poManager = new POManager(page);
      const loginPage = poManager.getLoginPage();
      await loginPage.goto();
      await loginPage.login(credentials.username, credentials.password);
      await expect(page).toHaveURL(/dashboard/);

      userLandingPage = poManager.getLandingPage();
      leadPage = poManager.getLeadPage();
});

  test("Successfull lead creation with mandatoty fields", async () => {
      await userLandingPage.clickCreateLeadLink();
      await expect(page).toHaveURL(/create-lead/);

      await leadPage.fillMandatoyFields(
        leadDataMandotoryFields.leadName,
        leadDataMandotoryFields.company,
        leadDataMandotoryFields.leadSource,
        leadDataMandotoryFields.industry,
        leadDataMandotoryFields.phone,
        leadDataMandotoryFields.leadStatus,
        leadDataMandotoryFields.campaign
    );
      await leadPage.clickCreateLeadButton();

});

  test('Successful Load of Lead Form - all fields visible', async () => {
      // Navigate to the Lead form page
      await userLandingPage.clickCreateLeadLink();
      await expect(page).toHaveURL(/create-lead/);

      // Check visibility of lead form fields
      await expect(leadPage.leadName).toBeVisible();
      await expect(leadPage.company).toBeVisible();
      await expect(leadPage.leadSource).toBeVisible();
      await expect(leadPage.industry).toBeVisible();
      await expect(leadPage.annualRevenue).toBeVisible();
      await expect(leadPage.numberOfEmployees).toBeVisible();
      await expect(leadPage.phone).toBeVisible();
      await expect(leadPage.email).toBeVisible();
      await expect(leadPage.secondaryEmail).toBeVisible();
      await expect(leadPage.leadStatus).toBeVisible();
      await expect(leadPage.rating).toBeVisible();
      await expect(leadPage.assignedTo).toBeVisible();
      await expect(leadPage.address).toBeVisible();
      await expect(leadPage.city).toBeVisible();
      await expect(leadPage.country).toBeVisible();
      await expect(leadPage.postalCode).toBeVisible();
      await expect(leadPage.website).toBeVisible();
      await expect(leadPage.campaign).toBeVisible();
      await expect(leadPage.description).toBeVisible();
      await expect(leadPage.createLeadButton).toBeVisible();
});

  test('Testing-Enter Mandatory fields except Lead Name', async () => {
      // Navigate to the Lead form
      await userLandingPage.clickCreateLeadLink();
      await expect(page).toHaveURL(/create-lead/);

     // Fill mandatory fields EXCEPT Lead Name
      await leadPage.fillMandatoyFields(
       "",  // Blank lead name
      leadDataMandotoryFields.company,
      leadDataMandotoryFields.leadSource,
      leadDataMandotoryFields.industry,
      leadDataMandotoryFields.phone,
      leadDataMandotoryFields.leadStatus,
      leadDataMandotoryFields.campaign

  );
      // Click the Create button
        await leadPage.clickCreateLeadButton();
        console.log(await page.content());
        await page.waitForTimeout(1000);

       const locator = leadPage[leadDataMandotoryFields.errorField];
      await leadPage.verifyInvalidDataTooltipMessage(locator,leadDataMandotoryFields.errormsg);
    
});

test.only('Enter Mandatory fields except industry', async () => {
      // Navigate to the Lead form
      await userLandingPage.clickCreateLeadLink();
      await expect(page).toHaveURL(/create-lead/);

     // Fill mandatory fields EXCEPT industry
      await leadPage.fillMandatoyFields(
      leadDataMandotoryFields.leadName,
      leadDataMandotoryFields.company,
      leadDataMandotoryFields.leadSource,
       "",  // Blank industry
      leadDataMandotoryFields.phone,
      leadDataMandotoryFields.leadStatus,
      leadDataMandotoryFields.campaign

  );
      // Click the Create button
        await leadPage.clickCreateLeadButton();
        console.log(await page.content());
        await page.waitForTimeout(2000);

       const locator = leadPage[leadDataMandotoryFields.errorField];
       await leadPage.verifyInvalidDataTooltipMessage(locator,leadDataMandotoryFields.errormsg);

});
   
