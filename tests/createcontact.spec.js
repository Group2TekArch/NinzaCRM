
const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { usercredentials } = require('../utils/createContactData');
const { credentials } = require('../utils/loginData');
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

test("Verify successful contact creation by providing mandatory values", async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  const randomMobile10Digit = Math.floor(1000000000 + Math.random() * 9000000000);

  //not allowing to create product with duplicate phone number
  // Contact maxlength is 20 but accepting max 21 chars, and only accepts characters n space
  await contactPage.fillmandatoryFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.department,
    usercredentials.officePhone,
    usercredentials.contactName,
    randomMobile10Digit.toString(),
    usercredentials.email,
    usercredentials.campaign
  );
  await contactPage.clickAddButton();
  await contactPage.verifyMessage(usercredentials.contactName, randomMobile10Digit.toString());
});