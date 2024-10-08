import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { CypressSauceVisual, DiffingMethod } from '@saucelabs/cypress-visual-plugin';
import cypressOnFix from "cypress-on-fix";

export default defineConfig({
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
      // Cypress only allows a single listener for an event at a time. This package will proxy all
      // events to all listeners instead of overwriting it. Recommended by the maintainer of the
      // Cucumber support: https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/event-handlers.md#workaround-1--2

      // Register Cypress's on listener, then use the return value to register plugin listeners
      // instead.
      const on = cypressOnFix(cypressOn);
      await addCucumberPreprocessorPlugin(on, config);
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      CypressSauceVisual.register(on, config);
      return config;
    },
  },
})
