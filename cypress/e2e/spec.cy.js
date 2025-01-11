describe('template spec', () => {
  it('has a home page with nav bar, featured products, categories and a footer', () => {
    // cy.intercept('GET', 'https://whpbdrinqtvellfpwtgs.supabase.co').as('getItems');
    cy.visit('http://localhost:1212');
    cy.get('.nav').contains('Git-Arr');
    // cy.wait('@getItems');
    // cy.get('h1').contains('Featured products').parent().contains('.product-list');
    cy.get('section').contains('.categories-wrapper');
    cy.get('.footer').contains('About us');
  })
})