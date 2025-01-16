describe('template spec', () => {
  it('has a home page with nav bar, featured products, categories and a footer', () => {
    cy.visit('http://localhost:1212');
    cy.get('.nav').contains('Git-Arr');
    cy.get('h1').contains('Featured products');
    cy.get('article').first().should('have.class', 'product-card');
    cy.get('.product-card').first();
    cy.get('.footer').contains('About us');
  })
})