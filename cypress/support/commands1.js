// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginElements = require("../fixtures/pages/login_elements.json");

Cypress.Commands.add("login", (username, password) => {
  cy.visit(loginElements.urlLogin);
  cy.get(loginElements.elementsMenu.accountMenu).click();
  cy.get(loginElements.elementsMenu.accountMenuSignIn).click();
  cy.get(loginElements.loginForm.usernameField).type(username);
  cy.get(loginElements.loginForm.passwordField).type(password);
  cy.get(loginElements.loginForm.loginButton).click();
  cy.get(loginElements.elementsMenu.swaggerMenu)
    .should("be.visible")
    .should("contain", "Swagger");
});

Cypress.Commands.add("logout", () => {
  cy.get(loginElements.elementsMenu.accountMenu).click();
  cy.get(loginElements.elementsMenu.accountMenuSignOut).click();
  cy.contains("Logged out successfully!").should("exist");
});

Cypress.Commands.add("chekTheElement", (selector, text) => {
  cy.get(selector).should("be.visible").should("contain", text);
});

Cypress.Commands.add("changePassword", (username, password, newPassword) => {
  cy.request({
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    url: "/api/authenticate",
    body: {
      username: "admin_automation",
      password: "admin_automation",
      rememberMe: true,
    },
  }).then((responce) => {
    expect(responce.status).to.equal(200);
    Cypress.env("idToken", responce.body.id_token);
    cy.log(password, newPassword);
    cy.login(username, password);
    cy.request({
      method: "POST",
      headers: {
        authorization: `Bearer ${Cypress.env("idToken")}`,
      },
      url: "https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/account/change-password",
      body: { currentPassword: password, newPassword: newPassword },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
