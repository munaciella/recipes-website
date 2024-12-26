describe('Cookie Policy Page', () => {
    beforeEach(() => {
      cy.visit('/cookie-policy');
    });
  
    it('should display the page heading', () => {
      cy.contains('h1', 'Cookie Policy').should('exist');
    });
  
    it('should display the introductory text', () => {
      cy.contains(
        'We value your privacy and are committed to being transparent about how we use cookies.'
      ).should('exist');
    });
  
    it('should display all sections with their headings', () => {
      const sectionHeadings = [
        'What Are Cookies?',
        'Types of Cookies We Use',
        'How We Use Cookies',
        'Managing Cookies',
        'Updates to This Cookie Policy',
        'Contact Us',
      ];
  
      sectionHeadings.forEach((heading) => {
        cy.contains('h2', heading).should('exist');
      });
    });
  
    it('should list all cookie types with descriptions', () => {
      const cookieTypes = [
        'Essential Cookies: These cookies are necessary for the website to function properly and cannot be disabled.',
        'Analytics Cookies: These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
        'Functionality Cookies: These cookies allow us to remember your preferences and settings, improving your user experience.',
        'Advertising Cookies (if applicable): These cookies are used to deliver relevant ads and track ad campaign performance.',
      ];
  
      cookieTypes.forEach((cookie) => {
        cy.contains(cookie).should('exist');
      });
    });
  
    it('should have a link to "All About Cookies" with correct URL', () => {
      cy.contains('a', 'All About Cookies')
        .should('have.attr', 'href', 'https://www.allaboutcookies.org/manage-cookies/')
        .and('have.attr', 'target', '_blank');
    });
  
    it('should have a link to the contact page', () => {
      cy.contains('a', 'here')
        .should('have.attr', 'href', '/contact');
    });
  });
  