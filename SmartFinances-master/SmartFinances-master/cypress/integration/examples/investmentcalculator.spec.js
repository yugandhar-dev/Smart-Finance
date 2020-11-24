describe('Add funds to wallet test case', () => {
  it('should check whether visit user login page', () => {
    cy.visit('http://localhost:3000/user');
  });
  it('should check whether user sign in page contains correct user login page', () => {
    cy.get('.makeStyles-paper-3').contains('User Sign In').should('be.visible');
  });
  it('should check whetherinvestment calculator functionality is working correctly or not', () => {
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').type('456321');
    cy.get('#sign-in-button').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Investments').click();
    cy.contains('Investment Calculator').click();
    cy.get('#investment-type-outlined').click();
    cy.wait(3000);
    cy.get('[aria-labelledby="investmentType"]').children('li').eq(1).click();
    cy.get('#company-outlined').click();
    cy.get('[aria-labelledby="company"]').children('li').eq(1).click();
    cy.contains('Investment Amount').should('be.visible');
    cy.contains('Tenure in Years').should('be.visible');
    cy.contains('Price Per Unit').should('be.visible');
    cy.contains('Calculate').click();
    cy.contains('You can buy 50 units of ANZ').should('be.visible');
  });
});
