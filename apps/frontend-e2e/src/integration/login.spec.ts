import { credentialsStub } from "@lbk/stubs";
describe("login", () => {
  beforeEach(() => cy.visit("/login"));

  it("should login correct", () => {
    cy.get("#username").click();
    cy.get("#username").type(credentialsStub().username);

    cy.get("#password").click();
    cy.get("#password").type(credentialsStub().password);
    cy.get("button[type='submit']").click();

    cy.get("h1").should("have.text", "Invoices");
  });
});
