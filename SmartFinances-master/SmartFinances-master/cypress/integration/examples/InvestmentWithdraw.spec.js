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
      .should("be.visible")
      .invoke("text")
      .should("eq", "Withdraw");

    cy.get(".sc-bdnylx.eoZCLj")
      .children("button")
      .eq(1)
      .should("be.visible")
      .invoke("text")
      .should("eq", "Reset");
  });

  it("Checks reset button on investment withdraw money screen", () => {
    cy.get(".MuiTabs-flexContainer.MuiTabs-centered")
      .children("button")
      .eq(3)
      .click();

    cy.get(".sc-eCApGN.iobEpJ").children("div").eq(3).click();

    cy.get(".sc-gtssRu.OpnKd").type("12");

    cy.get(".sc-bdnylx.eoZCLj").children("button").eq(1).click();

    cy.get(".sc-gtssRu.OpnKd").should("have.value", "");
  });

  it("Checks correct amount is deducted from wallet balance and added to bank acount balance", () => {
    var accountBalance, walletBalance;

    cy.wait(3000);

    cy.get("h6")
      .eq(2)
      .children("p")
      .eq(0)
      .children("font")
      .eq(0)
      .children("font")
      .eq(0)
      .then(($font) => {
        accountBalance = parseFloat($font.text().replace("$", ""));
        console.log(accountBalance);
      });

    cy.get(".MuiTabs-flexContainer.MuiTabs-centered")
      .children("button")
      .eq(3)
      .click();

    cy.get(".sc-eCApGN.iobEpJ").children("div").eq(3).click();

    cy.wait(3000);

    cy.get("#simple-tabpanel-3")
      .eq(0)
      .children("div")
      .eq(0)
      .children("div")
      .eq(0)
      .children("p")
      .eq(1)
      .children("font")
      .eq(0)
      .children("font")
      .eq(0)
      .then(($font) => {
        walletBalance = parseFloat($font.text());
        console.log(walletBalance);
      });

    cy.get(".sc-gtssRu.OpnKd").type("5");

    cy.get(".sc-bdnylx.eoZCLj")
      .children("button")
      .eq(0)
      .click()
      .then(() => {
        walletBalance = (walletBalance - 5).toString();
        accountBalance = (accountBalance + 5).toString();
        console.log(walletBalance);
        console.log(accountBalance);
      });

    cy.wait(3000);

    cy.get("#simple-tabpanel-3")
      .eq(0)
      .children("div")
      .eq(0)
      .children("div")
      .eq(0)
      .children("p")
      .eq(1)
      .children("font")
      .eq(0)
      .children("font")
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq(walletBalance);
      });

    cy.contains("Portfolio").click();

    cy.get("h6")
      .eq(2)
      .children("p")
      .eq(0)
      .children("font")
      .eq(0)
      .children("font")
      .eq(0)
      .then(($font) => {
        expect($font.text()).to.eq("$" + accountBalance);
      });
  });
});
