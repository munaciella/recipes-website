describe('Privacy Policy Page', () => {
    beforeEach(() => {
      cy.visit('/privacy-policy');
    });
  
    it('should render the page title', () => {
      cy.get('h1')
        .should('contain.text', 'Privacy Policy')
        .and('have.class', 'text-primary-500');
    });
  
    it('should render the introductory text', () => {
      cy.get('p')
        .first()
        .should(
          'contain.text',
          'This Privacy Policy describes how we collect, use, and protect your personal information when you use our application or website.'
        );
    });
  
    it('should display the "Information We Collect" section with list items', () => {
      cy.contains('h2', 'Information We Collect').should('exist');
      cy.get('ul')
        .eq(0)
        .within(() => {
          cy.contains('li', 'Personal Information').should('exist');
          cy.contains('li', 'Usage Data').should('exist');
          cy.contains('li', 'Cookies and Tracking Technologies').should('exist');
        });
    });
  
    it('should render all main sections with correct headings', () => {
      const headings = [
        'How We Use Your Information',
        'Sharing Your Information',
        'Cookies and Tracking',
        'Data Security',
        'Your Rights',
        'Third-Party Services',
        'Changes to This Privacy Policy',
        'Contact Us',
      ];
  
      headings.forEach((heading) => {
        cy.contains('h2', heading).should('exist');
      });
    });
  
    it('should have a contact link that navigates to the contact page', () => {
      cy.contains('a', 'here')
        .should('have.attr', 'href', '/contact')
        .click();
  
      cy.url().should('include', '/contact');
    });
  });
  