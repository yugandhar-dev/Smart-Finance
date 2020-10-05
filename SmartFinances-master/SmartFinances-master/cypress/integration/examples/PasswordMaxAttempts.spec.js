describe('Password Minimum Requirements Test', () => {
  it('should deny access when incorrect password is entered thrice', () => {
    cy.visit('http://localhost:3000/user');
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#password').type('567');
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').type('456741');
    cy.get('#sign-in-button').click();
    cy.contains('Email & password do not match').should('be.visible');

    cy.get('#password').clear();
    cy.get('#password').type('abc');
    cy.get('#phone').clear();
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').clear();
    cy.get('#otp').type('321789');
    cy.get('#sign-in-button').click();
    cy.contains('Email & password do not match').should('be.visible');

    cy.get('#password').clear();
    cy.get('#password').type('789@qwe');
    cy.get('#phone').clear();
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').clear();
    cy.get('#otp').type('789456');
    cy.get('#sign-in-button').click();
    cy.contains(
      'Number of attempts exceeded. Contact admin to reset your password'
    ).should('be.visible');
  });
});
