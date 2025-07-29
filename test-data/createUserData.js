const usercredentials = {
    fullname: 'nsts user',
    username: 'ninzauser1109',
    password:'ninzauser1109',
    mobile:'1234567890',
    email:'ninzauser1@tekarch.com',
    dob:'05/06/2014'
  };

const passwordandmobilewithspecialcharacters = {
  fullname: 'ninzagrouptwo',
  username: 'group2ninza',
  password: '123456',
  mobile:'980234',
  email:'group2ninza@tekarch.com',
  dob:'05/06/2014'

};

const invalidEmailData = {
  fullname: 'ninzagrouptwo',
  username: 'group2ninza',
  password: '123456',
  mobile:'980234',
  email:'group2ninza@tekarch',
  dob:'05/06/2014',
  errormsg:'Please enter a valid email address'
};

const invalidMobileData = {
  fullname: 'groupninza@1234',
  username: 'groupninza',
  password: 'group123',
  mobile:'abcd@v',
  email:'group2ninza@tekarch.com',
  dob:'05/06/2014',
  moberrorField: 'mobile',
  fullnameerrorField: 'fullName'
  }


const invalidData= [
  {
    "fullname": "",
    "username": "group2ninza",
    "password": "123456",
    "mobile":"98023456789",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "fullName",
    "errormsg":"Please fill out this field."
  },
  {
    "fullname": "groupninza",
    "username": "group2ninza",
    "password": "123456",
    "mobile":"",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "mobile",
    "errormsg":"Please fill out this field."
  },
  {
    "fullname": "groupninza",
    "username": "group2ninza",
    "password": "group2ninza",
    "mobile":"1234567890",
    "email":"",
    "dob":"05/06/2014",
    "errorField": "email",
    "errormsg":"Please fill out this field."
  },
  {
    "fullname": "groupninza",
    "username": "",
    "password": "group2ninza",
    "mobile":"1234567890",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "userName",
    "errormsg":"Please fill out this field."
  },
  {
    "fullname": "groupninza",
    "username": "group2ninza",
    "password": "",
    "mobile":"1234567890",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "password",
    "errormsg":"Please fill out this field."
  },
  {
    "fullname": "groupninza",
    "username": "gr",
    "password": "group2ninza",
    "mobile":"1234567890",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "userName",
    "errormsg":"Please lengthen this text to 6 characters or more (you are currently using 2 characters)."
  },
  {
    "fullname": "groupninza",
    "username": "groupninza",
    "password": "grou",
    "mobile":"1234567890",
    "email":"group2ninza@tekarch.com",
    "dob":"05/06/2014",
    "errorField": "password",
    "errormsg":"Please lengthen this text to 6 characters or more (you are currently using 4 characters)."
  }
];



//   const passwordField = [
//     {
//       fullname: 'ninzagroup2users',
//       username: 'ninza',
//       password: '123456',
//       mobile:'980234',
//       email:'ninzauser@tekarch.com',
//       dob:'05/06/2014'
//     },
//     {
//       fullname: 'ninzagroup2user',
//       username: 'ninza',
//       password: '@Secure#123!',
//       mobile:'980234',
//       email:'ninzauser@tekarch.com',
//       dob:'05/06/2014'
//     }
// ];

module.exports = {
  invalidData,
  usercredentials,
  passwordandmobilewithspecialcharacters,
  invalidEmailData,
  invalidMobileData
};