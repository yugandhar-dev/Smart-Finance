describe('User Login Page Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/user');
  });
  it('contains correct user login page', () => {
    cy.get('.makeStyles-paper-3').contains('User Sign In').should('be.visible');
  });
  it('contains the correct title', () => {
    cy.get('.content')
      .children('h1')
      .invoke('text')
      .should('equal', 'Smart Finance');
  });
  it('contains the correct description', () => {
    cy.get('.content')
      .children('p')
      .invoke('text')
      .should(
        'equal',
        "Smart Finance, the place where all your tomorrows are secured.Life is navigating from one choice to another. If you are here, you have already made one smart choice.As our privileged user, you would to able to contribute to your life-savings by investing in the funds of various risks. Worried about the risk factors, Don't worry we got you covered. With our varied fund options, you will be having total control in your investments. The more you invest the more we can help you in managing your savings."
      );
  });
  it('contains email address input field', () => {
    cy.contains('Email Address').should('be.visible');
  });
  it('type email Address', () => {
    cy.get('#email')
      .type('usertest@gmail.com')
      .should('have.focus')
      .should('have.value', 'usertest@gmail.com');
  });
  it('contains password input field', () => {
    cy.contains('Password').should('be.visible');
  });
  it('type password', () => {
    cy.get('#password')
      .type('1234')
      .should('have.focus')
      .should('have.value', '1234');
  });
  it('type phone number', () => {
    cy.get('#phone')
      .type('+61481831824')
      .should('have.focus')
      .should('have.value', '+61481831824');
  });
  it('type otp', () => {
    cy.get('#otp')
      .type('456321')
      .should('have.focus')
      .should('have.value', '456321');
  });
  it("contains check box 'Remember be'", () => {
    cy.contains('Remember me').should('be.visible');
  });
  it('checks remember me', () => {
    cy.get('.PrivateSwitchBase-input-14').check().should('be.checked');
  });
  it('contains forgot password', () => {
    cy.contains('Forgot password?').should('be.visible');
  });
  it('contains copyrigth text', () => {
    cy.contains('Copyright © Smart Finance 2020').should('be.visible');
  });
  it('contains log-in button', () => {
    cy.get('#otp').type('456321');
    cy.get('#sign-in-button')
      .should('be.visible')
      .click('left')
      .click('center')
      .click('right');
  });
  it('Logins into user account', () => {
    cy.get('#email').type('usertest@gmail.com');
    cy.get('#password').type('1234');
    cy.get('#phone').type('+61481831824');
    cy.get('#otp').type('456321');
    cy.get('#sign-in-button').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Logout').click();
    cy.url().should('include', 'http://localhost:3000/');
  });
});
