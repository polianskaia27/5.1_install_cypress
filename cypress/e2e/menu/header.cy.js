beforeEach(() => {
  const password = Cypress.env("password");
  const username = Cypress.env("username");
  cy.visit("/login");
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get(
    "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
  ).click();
  cy.checkUrl("/");
});
describe("Checking of menu", () => {
  it("navigate to Home page and verify title", () => {
    cy.get("#header-tabs > li:nth-child(1) > a").click();
    cy.chekTheElement("#task-heading > span", "Tasks");
    cy.checkUrl("/");
  });
  it("navigate to Tasks page and verify title", () => {
    cy.getToThePage("#entity-menu", "#entity-menu > div > a:nth-child(1)");
    cy.chekTheElement("#task-heading > span", "Tasks");
    cy.checkUrl("/task?page=1&sort=id,asc");
  });
  it("navigate to User Task page and verify title", () => {
    cy.getToThePage("#entity-menu", "#entity-menu > div > a:nth-child(2)");
    cy.chekTheElement("#user-task-heading > span", "User Tasks");
    cy.checkUrl("/user-task");
  });
  it("navigate to API page and verify body", () => {
    cy.getToThePage("#docs-menu > a", "#docs-menu > div > a");
    cy.get("body").should("exist").and("not.be.empty");
    cy.checkUrl("/docs/docs");
  });
  it("change language to French", () => {
    cy.getToThePage(
      "#header-tabs > li:nth-child(4) > a",
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)"
    );
    cy.chekTheElement("#header-tabs > li:nth-child(4) > a > span", "Français");
    cy.checkUrl("/?page=1&sort=id,asc");
  });
  it("change language to English", () => {
    cy.getToThePage(
      "#header-tabs > li:nth-child(4) > a",
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)"
    );
    cy.chekTheElement("#header-tabs > li:nth-child(4) > a > span", "English");
    cy.checkUrl("/?page=1&sort=id,asc");
  });
  it("change language to Russian", () => {
    cy.getToThePage(
      "#header-tabs > li:nth-child(4) > a",
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(3)"
    );
    cy.chekTheElement("#header-tabs > li:nth-child(4) > a > span", "Русский");
    cy.checkUrl("/?page=1&sort=id,asc");
  });
  it("change language to Ukranian", () => {
    cy.getToThePage(
      "#header-tabs > li:nth-child(4) > a",
      "#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(4)"
    );
    cy.chekTheElement(
      "#header-tabs > li:nth-child(4) > a > span",
      "Українська"
    );
    cy.checkUrl("/?page=1&sort=id,asc");
  });
  it("navigate to Settings page and verify title", () => {
    cy.getToThePage(
      "#account-menu > a",
      "#account-menu > div > a:nth-child(1)"
    );
    cy.chekTheElement("#settings-title > span", "User settings for");
    cy.checkUrl("/account/settings");
  });
  it("navigate to Password page and verify title", () => {
    cy.getToThePage(
      "#account-menu > a",
      "#account-menu > div > a:nth-child(2)"
    );
    cy.chekTheElement("#password-title > span", "Password for");
    cy.checkUrl("/account/password");
  });
  it("navigate to Sing Out page and verify title", () => {
    cy.getToThePage(
      "#account-menu > a",
      "#account-menu > div > a:nth-child(3)"
    );
    cy.chekTheElement(
      "#app-view-container > div.jh-card.card > div > div > h4",
      "Logged out successfully!"
    );
    cy.checkUrl("/logout");
  });
});
