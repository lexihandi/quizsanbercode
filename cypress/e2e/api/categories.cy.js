describe("Categories API", () => {
  const baseUrl = "https://api.escuelajs.co/api/v1";

  it("API-001 - Get all categories", () => {
    cy.request("GET", `${baseUrl}/categories`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("API-002 - Get category by ID", () => {
    cy.request("GET", `${baseUrl}/categories/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
    });
  });

  it("API-003 - Get category by slug", () => {
    cy.request("GET", `${baseUrl}/categories/slug/electronics`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.slug).to.eq("electronics");
      },
    );
  });

  it("API-004 - Get products by category", () => {
    cy.request("GET", `${baseUrl}/categories/1/products`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("API-005 - Get categories with limit", () => {
    cy.request("GET", `${baseUrl}/categories?limit=2`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.at.most(2);
    });
  });

  it("API-006 - Create category", () => {
    const categoryName = `Test Category ${Date.now()}`;

    cy.request("POST", `${baseUrl}/categories`, {
      name: categoryName,
      image: "https://placehold.co/600x400",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(categoryName);
    });
  });

  it("API-007 - Create another category", () => {
    const categoryName = `Automation Category ${Date.now()}`;

    cy.request("POST", `${baseUrl}/categories`, {
      name: categoryName,
      image: "https://placehold.co/600x400",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(categoryName);
    });
  });

  it("API-008 - Update category", () => {
    cy.request("PUT", `${baseUrl}/categories/1`, {
      name: "Updated Category",
      image: "https://placehold.co/600x400",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Updated Category");
    });
  });

  it("API-009 - Update category again", () => {
    cy.request("PUT", `${baseUrl}/categories/1`, {
      name: "Updated Category 2",
      image: "https://placehold.co/600x400",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq("Updated Category 2");
    });
  });

  it("API-010 - Delete category", () => {
    const categoryName = `Delete Category ${Date.now()}`;

    cy.request("POST", `${baseUrl}/categories`, {
      name: categoryName,
      image: "https://placehold.co/600x400",
    }).then((createResponse) => {
      expect(createResponse.status).to.eq(201);

      const categoryId = createResponse.body.id;

      cy.request("DELETE", `${baseUrl}/categories/${categoryId}`).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.eq("true");
        },
      );
    });
  });

  it("API-011 - Get category with invalid ID", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/categories/999999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.exist;
    });
  });

  it("API-012 - Get category with invalid slug", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/categories/slug/invalid-category`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.exist;
    });
  });
});
