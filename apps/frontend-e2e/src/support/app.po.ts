export const getGreeting = () => cy.get("h1");

export const createItem = () => {
  cy.get('[data-cy="add-item"]').click();
};

export const fillForm = () => {
  cy.get('[data-cy="bill-from"] [controlName="street"]').type(
    "Test Sender"
  );

  cy.get('[data-cy="bill-from"] [controlName="city"]').type("Lonnon");

  cy.get('[data-cy="bill-from"] [controlName="postCode"]').type("2323");

  cy.get('[data-cy="bill-from"] [controlName="country"]').type(
    "UnitedKingdom"
  );

  cy.get('lbk-bill-to-form [controlName="clientName"]').type("Alex Grim");
  cy.get('lbk-bill-to-form [controlName="clientEmail"]').type(
    "alexgrim@gmail.com"
  );
  cy.get('lbk-bill-to-form [controlName="street"]').type("19 Union Street");
  cy.get('lbk-bill-to-form [controlName="city"]').type("Lonnon");

  cy.get('lbk-bill-to-form [controlName="postCode"]').type("2323");

  cy.get('lbk-bill-to-form [controlName="country"]').type("UnitedKingdom");
  cy.get('lbk-bill-to-form [controlName="description"]').type("Graphic Design");
};
