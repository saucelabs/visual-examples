import { defineConfig } from 'cypress';
import CypressVisualPlugin from '@saucelabs/cypress-visual-plugin';

export default defineConfig({
  e2e: {
    saucelabs: {
      buildName: 'Cypress - {BROWSER_NAME} {BROWSER_VERSION} - {OS_NAME} {OS_VERSION}',
      namePattern: '^visual: .*',
      region: 'staging',
    },
    supportFile: './cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      CypressVisualPlugin(on, config);
    },
  } as Cypress.EndToEndConfigOptions,
})
