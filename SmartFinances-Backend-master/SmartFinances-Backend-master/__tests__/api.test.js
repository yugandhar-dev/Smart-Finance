const request = require("supertest");
const app = require("../app");

const userCredentials = {
  email: "usertest@gmail.com",
  password: "1234",
  role: "user",
};
var token, signinResponse, userDetails;

describe("checks user details", () => {
  beforeAll(async () => {
    const response = await request(app)
      .post("/api/signin")
      .send(userCredentials);

    signinResponse = response.body;

    token = response.body.token;

    const getUserDetails = await request(app)
      .get("/api/user/dashboard")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(getUserDetails.status).toBe(200);

    userDetails = getUserDetails.body[0];
  });

  it("checks the token", async (done) => {
    expect(signinResponse).toMatchObject({
      token: expect.any(String),
      user: {
        email: expect.stringMatching(userCredentials.email),
        role: expect.stringMatching(userCredentials.role),
        _id: expect.any(String),
        name: expect.any(String),
      },
    });
    done();
  });

  it("checks get user details API", async (done) => {
    expect(userDetails).toMatchObject({
      _id: expect.any(String),
      walletAccountNumber: expect.any(String),
      accountNumber: expect.any(Number),
      accountBalance: expect.any(Number),
      walletAccountBalance: expect.any(Number),
      exchangeTradedFund: expect.any(Number),
      savingScheme: expect.any(Number),
      totalfunds: expect.any(Number),
    });
    done();
  });

  it("checks investment withdraw API", async (done) => {
    const investmnentWithdraw = await request(app)
      .post("/api/user/investmentwithdraw")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        accountNumber: userDetails.accountNumber,
        walletAccountNumber: userDetails.walletAccountNumber,
        walletFund: "1",
      });

    expect(investmnentWithdraw.status).toBe(200);
    expect(investmnentWithdraw.res.statusMessage).toBe("OK");
    done();
  });

  it("checks investment sell APIs", async (done) => {
    const investmentSellDetails = await request(app)
      .post("/api/user/getinvestments")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: userDetails.walletAccountNumber,
      });
    expect(investmentSellDetails.body[0]).toMatchObject({  //investmentType: 'lowRiskFund', companyName: 'ANZ'
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      walletAccountNumber: expect.any(String),
      investmentType: expect.any(String),
      companyName: expect.any(String),
      numberOfUnits: expect.any(Number),
      amountInvested: expect.any(Number), 
      pricePerUnit: expect.any(Number),
      createdDate: expect.any(String),
    });
    expect(investmentSellDetails.body[1]).toMatchObject({  //investmentType: 'savingScheme', companyName: 'ME Term Deposit'
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      walletAccountNumber: expect.any(String),
      investmentType: expect.any(String),
      companyName: expect.any(String),
      numberOfUnits: expect.any(Number),
      amountInvested: expect.any(Number),
      pricePerUnit: expect.any(Number),
      createdDate: expect.any(String),
    });
    expect(investmentSellDetails.body[2]).toMatchObject({  //investmentType: 'savingScheme', companyName: 'AMP Term Deposit'
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      walletAccountNumber: expect.any(String),
      investmentType: expect.any(String),
      companyName: expect.any(String),
      numberOfUnits: expect.any(Number),
      amountInvested: expect.any(Number),
      pricePerUnit: expect.any(Number),
      createdDate: expect.any(String),
    });
    expect(investmentSellDetails.body[3]).toMatchObject({  //investmentType: 'lowRiskFund', companyName: 'fgg', pricePerUnit: 30
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      //walletAccountNumber: expect.any(String),
      investmentType: expect.any(String),
      companyName: expect.any(String),
      numberOfUnits: expect.any(Number),
      amountInvested: expect.any(Number),
      pricePerUnit: expect.any(Number),
      //createdDate: expect.any(String),
    });
    expect(investmentSellDetails.body[4]).toMatchObject({  //investmentType: 'lowRiskFund', companyName: 'fgg', pricePerUnit: 40
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      //walletAccountNumber: expect.any(String),
      investmentType: expect.any(String),
      companyName: expect.any(String),
      numberOfUnits: expect.any(Number),
      amountInvested: expect.any(Number),
      pricePerUnit: expect.any(Number),
      //createdDate: expect.any(String),
    });
    expect(investmentSellDetails.status).toBe(200);
    expect(investmentSellDetails.res.statusMessage).toBe("OK");

    const investmentSellOptions = await request(app)
      .post("/api/user/investmentOptions")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        investmentType: investmentSellDetails.body[0].investmentType,
        companyName: investmentSellDetails.body[0].companyName,
      });
      expect(investmentSellOptions.body[0]).toMatchObject({
        _id: expect.any(String),
        companyName: expect.any(String),
        investmentType: expect.any(String),
        pricePerUnit: expect.any(Number),
        __v: expect.any(Number),
        companyStockSymbol: expect.any(String)
      });
    expect(investmentSellOptions.status).toBe(200);
    expect(investmentSellOptions.res.statusMessage).toBe("OK");

    const sellInvestments = await request(app)
      .post("/api/user/investmentsell")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: userDetails.walletAccountNumber,
        investmentType: investmentSellDetails.body[0].investmentType,
        companyName: investmentSellDetails.body[0].companyName,
        numberOfUnits: "1",
      });
    expect(sellInvestments.body).toMatchObject({ Success: 'Sold successfully and your balances are updated' })  
    expect(sellInvestments.status).toBe(200);
    expect(sellInvestments.res.statusMessage).toBe("OK");
    done();

  });

  it('checks all investment options', async (done) => {
    const getAllInvestmentOptions = await request(app)
      .get('/api/user/allInvestments')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(getAllInvestmentOptions.body[0]).toMatchObject({
      _id: expect.any(String),
      companyName: expect.any(String),
      investmentType: expect.any(String),
      pricePerUnit: expect.any(Number),
      __v: expect.any(Number),
      companyStockSymbol: expect.any(String),
    });

    expect(getAllInvestmentOptions.body[1]).toMatchObject({
      _id: expect.any(String),
      companyName: expect.any(String),
      investmentType: expect.any(String),
      pricePerUnit: expect.any(Number),
      __v: expect.any(Number),
    });

    expect(getAllInvestmentOptions.status).toBe(200);
    expect(getAllInvestmentOptions.res.statusMessage).toBe('OK');
    done();
  });
});
