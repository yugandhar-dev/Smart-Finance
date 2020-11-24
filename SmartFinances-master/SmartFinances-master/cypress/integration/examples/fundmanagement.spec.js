describe('Test case flow fund management', () => {
  it('visit admin page', () => {
    cy.visit('http://localhost:3000/admin');
  });
  it('should check whether the admin log in title is there or not', () => {
    cy.get('.makeStyles-paper-3')
      .contains('Admin Sign In')
      .should('be.visible');
  });
  it('should check whether Manage Existing fund is working or not', () => {
    cy.get('#email').type('admintest@gmail.com');
    cy.get('#password').type('admin');
    cy.get('.MuiButton-label').click();
    cy.contains('MANAGE EXISTING FUNDS').click();
    cy.contains('Fund Id Number').should('be.visible');
    cy.get('[id="Fund Id Number"]').type('22222');
    cy.contains('SUBMIT').click();
    cy.contains('Fund Id:22222').should('be.visible');
    cy.contains('Fund Title:"Medium Risk Fund"').should('be.visible');
    cy.contains('ROI:13').should('be.visible');
    cy.contains(
      'Fund Description:"This is a fund for you to invest if you are looking for optimal risk positions and returns with balanced risk factor"'
    ).should('be.visible');
  });
  it('should check whether the Create Newfund is working or not', () => {
    cy.visit('http://localhost:3000/admin');
    cy.get('#email').type('admintest@gmail.com');
    cy.get('#password').type('admin');
    cy.get('.MuiButton-label').click();
    cy.url().should('include', '/fundsDashboard');
    cy.contains('CREATE A NEW FUND').click();
    cy.get('[id="Fund Name"]').type('Moderate risk');
    cy.get('[id="Risk Type"]').type('Moderate');
    cy.get('[id="Fund Description"]').type('For test');
    cy.get('[id="Gain Type"]').type('HIgh');
    cy.contains('Create New Fund Option').click();
    cy.contains('Fund has been created successfully').should('be.visible');
    cy.contains('FUND REFERENCE NUMBER: 123456').should('be.visible');
    cy.contains('Back').click();
    cy.contains('CREATE A NEW FUND').should('be.visible');
    cy.contains('MANAGE EXISTING FUNDS').should('be.visible');
  });
});
