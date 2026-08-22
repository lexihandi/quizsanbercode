class RecruitmentPage {
  menu() {
    return cy.contains(".oxd-main-menu-item", "Recruitment");
  }

  candidateName() {
    return cy.get('input[placeholder="Type for hints..."]');
  }

  jobTitle() {
    return cy.get(".oxd-select-text").eq(0);
  }

  vacancy() {
    return cy.get(".oxd-select-text").eq(1);
  }

  hiringManager() {
    return cy.get(".oxd-select-text").eq(2);
  }

  status() {
    return cy.get(".oxd-select-text").eq(3);
  }

  keywords() {
    return cy.get('input[placeholder="Enter comma separated words..."]');
  }

  searchButton() {
    return cy.contains("button", "Search");
  }

  resetButton() {
    return cy.contains("button", "Reset");
  }

  selectFilter(index) {
    cy.get(".oxd-select-text").eq(index).should("be.visible").click();

    cy.get(".oxd-select-dropdown", { timeout: 10000 })
      .should("be.visible")
      .find(".oxd-select-option")
      .not(":contains('-- Select --')")
      .first()
      .click();
  }

  assertRecruitmentPage() {
    cy.url().should("include", "/recruitment/viewCandidates");

    cy.contains("Candidates").should("be.visible");
  }
}

module.exports = new RecruitmentPage();
