it("TC-INTERCEPT-001 - Login dengan username dan password valid", () => {
  cy.intercept("POST", "**").as("loginRequest");
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  cy.get('[name="username"]').clear().type("Admin");
  cy.get('[name="password"]').clear().type("admin123");
  cy.get(".orangehrm-login-button").click();
  cy.wait("@loginRequest").then((interception) => {
    cy.log(interception.request.url);
  });

  cy.url().should("include", "/dashboard");
});

it("TC-INTERCEPT-002 - Login dengan username tidak valid", () => {
  cy.intercept("POST", "**/auth/validate").as("invalidUsername");

  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  cy.get('[name="username"]').type("invalidUser");
  cy.get('[name="password"]').type("admin123");
  cy.get(".orangehrm-login-button").click();

  cy.wait("@invalidUsername").then((interception) => {
    expect(JSON.stringify(interception.request.body)).to.include("invalidUser");
  });
});

it("TC-INTERCEPT-003 - Login dengan password tidak valid", () => {
  cy.intercept("POST", "**/auth/validate").as("invalidPassword");

  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  cy.get('[name="username"]').type("Admin");
  cy.get('[name="password"]').type("salah123");
  cy.get(".orangehrm-login-button").click();

  cy.wait("@invalidPassword").then((interception) => {
    expect(JSON.stringify(interception.request.body)).to.include("salah123");
  });
});

it("TC-INTERCEPT-004 - Login dengan username dan password tidak valid", () => {
  cy.intercept("POST", "**/auth/validate").as("invalidCredentials");

  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  cy.get('[name="username"]').type("invalidUser");
  cy.get('[name="password"]').type("salah123");
  cy.get(".orangehrm-login-button").click();

  cy.wait("@invalidCredentials").then((interception) => {
    expect(interception.request.method).to.eq("POST");
    expect(interception.request.url).to.include("/auth/validate");
  });
});

it("TC-INTERCEPT-005 - Login tanpa mengisi username", () => {
  cy.intercept("POST", "**/auth/validateCredentials").as(
    "emptyUsernameRequest",
  );
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  cy.get('[name="password"]').type("admin123");
  cy.get(".orangehrm-login-button").click();
  cy.get('[name="username"]')
    .parents(".oxd-input-group")
    .should("contain", "Required");
});

it("TC-INTERCEPT-006 - Login tanpa mengisi password", () => {
  cy.intercept("POST", "**/auth/validate").as("emptyPasswordRequest");
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  cy.get('[name="username"]').type("Admin");
  cy.get(".orangehrm-login-button").click();
  cy.contains("Required").should("be.visible");
  cy.get("@emptyPasswordRequest.all").should("have.length", 0);
});

it("TC-INTERCEPT-007 - Login tanpa mengisi username dan password", () => {
  cy.intercept("POST", "**/auth/validate").as("emptyCredentialsRequest");
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  cy.get(".orangehrm-login-button").click();
  cy.contains("Required").should("be.visible");
  cy.get("@emptyCredentialsRequest.all").should("have.length", 0);
});

it("TC-INTERCEPT-008 - Login dengan username valid dan password valid", () => {
  cy.intercept("POST", "**/auth/validate").as("validCredentialsRequest");

  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  cy.get('[name="username"]').type("Admin");
  cy.get('[name="password"]').type("admin123");
  cy.get(".orangehrm-login-button").click();

  cy.wait("@validCredentialsRequest").then((interception) => {
    expect(interception.request.method).to.eq("POST");
    expect(interception.request.url).to.include("/auth/validate");
  });

  cy.url().should("include", "/dashboard");
});
