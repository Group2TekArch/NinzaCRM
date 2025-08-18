
const {
  generateRandomEmail,
  generateRandomMobileNo,
  generateRandomUserName,
  generateRandomString
} = require('../utils/helpers'); 

// Build a fully valid payload using your random helpers
//email field is missing
async function missingRequiredFields() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "securePassword123"
  };
};


async function emptyField() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',              // YYYY-MM-DD
    email: await generateRandomEmail(),          
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: '',                              // Empty mobile number
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "securePassword123"
  };
};

async function invalidEmailFormat() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    email: 'test@invalid', 
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),                              
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "securePassword123"
  };
}

async function correctDataWithWrongHTTPMethod() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    email: await generateRandomEmail(),
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),                              
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "securePassword123"
  };
}



async function duplicateUsername() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    email: await generateRandomEmail(),
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),                              
    role: 'Engineer',
    username: 'APUser69',
    password: "securePassword123"
  };
};

async function MissingAuthentication() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    email: await generateRandomEmail(),
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),                              
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "securePassword123"
  };
};

async function WeakPassword() {
  return {
    department: 'QA',
    designation: 'Tester',
    dob: '1995-08-17',            // YYYY-MM-DD
    email: await generateRandomEmail(),
    empName: await generateRandomString(6),
    experience: 3,
    mobileNo: await generateRandomMobileNo(),                              
    role: 'Engineer',
    username: await generateRandomUserName(),
    password: "123"
  };
};

module.exports = { 
   missingRequiredFields,
   emptyField,
   invalidEmailFormat,
   correctDataWithWrongHTTPMethod,
   duplicateUsername,
   MissingAuthentication,
   WeakPassword
};



