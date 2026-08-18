class LoginPage {
  username = '[name="username"]';
  password = '[name="password"]';
  loginButton = ".orangehrm-login-button";
  requiredMessage = ".oxd-input-field-error-message";

  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  enterUsername(username) {
    cy.get(this.username).clear().type(username);
  }

  enterPassword(password) {
    cy.get(this.password).clear().type(password);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  getRequiredMessage() {
    return cy.get(this.requiredMessage);
  }
}

export default new LoginPage();
