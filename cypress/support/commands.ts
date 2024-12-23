// Example custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
  });
  
  // Example custom command for visiting the homepage
  Cypress.Commands.add('visitHomepage', () => {
    cy.visit('/');
  });

  declare namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      visitHomepage(): Chainable<void>
      }
    }