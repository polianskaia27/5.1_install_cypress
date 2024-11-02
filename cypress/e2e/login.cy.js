const loginData = require("../fixtures/login_data.json");
const usernameField = "#username";
const passwordField = "#password";
const singInButton = '[data-cy="submit"]';
("#login-page > div > form > div.modal-footer > button.btn.btn-primary");

beforeEach(() => {
  cy.visit("/");
  cy.getToThePage("#account-menu > a", "#account-menu > div > a:nth-child(1)");
});
describe("Check login", () => {
  it.only("Valid data", () => {
    loginData.forEach((item) => {
      cy.enterText(usernameField, item.username);
      cy.enterText(passwordField, item.password);
      cy.get(singInButton).click();
      cy.chekTheElement("#docs-menu > a > span", "Swagger");
    });
  });
  loginData.forEach((item) => {
    it("Invalid data", () => {
      cy.log(item.username, item.password);
      cy.enterText(usernameField, item.username);
      cy.enterText(passwordField, item.password);
      cy.get(singInButton).click();
    });
  });
});
