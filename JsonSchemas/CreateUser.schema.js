const createuserSchema = {
    "type": "object",
    "properties": {
      "empId": {
        "type": "string"
      },
      "empName": {
        "type": "string"
      },
      "mobileNo": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "dob": {
        "type": "string"
      },
      "experience": {
        "type": "number"
      },
      "username": {
        "type": "string"
      },
      "designation": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "role": {
        "type": "string"
      },
      "department": {
        "type": "string"
      }
    },
    "required": [
      "empId",
      "empName",
      "mobileNo",
      "email",
      "dob",
      "experience",
      "username",
      "designation",
      "password",
      "role",
      "department"
    ]
  };
  
  module.exports = { createuserSchema };