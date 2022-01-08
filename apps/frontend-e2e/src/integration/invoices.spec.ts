import { fillForm } from "../support/app.po";
describe("frontend", () => {
  beforeEach(() => cy.visit("/"));

  it("should create new invoice", () => {
    cy.get('[data-cy="new-invoice-button"]').click();
    cy.wait(500);
    cy.scrollTo("top");
    fillForm();
    cy.wait(100);
    cy.get(".btn-primary").click();
  });
});
