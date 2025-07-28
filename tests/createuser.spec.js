const { test, expect } = require('@playwright/test');
const path = require('path');
const { POManager } = require('../pages/POManager');
const { usercredentials, passwordandmobilewithspecialcharacters, invalidData,invalidEmailData} = require('../test-data/createUserData');
const { credentials, nonadmincredentials } = require('../test-data/loginData');
const helpers = require('../utils/helpers');
let page,poManager,userLandingPage,createUserPage;

test.beforeAll(async ({ browser }) => {
  const storageStatePath = path.resolve(__dirname, '../storageState.json'); 
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

test("Verify successful user creation by providing mandatory values", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);
  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  const username = await helpers.generateRandomUserName();
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;
  
  await createUserPage.fillMandatoryFields(
    fullname,
    username,
    usercredentials.password,
    mobile,
    email
  );
  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  await createUserPage.verifyMessage(fullname);
});

test("Verify successful user creation by providing all values", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);
  const username = await helpers.generateRandomUserName();
  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;

  await createUserPage.fillMandatoryFields(
    fullname,
    username,
    usercredentials.password,
    mobile,
    email
  );
  await createUserPage.fillNonMandatoryFields();

  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  console.log(fullname);
  await createUserPage.verifyMessage(fullname);
});

test("Verify user creation with mobile number starting with 0", async () => {
    //test.setTimeout(60000); // Set timeout to 60 seconds
    await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
    const username = await helpers.generateRandomUserName();
    const email = await helpers.generateRandomEmail();
    let mobile = await helpers.generateRandomMobileNo();
    const trimmed = mobile.slice(0, -1);     
    mobile = `0${trimmed}`;
    const name = await helpers.generateRandomString();
    const fullname = usercredentials.fullname + name;

    await createUserPage.fillMandatoryFields(
    fullname,
    username,
    usercredentials.password,
    mobile,
    email,
    );
    await createUserPage.clickCreateUserButton();
    await page.waitForTimeout(2500);
    await createUserPage.verifyMessage(fullname);
})

test("Verify user creation with subdomain email", async () => {
    //const createUserPage = new CreateUserPage(page);
     await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
    const username = await helpers.generateRandomUserName();
    const email = await helpers.generateRandomEmail();
    const [beforeAt, afterAt] = email.split('@');
    const subdomainEmail  =`${beforeAt}@mail.${afterAt}`;
    const mobile = await helpers.generateRandomMobileNo();
    const name = await helpers.generateRandomString();
    const fullname = usercredentials.fullname + name;

    await createUserPage.fillMandatoryFields(
    fullname,
    username,
    usercredentials.password,
    mobile,
    subdomainEmail
   );
    await createUserPage.clickCreateUserButton();
    await page.waitForTimeout(2500);
    await createUserPage.verifyMessage(fullname);
});

test("Verify user creation with max-length (50 char) username", async () => {
   // const createUserPage = new CreateUserPage(page);
    await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
    const email = await helpers.generateRandomEmail();
    const mobile = await helpers.generateRandomMobileNo();
    const uname = await helpers.generateRandomString();
    const username = uname + "x".repeat(46); // total = 50 characters
    const name = await helpers.generateRandomString();
    const fullname = usercredentials.fullname + name;
    
    await createUserPage.fillMandatoryFields(
      fullname,
      username,
      usercredentials.password,
      mobile,
      email
      //  "Long User", longUsername, "Password123", "9998887776", "longuser@example.com"
    );
  
    await createUserPage.clickCreateUserButton();
    await page.waitForTimeout(2500);
    await createUserPage.verifyMessage(fullname);
});


test("Verify user creation with exactly 6 characters in password", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  const username = await helpers.generateRandomUserName();
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;
  const passwordwithsixchar = '123456';

  await  createUserPage.fillMandatoryFields(
    fullname,
    username,
    passwordwithsixchar,
    mobile,
    email
  );
  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  await createUserPage.verifyMessage(fullname);

});

test("Verify user creation with special characters in password", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  const username = await helpers.generateRandomUserName();
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;
  const passwordwithspecialchar = '@Secure#123!';

  await  createUserPage.fillMandatoryFields(
    fullname,
    username,
    passwordwithspecialchar,
    mobile,
    email,
  );
  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  await createUserPage.verifyMessage(fullname);

});

test("Verify user creation with special characters in mobile", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const randomUserName = `group2ninza${randomNumber}`;
  const randomEmail = `group2ninza${randomNumber}@tekarch.com`;
  const randomMobileNumber = Math.floor(Math.random() * 9000) + 1000;
  const randomMobile = `980-234-${randomMobileNumber}`;
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;

  await  createUserPage.fillMandatoryFields(
    fullname,
    randomUserName,
    passwordandmobilewithspecialcharacters.password,
    randomMobile,
    randomEmail
  );
  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  const errorMsg = "Mobile number must be 10 digits and should contain only digits";
  await createUserPage.verifyFailMessage(errorMsg);
});

test("Verify user creation with  correct data in all mandatory fields", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);

  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const email = await helpers.generateRandomEmail();
  const mobile = await helpers.generateRandomMobileNo();
  const username = await helpers.generateRandomUserName();
  const name = await helpers.generateRandomString();
  const fullname = usercredentials.fullname + name;
  
  await createUserPage.fillMandatoryFields(
    fullname,
    username,
    usercredentials.password,
    mobile,
    email
  );
  await createUserPage.clickCreateUserButton();
  await page.waitForTimeout(2500);
  await createUserPage.verifyMessage(fullname);
});

test("Fail to create user with invalid email address", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);

  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);
  
  await createUserPage.fillMandatoryFields(
    invalidEmailData.fullname,
    invalidEmailData.username,
    invalidEmailData.password,
    invalidEmailData.mobile,
    invalidEmailData.email
  );
  await createUserPage.verifyInvalidEmailError(invalidEmailData.errormsg)
});

for (const user of invalidData) {
  test(`Fail to create user with blank inputs(invalid): ${JSON.stringify(user)}`, async () => {
    await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
  
    await createUserPage.fillMandatoryFields(
      user.fullname,
      user.username,
      user.password,
      user.mobile,
      user.email
    );
    
    await createUserPage.clickCreateUserButton();
    await page.waitForTimeout(2500);
    const locator = createUserPage[user.errorField];
    await createUserPage.verifyInvalidDataTooltipMessage(locator,user.errormsg);
  });
}

test("Fail to create user with non admin user", async ({ browser }) => {
  const storageStatePath = path.resolve(__dirname, '../storageState.json'); 
  const context = await browser.newContext({ storageState: storageStatePath });
  page = await context.newPage();
  poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goto();
  await loginPage.login(nonadmincredentials.username, nonadmincredentials.password);
  await expect(page).toHaveURL(/dashboard/);
  userLandingPage = poManager.getLandingPage();
  const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
  expect(isAdminConsoleVisible).toBe(false);
});

//cannot automate as cannot locate Date picker
// test('Date of Birth field click shows date picker', async ({ page }) => {
//   const poManager = new POManager(page);
//   const loginPage = poManager.getLoginPage();
//   const userLandingPage = poManager.getLandingPage();
//   const createUserPage = poManager.getCreateUserPage();

//   await loginPage.goto();
//   await loginPage.login(credentials.username, credentials.password);
//   await expect(page).toHaveURL(/dashboard/);

//   await userLandingPage.clickCreateUserLink();
//   await expect(page).toHaveURL(/create-user/);

//   const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
//   expect(isCreateUserPageVisible).toBe(true);

//   //await createUserPage.dob.waitFor({ state: 'visible' });
//   await createUserPage.dob.click();

//   // Update this selector to match your actual date picker element
//   const datePicker = page.locator(' //*[@id="content"]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]/input[1]');
//   await expect(datePicker).toBeVisible();
// });
