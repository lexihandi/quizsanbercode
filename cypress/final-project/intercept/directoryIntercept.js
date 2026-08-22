const directoryIntercept = {
  searchEmployee() {
    cy.intercept("GET", "**/api/v2/directory/employees*").as("directorySearch");
  },

  waitSearchEmployee() {
    return cy.wait("@directorySearch");
  },
};

module.exports = directoryIntercept;
