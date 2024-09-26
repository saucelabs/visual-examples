const { defineConfig } = require('cypress');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { CypressSauceVisual, DiffingMethod } = require('@saucelabs/cypress-visual-plugin');

// Cypress does not allow multiple plugin to listen to the same event.
// Only the last one will receive the event.
// This code is intended to forward it to all plugins to ensure plugins works properly.
//
// Limitation: Some unexpected behaviour may be noticed when using plugins with return values.
//             With the Cucumber + Sauce Visual pair, there is no issues.
let tasks = {};
let onActions = {};
function on(action, arg) {
  if (action === 'task') {
      Object.assign(tasks, arg);
  } else {
    onActions[action] = [
      ...onActions[action] ?? [],
      arg,
    ];
  }
};

function forwardOn(cypressOn) {
  for (const event of Object.keys(onActions)) {
    cypressOn(event, async function (...args) {
      let retValue = undefined;
      for (const fn of onActions[event]) {
        let ret = await fn(...args);
        retValue ??= ret;
      }
      return retValue;
    });
  }
  cypressOn('task', tasks);
}
// End of Helper.

module.exports = defineConfig({
  e2e: {
    saucelabs: {
      project: process.env.GITHUB_REPOSITORY || `Cypress Visual Testing Example for ${process.env.SAUCE_USERNAME}`,
      branch: process.env.GITHUB_REF_NAME,
      buildName: `Cypress - Sauce Demo Test`,
      region: 'us-west-1',
      diffingMethod: DiffingMethod.Balanced,
    },
    specPattern: "cypress/**/*.feature",
    supportFile: './cypress/support/e2e.ts',
    setupNodeEvents: async function(cypressOn, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      CypressSauceVisual.register(on, config);

      forwardOn(cypressOn);
      return config;
    },
  },
})
