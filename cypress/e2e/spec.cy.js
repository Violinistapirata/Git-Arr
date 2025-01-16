describe('template spec', () => {
  it('has a home page with nav bar, featured products, categories and a footer', () => {
    cy.visit('http://localhost:1212');
    cy.get('.nav').contains('Git-Arr');
    cy.get('h1').contains('Featured products');
    cy.get('article').first().should('have.class', 'product-card');
    cy.get('.footer').contains('About us');
  })
  it('has a view for the products details', () => {
    cy.visit('http://localhost:1212');
    cy.get('.product-card').first().click();
    cy.get('h1').should('have.class', 'product-details-title').contains('Seagull S6 Original');
    cy.get('p').should('have.class', 'product-details-description').contains('Canadian-made acoustic guitar known for its full, rich sound');
    cy.get('h4').first().should('have.class', 'product-details-categories').contains('Flamenco guitars');
    cy.get('h4').last().should('have.class', 'product-details-price').contains('€');
    cy.get('h2').should('have.class', 'product-details-stock').contains('IN STOCK: 12');
    cy.get('button').should('have.class', 'add-to-cart-button').contains('Add to cart');
  })
})