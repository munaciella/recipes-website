describe('Recipe Detail Page', () => {
    const recipeId = '8';
    const recipeUrl = `/recipe/${recipeId}`;
  
    beforeEach(() => {
      cy.visit(recipeUrl);
    });
  
    it('should load the recipe detail page', () => {
      cy.url().should('include', recipeId);
      cy.contains('Loading...').should('not.exist');
      cy.get('h1').should('exist');
    });
  
    it('should display recipe details', () => {
      cy.get('h1').should('contain.text', 'Recipe Details'); 
      cy.contains('Ingredients').should('exist');
      cy.contains('Instructions').should('exist');
    });
  
    it('should display comments', () => {
      cy.contains('Comments').should('exist');
      cy.contains('No comments yet.').should('not.exist');
    });

    it('should not show comment UI when not logged in', function () {
        cy.get('textarea[placeholder="Add a comment"]').should('not.exist');
        cy.get('button').contains('Add Comment').should('not.exist');
    });
  });
  