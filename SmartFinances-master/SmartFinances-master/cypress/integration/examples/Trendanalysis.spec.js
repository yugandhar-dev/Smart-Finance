describe("Pay to merchant test cases", () => {
    var walletBalance;
      it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3000/user");
      });
      it("should check whether user sign in page contains correct user login page", () => {
        cy.get(".makeStyles-paper-3").contains("User Sign In").should("be.visible");
      });  
      it("should check whether Upload receipt is working correctly or not", () => {
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#password').type('1234');
        cy.get('#phone').type('+61481831824');
        cy.get('#otp').type('456321');
        cy.get('#sign-in-button').click();
        cy.url().should("include","/dashboard")
        cy.contains('Investment Trends').click();
        cy.get('#lowrisk').click();
        cy.wait(5000);
        cy.scrollTo(0, 1000)
        cy.wait(1000);
        cy.scrollTo(1000, 0)
        cy.contains('Back').click();
        cy.get('#etf').click();
        cy.wait(5000);
        cy.scrollTo(0, 1000)
        cy.wait(1000);
        cy.scrollTo(1000, 0)
        cy.contains('Back').click();
        cy.get('#savings').click();
        cy.wait(5000);
        cy.scrollTo(0, 1000)
        cy.wait(1000);
        cy.scrollTo(1000, 0)
        cy.contains('Back').click();
    });
    });