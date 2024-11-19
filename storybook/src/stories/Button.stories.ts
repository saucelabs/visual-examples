import type { Meta, StoryObj } from "@storybook/react";
import { SauceVisualParams } from "@saucelabs/visual-storybook";
import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
    sauceVisual: {
      variations: [
        {
          // Prefixes the story name with `[disabled]` -- eg: `Example/Button/[disabled] Button`.
          prefix: '[disabled] ',
          args: {
            disabled: true,
          },
        },
        // Examples to test multiple sizes of a single component
        {
          prefix: '[small] ',
          args: {
            size: "small",
          },
        },
        {
          prefix: '[medium] ',
          args: {
            size: "medium",
          },
        },
        {
          prefix: '[large] ',
          args: {
            size: "large",
          },
        },
        {
          // postfixes the story name with ` Primary` -- eg: `Example/Button/Button Primary`.
          postfix: ' Primary',
          args: {
            primary: true,
          },
        },
        {
          // Overrides the name completely. -- eg `Example/Button/Btn primary=true`
          name: 'Btn primary=true',
          args: {
            primary: true,
          },
        },
      ],
    } satisfies SauceVisualParams<Meta<typeof Button>['args']>,
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Button: Story = {
  args: {
    label: "Button",
  },
};
