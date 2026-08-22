const recruitmentIntercept = {
  searchCandidate() {
    cy.intercept("GET", "**/api/v2/recruitment/candidates*").as(
      "searchCandidate",
    );
  },

  waitSearchCandidate() {
    return cy.wait("@searchCandidate");
  },
};

module.exports = recruitmentIntercept;
