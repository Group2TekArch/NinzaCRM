const { test, expect } = require('@playwright/test');

const path = require('path');
const { POManager } = require('../pages/POManager');
const { usercredentials, passwordandmobilewithspecialcharacters} = require('../utils/createUserData');
const { credentials } = require('../utils/loginData');

let page,poManager,userLandingPage,createUserPage;
  test.beforeAll(async ({ browser }) => {
  const storageStatePath = path.resolve(__dirname, '../storageState.json'); // adjust path if needed
  const context = await browser.newContext({ storageState: storageStatePath });

//const { POManager } = require('../pages/POManager');
//const { usercredentials } = require('../utils/createUserData');
//const { credentials } = require('../utils/loginData');
//let page,poManager,userLandingPage,createUserPage;

//test.beforeAll(async ({ browser }) => {
 // const storageStatePath = path.resolve(__dirname, '../storageState.json');
  //const context = await browser.newContext({ storageState: 'storageState.json' });

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


test("Verify user creation with exactly 6 characters in password", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const randomUserName = `group2ninza${randomNumber}`;

  const randomEmail = `group2ninza${randomNumber}@tekarch.com`

  const randomMobileNumber = Math.floor(Math.random() * 9000) + 1000;
  const randomMobile = `980234${randomMobileNumber}`;

  const passwordwithsixchar = '123456';

  await  createUserPage.fillMandatoryFields(
    passwordandmobilewithspecialcharacters.fullname,
    randomUserName,
    passwordwithsixchar,
    randomMobile,
    randomEmail,
  );
  await createUserPage.clickCreateUserButton();
  await createUserPage.verifyMessage(passwordandmobilewithspecialcharacters.username);

});

test("Verify user creation with special characters in password", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const randomUserName = `group2ninza${randomNumber}`;

  const randomEmail = `group2ninza${randomNumber}@tekarch.com`

  const randomMobileNumber = Math.floor(Math.random() * 9000) + 1000;
  const randomMobile = `980234${randomMobileNumber}`;

  const passwordwithspecialchar = '@Secure#123!';

  await  createUserPage.fillMandatoryFields(
    passwordandmobilewithspecialcharacters.fullname,
    randomUserName,
    passwordwithspecialchar,
    randomMobile,
    randomEmail,
  );
  await createUserPage.clickCreateUserButton();
  await createUserPage.verifyMessage(passwordandmobilewithspecialcharacters.username);

});

test("Verify user creation with special characters in mobile", async () => {
  await userLandingPage.clickCreateUserLink();
  await expect(page).toHaveURL(/create-user/);
  const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
  expect(isCreateUserPageVisible).toBe(true);

  const randomNumber = Math.floor(Math.random() * 500) + 1;
  const randomUserName = `group2ninza${randomNumber}`;

  const randomEmail = `group2ninza${randomNumber}@tekarch.com`

  const randomMobileNumber = Math.floor(Math.random() * 9000) + 1000;
  const randomMobile = `980-234-${randomMobileNumber}`;

  await  createUserPage.fillMandatoryFields(
    passwordandmobilewithspecialcharacters.fullname,
    randomUserName,
    passwordandmobilewithspecialcharacters.password,
    randomMobile,
    randomEmail,
  );
  await createUserPage.clickCreateUserButton();
  await createUserPage.verifyMessage(passwordandmobilewithspecialcharacters.username);

});

// for (const password of passwordField) {
//   test(`Create user successfully with password having only 6 characters and special characters: ${JSON.stringify(password)}`, async () => {
//     await userLandingPage.clickCreateUserLink();
//     await expect(page).toHaveURL(/create-user/);
//     const isCreateUserPageVisible = await createUserPage.isCreateUserPageVisible();
//     expect(isCreateUserPageVisible).toBe(true);

//     const randomNumber = Math.floor(Math.random() * 500) + 1;
//     const randomUserName = `ninza${randomNumber}`;
   
//     const randomMobileNumber = Math.floor(Math.random() * 9000) + 1000;
//     const randomMobile = `980234${randomMobileNumber}`;

//     const randomEmail = `ninzauser${randomNumber}@tekarch.com`;

//     await  createUserPage.fillMandatoryFields(
//         passwordField.fullname,
//           passwordField.randomUserName,
//           passwordField.password,
//           passwordField.randomMobile,
//           passwordField.randomEmail,
      
//         );

//     await createUserPage.clickCreateUserButton();
//     await createUserPage.verifySuccessMessage(passwordField.username);

    
//   });
// }

