/// <reference types="cypress" />

context('Window', () => {

  it('visit home page', () => {
    
    cy.visit('http://localhost:3000/')
  })
})
