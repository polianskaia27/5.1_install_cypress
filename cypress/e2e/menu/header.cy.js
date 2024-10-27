beforeEach(() => {
  const baseUrl = Cypress.config("baseUrl");
  const password = Cypress.env("password");
  const username = Cypress.env("username");
  cy.visit(`baseUrl/login`);
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get(
    "#login-page > div > form > div.modal-footer > button.btn.btn-primary"
  ).click();
  cy.url().should("include", "/");
});
it("navigate to Home page and verify title", () => {
  cy.get("#header-tabs > li:nth-child(1) > a").click();
  cy.get("#task-heading > span")
    .should("be.visible")
    .should("contain", "Tasks");
  cy.url().should("include", "/");
});
it("navigate to Tasks page and verify title", () => {
  cy.get("#entity-menu").click();
  cy.get("#entity-menu > div > a:nth-child(1)").click();
  cy.get("#task-heading > span")
    .should("be.visible")
    .should("contain", "Tasks");
  cy.url().should("include", "/task?page=1&sort=id,asc");
});
it("navigate to User Task page and verify title", () => {
  cy.get("#entity-menu").click();
  cy.get("#entity-menu > div > a:nth-child(2)").click();
  cy.get("#user-task-heading > span")
    .should("be.visible")
    .should("contain", "User Tasks");
  cy.url().should("include", "/user-task");
});
it("navigate to API page and verify body", () => {
  cy.get("#docs-menu > a").click();
  cy.get("#docs-menu > div > a").click();
  cy.get("body")
    .should("exist")
    .and("not.be.empty");
  cy.url().should("include", "/docs/docs");
});
it("change language to French", () => {
  cy.get("#header-tabs > li:nth-child(4) > a").click();
  cy.get("#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(2)").click();
  cy.get("#header-tabs > li:nth-child(4) > a > span")
    .should("be.visible")
    .should("contain", "Français");
});
it("change language to English", () => {
  cy.get("#header-tabs > li:nth-child(4) > a").click();
  cy.get("#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(1)").click();
  cy.get("#header-tabs > li:nth-child(4) > a > span")
    .should("be.visible")
    .should("contain", "English");
});
it("change language to Russian", () => {
  cy.get("#header-tabs > li:nth-child(4) > a").click();
  cy.get("#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(3)").click();
  cy.get("#header-tabs > li:nth-child(4) > a > span")
    .should("be.visible")
    .should("contain", "Русский");
});
it("change language to Ukranian", () => {
  cy.get("#header-tabs > li:nth-child(4) > a").click();
  cy.get("#header-tabs > li.dropdown.show.nav-item > div > button:nth-child(4)").click();
  cy.get("#header-tabs > li:nth-child(4) > a > span")
    .should("be.visible")
    .should("contain", "Українська");
});
it("navigate to Settings page and verify title", () => {
  cy.get("#account-menu > a").click();
  cy.get("#account-menu > div > a:nth-child(1)").click();
  cy.get("#settings-title > span")
    .should("be.visible")
    .should("contain", "User settings for");
  cy.url().should("include", "/account/settings");
});
it("navigate to Password page and verify title", () => {
  cy.get("#account-menu > a").click();
  cy.get("#account-menu > div > a:nth-child(2)").click();
  cy.get("#password-title > span")
    .should("be.visible")
    .should("contain", "Password for");
  cy.url().should("include", "/account/password");
});
it("navigate to Sing Out page and verify title", () => {
  cy.get("#account-menu > a").click();
  cy.get("#account-menu > div > a:nth-child(3)").click();
  cy.get("#app-view-container > div.jh-card.card > div > div > h4")
    .should("be.visible")
    .should("contain", "Logged out successfully!");
  cy.url().should("include", "/logout");
});
