class LoginPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }

  username() {
    return cy.get('[name="username"]');
  }

  password() {
    return cy.get('[name="password"]');
  }

  loginButton() {
    return cy.get(".orangehrm-login-button");
  }

  enterUsername(username) {
    this.username().clear().type(username);
  }

  enterPassword(password) {
    this.password().clear().type(password);
  }

  clickLogin() {
    this.loginButton().click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  assertDashboard() {
    cy.url().should("include", "/dashboard");
  }

  assertInvalidCredentials() {
    cy.contains("Invalid credentials").should("be.visible");
  }

  assertRequired() {
    cy.contains("Required").should("be.visible");
  }
}

export default new LoginPage();
