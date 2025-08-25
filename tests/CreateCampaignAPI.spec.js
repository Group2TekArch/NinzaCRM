const { test, expect,request } = require('@playwright/test');
const CampaignData = require('../test-data/CreateCampaignPayload');
let nonadminusername, nonadminpassword,jwtToken,campaignID, empID;
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { createuserSchema } = require('../JsonSchemas/CreateUser.schema');


test('Create non Admin user', async() =>{
    const apiContext = await request.newContext({
        httpCredentials: {
          username: 'rmgyantra',
          password: 'rmgy@9999'
        }
      });
      const userdata = await CampaignData.generateCreateUserPayload();
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
      empID = body.empId

      const ajv = new Ajv();
      addFormats(ajv); 
      const validate = ajv.compile(createuserSchema);
      const valid = validate(body);

      expect(valid).toBe(true);
      if (!valid) {
          console.error(validate.errors);
      }
  

      nonadminusername = userdata.username;
  nonadminpassword = userdata.password;
})


test('Login using non Admin user',async() => {
    const userdata = await CampaignData.generateCreateUserPayload();
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

test('Create campaign with invalid campaign name', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.invalidCampaignName();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
 })

 test('Create campaign with invalid campaign status', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.invalidCampaignStatus();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
 })

 test('Create campaign with invalid campaign close date', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.invalidCampaignCloseDate();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
 })

 test('Create campaign with invalid campaign desc', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.invalidCampaignDesc();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
 })

 test('Create campaign with invalid campaign target size', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.invalidCampaignTargetSize();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(201);
 })

 test('Create campaign with blank campaign name', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.blankCampaignName();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with blank campaign status', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.blankCampaignStatus();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with blank campaign close date', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.blankCampaignCloseDate();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with blank campaign desc', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.blankCampaignDesc();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with blank campaign target size', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.blankCampaignTargetSize();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })


 test('Create campaign with no campaign name', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.noCampaignName();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with no campaign status', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.noCampaignStatus();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with no campaign close date', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.noCampaignCloseDate();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with no campaign desc', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.noCampaignDesc();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

 test('Create campaign with no campaign target size', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.noCampaignTargetSize();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(500);
 })

test('Create campaign', async() =>{
    const apiContext = await request.newContext();
    const campaigndata = await CampaignData.generateCampaignPayload();
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
    const campaigndata = await CampaignData.UpdateCampaignPayload();
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


test('Create campaign - invalid credentials', async() =>{
    const apiContext = await request.newContext({
        httpCredentials: {
        username: 'rmgyantra',
        password: 'rmgy@1234'
      }
    });
    const campaigndata = await CampaignData.generateCampaignPayload();
    const response = await apiContext.post('http://49.249.28.218:8098/campaign', {
        headers: {
            Authorization: `Bearer `
          },
        data:campaigndata
      });

      expect(response.ok).toBeTruthy();
      expect(response.status()).toBe(401);
    
})
