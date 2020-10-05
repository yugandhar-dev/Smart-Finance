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
        cy.wait(3000);
        cy.contains("Upload Receipt").should("be.visible");
        cy.contains("Upload Receipt").click();
        cy.contains("Confirm").click();
        cy.contains("Error updating balances").should("be.visible");
        cy.get('#simple-tabpanel-2')
        .eq(0)
        .children('div')
        .eq(0)
        .children('div')
        .eq(0)
        .children('p')
        .eq(1)
        .children('font') 
        .eq(0)    
        .children('font')
        .eq(0)  
        .then(($font) => {walletBalance =parseFloat($font.text());
          console.log(walletBalance);
          });
          cy.get('#simple-tabpanel-2')
          .eq(0)
          .children('div')
          .eq(0)
          .children('div')
          .eq(0)
          .children('p')
          .eq(1)
          .children('font') 
          .eq(0)    
          .children('font')
          .eq(0)  
          .then(($font) => {  
            expect($font.text()).to.eq(walletBalance.toFixed(2));
        });
    });
    });