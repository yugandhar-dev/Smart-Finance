describe("spending test cases", () => {
    var walletBalance;
      it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3000/user");
      });
      it("should check spending test cases", () => {
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#password').type('1234');
        cy.get('#phone').type('+61481831824');
        cy.get('#sign-in-button').click();
        cy.wait(5000);
        cy.contains("Spendings").should("exist");
        cy.contains("Spendings").click();
        cy.contains("Date").should("be.visible");
        cy.contains("Category").should("be.visible");
        cy.contains("Merchant Name").should("be.visible");
        cy.contains("Outflow").should("be.visible");
        cy.contains("Inflow").should("be.visible");
        cy.contains("Print Statement").should("be.visible");
        cy.contains("Print Statement").click();
        });
     });