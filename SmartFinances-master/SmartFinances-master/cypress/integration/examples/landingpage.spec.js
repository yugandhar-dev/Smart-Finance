describe('Landing page test flow', () => {
  it('should visit home page', () => {
    cy.visit('http://localhost:3000/')    
  })

  it("should check whether the sign in title is there or not", () => {
    cy.get(".makeStyles-paper-3").contains("Sign in").should("be.visible");
  });

  it("should check whether the title is correct or not", () => {
    cy.get(".content")
      .children("h1")
      .invoke("text")
      .should("equal", "Smart Finance");
  });

  it("should check whether the description is correct or not", () => {
    cy.get(".content")
      .children("p")
      .invoke("text")
      .should(
        "equal",
        "Smart Finance, the place where all your tomorrows are secured.Life is navigating from one choice to another. If you are here, you have already made one smart choice.As our privileged user, you would to able to contribute to your life-savings by investing in the funds of various risks. Worried about the risk factors, Don't worry we got you covered. With our varied fund options, you will be having total control in your investments. The more you invest the more we can help you in managing your savings."
      );
    })

    it('should check whether it contains user button and whether we can navigate to user login page or not', () => {
      cy.contains('User').click()
      cy.url().should('equal', 'http://localhost:3000/user')    
    })

    it('should check whether it contains admin button and whether we can navigate to admin login page or not', () => {
      cy.visit('http://localhost:3000/')
      cy.contains('Admin').click()
      cy.url().should('equal', 'http://localhost:3000/admin')
    })
})