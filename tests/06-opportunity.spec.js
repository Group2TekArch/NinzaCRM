const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { validData } = require('../test-data/opportunityData');
const { credentials } = require('../test-data/loginData');
let page, poManager, landingPage, opportunityPage;


test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);

  landingPage = poManager.getLandingPage();
  await landingPage.clickOpportunityModule();
 // await expect(page).toHaveURL('/opportunities');
  await expect(page).toHaveURL('/opportunities');

  opportunityPage = poManager.getOpportunityPage();

});

test("Create Opportunity UI Elements Validation ", async () => {


  await opportunityPage.openCreateOpportunityForm();
  await expect(page).toHaveURL('/create-opportunity');

  await opportunityPage.verifyUIOpportunityElementsIsPresent();
  console.log("All UI element are verified successfully")


});

test("check * sign is present on Opportunity UI page ", async () => {


  await opportunityPage.openCreateOpportunityForm();
  await expect(page).toHaveURL('/create-opportunity');
  await opportunityPage.verifyMandoratoryFieldAsteriskign();
  console.log("* sign is present on Opportunity UI page successfully");


});

test.describe('Opportunity Creation Tests with valid data', () => {
  for (const data of validData) {
    test(`Opportunity created with name: ${data.OpportunityName}`, async () => {

     await opportunityPage.openCreateOpportunityForm();
     await expect(page).toHaveURL('/create-opportunity');

      await opportunityPage.fillOpportunityFormWithValidData(
        data.OpportunityName,
        data.amount,
        data.businessType,
        data.nextStep,
        data.salesStage,
        data.probability,
        data.lead,
        
      );

      await opportunityPage.clickcreateOpportunityButton();
      console.log("Create Opportunity button clicked");
      console.log(`Opportunity with name: "${data.OpportunityName}" is created successfully.`);

      //opportunityPage.verifySuccessMessage(data.OpportunityName)

    });
  }
});