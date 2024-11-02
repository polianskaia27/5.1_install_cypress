import { LoginPage } from "../pages/login_page_object";
const loginData = require("../fixtures/login_data.json");
import "../support/commands1.js";

describe("change password", () => {
  const loginPage = new LoginPage();
  const password = loginData[0].password;
  const newPassword = loginData[1].password;
  const username = loginData[0].username;
  it("change password - UI", () => {
    loginPage.login(username, password);
    cy.log("Login with old password");

    loginPage.changePassword(password, newPassword);
    cy.log("The password was changed");

    loginPage.singOut();
    cy.log("Logged out with new password");

    loginPage.login(username, newPassword);
    cy.log("Login with new password");

    loginPage.changePassword(newPassword, password);
  });
  it.only("change password - UI + API", () => {
    cy.login(username, password);
    cy.log("Login with old password");

    loginPage.changePassword(password, newPassword);
    cy.log("The password was changed");

    cy.logout();
    cy.log("Logged out with new password");

    cy.changePassword(username, password, newPassword);
  });
});
