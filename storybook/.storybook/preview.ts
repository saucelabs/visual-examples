import type { Preview } from "@storybook/react";
import { SauceVisualParams } from "@saucelabs/visual-storybook";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    sauceVisual: {
      captureDom: true,
    } satisfies SauceVisualParams,
  },
};

export default preview;
