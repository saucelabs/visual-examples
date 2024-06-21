const { defineConfig } = require('cypress');
const { CypressSauceVisual, DiffingMethod } = require('@saucelabs/cypress-visual-plugin');

module.exports = defineConfig({
  e2e: {
    saucelabs: {
      project: process.env.GITHUB_REPOSITORY || `Cypress Visual Testing Example for ${process.env.SAUCE_USERNAME}`,
      branch: process.env.GITHUB_REF_NAME,
      buildName: `Cypress - Sauce Demo Test`,
      region: 'us-west-1',
      diffingMethod: DiffingMethod.Balanced,
    },
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: './cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      CypressSauceVisual.register(on, config);
    },
  },
})
