// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['nightwatch/tests'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['nightwatch/pages'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: [],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: ['@saucelabs/nightwatch-sauce-visual-service'],

  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',

  webdriver: {},

  test_workers: {
    enabled: true,
    workers: 'auto',
  },

  test_settings: {
    default: {
      use_ssl: true,
      silent: true,
      selenium: {
        host: `ondemand.${
          process.env.SAUCE_REGION || 'us-west-1'
        }.saucelabs.com`,
        port: 443,
      },
      desiredCapabilities: {
        'sauce:options': {
          screenResolution: '1600x1200',
          username: process.env.SAUCE_USERNAME,
          access_key: process.env.SAUCE_ACCESS_KEY,
        },
      },
      sauceVisualService: {
        buildName: 'Nightwatch Visual Demo Default Testrunner',
        project: `Nightwatch Default Testrunner Project for ${process.env.SAUCE_USERNAME}`,
        branch: 'main',
        failOnFailures: false,
      },

      webdriver: {
        start_process: false,
      },
    },

    // Sauce Labs capabilities
    sauceChrome: {
      extends: 'default',
      desiredCapabilities: {
        browserName: 'chrome',
        platformName: 'Windows 11',
        browserVersion: 'latest',
      },
    },
    sauceFirefox: {
      extends: 'dafault',
      desiredCapabilities: {
        browserName: 'firefox',
        platformName: 'Windows 11',
        browserVersion: 'latest',
      },
    },
  },
};
