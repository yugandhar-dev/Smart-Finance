describe("Tab Navigation in User Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user");
    cy.get("#email").type("usertest@gmail.com");
    cy.get("#password").type("1234");
    cy.get(".MuiButton-label").click();
  });
  it("Contains Tabs in Ivestments Tab", () => {
    cy.contains("Investments").should("be.visible");
    cy.contains("Investments").click();
    cy.contains("Add Funds to Wallet").should("be.visible");
    cy.contains("Invest").should("be.visible");
    cy.contains("Sell Investments").should("be.visible");
    cy.contains("Withdraw Money").should("be.visible");
    cy.contains("Investment Calculator").should("be.visible");
  });
});
