describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage with the correct heading', () => {
    cy.get('h1').should('contain', 'VeloVegans');
    cy.get('h1').should('contain', 'Cruelty Free Recipes');
  });

  it('should display the navigation menu and allow navigation to the About page', () => {
    cy.get('nav').should('exist');
    cy.get('nav a').contains('About').click();
    cy.url().should('include', '/about');
  });

  it('should display the Get Started and Browse Recipes buttons', () => {
    cy.contains('button', 'Get Started').should('exist').click();
    cy.url().should('include', '/login');

    cy.visit('/');
    cy.contains('button', 'Browse Recipes').should('exist').click();
    cy.url().should('include', '/recipes');
  });

  it('should display the news section with articles', () => {
    cy.get('section h2').should('contain', 'Check Out the Latest News');
    cy.get('section').within(() => {
      cy.wait(1000);
      cy.get('a').should('have.length.at.least', 1); 
    });
  });

  it('should display the "Show More News" button and load more news', () => {
    cy.contains('button', 'Show More News').should('exist').click();
    cy.get('a').should('have.length.at.least', 1);
  });
});
