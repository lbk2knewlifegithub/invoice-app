describe('frontend', () => {
  beforeEach(() => cy.visit('/'));

  it('should create new invoice', () => {
    cy.get('[data-cy="new-invoice-button"]').click();
    cy.wait(500);
    cy.scrollTo('top');
    // cy.wait(300);
    // cy.get('input[name="senderStreetAddress"]').type('fuck')
  });
});
