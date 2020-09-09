const request = require("supertest");
const app = require("../app");

const userCredentials = {
  email: "usertest@gmail.com",
  password: "1234",
  role: "user",
};

var token, signinResponse;

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
});
