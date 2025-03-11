import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'vaneui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    xs: { control: 'boolean' },
    sm: { control: 'boolean' },
    md: { control: 'boolean' },
    lg: { control: 'boolean' },
    xl: { control: 'boolean' },
    thin: { control: 'boolean' },
    light: { control: 'boolean' },
    normal: { control: 'boolean' },
    medium: { control: 'boolean' },
    semibold: { control: 'boolean' },
    bold: { control: 'boolean' },
    extrabold: { control: 'boolean' },
    black: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    md: true,
    semibold: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    sm: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    lg: true,
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold Button',
    md: true,
    bold: true,
  },
}; 