describe('Homepage', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should load the homepage', () => {
      cy.get('h1').should('contain', 'VeloVegans');
    });
  
    it('should have a functioning navigation menu', () => {
      cy.get('nav').should('exist');
      cy.get('nav a').contains('About').click();
      cy.url().should('include', '/about');
    });
  });