describe("Add funds to wallet test case", () => {
    it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3001/user");
      });
      it("should check whether user sign in page contains correct user login page", () => {
        cy.get(".makeStyles-paper-3").contains("User Sign In").should("be.visible");
      });
      it("should check whether pay to merchant functionality is working correctly or not", () => {
        cy.get("#email").type("ronith@gmail.com");
        cy.get("#password").type("1234");
        cy.get('[id="phone"]').type("+61480189546");
        cy.wait(300000);
        cy.url().should("include","/dashboard")
        cy.contains("Investments").click();
        cy.contains("Add Funds to Wallet").click();
        cy.contains('ENTER DETAILS').should("be.visible");
        cy.contains('From').should("be.visible");
        cy.contains('To').should("be.visible");
        cy.contains('Amount').should("be.visible");
        cy.contains('Confirm and Send Otp').should("not.be.visible");
        cy.contains('Reset').should("be.visible");
        cy.get('[id="From"]').type('Ronith');
        cy.get('[id="To"]').type('223');
        cy.get('[id="Amount"]').type('2');
        cy.contains('Confirm and Send Otp').click();
        cy.get('[id="OTP"]').type('12345');
        cy.contains('Submit').click();
        cy.contains('SUCCESS').should("be.visible"); 

      });

})