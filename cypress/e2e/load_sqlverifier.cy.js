before(() => {
  cy.visit(
    "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/?page=1&sort=id,asc"
  );
});
it("should have pagination", () => {
  cy.get(
    "#app-view-container > div.jh-card.card > div > div > div:nth-child(3) > div:nth-child(2) > div > nav"
  ).should('be.visible');
});
