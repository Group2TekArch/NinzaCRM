const { test, expect } = require('@playwright/test');
const path = require('path');
const { POManager } = require('../pages/POManager');
const { usercredentials } = require('../utils/createUserData');
const { credentials } = require('../utils/loginData');

let page,poManager,userLandingPage,createUserPage;
  test.beforeAll(async ({ browser }) => {
  const storageStatePath = path.resolve(__dirname, '../storageState.json'); // adjust path if needed
  const context = await browser.newContext({ storageState: storageStatePath });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(credentials.username, credentials.password);
  await expect(page).toHaveURL(/dashboard/);
  userLandingPage = poManager.getLandingPage();
  const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
  expect(isAdminConsoleVisible).toBe(true);
  createUserPage = poManager.getCreateUserPage();
});

test("Test Invalid characters in Full Name", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  await createUserPage.fillMandatoryFields(
    usercredentials.fullname,
    usercredentials.username,
    usercredentials.password,
    usercredentials.mobile,
    usercredentials.email
  );
  await createUserPage.clickCreateUserButton();
  await createUserPage.verifyMessage(usercredentials.fullname);
});

test("Test Mobile number too long", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  await createUserPage.fillMandatoryFields(
    usercredentials.fullname,
    usercredentials.username,
    usercredentials.password,
    usercredentials.mobile,
    usercredentials.email,
    usercredentials.dob
  );
  await createUserPage.clickCreateUserButton();
  await createUserPage.verifyMessage(usercredentials.fullname);
});
