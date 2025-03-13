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
    // Hide individual controls
    xs: { control: false, table: { disable: true } },
    sm: { control: false, table: { disable: true } },
    md: { control: false, table: { disable: true } },
    lg: { control: false, table: { disable: true } },
    xl: { control: false, table: { disable: true } },
    thin: { control: false, table: { disable: true } },
    light: { control: false, table: { disable: true } },
    normal: { control: false, table: { disable: true } },
    medium: { control: false, table: { disable: true } },
    semibold: { control: false, table: { disable: true } },
    bold: { control: false, table: { disable: true } },
    extrabold: { control: false, table: { disable: true } },
    black: { control: false, table: { disable: true } },
    italic: { control: false, table: { disable: true } },
    notItalic: { control: false, table: { disable: true } },
    underline: { control: false, table: { disable: true } },
    lineThrough: { control: false, table: { disable: true } },
    noUnderline: { control: false, table: { disable: true } },
    overline: { control: false, table: { disable: true } },
    uppercase: { control: false, table: { disable: true } },
    lowercase: { control: false, table: { disable: true } },
    capitalize: { control: false, table: { disable: true } },
    normalCase: { control: false, table: { disable: true } },
    sans: { control: false, table: { disable: true } },
    serif: { control: false, table: { disable: true } },
    mono: { control: false, table: { disable: true } },
    muted: { control: false, table: { disable: true } },
    link: { control: false, table: { disable: true } },
    default: { control: false, table: { disable: true } },
    accent: { control: false, table: { disable: true } },
    primary: { control: false, table: { disable: true } },
    secondary: { control: false, table: { disable: true } },
    tertiary: { control: false, table: { disable: true } },
    success: { control: false, table: { disable: true } },
    danger: { control: false, table: { disable: true } },
    warning: { control: false, table: { disable: true } },
    info: { control: false, table: { disable: true } },
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
      defaultValue: 'md',
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
      defaultValue: 'semibold',
    },
    fontStyle: {
      control: 'radio',
      options: ['normal', 'italic'],
      mapping: {
        normal: { notItalic: true },
        italic: { italic: true }
      },
      defaultValue: 'normal',
    },
    textDecoration: {
      control: 'radio',
      options: ['none', 'underline', 'lineThrough', 'overline'],
      mapping: {
        none: { noUnderline: true },
        underline: { underline: true },
        lineThrough: { lineThrough: true },
        overline: { overline: true }
      },
      defaultValue: 'none',
    },
    textTransform: {
      control: 'radio',
      options: ['normal', 'uppercase', 'lowercase', 'capitalize'],
      mapping: {
        normal: { normalCase: true },
        uppercase: { uppercase: true },
        lowercase: { lowercase: true },
        capitalize: { capitalize: true }
      },
      defaultValue: 'normal',
    },
    fontFamily: {
      control: 'radio',
      options: ['sans', 'serif', 'mono'],
      mapping: {
        sans: { sans: true },
        serif: { serif: true },
        mono: { mono: true }
      },
      defaultValue: 'sans',
    },
    textAppearance: {
      control: 'radio',
      options: ['default', 'muted', 'link'],
      mapping: {
        default: {},
        muted: { muted: true },
        link: { link: true }
      },
      defaultValue: 'default',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'],
      mapping: {
        default: { default: true },
        accent: { accent: true },
        primary: { primary: true },
        secondary: { secondary: true },
        tertiary: { tertiary: true },
        success: { success: true },
        danger: { danger: true },
        warning: { warning: true },
        info: { info: true }
      },
      defaultValue: 'default',
    }
  },
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    ...meta.argTypes.size.mapping.sm,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    ...meta.argTypes.size.mapping.lg,
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold Button',
    ...meta.argTypes.fontWeight.mapping.bold,
  },
}; 