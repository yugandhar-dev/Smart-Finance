describe("Password Minimum Requirements Test", () => {
          
        it("should deny access when incorrect password is entered thrice", () => {
        cy.visit("http://localhost:3000/user");
      cy.get("#email").type("usertest@gmail.com");
      cy.get("#password").type("567");
      cy.get(".MuiButton-label").click();
      cy.contains("Email & password do not match").should("be.visible");

      cy.get("#password").type("abc");
      cy.get(".MuiButton-label").click();
      cy.contains("Email & password do not match").should("be.visible");

      cy.get("#password").type("789@qwe");
      cy.get(".MuiButton-label").click()
      cy.contains("Number of attempts exceeded. Contact admin to reset your password").should("be.visible");
        });
   
})


