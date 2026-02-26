import { TestRunnerConfig } from '@storybook/test-runner';
import { postVisit, preVisit  } from "@saucelabs/visual-storybook";

export default {
    preVisit,
    postVisit,
} satisfies TestRunnerConfig;
