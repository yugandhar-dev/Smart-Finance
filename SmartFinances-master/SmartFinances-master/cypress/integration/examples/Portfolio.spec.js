describe("Tab Navigation in User Login", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/user");
      cy.get("#email").type("usertest@gmail.com");
      cy.get("#password").type("1234");
      cy.get(".MuiButton-label").click();
    });
  
    it("should contain portfolio and all associated elements", () => {
      cy.contains("Portfolio").should("be.visible");
      cy.contains("Account Number").should("be.visible");
      cy.contains("Account Balance").should("be.visible");
      cy.contains("Total Investments").should("be.visible");
      cy.contains("Low Risk Fund Investments").should("be.visible");
      cy.contains("Medium Risk Fund Investments").should("be.visible");
      cy.contains("High Risk Fund Investments").should("be.visible");
      cy.contains("Wallet Account Number").should("be.visible");
      cy.contains("Wallet Account Balance").should("be.visible");
      cy.get(".chartjs-render-monitor").should("be.visible");
      });
    
});
