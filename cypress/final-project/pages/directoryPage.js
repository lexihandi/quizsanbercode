class DirectoryPage {
  menu() {
    return cy.contains(".oxd-main-menu-item", "Directory");
  }

  employeeName() {
    return cy.get('input[placeholder="Type for hints..."]').first();
  }

  searchName() {
    return this.employeeName();
  }

  selectEmployee(name) {
    cy.get(".oxd-autocomplete-dropdown", {
      timeout: 10000,
    })
      .should("be.visible")
      .contains(".oxd-autocomplete-option", name)
      .click();
  }

  jobTitle() {
    return cy.get(".oxd-select-text").eq(0);
  }

  location() {
    return cy.get(".oxd-select-text").eq(1);
  }

  searchButton() {
    return cy.contains("button", "Search");
  }

  resetButton() {
    return cy.contains("button", "Reset");
  }

  selectFirstOption() {
    cy.get("body").then(($body) => {
      if ($body.find(".oxd-select-option").length > 0) {
        cy.get(".oxd-select-option")
          .not(":contains('-- Select --')")
          .first()
          .click();
      }
    });
  }

  assertDirectoryPage() {
    cy.url().should("include", "/directory/viewDirectory");
    cy.contains("Directory").should("be.visible");
  }

  assertEmployeeResult(name) {
    cy.contains(name, {
      timeout: 10000,
    }).should("be.visible");
  }

  assertNoResultFromApi() {
    cy.get("@directorySearch")
      .its("response.body.data")
      .should("be.an", "array")
      .and("have.length", 0);
  }
}

module.exports = new DirectoryPage();
