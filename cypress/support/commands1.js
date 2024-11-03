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

Cypress.Commands.add("authorization", (username, password) => {
  cy.request({
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    url: "/api/authenticate",
    body: {
      username: username,
      password: password,
      rememberMe: true,
    },
  }).then((response) => {
    expect(response.status).to.equal(200);
    Cypress.env("idTokenUser", response.body.id_token);
  });
});

Cypress.Commands.add("changePassword", (password, newPassword) => {
  cy.log(Cypress.env("idTokenUser"));
  cy.request({
    method: "POST",
    url: "/api/account/change-password",
    headers: {
      authorization: `Bearer ${Cypress.env("idTokenUser")}`,
    },
    body: { currentPassword: password, newPassword: newPassword },
  });
  // .then((response) => {
  // expect(response.status).to.equal(200);
  // });
});
