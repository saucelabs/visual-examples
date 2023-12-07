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
  src_folders: ['nightwatch'],

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
    enabled: false,
  },

  test_settings: {
    default: {
      use_ssl: true,
      silent: true,
      selenium: {
        host: `ondemand.${
          process.env.REGION && process.env.REGION.toLocaleLowerCase() === 'eu'
            ? 'eu-central'
            : 'us-west'
        }-1.saucelabs.com`,
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
        buildName: 'Nightwatch Visual Demo Mocha Testrunner',
        project: `Nightwatch Mocha Testrunner Project for ${process.env.SAUCE_USERNAME}`,
        branch: 'main',
        failOnFailures: false,
      },

      webdriver: {
        start_process: false,
      },

      test_runner: {
        // set cucumber as the runner
        // For more info on using CucumberJS with Nightwatch, visit:
        // https://nightwatchjs.org/guide/writing-tests/using-cucumberjs.html
        type: 'cucumber',

        // define cucumber specific options
        options: {
          //set the feature path
          feature_path: 'nightwatch/features',

          // start the webdriver session automatically (enabled by default)
          // auto_start_session: true

          // use parallel execution in Cucumber
          // parallel: 2 // set number of workers to use (can also be defined in the cli as --parallel 2
        },
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
