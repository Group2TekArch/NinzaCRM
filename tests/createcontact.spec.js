
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { usercredentials } = require('../utils/createContactData');
const { credentials } = require('../utils/loginData');
let page,poManager,userLandingPage,ContactPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
  
  userLandingPage = poManager.getLandingPage();
 /* const iscontactslink = await userLandingPage.isContactsVisible();
  expect(iscontactslink).toBe(true);*/
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/contacts/);
  ContactPage = poManager.getContactPage();
});

test("Verify successful contact creation by providing mandatory values", async () => {
  const isContactPageVisible = await ContactPage.isContactPageVisible();
  expect(isContactPageVisible).toBe(true);

  await ContactPage.fillmandatoryFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.department,
    usercredentials.officePhone,
    usercredentials.contactName,
    usercredentials.mobile,
    usercredentials.email
  );
  await ContactPage.clickAddButton();
  await ContactPage.verifyMessage(usercredentials.contactName);
});