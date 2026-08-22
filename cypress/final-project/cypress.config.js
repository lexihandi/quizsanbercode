const { defineConfig } = require("cypress");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    specPattern: path.join(__dirname, "e2e/**/*.cy.js"),
    supportFile: false,
  },
});
