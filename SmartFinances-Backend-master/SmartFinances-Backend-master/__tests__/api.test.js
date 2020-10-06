const request = require('supertest');
const app = require('../app');

const userCredentials = {
  email: 'usertest@gmail.com',
  password: '1234',
  role: 'user',
};
var token, signinResponse, userDetails;

describe('checks user details', () => {
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/signin')
      .send(userCredentials);

    signinResponse = response.body;

    token = response.body.token;

    const getUserDetails = await request(app)
      .get('/api/user/dashboard')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(getUserDetails.status).toBe(200);

    userDetails = getUserDetails.body[0];
  });

  it('checks the token', async (done) => {
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

  it('checks get user details API', async (done) => {
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

  it('checks investment withdraw API', async (done) => {
    const investmnentWithdraw = await request(app)
      .post('/api/user/investmentwithdraw')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        accountNumber: userDetails.accountNumber,
        walletAccountNumber: userDetails.walletAccountNumber,
        walletFund: '1',
      });

    expect(investmnentWithdraw.status).toBe(200);
    expect(investmnentWithdraw.res.statusMessage).toBe('OK');
    done();
  });

  it('checks investment sell APIs', async (done) => {
    const investmentSellDetails = await request(app)
      .post('/api/user/getinvestments')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: userDetails.walletAccountNumber,
      });
    expect(investmentSellDetails.body[0]).toMatchObject({
      //investmentType: 'lowRiskFund', companyName: 'ANZ'
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
    expect(investmentSellDetails.body[1]).toMatchObject({
      //investmentType: 'savingScheme', companyName: 'ME Term Deposit'
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
    expect(investmentSellDetails.body[2]).toMatchObject({
      //investmentType: 'savingScheme', companyName: 'AMP Term Deposit'
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
    expect(investmentSellDetails.body[3]).toMatchObject({
      //investmentType: 'lowRiskFund', companyName: 'fgg', pricePerUnit: 30
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
    expect(investmentSellDetails.body[4]).toMatchObject({
      //investmentType: 'lowRiskFund', companyName: 'fgg', pricePerUnit: 40
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
    expect(investmentSellDetails.res.statusMessage).toBe('OK');

    const investmentSellOptions = await request(app)
      .post('/api/user/investmentOptions')
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
      companyStockSymbol: expect.any(String),
    });
    expect(investmentSellOptions.status).toBe(200);
    expect(investmentSellOptions.res.statusMessage).toBe('OK');

    const sellInvestments = await request(app)
      .post('/api/user/investmentsell')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: userDetails.walletAccountNumber,
        investmentType: investmentSellDetails.body[0].investmentType,
        companyName: investmentSellDetails.body[0].companyName,
        numberOfUnits: '1',
      });
    expect(sellInvestments.body).toMatchObject({
      Success: 'Sold successfully and your balances are updated',
    });
    expect(sellInvestments.status).toBe(200);
    expect(sellInvestments.res.statusMessage).toBe('OK');
    done();
  });

  it('checks add funds to wallet', async (done) => {
    const addFundsToWallet = await request(app)
      .post('/api/user/walletbalance')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: 'SFW001',
        walletFund: 10,
      });

    expect(addFundsToWallet.body).toMatchObject({
      Success: 'Funds added successfully to wallet and Balances are updated',
    });
    expect(addFundsToWallet.status).toBe(200);
    expect(addFundsToWallet.res.statusMessage).toBe('OK');
    done();
  });

  it('checks invest funds', async (done) => {
    const investFunds = await request(app)
      .post('/api/user/userinvestments')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        accountNumber: userDetails.accountNumber,
        walletAccountNumber: userDetails.walletAccountNumber,
        investmentType: 'savingScheme',
        companyName: 'ME Term Deposit',
        numberOfUnits: 1,
      });

    expect(investFunds.body).toMatchObject({
      Success: 'Amount Invested and updated Balances',
    });
    expect(investFunds.status).toBe(200);
    expect(investFunds.res.statusMessage).toBe('OK');
    done();
  });

  it('checks transaction history', async (done) => {
    const getTransactionHistory = await request(app)
      .post('/api/user/transactionhistory')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        walletAccountNumber: userDetails.walletAccountNumber,
      });

    expect(getTransactionHistory.body[0]).toMatchObject({
      _id: expect.any(String),
      walletAccountNumber: expect.any(String),
      category: expect.any(String),
      subcategory: expect.any(String),
      amount: expect.any(Number),
      date: expect.any(String),
      __v: expect.any(Number),
    });
    expect(getTransactionHistory.status).toBe(200);
    expect(getTransactionHistory.res.statusMessage).toBe('OK');
    done();
  });

  it('checks get profile settings', async (done) => {
    const getProfileSettings = await request(app)
      .post('/api/user/changeProfileSettings')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        useraccountNumber: userDetails.accountNumber,
        userphoneNumber: '61481831824',
      });

    expect(getProfileSettings.body).toMatchObject({
      Success: 'User Profile is updated',
    });
    expect(getProfileSettings.status).toBe(200);
    expect(getProfileSettings.res.statusMessage).toBe('OK');
    done();
  });

  it('checks get fund', async (done) => {
    const getFund = await request(app)
      .post('/api/admin/manageFund')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        fundId: 22222,
      });

    expect(getFund.body).toMatchObject({
      _id: expect.any(String),
      fundId: expect.any(Number),
      fundTitle: expect.any(String),
      returnOfInvestment: expect.any(Number),
      description: expect.any(String),
      __v: expect.any(Number),
    });
    expect(getFund.status).toBe(200);
    expect(getFund.res.statusMessage).toBe('OK');
    done();
  });

  it('checks get user', async (done) => {
    const getUser = await request(app)
      .post('/api/admin/manageUser')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        tfnNumber: 19087,
        phoneNumber: 61481831824,
        emailId: userCredentials.email,
      });

    expect(getUser.body).toMatchObject({
      _id: expect.any(String),
      accountNumber: expect.any(Number),
      emailId: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      bankName: expect.any(String),
      address: expect.any(String),
      tfnNumber: expect.any(Number),
      phoneNumber: expect.any(Number),
      openingBalance: expect.any(Number),
      __v: expect.any(Number),
    });
    expect(getUser.status).toBe(200);
    expect(getUser.res.statusMessage).toBe('OK');
    done();
  });

  it('checks create user', async (done) => {
    const createUser = await request(app)
      .post('/api/admin/createNewUser')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        accountNumber: 756, //Use different details each time creating new user
        emailId: 'newuser4@gmail.com',
        firstName: 'new4',
        lastName: 'user4',
        bankName: 'newbank4',
        address: '1123232145',
        tfnNumber: 423311,
        phoneNumber: 6114251515,
        openingBalance: 5000,
      });

    expect(createUser.body).toMatchObject({
      newUser: {
        _id: expect.any(String),
        accountNumber: expect.any(Number),
        emailId: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        bankName: expect.any(String),
        address: expect.any(String),
        tfnNumber: expect.any(Number),
        phoneNumber: expect.any(Number),
        openingBalance: expect.any(Number),
        __v: expect.any(Number),
      },
    });
    expect(createUser.status).toBe(200);
    expect(createUser.res.statusMessage).toBe('OK');
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

  it('checks investment companies', async (done) => {
    const getInvestmentCompanies = await request(app)
      .post('/api/user/company')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        investmentType: 'savingScheme',
      });

    expect(getInvestmentCompanies.body[0].investmentType).toBe('savingScheme');
    expect(getInvestmentCompanies.body[0]).toMatchObject({
      _id: expect.any(String),
      companyName: expect.any(String),
      investmentType: expect.any(String),
      percentageOfReturns: expect.any(Number),
      __v: expect.any(Number),
      pricePerUnit: expect.any(Number),
    });

    expect(getInvestmentCompanies.status).toBe(200);
    expect(getInvestmentCompanies.res.statusMessage).toBe('OK');
    done();
  });

  it('checks phone number', async (done) => {
    const getPhoneNumber = await request(app)
      .post('/api/admin/getPhoneNumber')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        email: userCredentials.email,
      });

    expect(getPhoneNumber.body).toMatchObject({
      phoneNumber: expect.any(Number),
    });
    expect(getPhoneNumber.status).toBe(200);
    expect(getPhoneNumber.res.statusMessage).toBe('OK');
    done();
  });
});
