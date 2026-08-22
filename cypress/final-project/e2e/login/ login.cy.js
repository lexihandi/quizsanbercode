import LoginPage from "../../pages/loginPage";
import { loginData } from "../../data/loginData";
import { loginIntercept } from "../../intercept/loginIntercept";

describe("Login - OrangeHRM", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("TC-POM-001 - Login dengan username dan password valid", () => {
    loginIntercept.loginRequest();

    LoginPage.login(loginData.valid.username, loginData.valid.password);

    loginIntercept.waitLoginRequest().then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    LoginPage.assertDashboard();
  });

  it("TC-POM-002 - Login dengan username tidak valid", () => {
    loginIntercept.loginRequest();

    LoginPage.login(
      loginData.invalidUsername.username,
      loginData.invalidUsername.password,
    );

    loginIntercept.waitLoginRequest().then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    LoginPage.assertInvalidCredentials();
  });

  it("TC-POM-003 - Login dengan password tidak valid", () => {
    loginIntercept.loginRequest();

    LoginPage.login(
      loginData.invalidPassword.username,
      loginData.invalidPassword.password,
    );

    loginIntercept.waitLoginRequest().then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    LoginPage.assertInvalidCredentials();
  });

  it("TC-POM-004 - Login dengan username dan password tidak valid", () => {
    loginIntercept.loginRequest();

    LoginPage.login(
      loginData.invalidUsername.username,
      loginData.invalidPassword.password,
    );

    loginIntercept.waitLoginRequest().then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    LoginPage.assertInvalidCredentials();
  });

  it("TC-POM-005 - Login tanpa mengisi username", () => {
    LoginPage.enterPassword(loginData.valid.password);
    LoginPage.clickLogin();

    LoginPage.assertRequired();
  });

  it("TC-POM-006 - Login tanpa mengisi password", () => {
    LoginPage.enterUsername(loginData.valid.username);
    LoginPage.clickLogin();

    LoginPage.assertRequired();
  });

  it("TC-POM-007 - Login tanpa mengisi username dan password", () => {
    LoginPage.clickLogin();

    LoginPage.assertRequired();
  });

  it("TC-POM-008 - Login dengan password karakter khusus", () => {
    loginIntercept.loginRequest();

    LoginPage.login(
      loginData.specialCharacterPassword.username,
      loginData.specialCharacterPassword.password,
    );

    loginIntercept.waitLoginRequest().then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });

    LoginPage.assertInvalidCredentials();
  });
});
