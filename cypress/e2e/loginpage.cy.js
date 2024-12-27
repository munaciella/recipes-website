describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login page title', () => {
    cy.get('h1').should('contain', 'Login');
  });

  it('should display the login form', () => {
    cy.get('form').should('exist');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Continue with Email');
  });
});
