describe("Investment Withdraw Money page test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/user");
    cy.get("#email").type("usertest@gmail.com");
    cy.get("#password").type("1234");
    cy.get(".MuiButton-label").click();
  });

  it("checks elements of withdraw screen", () => {
    cy.get(".MuiTabs-flexContainer.MuiTabs-centered")
      .children("button")
      .eq(3)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "Investments");
    cy.get(".sc-eCApGN.iobEpJ")
      .children("div")
      .eq(3)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", " Withdraw Money");
    cy.get(".sc-bdnylx.eoZCLj")
      .children("p")
      .eq(0)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Account number:123");
    cy.get(".sc-bdnylx.eoZCLj")
      .children("p")
      .eq(1)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Enter the amount you want to withdraw ");
    cy.get("#simple-tabpanel-3")
      .eq(0)
      .children("div")
      .eq(0)
      .children("div")
      .eq(0)
      .children("p")
      .eq(0)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Wallet Account Number:SFW001 ");
    cy.get("#simple-tabpanel-3")
      .eq(0)
      .children("div")
      .eq(0)
      .children("div")
      .eq(0)
      .children("p")
      .eq(1)
      .contains("Wallet Account Balance")
      .should("be.visible");
    cy.get(".sc-gtssRu.OpnKd").type("12").should("have.value", "12");
    cy.get(".sc-gtssRu.OpnKd").clear().should("have.value", "");
    cy.get(".sc-bdnylx.eoZCLj")
      .children("button")
      .eq(0)
      .should("be.disabled")
      .should("be.visible");
    cy.get(".sc-bdnylx.eoZCLj").children("button").eq(1).should("be.visible");
  });
});
