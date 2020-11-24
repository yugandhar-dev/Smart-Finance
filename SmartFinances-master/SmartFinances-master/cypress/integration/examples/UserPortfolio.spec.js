describe('User Portfolio Test', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/user');
      cy.get('#email').type('usertest@gmail.com');
      cy.get('#password').type('1234');
      cy.get('#phone').type('+61481831824');
      cy.get('#otp').type('456321');
      cy.get('#sign-in-button').click();
    });

    it("should contain portfolio", () => {
        
        cy.contains("Account Number").should("be.visible");
        cy.contains("Account Balance").should("be.visible");
        cy.contains("Total Investments").should("be.visible");
        cy.contains("Low Risk Fund Investments").should("be.visible");
        cy.contains("Exchange Traded Funds").should("be.visible");
        cy.contains("Savings Schemes").should("be.visible");
        cy.contains("Wallet Account Number").should("be.visible");
        cy.contains("Wallet Account Balance").should("be.visible");
        cy.get(".chartjs-render-monitor").should("be.visible");
        });
      
  });