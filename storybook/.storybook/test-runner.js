const { postVisit } = require('@saucelabs/visual-storybook');

// Prefer to use TypeScript? See the advanced configuration docs on Storybook for an easy example:
// https://storybook.js.org/docs/writing-tests/test-runner#advanced-configuration

/**
 * @type {import('@storybook/test-runner').TestRunnerConfig}
 */
module.exports = {
    postVisit,
};
