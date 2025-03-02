import { TestRunnerConfig } from '@storybook/test-runner';
import { postVisit, preVisit } from '@saucelabs/visual-storybook';

const config: TestRunnerConfig = {
    preVisit,
    postVisit,
};

export default config;
