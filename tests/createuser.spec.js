const { test, expect } = require('@playwright/test');
const { CreateUserPage } = require("../pages/CreateUserPage");
const { credentials, usercredentials } = require('../utils/createUserData');

test.use({ storageState: 'auth.json' });

test("Verify successful user creation by providing mandatory values",async({page})=>{
    const createUserPage = new CreateUserPage(page);
    await createUserPage.fillMandatoryFields(usercredentials.fullname,usercredentials.username,usercredentials.password,usercredentials.mobile,usercredentials.email);
    await createUserPage.createUserButton();
    await createUserPage.verifyMessage(usercredentials.fullname);
});