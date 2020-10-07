describe("Transaction History test cases", () => {
    var walletBalance;
      it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3000/user");
      });
      it("should check whether transactions are reflected in the history", () => {
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#password').type('1234');
        cy.get('#phone').type('+61481831824');
        cy.contains("Send OTP").click();
        cy.get('#otp').type('456321');
        cy.get('#sign-in-button').click();
        cy.wait(5);
        cy.contains("Transaction History").should("exist");
        cy.contains("Transaction History").click();
        cy.contains("Date").should("be.visible");
        cy.contains("Amount").should("be.visible");
        cy.contains("Rounded").should("be.visible");
        cy.contains("Category").should("be.visible");
        cy.contains("Sub-Category").should("be.visible");
        cy.contains("Investments").click();
        cy.contains("Withdraw Money").click();
        cy.get('input').click().type('10');
        cy.get('form').contains("Withdraw").click();
        cy.contains("The amount has been successfully withdrawn and your balances are updated.").should("exist");
        cy.contains("Transaction History").click();
        cy.contains("Amount Withdrawn From Wallet").should("exist");
        });
     });
