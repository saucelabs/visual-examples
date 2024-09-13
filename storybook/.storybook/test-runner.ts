import { TestRunnerConfig } from '@storybook/test-runner';
import { postVisit } from '@saucelabs/visual-storybook';

const config: TestRunnerConfig = {
    postVisit,
};

export default config;
