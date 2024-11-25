import { LoginPage } from "../pages/login_page_object";
const loginData = require("../fixtures/login_data.json");
import "../support/commands1.js";
import { faker } from "@faker-js/faker";

const username = loginData[0].username;
const password = loginData[0].password;
let newPassword = faker.internet.password(8);
describe("Change password", () => {
  it("Change password - UI + API", () => {
    cy.authorization(username, password).then(() => {
      cy.changePassword(password, newPassword).then(() => {
        cy.log(`The password ${password} was changed to ${newPassword}`).then(
          () => {
            cy.changePassword(newPassword, password).then(() => {
              cy.log(
                `The new password ${newPassword} was changed to ${password}`
              );
            });
          }
        );
      });
    });
  });
});
