const request = require("supertest");
const app = require("../app");

const userCredentials = {
  email: "usertest@gmail.com",
  password: "1234",
  role: "user",
};
var token, signinResponse, userDetails;

describe("checks user details", () => {
  beforeEach(async () => {
    const response = await request(app)
      .post("/api/signin")
      .send(userCredentials);
    signinResponse = response.body;
    token = response.body.token;
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
    const getUserDetails = await request(app)
      .get("/api/user/dashboard")
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(getUserDetails.status).toBe(200);
    expect(getUserDetails.body[0]).toMatchObject({
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
    userDetails = getUserDetails.body[0];
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
});
