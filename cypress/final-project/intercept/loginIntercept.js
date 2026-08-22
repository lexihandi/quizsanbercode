export const loginIntercept = {
  loginRequest() {
    cy.intercept("POST", "**/auth/validate").as("loginRequest");
  },

  waitLoginRequest() {
    return cy.wait("@loginRequest");
  },
};
