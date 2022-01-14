import { credentialsStub } from "@lbk/stubs";
describe("login", () => {
  beforeEach(() => cy.visit("/login"));
  afterEach(() => {
    cy.clearLocalStorage();
  });

  it("should login success", () => {
    const { username, password } = credentialsStub();
    cy.login(username, password);
    cy.get("h1").should("have.text", "Invoices");
    cy.window().its("localStorage.token").should("not.be.null");
  });

  it("should login failure", () => {
    const { password } = credentialsStub();
    cy.login("invalid", password);
    cy.get("body").should("contain.text", "Username or password incorrect.");
  });
});
