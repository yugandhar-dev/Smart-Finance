describe('Savings Screen investment test case', () => {
    var walletBalance;
   it('should check whether visit user login page', () => {
      cy.visit('http://localhost:3000/user'); 
     });
      it('should check whether user sign in page contains correct user login page', () => {
         cy.get('.makeStyles-paper-3').contains('User Sign In').should('be.visible');
        }); 
        it('should check whetherSavings Screen functionality is working correctly or not', () => {
           cy.get('#email').type('usertest@gmail.com');
           cy.get('#password').type('1234');
           cy.get('#phone').type('+61481831824');
           cy.get('#otp').type('456321');
           cy.get('#sign-in-button').click();
           cy.url().should('include', '/dashboard');
           cy.wait(3000);         
           cy.contains('Investments').click();          
           cy.get('#Invest').click();
           cy.contains('Savings Schemes').click();
           cy.get('#simple-tabpanel-3')
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
           cy.get('#companies').click();
           cy.contains('ME').click();
           cy.get('#units').type(10);
           cy.contains('Your wallet account gets deducted by $1000').should("be.visible");
           cy.wait(3000);
           cy.contains('Buy').click().then(() => {
             walletBalance = (walletBalance - 1000);  
             console.log(walletBalance);
           });
           cy.wait(3000);
           cy.get('#simple-tabpanel-3')
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
           cy.contains('Amount Invested and updated Balances').should("be.visible");
           
           }); 
           });