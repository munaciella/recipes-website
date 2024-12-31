describe('Footer Component', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should render the logo with correct alt text', () => {
      cy.get('footer img')
        .should('have.attr', 'alt', 'velovegans img')
        .and('be.visible');
    });
  
    it('should display the correct company name and year', () => {
      const currentYear = new Date().getFullYear();
      cy.contains(`© ${currentYear} VeloVegans`).should('be.visible');
    });
  
    it('should render all social media links', () => {
      const socialMediaNames = ['Instagram', 'Threads', 'X'];
      socialMediaNames.forEach((name) => {
        cy.contains('span', name).should('be.visible');
      });
    });
  
    it('should open social media links in a new tab', () => {
      cy.get('footer a[target="_blank"]').should('have.attr', 'rel', 'noopener noreferrer');
    });
  
    it('should navigate to Privacy Policy page on link click', () => {
      cy.contains('Privacy Policy')
        .should('have.attr', 'href', '/privacy-policy')
        .click();
  
      cy.url().should('include', '/privacy-policy');
    });
  
    it('should render the developer image with correct alt text', () => {
      cy.get('footer img[alt="Francesco\'s Image"]').should('be.visible');
    });
  
    it('should have a developer website link', () => {
      cy.contains('Developer Website')
        .should('have.attr', 'href', 'https://francesco-dev.vercel.app/')
        .should('have.attr', 'target', '_blank');
    });
  
    it('should display a heart emoji in the footer message', () => {
      cy.get('footer').contains('♡').should('be.visible');
    });
  });