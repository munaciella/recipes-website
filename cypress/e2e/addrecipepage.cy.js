describe('Add Recipe Page', () => {
    beforeEach(() => {
      cy.visit('/add-recipe');
    });
  
    it('should display all form fields and submit button', () => {
      cy.get('input[name="title"]').should('exist');
      cy.get('input[name="image_url"]').should('exist');
      cy.get('input[name="category"]').should('exist');
      cy.get('input[name="cooking_time"]').should('exist');
      cy.get('select[name="difficulty"]').should('exist');
      cy.get('input[name="allergy_advice"]').should('exist');
      cy.get('input[name="ingredients"]').should('exist');
      cy.get('textarea[name="instructions"]').should('exist');
      cy.get('button[type="submit"]').should('exist').and('contain.text', 'Submit Recipe');
    });
  
    it('should validate inputs and show error messages for invalid data', () => {
      cy.get('button[type="submit"]').click();
    });
  
    it('should submit the form with valid data and show a success toast', () => {
        cy.visit('/add-recipe');
        cy.get('input[name="title"]').type('Veggie Tacos');
        cy.get('input[name="image_url"]').type('https://example.com/image.jpg');
        cy.get('input[name="category"]').type('Main Course');
        cy.get('input[name="cooking_time"]').type('15 mins');
        cy.get('select[name="difficulty"]').select('Medium');
        cy.get('input[name="allergy_advice"]').type('Nut-Free');
        cy.get('input[name="ingredients"]').type('Flour, Sugar, Eggs');
        cy.get('textarea[name="instructions"]').type('1. Mix ingredients. 2. Cook for 15 minutes.');
        cy.get('button[type="submit"]').click();
      });
    
      it('should not allow duplicate recipe titles', () => {
        cy.visit('/add-recipe');
        cy.get('input[name="title"]').type('Existing Recipe');
        cy.get('input[name="image_url"]').type('https://example.com/image.jpg');
        cy.get('input[name="category"]').type('Main Course');
        cy.get('input[name="cooking_time"]').type('15 mins');
        cy.get('select[name="difficulty"]').select('Medium');
        cy.get('input[name="allergy_advice"]').type('Nut-Free');
        cy.get('input[name="ingredients"]').type('Flour, Sugar, Eggs');
        cy.get('textarea[name="instructions"]').type('1. Mix ingredients. 2. Cook for 15 minutes.');
        cy.get('button[type="submit"]').click();
      });
  });
  