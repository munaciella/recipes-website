describe('About Page', () => {
    beforeEach(() => {
      cy.visit('/about');
    });
  
    it('should display the heading', () => {
      cy.get('h1')
        .should('exist')
        .and('have.class', 'text-4xl')
        .and('contain.text', 'About Us');
    });
  
    it('should display the paragraph', () => {
      cy.get('p')
        .should('exist')
        .and('have.class', 'text-lg')
        .and('contain.text', 'Welcome');
    });
  
    it('should display the subheading for links', () => {
      cy.get('h2')
        .should('exist')
        .and('have.text', 'Click on the links to start your awareness journey');
    });
  
    it('should navigate to the correct URL when a link is clicked', () => {
      cy.get('a')
        .first()
        .then(($link) => {
          const href = $link.attr('href');
          if (href) {
            cy.wrap($link).click({ force: true });
            cy.url().should('include', href);
          }
        });
    });
  });
  