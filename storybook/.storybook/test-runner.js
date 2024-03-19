const { postRender } = require('@saucelabs/visual-storybook');

module.exports = {
    postRender,
    tags: {
        skip: ['skip-saucelabs'],
    },
};
