import { credentialsStub } from "@lbk/stubs";
import { fillForm } from "../support/app.po";
describe("frontend", () => {
  beforeEach(() => {
    const { username, password } = credentialsStub();
    cy.login(username, password);
  });
  beforeEach(() => cy.visit("/"));

  it("should create new invoice", () => {
    cy.get('[data-cy="new-invoice-button"]').click();
    cy.wait(500);
    fillForm();
    cy.get(".btn-primary").click();
  });
  // it("should display invoices", () => {
  //   expect(1).to.be.eq("1");
  // });
});
