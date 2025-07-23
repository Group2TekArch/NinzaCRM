const { test, expect } = require('@playwright/test');
const { leadDataAllFields, leadDataMandotoryFields} = require('../utils/createLeadData');
const { credentials } = require('../utils/loginData');
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
    await expect(page).toHaveURL(/leads/);

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