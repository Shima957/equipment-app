import { ComponentStoryObj } from '@storybook/react';
import { Button } from './Button';

type Story = ComponentStoryObj<typeof Button>;

export default { component: Button };

export const Default: Story = {
  args: { type: 'button', variant: 'primary', children: 'Button', size: 'md' },
};

export const Secondary: Story = {
  args: {
    type: 'button',
    variant: 'secondary',
    children: 'Button',
    size: 'md',
  },
};

export const Danger: Story = {
  args: { type: 'button', variant: 'danger', children: 'Button', size: 'md' },
};
