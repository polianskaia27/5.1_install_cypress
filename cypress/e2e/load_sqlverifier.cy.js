before(() => {
  cy.visit("/?page=1&sort=id,asc");
});
it.skip("should have pagination", () => {
  cy.get(
    "#app-view-container > div.jh-card.card > div > div > div:nth-child(3) > div:nth-child(2) > div > nav"
  )
    .debug()
    .should("be.visible");
});
