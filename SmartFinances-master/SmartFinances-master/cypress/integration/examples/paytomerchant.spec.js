describe("Pay to merchant test cases", () => {
    var walletBalance;
      it('should check whether visit user login page', () => {
        cy.visit("http://localhost:3000/user");
      });
      it("should check whether user sign in page contains correct user login page", () => {
        cy.get(".makeStyles-paper-3").contains("User Sign In").should("be.visible");
      });  
      it("should check whether pay to merchant functionality is working correctly or not", () => {
        cy.get('#email').type('usertest@gmail.com');
        cy.get('#password').type('1234');
        cy.get('#phone').type('+61481831824');
        cy.get('#otp').type('456321');
        cy.get('#sign-in-button').click();
        cy.url().should("include","/dashboard")
        cy.wait(3000);
          
        cy.contains("Pay Merchant").should("be.visible");
        cy.contains("Pay Merchant").click();
        cy.wait(1000);
        cy.get('#simple-tabpanel-1')
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
        cy.contains("ENTER DETAILS").should("be.visible");
        cy.contains("Wallet Account Number:SFW001").should("be.visible");
        cy.get('[id="payeename"]').type('Ronith');
        cy.get('[id="payeeaccount"]').type('223');
        cy.get('[id="amount"]').type('2');
        cy.get('[id="otp"]').type('220292');
        cy.contains('Generate OTP').should("be.visible");
        cy.get('[id="payAmount"]').click().then(() => {
          walletBalance = (walletBalance + 3); 
          console.log(walletBalance);
        }); 
        cy.wait(3000);
        cy.contains('Wallet Balances are updated').should("be.visible");
        cy.get('#simple-tabpanel-1')
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