describe("Investment sell screen test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user");

    cy.get("#email").type("usertest@gmail.com");

    cy.get("#password").type("1234");

    cy.get(".MuiButton-label").click();
  });

  it("checks elements of investment sell screen", () => {
    cy.get(".MuiTabs-flexContainer.MuiTabs-centered")
      .children("button")
      .eq(3)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "Investments");

      cy.get(".sc-eCApGN.iobEpJ")
      .children("div")
      .eq(2)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", " Sell Investments");
  });
  
});
