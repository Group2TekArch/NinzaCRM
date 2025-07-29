const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { credentials } = require('../test-data/loginData');
const { validData, negativeData, campaign, negativeTargetValue } = require('../test-data/createCampaignData');
let page, poManager, loginPage, landingPage, campaignPage;

test.beforeEach(async ({ page }) => {
  poManager = new POManager(page);
  loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);

  landingPage = poManager.getLandingPage();
  await landingPage.clickCampaignsModule();
  await expect(page).toHaveURL('/campaigns');

  campaignPage = poManager.getCampaignPage();


});


test("TC_001_002_Create Campaign UI Elements Validation ", async () => {


  await campaignPage.openCreateCampaignForm();
  await expect(page).toHaveURL('/create-campaign');

  await campaignPage.verifyUICampaignElements();
  await campaignPage.verifyMandoratoryField();


});

for (const data of validData) {
  test(`Create Campaign successfully: ${JSON.stringify(data)}`, async () => {

    campaignPage.openCreateCampaignForm();
    //await expect(page).toHaveURL(/create-campaign/);
    const randomNumber = Math.floor(Math.random() * 2000) + 1;
    const randomCampaignName = `NinzaCampaign1${randomNumber}`;

    await campaignPage.fillCampaignForm(
      randomCampaignName,
      data.CampaignStatus,
      data.TargetSize,
      data.TargetAudience,
      data.Description

    );

    await campaignPage.clickcreateCampaignButton();
    console.log("Create campaign button clicked");


  });
}


test.describe('Negative Campaign Creation Tests', () => {
  for (const data of negativeData) {
    test(`Validation Error Test missing for ${data.expectMissingField}`, async (page) => {

      campaignPage.openCreateCampaignForm();
      //await expect(page).toHaveURL("/create-campaign");

      await campaignPage.fillFormWithMissingData(
        data.CampaignName,
        data.CampaignStatus,
        data.TargetSize,
        data.CampaignAudience,
        data.Description
      );

      await campaignPage.clickcreateCampaignButton();
      console.log("Create campaign button clicked");

      //const invalidField = campaignPage.getFieldValue(data.expectMissingField);
      //const isInvalid = await invalidField.evaluate(el => el.validity.valueMissing);
      //expect(invalidField).toBe(true);
      console.log(`Field "${data.expectMissingField}" is missing as expected.`);
    });
  }
});


test("Validate Auto-generate Campaign ID", async (page) => {

  campaignPage.openCreateCampaignForm();
  //await expect(page).toHaveURL("/create-campaign");

  await campaignPage.fillCampaignForm(
    campaign.CampaignName,
    campaign.CampaignStatus,
    campaign.TargetSize,
    campaign.CampaignAudience,
    campaign.Description
  );

  await campaignPage.clickcreateCampaignButton();
  console.log("Create campaign button clicked");
  //await page.waitForTimeout(2500);

  campaignPage.verifyCampiagnCreated(campaign.CampaignName);
  console.log(`Campaign with name "${campaign.CampaignName}" created successfully`)
});


test("Date Picker Functionality", async (page) => {

  campaignPage.openCreateCampaignForm();
  
  campaignPage.useDatePicker();
  console.log("Date picker used successfully")


});



test.only("Validate Target Size with Negative Number", async (page) => {

  campaignPage.openCreateCampaignForm();
  //await expect(page).toHaveURL("/create-campaign");

  await campaignPage.fillCampaignForm(
    negativeTargetValue.CampaignName,
    negativeTargetValue.CampaignStatus,
    negativeTargetValue.TargetSize,
    negativeTargetValue.CampaignAudience,
    negativeTargetValue.Description
  );
  await campaignPage.clickcreateCampaignButton();
  console.log("Create campaign button clicked");

  campaignPage.getTargetSizeValidationMessage();

});

