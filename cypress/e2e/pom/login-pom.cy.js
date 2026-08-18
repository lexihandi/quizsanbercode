import LoginPage from "../../pages/LoginPage";

describe("Login OrangeHRM - POM", () => {
  it("TC-POM-001 - Login dengan username dan password valid", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "admin123");

    cy.url().should("include", "/dashboard");
  });

  it("TC-POM-002 - Login dengan username tidak valid", () => {
    LoginPage.visit();
    LoginPage.login("invalidUser", "admin123");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-POM-003 - Login dengan password tidak valid", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "wrong123");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-POM-004 - Login dengan username dan password tidak valid", () => {
    LoginPage.visit();
    LoginPage.login("invalidUser", "wrong123");

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("TC-POM-005 - Login tanpa mengisi username", () => {
    LoginPage.visit();
    LoginPage.enterPassword("admin123");
    LoginPage.clickLogin();

    LoginPage.getRequiredMessage().first().should("contain", "Required");
  });

  it("TC-POM-006 - Login tanpa mengisi password", () => {
    LoginPage.visit();
    LoginPage.enterUsername("Admin");
    LoginPage.clickLogin();

    LoginPage.getRequiredMessage().last().should("contain", "Required");
  });

  it("TC-POM-007 - Login tanpa mengisi username dan password", () => {
    LoginPage.visit();
    LoginPage.clickLogin();

    LoginPage.getRequiredMessage().should("have.length", 2);
  });

  it("TC-POM-008 - Login dengan password karakter khusus", () => {
    LoginPage.visit();
    LoginPage.login("Admin", "Admin@123");

    cy.contains("Invalid credentials").should("be.visible");
  });
});
