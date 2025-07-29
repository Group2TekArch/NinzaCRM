const { test, expect } = require('@playwright/test');
const { leadDataMandatoryFields, leadEmailFieldValidation, leadInvalidEmailFieldValidation, leadPhoneValidation, leadInvalidRating, leaveAddressInfoBlank, validWebsiteField, invalidWebsiteField, defaultValuesField, blankCampaignField, blankPhoneField, blankStatusField} = require('../test-data/createLeadData');
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

test("Successful lead creation with mandatory fields", async () => {
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.fillMandatoryFields(
    leadDataMandatoryFields.leadName,
    leadDataMandatoryFields.company,
    leadDataMandatoryFields.leadSource,
    leadDataMandatoryFields.industry,
    leadDataMandatoryFields.phone,
    leadDataMandatoryFields.leadStatus,
    leadDataMandatoryFields.campaign
  );
  await leadPage.clickCreateLeadButton();
  await leadPage.verifyMessage();

});

test("validate email format", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.emailFieldValidation(
    leadEmailFieldValidation.leadName,
    leadEmailFieldValidation.company,
    leadEmailFieldValidation.leadSource,
    leadEmailFieldValidation.industry,
    leadEmailFieldValidation.phone,
    leadEmailFieldValidation.email,
    leadEmailFieldValidation.secondaryEmail,
    leadEmailFieldValidation.leadStatus,
    leadEmailFieldValidation.campaign,
   
  );
  await leadPage.clickCreateLeadButton();
  await leadPage.verifyMessage();

});

test("Invalid email format validation", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.invalidEmailFieldValidation(
    leadInvalidEmailFieldValidation.leadName,
    leadInvalidEmailFieldValidation.company,
    leadInvalidEmailFieldValidation.leadSource,
    leadInvalidEmailFieldValidation.industry,
    leadInvalidEmailFieldValidation.phone,
    leadInvalidEmailFieldValidation.invalidEmail,
    leadInvalidEmailFieldValidation.invalidSecondaryEmail,
    leadInvalidEmailFieldValidation.leadStatus,
    leadInvalidEmailFieldValidation.campaign,
  );

  await leadPage.clickCreateLeadButton();
  await leadPage.verifyEmailFormatMessage();
});

test("phone number validation", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.phoneValidation(
    leadPhoneValidation.leadName,
    leadPhoneValidation.company,
    leadPhoneValidation.leadSource,
    leadPhoneValidation.industry,
    leadPhoneValidation.phone,
    leadPhoneValidation.leadStatus,
    leadPhoneValidation.campaign
  );

  await leadPage.clickCreateLeadButton();
  await leadPage.invalidPhoneValidation();

});


test("duplicate leads check", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.fillMandatoryFields(
    leadDataMandatoryFields.leadName,
    leadDataMandatoryFields.company,
    leadDataMandatoryFields.leadSource,
    leadDataMandatoryFields.industry,
    leadDataMandatoryFields.phone,
    leadDataMandatoryFields.leadStatus,
    leadDataMandatoryFields.campaign
  );

  await leadPage.clickCreateLeadButton();

  await expect(page).toHaveURL(/leads/);
  await leadPage.duplicateLeadNameCheck();
  
});


test("invalid rating", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.ratingValidation(
    leadInvalidRating.leadName,
    leadInvalidRating.company,
    leadInvalidRating.leadSource,
    leadInvalidRating.industry,
    leadInvalidRating.phone,
    leadInvalidRating.rating,
    leadInvalidRating.leadStatus,
    leadInvalidRating.campaign
  );

  await leadPage.clickCreateLeadButton();
  const locator = leadPage[leadInvalidRating.errorField];
  await leadPage.verifyInvalidDataTooltipMessage(locator,leadInvalidRating.errormsg);
 // await leadPage.verifyInvalidRatingTooltipMessage('Value must be less than or equal to 10');
  
});

test("check if lead is created successfully with blank address field", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.blankAddressField(
    leaveAddressInfoBlank.leadName,
    leaveAddressInfoBlank.company,
    leaveAddressInfoBlank.leadSource,
    leaveAddressInfoBlank.industry,
    leaveAddressInfoBlank.phone,
    leaveAddressInfoBlank.leadStatus,
    leaveAddressInfoBlank.address,
    leaveAddressInfoBlank.campaign
  );

  await leadPage.clickCreateLeadButton();
  await leadPage.verifyMessage();
});

test("check if lead is created with valid website field", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.ValidWebsite(
    validWebsiteField.leadName,
    validWebsiteField.company,
    validWebsiteField.leadSource,
    validWebsiteField.industry,
    validWebsiteField.phone,
    validWebsiteField.leadStatus,
    validWebsiteField.website,
    validWebsiteField.campaign
  );

  await leadPage.clickCreateLeadButton();
  await leadPage.verifyMessage();
});

test("check if lead throws an error message with invalid website field", async() =>{
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.inValidWebsite(
    invalidWebsiteField.leadName,
    invalidWebsiteField.company,
    invalidWebsiteField.leadSource,
    invalidWebsiteField.industry,
    invalidWebsiteField.phone,
    invalidWebsiteField.leadStatus,
    invalidWebsiteField.website,
    validWebsiteField.campaign
  );

  await leadPage.clickCreateLeadButton();
  const locator = leadPage[invalidWebsiteField.errorField];
  await leadPage.verifyInvalidDataTooltipMessage(locator,invalidWebsiteField.errormsg);
});

test("Validate the default values are set correctly for rating,annual rev and no of emp", async () => {
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.defaultValuesValidation(
    defaultValuesField.leadName,
    defaultValuesField.company,
    defaultValuesField.leadSource,
    defaultValuesField.industry,
    defaultValuesField.phone,
    defaultValuesField.leadStatus,
    defaultValuesField.campaign
  );
  
  await leadPage.clickCreateLeadButton();
  await leadPage.verifyDefaultValues();

});

test("Verify error message for empty campaign field", async () => {
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.emptyCampaignField(
    blankCampaignField.leadName,
    blankCampaignField.company,
    blankCampaignField.leadSource,
    blankCampaignField.industry,
    blankCampaignField.phone,
    blankCampaignField.leadStatus
  );

  await leadPage.clickCreateLeadButton();
  await leadPage.verifyErrorMessageCampaignField();
});

test("Verify error message for empty phone field", async () => {
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.emptyPhoneField(
    blankPhoneField.leadName,
    blankPhoneField.company,
    blankPhoneField.leadSource,
    blankPhoneField.industry,
    blankPhoneField.leadStatus,
    blankPhoneField.campaign
  );

  await leadPage.clickCreateLeadButton();
  const locator = leadPage[blankPhoneField.errorField];
  await leadPage.verifyInvalidDataTooltipMessage(locator,blankPhoneField.errormsg);

});

test("Verify error message for empty lead status field", async () => {
  await userLandingPage.clickCreateLeadLink();
  await expect(page).toHaveURL(/create-lead/);
  const isCreateLeadPageVisible = await leadPage.isCreateLeadPageVisible();
  expect(isCreateLeadPageVisible).toBe(true);

  await leadPage.emptyLeadStatusField(
    blankStatusField.leadName,
    blankStatusField.company,
    blankStatusField.leadSource,  
    blankStatusField.industry,
    blankStatusField.phone,
    blankStatusField.campaign
  );

  await leadPage.clickCreateLeadButton();
  const locator = leadPage[blankStatusField.errorField];
  await leadPage.verifyInvalidDataTooltipMessage(locator,blankStatusField.errormsg);

});


  






