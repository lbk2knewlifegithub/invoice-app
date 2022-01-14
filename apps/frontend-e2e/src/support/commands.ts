// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    login(username: string, password: string): void;
  }
}

// -- This is a parent command --
Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").click();
  cy.get("#username").type(username);

  cy.get("#password").click();
  cy.get("#password").type(password);
  cy.get("button[type='submit']").click();
});

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => {
//  })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
