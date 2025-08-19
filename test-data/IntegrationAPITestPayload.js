const {
    generateRandomEmail,
    generateRandomUserName,
    generateRandomMobileNo,
    generateRandomString
  } = require('../utils/helpers');

  async function generateCreateUserPayload() {
    return {
    department: "IT",
    designation: "IT Manager",
    dob: "",
    email: await generateRandomEmail(),
    empName: "aab",
    experience: 0,
    mobileNo: await generateRandomMobileNo(),
    role: "ROLE_EMPLOYEE",
    username: await generateRandomUserName(),
    password:"playwright1234"
  };
}

async function generateCampaignPayload() {
    return {
    "campaignId": "",
    "campaignName": `Camp_${generateRandomString(4)}`,
    "campaignStatus": "active",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
}

async function UpdateCampaignPayload() {
    return {
       
  "campaign": {
    "campaignId": "CAM06729",
    "campaignName": "Abc",
    "campaignStatus": "pending",
    "description": "wertyughjdisd",
    "expectedCloseDate": "11/12/1990",
    "targetAudience": "youth",
    "targetSize": 0
  },
  "contactId": "",
  "contactName": "pqrst",
  "department": "Finance",
  "email": "pqrttwt@gmail.com",
  "mobile": "1383567890",
  "officePhone": "765632189",
  "organizationName": "Apple",
  "title": "Uvwxyz"

};
}

module.exports = { 
   generateCreateUserPayload,
    generateCampaignPayload
    ,UpdateCampaignPayload
 };

