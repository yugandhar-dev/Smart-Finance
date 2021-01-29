describe("navigation test cases", () => {

    it('should check whether visit user login page', () => {
      cy.visit("http://localhost:3000/user/");
    });
    it("should check Navigation test cases", () => {
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#password').type('1234');
      cy.get('#phone').type('+61481831824');
      //cy.contains("Send OTP").click();
      cy.wait(3000);
      //cy.get('#otp').type('456321');
      cy.get('#sign-in-button').click();
      cy.wait(5000);
      cy.contains("Questionnaire").should("exist");
      cy.contains("Questionnaire").click();
      cy.contains("Upload Receipt").should("exist");
      cy.contains("Upload Receipt").click();
      cy.contains("pay merchant").should("exist");
      cy.contains("pay merchant").click();
      cy.contains("Spendings").should("exist");
      cy.contains("Spendings").click();
      cy.contains("Transaction History").should("exist");
      cy.contains("Transaction History").click();
      cy.contains("User Settings").should("exist");
      cy.contains("User Settings").click();
      cy.contains("Investment Trends").should("exist");
      cy.contains("Investment Trends").click();
    });
})