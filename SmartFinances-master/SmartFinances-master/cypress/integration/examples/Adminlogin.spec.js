describe("Admin Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/admin");
    })
    it("Check whether the Admin Log In title is there or not", () => {
        cy.get(".makeStyles-paper-3").contains("Admin Sign In").should("be.visible");
      });
      it("Check whether the title is correct or not", () => {
        cy.get(".content")
          .children("h1")
          .invoke("text")
          .should("equal", "Smart Finance");
      });
      it("Check whether the description is correct or not", () => {
        cy.get(".content")
          .children("p")
          .invoke("text")
          .should(
            "equal",
            "Smart Finance, the place where all your tomorrows are secured.Life is navigating from one choice to another. If you are here, you have already made one smart choice.As our privileged user, you would to able to contribute to your life-savings by investing in the funds of various risks. Worried about the risk factors, Don't worry we got you covered. With our varied fund options, you will be having total control in your investments. The more you invest the more we can help you in managing your savings."
          );
        })
        it("Check whether the Email field is there o not", () => {
            cy.contains("Email Address").should("be.visible");
          });
          it("check whether we can type email Address", () => {
            cy.get("#email")
              .type("admintest@gmail.com")
              .should("have.focus")
              .should("have.value", "admintest@gmail.com");
          });
          it("check whether it contains password input field", () => {
            cy.contains("Password").should("be.visible");
          });
          it("check whether we can type password", () => {
            cy.get("#password")
              .type("admin")
              .should("have.focus")
              .should("have.value", "admin");
          });
          it("contains forgot password", () => {
            cy.contains("Forgot password?").should("be.visible");
          });
          it("contains copyrigth text", () => {
            cy.contains("Copyright © Smart Finance 2020").should("be.visible");
          });
          it("contains log-in button", () => {
            cy.get(".MuiButton-label")
              .should("be.visible")
              .click("left")
              .click("center")
              .click("right");
          });
          it("Logins into user account", () => {
            cy.get("#email").type("admintest@gmail.com");
            cy.get("#password").type("admin");
            cy.get(".MuiButton-label").click();
            cy.url().should("include","/fundsDashboard")
            cy.contains("Logout").click();
            cy.url().should("include","http://localhost:3000/")
          });
  })