export class LoginPage {
  elementsMenu = {
    accountMenu: () => cy.get("#account-menu > a"),
    accountMenuSingIn: () => cy.get("#account-menu > div > a:nth-child(1)"),
    accountMenuPassword: () => cy.get("#account-menu > div > a:nth-child(2)"),
    accountMenuSingOut: () => cy.get("#account-menu > div > a:nth-child(3)"),
    swaggerMenu: () => cy.get("#docs-menu > a > span"),
  };
  elementsLogin = {
    usernameField: () => cy.get("#username"),
    passwordField: () => cy.get("#password"),
    loginButton: () => cy.get('[data-cy="submit"]'),
  };
  elementsChangingPassword = {
    currentPasswordField: () => cy.get("#currentPassword"),
    newPasswordField: () => cy.get("#newPassword"),
    confirmNewPasswordField: () => cy.get("#confirmPassword"),
    saveButton: () => cy.get("#password-form > button"),
  };
  login(username, password) {
    cy.visit("/?page=1&sort=id,asc");
    this.elementsMenu.accountMenu().click();
    this.elementsMenu.accountMenuSingIn().click();
    this.elementsLogin.usernameField().type(username);
    this.elementsLogin.passwordField().type(password);
    this.elementsLogin.loginButton().click();
    this.elementsMenu
      .swaggerMenu()
      .should("be.visible")
      .should("contain", "Swagger");
  }
  changePassword(password, newPassword) {
    this.elementsMenu.accountMenu().click();
    this.elementsMenu.accountMenuPassword().click();
    this.elementsChangingPassword.currentPasswordField().type(password);
    this.elementsChangingPassword.newPasswordField().type(newPassword);
    this.elementsChangingPassword.confirmNewPasswordField().type(newPassword);
    this.elementsChangingPassword.saveButton().click();
  }
  singOut() {
    this.elementsMenu.accountMenu().click();
    this.elementsMenu.accountMenuSingOut().click();
    cy.contains("Logged out successfully!").should("exist");
  }
}
