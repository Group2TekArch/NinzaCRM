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
    }
};

async function invalidCampaignName() {
    return {
    "campaignId": "",
    "campaignName": `%&*$#$###${generateRandomString(4)}`,
    "campaignStatus": "active",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function invalidCampaignStatus() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "%$^$&%&",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function invalidCampaignDesc() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "$#%#%#%#%#",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function invalidCampaignCloseDate() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "expectedCloseDate": "05/04/2024",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function invalidCampaignTargetSize() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "expectedCloseDate": "05/04/2024",
    "targetAudience": "",
    "targetSize": -5
  };
};

async function blankCampaignName() {
    return {
    "campaignId": "",
    "campaignName": "",
    "campaignStatus": "active",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function blankCampaignStatus() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function blankCampaignDesc() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function blankCampaignCloseDate() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function blankCampaignTargetSize() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "expectedCloseDate": "05/04/2024",
    "targetAudience": "",
    "targetSize": ''
  };
};

async function noCampaignName() {
    return {
    "campaignId": "",
    "campaignStatus": "active",
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function noCampaignStatus() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "description": "test campaign data",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function noCampaignDesc() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "expectedCloseDate": "",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function noCampaignCloseDate() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "targetAudience": "",
    "targetSize": 0
  };
};

async function noCampaignTargetSize() {
    return {
    "campaignId": "",
    "campaignName": `camp_${generateRandomString(4)}`,
    "campaignStatus": "Active",
    "description": "test",
    "expectedCloseDate": "05/04/2024",
    "targetAudience": ""
  };
};


module.exports = {
  generateCreateUserPayload,
  generateCampaignPayload,
  UpdateCampaignPayload,
  invalidCampaignName,
  invalidCampaignStatus,
  invalidCampaignDesc,
  invalidCampaignCloseDate,
  invalidCampaignTargetSize,
  blankCampaignName,
  blankCampaignStatus,
  blankCampaignDesc,
  blankCampaignCloseDate,
  blankCampaignTargetSize,
  noCampaignName,
  noCampaignStatus,
  noCampaignDesc,
  noCampaignCloseDate,
  noCampaignTargetSize
 };

