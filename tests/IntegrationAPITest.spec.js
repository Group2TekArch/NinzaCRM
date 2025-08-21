const { test, expect,request } = require('@playwright/test');
const {generateCreateUserPayload,generateCampaignPayload,UpdateCampaignPayload, UpdateContactPayload} = require('../test-data/IntegrationAPITestPayload');
let nonadminusername, nonadminpassword,jwtToken,campaignID, contactId;

test('Create non Admin user', async() =>{
    const apiContext = await request.newContext({
        httpCredentials: {
          username: 'rmgyantra',
          password: 'rmgy@9999'
        }
      });
      const userdata = await generateCreateUserPayload();
      console.log("payload:",userdata);
      const response = await apiContext.post('http://49.249.28.218:8098/admin/create-user',{
        data:userdata
      });
    
      console.log('Status:', response.status());
      console.log('Body:', await response.text());
    
      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
      const body = await response.json();
      //expect(body).toContain(body.username);
      expect(body.username).toBe(userdata.username);
      //expect(body.username).toEqual(userdata.username);
      //expect(body).toContain(body.password);
      //expect(body.password).toEqual(userdata.password);

      nonadminusername = userdata.username;
  nonadminpassword = userdata.password;
})


test('Login using non Admin user',async() => {
    const userdata = await generateCreateUserPayload();
    const password = userdata.password;
    const apiContext = await request.newContext({
        httpCredentials: {
          username: nonadminusername,
          password: nonadminpassword
        }
      });
    
      const response = await apiContext.get('http://49.249.28.218:8098/login');
    
      console.log('Status:', response.status());
      console.log('Body:', await response.text());
    
      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(202);
      const body = await response.json();
      expect(body.msg).toEqual("Successfully Logged In");
      jwtToken = body.jwtToken;
      console.log('jwtToken:', jwtToken);
})

test('Create campaign', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await generateCampaignPayload();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
      const body = await response.json();
      console.log('body',body);
      campaignID = body.campaignId;
      console.log('campaign ID:',campaignID)
      expect(campaignID).toBeTruthy();
      expect(campaignID.length).toBeGreaterThan(0);
})
test('Get all campaign', async() =>{
    const apiContext = await request.newContext();
    const response = await apiContext.get(`http://49.249.28.218:8098/campaign/all`);

    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
    
    
})

test('update campaign', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await UpdateCampaignPayload();
    const response = await apiContext.put(`http://49.249.28.218:8098/campaign?campaignId=${campaignID}`, {
        data: campaigndata
    });

    console.log('Status:', response.status());
    console.log('Body:', await response.text());

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.campaignId).toEqual(`${campaignID}`);
})

test('Create Contact with Updated Campaign', async() => {
    const apiContext = await request.newContext();
    const payload = await UpdateCampaignPayload();
    const updateresponse = await apiContext.post(`http://49.249.28.218:8098/contact?campaignId=${campaignID}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:payload
      });
        
    console.log('Status:', updateresponse.status());
    console.log('Body:', await updateresponse.text());

    expect(updateresponse.ok).toBeTruthy();
    expect(updateresponse.status()).toBe(201);
    const body = await updateresponse.json();
    console.log('Response Body:', body);
    contactId = body.contactId;
    expect(body.contactId).toBeTruthy();
    expect(body.contactId.length).toBeGreaterThan(0);
})

test('getAllContact', async() =>{
  const apiContext = await request.newContext({
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  });
  const response = await apiContext.get('http://49.249.28.218:8098/contact/all');

  console.log('Status:', response.status());
  console.log('Body:', await response.text());

  expect(response.ok).toBeTruthy();
  expect(response.status()).toBe(200);
})

test('update contact', async() =>{
  const apiContext = await request.newContext();
   const contactdata = await UpdateContactPayload();
   const response = await apiContext.put('http://49.249.28.218:8098/contact?contactId=CON01530&campaignId=CAM07816',{
    headers: {
      Authorization: `Bearer ${jwtToken}`
    },
     data: contactdata
  });
 
  console.log('Status:', response.status());
  console.log('Body:', await response.text());

  expect(response.ok).toBeTruthy();
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.contactId).toEqual("CON01530");
})

test('delete contact', async() =>{
  const apiContext = await request.newContext();
  const response = await apiContext.delete(`http://49.249.28.218:8098/contact?contactId=${contactId}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  });

  console.log('Delete Status:', response.status());
  expect(response.status()).toBe(204);
  
  const body = await response.text();
  console.log("Delete Response:", body);
  
})
