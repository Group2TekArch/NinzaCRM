//const { test, expect } = require('@playwright/test');
import {test, expect} from '@playwright/test';
import { POManager } from '../pages/POManager';
import { usercredentials , updatecontactname, noCampaignValue} from '../test-data/createContactData';
import { credentials } from '../test-data/loginData';
import { helpers } from '../utils/helpers';
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

//test("Verify successful contact creation by providing all field values", async () => {

  /*test("Verify successful contact creation by providing mandatory values", async () => {
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
  await contactPage.clickAddButton();
  await page.waitForTimeout(2500);
  await contactPage.verifyMessage(usercredentials.contactName, mobile);
  await contactPage.searchContact(usercredentials.contactName, mobile);
});1Done

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
});2Done*/

/*test("Verify successful updation of contact", async () => {
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
  //await contactPage.updateContact();
  await page.waitForTimeout(2500);

  await contactPage.updateFields(updatecontactname);
  await page.waitForTimeout(2500);

  await contactPage.clickUpdateContactButton();
  await page.waitForTimeout(2500);

  await contactPage.verifyUpdateMessage(usercredentials.contactName, mobile);
  
});3*/
  //await contactPage.verifyMessage(usercredentials.contactName, randomMobile10Digit.toString());


/*4test('Verify if user is able to enter the title in the text box', async () => {
  
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization,
  usercredentials.title, usercredentials.department,
  usercredentials.officePhone, usercredentials.contactName,
  usercredentials.mobile, usercredentials.email,
  usercredentials.campaign);
  const titleValue = await contactPage.getTitleValue();
  console.log("Title Value: ", titleValue);
  // Verify that the title value matches the expected value
  expect(titleValue).toBe(usercredentials.title);

  await contactPage.clickAddButton(); 
  
});

test ('Verify if user is able to enter the Organization name in the text box', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization,
  usercredentials.title, usercredentials.department,
  usercredentials.officePhone, usercredentials.contactName,
  usercredentials.mobile, usercredentials.email,
  usercredentials.campaign);
  const orgValue = await contactPage.getOrganizationValue();
  console.log("Organization Value: ", orgValue);
  // Verify that the organization value matches the expected value
  expect(orgValue).toBe(usercredentials.Organization);

  await contactPage.clickAddButton(); 
});5*/

/*test ('Verify an error message is displayed if Organization Name is not entered', async () => {

  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields('', usercredentials.title, 
     usercredentials.contactName,
    usercredentials.mobile, 
    usercredentials.campaign);
   
  
  await contactPage.clickAddButton();
 await contactPage.verifyErrorMessage();
});Done6*/

/*test('Verify an error message is displayed if title is not entered', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization, '', 
     usercredentials.contactName,
    usercredentials.mobile, 
    usercredentials.campaign);
  
  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessage('title-required.png');
});Done7*/

/*test('verify if user can still create contact leaving the department field blank', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillAllFields(usercredentials.Organization, usercredentials.title, '', 
    usercredentials.officePhone, usercredentials.contactName,
    usercredentials.mobile, usercredentials.email,
    usercredentials.campaign);
  
  await contactPage.clickAddButton();
  await contactPage.verifyMessage();
});Done8*/

/*test ('Verify Office phone field accepts no alphabetical and non-numeric values', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillAllFields(usercredentials.Organization,
    usercredentials.title, usercredentials.department,
    ' ', usercredentials.contactName,
    usercredentials.mobile, usercredentials.email,
    usercredentials.campaign);
  
  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessage('office-phone-required.png');
});DONE9*/

/*test('verify if user can still create contact leaving the Office phone number field blank', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillAllFields(usercredentials.Organization,
    usercredentials.title, usercredentials.department,
    '', usercredentials.contactName,
    usercredentials.mobile, usercredentials.email,
    usercredentials.campaign);

  await contactPage.clickAddButton();
  await contactPage.verifyMessage();
});DONE10*/



/*test('Verify an error message is displayed if Contact Name is not entered'  , async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization,
    usercredentials.title,  '',
    usercredentials.mobile, 
    usercredentials.campaign);

  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessage('contact-name-required.png');
}); Done with hardcore mobile number11*/

/*test('Verify an error message is displayed if Mobile is not entered', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization,
    usercredentials.title,  usercredentials.contactName,
    '', usercredentials.campaign);

  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessage('mobile-required.png');
});   DONE12*/

/*test('Verify contact gets created if Email Id field is left blank', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillAllFields(usercredentials.Organization,
    usercredentials.title, usercredentials.department,
    usercredentials.officePhone,
    usercredentials.contactName,
    usercredentials.mobile, '',
    usercredentials.campaign);

  await contactPage.clickAddButton();
  await contactPage.verifyMessage();
});DONE13*/

/*test('verify if an error message is displayed if user enter invalid email formats', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillAllFields(usercredentials.Organization,
    usercredentials.title, usercredentials.department,
    usercredentials.officePhone, usercredentials.contactName,
    usercredentials.mobile, 'z',
    usercredentials.campaign);


  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessageText('Please enter a valid email address');
  
});DONE14*/

/*test('Verify an error message is displayed if Compaign Name is not entered', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFieldsExceptCampaign(noCampaignValue.Organization,
    noCampaignValue.title,
    noCampaignValue.contactName,
    noCampaignValue.mobile, '');
    

  await contactPage.clickAddButton();
  await contactPage.verifyErrorMesssageforCampaign();
});DONE15*/

/*test('Verify if an error message is displayed on entering existing mobile number', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.fillmandatoryFields(usercredentials.Organization,
    usercredentials.title, 
    usercredentials.contactName,
    usercredentials.mobile,
    usercredentials.campaign);

  await contactPage.clickAddButton();
  await contactPage.verifyErrorMessage('mobile-already-exists.png');

});Done16*/


/*test('verify if a drop down is displayed that shows existing campaign names from CRM database', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);
  await contactPage.isCampaignDropdownVisible();
});DONE17*/

/*test('Verify that contact is created successfully on clicking save/ Create Contact button', async () => {
  await userLandingPage.clickCreateContactLink();
  await expect(page).toHaveURL(/create-contact/);

  // Fill in all required fields
  await contactPage.fillAllFields(
    usercredentials.Organization,
    usercredentials.title,
    usercredentials.department,
    usercredentials.officePhone,
    usercredentials.contactName,
    usercredentials.mobile,
    usercredentials.email,
    usercredentials.campaign
  );

  // Click on the Create Contact button
  await contactPage.clickAddButton();

  // Verify success message
  await contactPage.verifyMessage();
});Done18*/


/*test('Verify User and admin able to update created contact successfully', async () => {
  await userLandingPage.clickCreateContactLink(); 
  await contactPage.updateCreateContact();
});DONE19*/

