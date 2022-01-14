import { credentialsStub } from "@lbk/stubs";
import * as chance from "chance";

describe("Sign up", () => {
  beforeEach(() => cy.visit("/signup"));

  it.only("should sign up correct", () => {
    cy.get("#username").click();
    cy.get("#username").type(chance().string({ length: 5, alpha: true }));

    cy.get("#password").click();
    cy.get("#password").type(chance().string({ length: 8 }));
    cy.get("button[type='submit']").click();

    cy.should("contain.text", "Invoices");
  });

  describe("username", () => {
    it("should disable submit button when username longer than 30", () => {
      cy.get("#username").click();
      cy.get("#username").type(Array.from({ length: 30 }).join("sdfs"));

      cy.get("#password").click();
      cy.get("#password").type(credentialsStub().password);
      cy.get("button[type='submit']").should("be.disabled");
    });

    it("should disable submit button when username shorter than 5", () => {
      cy.get("#username").click();
      cy.get("#username").type("abde");

      cy.get("#password").click();
      cy.get("#password").type(credentialsStub().password);
      cy.get("button[type='submit']").should("be.disabled");
    });

    it("should disable submit button when username not provided", () => {
      cy.get("#password").click();
      cy.get("#password").type(credentialsStub().password);
      cy.get("button[type='submit']").should("be.disabled");
    });
  });

  describe("password", () => {
    it("should disable submit button when password longer than 30", () => {
      cy.get("#username").click();
      cy.get("#username").type(credentialsStub().password);

      cy.get("#password").click();
      cy.get("#password").type(Array.from({ length: 30 }).join("sdfs"));
      cy.get("button[type='submit']").should("be.disabled");
    });

    it("should disable submit button when password shorter than 8", () => {
      cy.get("#username").click();
      cy.get("#username").type(credentialsStub().password);

      cy.get("#password").click();
      cy.get("#password").type("adf_ass");
      cy.get("button[type='submit']").should("be.disabled");
    });

    it("should disable submit button when password not provided", () => {
      cy.get("#username").click();
      cy.get("#username").type(credentialsStub().password);
      cy.get("button[type='submit']").should("be.disabled");
    });
  });
});
