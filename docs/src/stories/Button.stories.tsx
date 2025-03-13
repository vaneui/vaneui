import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'vaneui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    // Hide individual size controls
    xs: { control: false, table: { disable: true } },
    sm: { control: false, table: { disable: true } },
    md: { control: false, table: { disable: true } },
    lg: { control: false, table: { disable: true } },
    xl: { control: false, table: { disable: true } },
    // Hide individual font weight controls
    thin: { control: false, table: { disable: true } },
    light: { control: false, table: { disable: true } },
    normal: { control: false, table: { disable: true } },
    medium: { control: false, table: { disable: true } },
    semibold: { control: false, table: { disable: true } },
    bold: { control: false, table: { disable: true } },
    extrabold: { control: false, table: { disable: true } },
    black: { control: false, table: { disable: true } },
    // Radio group controls
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      mapping: {
        xs: { xs: true },
        sm: { sm: true },
        md: { md: true },
        lg: { lg: true },
        xl: { xl: true }
      },
    },
    fontWeight: {
      control: 'radio',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      mapping: {
        thin: { thin: true },
        light: { light: true },
        normal: { normal: true },
        medium: { medium: true },
        semibold: { semibold: true },
        bold: { bold: true },
        extrabold: { extrabold: true },
        black: { black: true }
      },
    }
  },
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    ...meta.argTypes.size.mapping.md,
    ...meta.argTypes.fontWeight.mapping.semibold,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    ...meta.argTypes.size.mapping.sm,
    ...meta.argTypes.fontWeight.mapping.semibold,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    ...meta.argTypes.size.mapping.lg,
    ...meta.argTypes.fontWeight.mapping.semibold,
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold Button',
    ...meta.argTypes.size.mapping.md,
    ...meta.argTypes.fontWeight.mapping.bold,
  },
}; 