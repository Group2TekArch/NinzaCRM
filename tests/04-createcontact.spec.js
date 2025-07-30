const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { usercredentials , updatecontactname } = require('../test-data/createContactData');
const { credentials } = require('../test-data/loginData');
const helpers = require('../utils/helpers');
let page,poManager,userLandingPage,contactPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
  userLandingPage = poManager.getLandingPage();
  contactPage = poManager.getContactPage();
});

test("verify user successfully entered all field values and able to create contact by providing all field values", async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  
  //not allowing to create product with duplicate phone number
  // Contact maxlength is 20 but accepting max 21 chars, and only accepts characters n space
  await contactPage.fillAllFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.department,
    usercredentials.officePhone,
    usercredentials.contactName,
    mobile,
    email,
    usercredentials.campaign
  );

  await contactPage.verifyFieldValue(contactPage["organizaton"],usercredentials.Organization);
  await contactPage.verifyFieldValue(contactPage["contactname"],usercredentials.contactName);
  await contactPage.verifyFieldValue(contactPage["mobile"],mobile);
  await contactPage.verifyFieldValue(contactPage["title"],usercredentials.title);
  await contactPage.verifyFieldValue(contactPage["department"],usercredentials.department);
  await contactPage.verifyFieldValue(contactPage["officephone"],usercredentials.officePhone);
  await contactPage.verifyFieldValue(contactPage["email"],email);


  await contactPage.clickAddButton();
  await page.waitForTimeout(2500);
  await contactPage.verifyMessage(usercredentials.contactName, mobile);
  await contactPage.searchContact(usercredentials.contactName, mobile);
});

test("Verify successful contact creation by providing only mandatory field values", async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  const mobile = await helpers.generateRandomMobileNo();

  await contactPage.fillmandatoryFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.contactName,
    mobile,
    usercredentials.campaign
  );
  await contactPage.clickAddButton();
  await page.waitForTimeout(2500);
  await contactPage.verifyMessage(usercredentials.contactName, mobile);
  await page.waitForTimeout(2500);
  await contactPage.searchContact(usercredentials.contactName, mobile);
});

test("Verify successful updation of contact", async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  const mobile = await helpers.generateRandomMobileNo();

  await contactPage.fillmandatoryFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.contactName,
    mobile,
    usercredentials.campaign
  );
  await contactPage.clickAddButton();
  await page.waitForTimeout(2500);
  await contactPage.verifyMessage(usercredentials.contactName, mobile);
  await contactPage.searchContact(usercredentials.contactName, mobile);
  await contactPage.updateContact();
  await page.waitForTimeout(2500);

  await contactPage.updateFields(updatecontactname);
  await page.waitForTimeout(2500);

  await contactPage.clickUpdateContactButton();
  await page.waitForTimeout(2500);

  await contactPage.verifyUpdateMessage(usercredentials.contactName, mobile);
  
});