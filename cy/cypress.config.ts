import { defineConfig } from 'cypress'
import {question} from 'readline-sync';
import { getApi } from "@saucelabs/visual";

const sauceConfig = {
  protocol: 'http',
  hostname: 'localhost',
  port: 9000,
  user: '',
  key: ''
}

function getSauceCredentials(config): { user: string; key: string; } {
  var user = process.env.SAUCE_USERNAME || config.user;
  var key = process.env.SAUCE_ACCESS_KEY || config.key;

  if(!user) {
      user = question('Whats your Sauce Labs username? ');
  }

  if(!key) {
    key = question('Whats your Sauce Labs api key? ', {
          hideEchoBack: true
      });
  }

  return {user, key};
}

export default defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: false,
  video: false,

  e2e: {
    setupNodeEvents(on, config) {
      // getSauceCredentials(sauceConfig)
      console.log({getApi})
    },
  }
});
