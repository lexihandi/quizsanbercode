const DirectoryPage = require("../../pages/directoryPage");
const directoryData = require("../../data/directoryData");
const directoryIntercept = require("../../intercept/directoryIntercept");

describe("Directory - POM", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('input[name="username"]').should("be.visible").type("Admin");

    cy.get('input[name="password"]').should("be.visible").type("admin123");

    cy.get('button[type="submit"]').should("be.visible").click();

    cy.url().should("include", "/dashboard");

    DirectoryPage.menu().should("be.visible").click();

    DirectoryPage.assertDirectoryPage();
  });

  it("TC-DIR-001 - Membuka menu Directory", () => {
    DirectoryPage.assertDirectoryPage();
  });

  it("TC-DIR-002 - Search employee berdasarkan nama", () => {
    DirectoryPage.searchName().clear().type("Peter");

    DirectoryPage.selectEmployee(directoryData.employeeName);

    directoryIntercept.searchEmployee();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();

    DirectoryPage.assertEmployeeResult(directoryData.employeeName);
  });

  it("TC-DIR-003 - Search employee yang tidak ditemukan", () => {
    DirectoryPage.searchName().clear().type(directoryData.invalidName);

    directoryIntercept.searchEmployee();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();

    DirectoryPage.assertNoResultFromApi();
  });

  it("TC-DIR-004 - Filter berdasarkan Job Title", () => {
    directoryIntercept.searchEmployee();

    DirectoryPage.jobTitle().should("be.visible").click();

    DirectoryPage.selectFirstOption();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();
  });

  it("TC-DIR-005 - Filter berdasarkan Location", () => {
    DirectoryPage.location().should("be.visible").click();

    DirectoryPage.selectFirstOption();

    directoryIntercept.searchEmployee();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();
  });

  it("TC-DIR-006 - Search menggunakan nama kosong", () => {
    directoryIntercept.searchEmployee();

    DirectoryPage.searchName().clear();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();

    cy.contains("Records Found", {
      timeout: 10000,
    }).should("be.visible");
  });

  it("TC-DIR-007 - Reset filter Directory", () => {
    DirectoryPage.searchName().clear().type("Peter");

    DirectoryPage.selectEmployee(directoryData.employeeName);

    DirectoryPage.searchButton().click();

    DirectoryPage.resetButton().should("be.visible").click();

    DirectoryPage.searchName().should("have.value", "");
  });

  it("TC-DIR-008 - Search employee dengan nama yang berbeda", () => {
    DirectoryPage.searchName().clear().type("Ravi");

    DirectoryPage.selectEmployee(directoryData.differentName);

    directoryIntercept.searchEmployee();

    DirectoryPage.searchButton().click();

    directoryIntercept.waitSearchEmployee();

    DirectoryPage.assertEmployeeResult(directoryData.differentName);
  });
});
