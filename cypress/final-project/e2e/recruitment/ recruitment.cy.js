const RecruitmentPage = require("../../pages/recruitmentPage");
const recruitmentData = require("../../data/recruitmentData");

describe("Recruitment - POM", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('input[name="username"]').should("be.visible").type("Admin");

    cy.get('input[name="password"]').should("be.visible").type("admin123");

    cy.get('button[type="submit"]').should("be.visible").click();

    cy.url().should("include", "/dashboard");

    RecruitmentPage.menu().should("be.visible").click();

    RecruitmentPage.assertRecruitmentPage();
  });

  it("TC-REC-001 - Membuka menu Recruitment", () => {
    RecruitmentPage.assertRecruitmentPage();
  });

  it("TC-REC-002 - Search candidate berdasarkan nama", () => {
    RecruitmentPage.candidateName()
      .should("be.visible")
      .clear()
      .type(recruitmentData.candidateName);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().should("be.visible").click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains(recruitmentData.candidateName, {
      timeout: 15000,
    }).should("be.visible");
  });

  it("TC-REC-003 - Search candidate yang tidak ditemukan", () => {
    RecruitmentPage.candidateName()
      .should("be.visible")
      .clear()
      .type(recruitmentData.invalidCandidateName);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().should("be.visible").click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains("No Records Found", {
      timeout: 15000,
    }).should("be.visible");
  });

  it("TC-REC-004 - Filter berdasarkan Job Title", () => {
    RecruitmentPage.selectFilter(0);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("TC-REC-005 - Filter berdasarkan Vacancy", () => {
    RecruitmentPage.selectFilter(1);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("TC-REC-006 - Filter berdasarkan Status", () => {
    RecruitmentPage.selectFilter(3);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("TC-REC-007 - Reset filter Recruitment", () => {
    RecruitmentPage.keywords()
      .should("be.visible")
      .clear()
      .type(recruitmentData.keyword);

    RecruitmentPage.resetButton().should("be.visible").click();

    RecruitmentPage.keywords().should("have.value", "");
  });

  it("TC-REC-008 - Search candidate dengan keyword berbeda", () => {
    RecruitmentPage.keywords()
      .should("be.visible")
      .clear()
      .type(recruitmentData.keyword);

    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );

    RecruitmentPage.searchButton().should("be.visible").click();

    cy.wait("@searchCandidate", { timeout: 10000 })
      .its("response.statusCode")
      .should("eq", 200);
  });
});
