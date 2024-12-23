// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// It's a great place to put global configuration and behavior
// that modifies Cypress.
//
// You can read more here: https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Optionally import other utilities or plugins here
// Example:
// import 'cypress-axe'; // For accessibility testing
// import 'cypress-plugin-tab'; // For tab key testing

// You can set global hooks or behaviors here
Cypress.on('uncaught:exception', (err) => {
  // Prevent failing tests on uncaught exceptions
  console.error('Uncaught Exception:', err);
  return false; // Returning false here prevents Cypress from failing the test
});