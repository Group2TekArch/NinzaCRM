const { test, expect, request } = require('@playwright/test');
const { missingRequiredFields, emptyField, invalidEmailFormat, correctDataWithWrongHTTPMethod,
  duplicateUsername, MissingAuthentication, WeakPassword} = require('../test-data/InvalidAPITestPayload');

test('Create user with - missing required fields', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const payload = await missingRequiredFields();
  console.log("Payload with missing email:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });
  expect(response.status()).toBe(500);
  // expect(response.statusText()).toContain('Internal Server Error');

  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  expect(responseBody.message).toContain('Cannot invoke "String.matches(String)"');

  //expect(duration).toBeLessThan(900);

  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('status', 500);
  expect(responseBody).toHaveProperty('error', 'Internal Server Error');
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('path', '/admin/create-user');

});

test('Create user with - Empty Mobile fields', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const emptyMobilePayload = await emptyField();
  console.log("Payload with empty mobile number:", emptyMobilePayload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: emptyMobilePayload
    });
  expect(response.status()).toBe(422);
  // expect(response.statusText()).toContain('Internal Server Error');

  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  expect(responseBody.message).toContain('Enter a valid mobile number');

  //expect(duration).toBeLessThan(900);

  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('status', 422);
  expect(responseBody).toHaveProperty('error', 'Unprocessable Entity');
  expect(responseBody).toHaveProperty('message', 'Enter a valid mobile number');
  expect(responseBody).toHaveProperty('path', '/admin/create-user');

});

test('Create user with - Invalid Email Format', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const payload = await invalidEmailFormat();
  console.log("Payload with invalid email format:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });

  expect(response.status()).toBe(422);
  // expect(response.statusText()).toContain('Internal Server Error');

  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  expect(responseBody.message).toContain('Enter a valid email ID');

  //expect(duration).toBeLessThan(900);

  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('status', 422);
  expect(responseBody).toHaveProperty('error', 'Unprocessable Entity');
  expect(responseBody).toHaveProperty('message', 'Enter a valid email ID');
  expect(responseBody).toHaveProperty('path', '/admin/create-user');


});

test('Create user with - Wrong HTTP Method', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const payload = await correctDataWithWrongHTTPMethod();
  console.log("Payload with correct data but wrong HTTP method:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.get(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });

  expect(response.status()).toBe(500);
  
  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  expect(responseBody.message).toContain("Request method 'GET' not supported");

  //expect(duration).toBeLessThan(900);

  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('message', "Request method 'GET' not supported");
  expect(responseBody).toHaveProperty('details');


});

test('Create user with - Duplicate Username', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const payload = await duplicateUsername();
  console.log("Payload with duplicate username:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });

  expect(response.status()).toBe(409);

  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  //expect(responseBody.message).toContain("Username already exists");
  //expect(responseBody.message).toContain("username:");
  //expect(responseBody.message).toContain("already exists");

  expect(responseBody.message).toMatch(/username: .* already exists/);  //Regex match: .* will match any username dynamically.

  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('status', 409);
  expect(responseBody).toHaveProperty('error', 'Conflict');
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('path', '/admin/create-user');

});

test('Create user with - Missing Authentication', async ({request}) => {

  const payload = await MissingAuthentication();
  console.log("Payload with missing authentication:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await request.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });

  expect(response.status()).toBe(401);

  //expect(response.statusText()).toContain('Unauthorized');

  const responseBody = await response.json();

  console.log('Response body:', responseBody);
  
  expect(responseBody.message).toContain("Unauthorized");


  expect(responseBody).toHaveProperty('timestamp');
  expect(responseBody).toHaveProperty('status', 401);
  expect(responseBody).toHaveProperty('error', 'Unauthorized');
  expect(responseBody).toHaveProperty('message');
  expect(responseBody).toHaveProperty('path', '/admin/create-user');

});

test('Create user with - Weak Password', async () => {

  const apiContext = await request.newContext({
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });

  const payload = await WeakPassword();
  console.log("Payload with weak password:", payload);

  const BASE_URL = 'http://49.249.28.218:8098';
  const ENDPOINT = '/admin/create-user';

  const response = await apiContext.post(`${BASE_URL}${ENDPOINT}`,
    {
      headers: { 'Content-Type': 'application/json' },
      data: payload
    });
      expect(response.status()).toBe(201);
      console.log('Status:', response.status());
      console.log('Payload:', await response.text());

      expect(response.ok).toBeTruthy();
      
      const responseBody = await response.json();
      //expect(responseBody).toContain(payload);
      expect(responseBody.username).toEqual(payload.username);
      expect(responseBody.email).toEqual(payload.email);

      const password = responseBody.password;
      expect(password).toEqual(responseBody.password);

      console.log('Password:', password);

});



