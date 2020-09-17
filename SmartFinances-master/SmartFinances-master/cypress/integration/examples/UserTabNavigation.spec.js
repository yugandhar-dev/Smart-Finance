describe("Tab Navigation in User Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user");
    cy.get("#email").type("usertest@gmail.com");
    cy.get("#password").type("1234");
    cy.get(".MuiButton-label").click();
  });

  it("should contain portfolio", () => {
    cy.contains("Portfolio").should("be.visible");
    cy.contains("Account Number").should("be.visible");
  });

  it("should contain pay merchant tab", () => {
    cy.contains("Pay Merchant").should("be.visible");
    cy.contains("Pay Merchant").click();
    cy.contains("ENTER DETAILS").should("be.visible");
  });

  it("should contain fund options tab", () => {
    cy.contains("Fund Options").should("be.visible");
    cy.contains("Fund Options").click();
    cy.contains("SMART FINANCE FUND OPTIONS").should("be.visible");
  });
  
  it("should contain investments tab", () => {
    cy.contains("Investments").should("be.visible");
    cy.contains("Investments").click();
    cy.contains("Add Funds to Wallet").should("be.visible");
  });
});
