describe('Add funds to wallet test case', () => {
  it('should check whether visit user login page', () => {
    cy.visit('http://localhost:3000/user');
  });
  it('should check whether user sign in page contains correct user login page', () => {
    cy.get('.makeStyles-paper-3').contains('User Sign In').should('be.visible');
  });
  it('should check whether pay to merchant functionality is working correctly or not', () => {
    cy.get('#email').type('ronith@gmail.com');
    cy.get('#password').type('1234');

    // comment out line 211 (onClick={sendOtp}) in user login component and change line 248 (onClick={onSubmit}) to avoid recaptcha
    // comment out line 54 to 56 and 66 to 69 to avoid verify otp.

    cy.get('#phone').type('+61481831824');
    cy.get('#otp').type('456321');
    cy.get('#sign-in-button').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Investments').click();
    cy.contains('Add Funds to Wallet').click();
    cy.contains('ENTER DETAILS').should('be.visible');
    cy.contains('From').should('be.visible');
    cy.contains('To').should('be.visible');
    cy.contains('Amount').should('be.visible');
    cy.contains('Confirm and Send Otp').should('not.be.visible');
    cy.contains('Reset').should('be.visible');
    cy.get('[id="From"]').type('Ronith');
    cy.get('[id="To"]').type('223');
    cy.get('[id="Amount"]').type('2');
    cy.contains('Confirm and Send Otp').click();
    cy.get('[id="OTP"]').type('456321');
    cy.contains('Submit').click();
    cy.wait(1000);
    cy.contains(
      'OTP is verified. Amount is added into wallet successfully'
    ).should('be.visible');
  });
});
