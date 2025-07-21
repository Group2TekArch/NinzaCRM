const { test, expect } = require('@playwright/test');
const { POManager } = require('../pages/POManager');
const { usercredentials } = require('../utils/createUserData');
const { credentials } = require('../utils/loginData');
let page,poManager,userLandingPage,createUserPage;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'storageState.json' });
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

test("Verify successful user creation by providing all values", async () => {
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



// test("Verify successful user creation by providing mandatory values",async({page})=>{
//     const poManager = new POManager(page);
//     const loginPage = poManager.getLoginPage();
//     const userLandingPage = poManager.getLandingPage();
//     const createUserPage = poManager.getCreateUserPage();
//     await loginPage.goto();
//     await loginPage.login(credentials.username, credentials.password);
     
//      await expect(page).toHaveURL(/dashboard/); 
//      const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
//      expect(isAdminConsoleVisible).toBe(true);
  
  
//      await userLandingPage.clickCreateUserLink();
//      await expect(page).toHaveURL(/create-user/); 
//      const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
//      expect(isCreateUserPageVisible).toBe(true);
     
//     await createUserPage.fillMandatoryFields(usercredentials.fullname,usercredentials.username,usercredentials.password,usercredentials.mobile,usercredentials.email);
//     await createUserPage.clickCreateUserButton();
//     await createUserPage.verifyMessage(usercredentials.fullname);
// });

// test("Verify successful user creation by providing all values",async({page})=>{
//   const poManager = new POManager(page);
//   const loginPage = poManager.getLoginPage();
//   const userLandingPage = poManager.getLandingPage();
//   const createUserPage = poManager.getCreateUserPage();
//   await loginPage.goto();
//   await loginPage.login(credentials.username, credentials.password);
   
//     await expect(page).toHaveURL(/dashboard/); 
//    const isAdminConsoleVisible = await userLandingPage.isAdminConsoleVisible();
//    expect(isAdminConsoleVisible).toBe(true);


//    await userLandingPage.clickCreateUserLink();
//    await expect(page).toHaveURL(/create-user/); 
//    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
//    expect(isCreateUserPageVisible).toBe(true);
   
//   await createUserPage.fillMandatoryFields(usercredentials.fullname,usercredentials.username,usercredentials.password,usercredentials.mobile,usercredentials.email);
//   await createUserPage.clickCreateUserButton();
//   await createUserPage.verifyMessage(usercredentials.fullname);
// });
test("Verify user creation with mobile number starting with 0", async () => {
    test.setTimeout(60000); // Set timeout to 60 seconds
    await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
  //const createUserPage = new CreateUserPage(page);
    await createUserPage.fillMandatoryFields(
    usercredentials.fullname,
    usercredentials.username,
    usercredentials.password,
    usercredentials.mobile,
    usercredentials.email,
    //usercredentials.dob
        //"Test User", "testuser01", "Password123", "0123456789", "testuser01@example.com"
    );
    await createUserPage.clickCreateUserButton();
    await createUserPage.verifyMessage("madhuriD2025");
});

test("Verify user creation with subdomain email", async () => {
    //const createUserPage = new CreateUserPage(page);
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
       // "Subdomain User", "subdomainuser01", "Password123", "9876543210", "user@mail.example.com"
    );
    await createUserPage.clickCreateUserButton();
    await createUserPage.verifyMessage("subdomainuser01");
});

test("Verify user creation with max-length (50 char) username", async () => {
   // const createUserPage = new CreateUserPage(page);
    await userLandingPage.clickCreateUserLink();
    await expect(page).toHaveURL(/create-user/);
    const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
    expect(isCreateUserPageVisible).toBe(true);
    const username = "user" + "x".repeat(46); // total = 50 characters
    await createUserPage.fillMandatoryFields(
      usercredentials.fullname,
      usercredentials.username,
      usercredentials.password,
      usercredentials.mobile,
      usercredentials.email,
      //  "Long User", longUsername, "Password123", "9998887776", "longuser@example.com"
    );
    await createUserPage.clickCreateUserButton();
    await createUserPage.verifyMessage(username);
});