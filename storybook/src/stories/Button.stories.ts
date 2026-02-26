import type { Meta, StoryObj } from '@storybook/react-vite';
import { takeVisualSnapshot } from '@saucelabs/visual-storybook/play';
import type { SauceVisualParams } from '@saucelabs/visual-storybook';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);

    // Take a screenshot of the focus behavior
    await button.focus();
    await expect(button).toHaveFocus();
    await takeVisualSnapshot('Button Focused');

    await userEvent.click(button);
    await takeVisualSnapshot('Button Clicked / Active');

    // Unfocus the element to reset it for the remaining screenshots / variations
    await button.blur();
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
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
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const _Button: Story = {
  args: {
    label: 'Button',
  },
};
