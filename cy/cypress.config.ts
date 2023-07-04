import { defineConfig } from 'cypress'
import { VisualApi, getApi } from '@saucelabs/visual';

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: false,
  video: false,

  e2e: {}
});
