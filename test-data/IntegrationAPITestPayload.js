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
  }
}

module.exports = { 
   generateCreateUserPayload,
    generateCampaignPayload
 };

