describe("Settings screen test case", () => {
    var walletBalance;
      it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3000/user");
      });
      it("should check whether user sign in page contains correct user login page", () => {
        cy.get(".makeStyles-paper-3").contains("User Sign In").should("be.visible");
      });  
      it("should check settings screen contains all th required fields", () => {
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#password').type('1234');
        cy.get('#phone').type('+61481831824');
        cy.get('#otp').type('456321');
        cy.get('#sign-in-button').click();
        cy.url().should("include","/dashboard")
        cy.contains('User Settings').click();
        cy.wait(3000);
        cy.contains('UserName:usertest@gmail.com').should('be.visible')
        cy.contains('Mobile Number').should('be.visible')
        cy.contains('Password').should('be.visible')
        cy.get('#simple-tabpanel-5')
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
           cy.get('#simple-tabpanel-5')
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
       
        cy.contains('Update').click();   
        cy.contains('Your profile is Successfully Updated').should('be.visible')
      })
      })