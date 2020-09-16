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

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(0)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Choose the investment type:");

    cy.get("#investments").should("be.visible").click();

    cy.wait(1000);

    cy.get('[aria-labelledby="investment-options"]')
      .children("li")
      .eq(0)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "lowRiskFund");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(2)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Choose the company:");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(4)
      .children("div")
      .eq(0)
      .should("be.empty");

    cy.get("#companies").should("be.visible").click();

    cy.get('[aria-labelledby="companies"]')
      .children("li")
      .eq(0)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "ANZ");

    cy.wait(1000);

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(4)
      .children("div")
      .eq(0)
      .should("not.be.empty");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(5)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Enter number of units you want to sell:");

    cy.get("p").eq(2).invoke("text").should("be.empty");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(6)
      .children("div")
      .eq(0)
      .should("be.visible")
      .type("1");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(6)
      .children("div")
      .eq(1)
      .click();

    cy.get("p").eq(2).invoke("text").should("not.be.empty");

    cy.get(".MuiList-root.MuiList-padding")
      .children("li")
      .eq(7)
      .invoke("text")
      .should("eq", "Amount:");

    cy.contains("Reset").click();

    cy.get("#investments").should("be.visible").click();

    cy.get('[aria-labelledby="investment-options"]')
      .children("li")
      .eq(1)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "savingScheme");

    cy.get("#companies").should("be.visible").click();

    cy.get('[aria-labelledby="companies"]')
      .children("li")
      .eq(0)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "ME Term Deposit");

    cy.get("#companies").should("be.visible").click();

    cy.get('[aria-labelledby="companies"]')
      .children("li")
      .eq(1)
      .should("be.visible")
      .click()
      .invoke("text")
      .should("eq", "AMP Term Deposit");
  });
  
});
