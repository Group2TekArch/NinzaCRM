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
  "email": await generateRandomEmail(),
  "mobile": await generateRandomMobileNo(),
  "officePhone": "765632189",
  "organizationName": "Apple",
  "title": "Uvwxyz"

};
}

async function UpdateContactPayload() {
    return {
      "contactId": "CON01530",
      "contactName": "Contact_78064",
      "organizationName": "Organization_78064",
      "title": "string",
      "department": "string",
      "officePhone": "string",
      "mobile": "8546278064",
      "email": null,
      "campaign": {
        "campaignId": "CAM07816",
        "campaignName": "Campaigny",
        "campaignStatus": "string",
        "targetSize": 100,
        "expectedCloseDate": "string",
        "targetAudience": "string",
        "description": "string"
      }
    }
};

module.exports = {
  generateCreateUserPayload,
  generateCampaignPayload,
  UpdateCampaignPayload,
  UpdateContactPayload
 };

