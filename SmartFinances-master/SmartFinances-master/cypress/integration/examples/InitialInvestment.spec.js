describe('Tab Navigation in User Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/user');
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').type('456321');
    cy.get('#sign-in-button').click();
  });

  it('should contain tabs in investments tab', () => {
    cy.contains('Investments').should('be.visible');
    cy.contains('Investments').click();
    cy.contains('Add Funds to Wallet').should('be.visible');
    cy.contains('Invest').should('be.visible');
    cy.contains('Sell Investments').should('be.visible');
    cy.contains('Withdraw Money').should('be.visible');
    cy.contains('Investment Calculator').should('be.visible');
  });
});
