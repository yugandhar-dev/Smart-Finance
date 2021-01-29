describe("contact us test cases", () => {
    it('should check whether visit user login page', () => {
      cy.visit("http://localhost:3000/user/");
    });
    it("should check contact page", () => {
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#password').type('1234');
      cy.get('#phone').type('+61481831824');
      //cy.contains("Send OTP").click();
      cy.wait(3000);
      //cy.get('#otp').type('456321');
      cy.get('#sign-in-button').click();
      cy.wait(5000);
      cy.contains("Contact Us").should("exist");
      cy.contains("Contact Us").click();
      cy.contains("Name").should("be.visible");
      cy.contains("Your Email").should("be.visible");
      cy.contains("Your Message").should("be.visible");
      cy.contains("Liked our product and wanted to convey it or found something that you would like to add on to our application ?").should("be.visible")
      cy.contains("Toll Free : 888-0123-4567").should("be.visible");
      cy.contains("Fax : 1-234-567-8900").should("be.visible");
      cy.contains("Mail : hello@smartfinance.com.au").should("be.visible");
      cy.get('#first_name').type('usertest');
   });
  })