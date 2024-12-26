describe('Contact Page', () => {
    beforeEach(() => {
      cy.visit('/contact');
    });
  
    it('should display the contact form with all elements', () => {
      cy.contains('h1', 'Get in Touch').should('exist');
  
      cy.get('input[name="name"]').should('exist').and('have.attr', 'placeholder', 'Name');
      cy.get('input[name="email"]').should('exist').and('have.attr', 'placeholder', 'Email');
      cy.get('textarea[name="message"]').should('exist').and('have.attr', 'placeholder', 'Message');
  
      cy.get('button[type="submit"]').should('exist').and('contain.text', 'Submit Form');
    });
  
    it('should display validation errors for empty fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('Name is required').should('exist'); 
      cy.contains('Email is required').should('exist');
      cy.contains('Message cannot be empty').should('exist');
    });
  
    it('should successfully submit the form', () => {
      cy.intercept('POST', 'https://formspree.io/f/xwkgzngb').as('formSubmit');
  
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('textarea[name="message"]').type('Hello, this is a test message.');
  
      cy.get('button[type="submit"]').click();
  
      cy.origin('https://formspree.io', () => {
        cy.wait('@formSubmit').then((interception) => {
          expect(interception.response.statusCode).to.eq(302);
        });
  
        cy.contains('Thanks!').should('exist');
      });
    });
  });
  