import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'vaneui';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    // Default size
    md: true,
    // Default font weight
    semibold: true,
    // Default font style
    notItalic: true,
    // Default text decoration
    noUnderline: true,
    // Default text transform
    normalCase: true,
    // Default font family
    sans: true,
    // Default text appearance and appearance
    default: true,
  },
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
        xs: { xs: true, sm: false, md: false, lg: false, xl: false },
        sm: { xs: false, sm: true, md: false, lg: false, xl: false },
        md: { xs: false, sm: false, md: true, lg: false, xl: false },
        lg: { xs: false, sm: false, md: false, lg: true, xl: false },
        xl: { xs: false, sm: false, md: false, lg: false, xl: true }
      },
      defaultValue: 'md',
    },
    fontWeight: {
      control: 'radio',
      options: ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      mapping: {
        thin: { thin: true, light: false, normal: false, medium: false, semibold: false, bold: false, extrabold: false, black: false },
        light: { thin: false, light: true, normal: false, medium: false, semibold: false, bold: false, extrabold: false, black: false },
        normal: { thin: false, light: false, normal: true, medium: false, semibold: false, bold: false, extrabold: false, black: false },
        medium: { thin: false, light: false, normal: false, medium: true, semibold: false, bold: false, extrabold: false, black: false },
        semibold: { thin: false, light: false, normal: false, medium: false, semibold: true, bold: false, extrabold: false, black: false },
        bold: { thin: false, light: false, normal: false, medium: false, semibold: false, bold: true, extrabold: false, black: false },
        extrabold: { thin: false, light: false, normal: false, medium: false, semibold: false, bold: false, extrabold: true, black: false },
        black: { thin: false, light: false, normal: false, medium: false, semibold: false, bold: false, extrabold: false, black: true }
      },
      defaultValue: 'semibold',
    },
    fontStyle: {
      control: 'radio',
      options: ['normal', 'italic'],
      mapping: {
        normal: { notItalic: true, italic: false },
        italic: { notItalic: false, italic: true }
      },
      defaultValue: 'normal',
    },
    textDecoration: {
      control: 'radio',
      options: ['none', 'underline', 'lineThrough', 'overline'],
      mapping: {
        none: { noUnderline: true, underline: false, lineThrough: false, overline: false },
        underline: { noUnderline: false, underline: true, lineThrough: false, overline: false },
        lineThrough: { noUnderline: false, underline: false, lineThrough: true, overline: false },
        overline: { noUnderline: false, underline: false, lineThrough: false, overline: true }
      },
      defaultValue: 'none',
    },
    textTransform: {
      control: 'radio',
      options: ['normal', 'uppercase', 'lowercase', 'capitalize'],
      mapping: {
        normal: { normalCase: true, uppercase: false, lowercase: false, capitalize: false },
        uppercase: { normalCase: false, uppercase: true, lowercase: false, capitalize: false },
        lowercase: { normalCase: false, uppercase: false, lowercase: true, capitalize: false },
        capitalize: { normalCase: false, uppercase: false, lowercase: false, capitalize: true }
      },
      defaultValue: 'normal',
    },
    fontFamily: {
      control: 'radio',
      options: ['sans', 'serif', 'mono'],
      mapping: {
        sans: { sans: true, serif: false, mono: false },
        serif: { sans: false, serif: true, mono: false },
        mono: { sans: false, serif: false, mono: true }
      },
      defaultValue: 'sans',
    },
    textAppearance: {
      control: 'radio',
      options: ['default', 'muted', 'link'],
      mapping: {
        default: { muted: false, link: false },
        muted: { muted: true, link: false },
        link: { muted: false, link: true }
      },
      defaultValue: 'default',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'accent', 'primary', 'secondary', 'tertiary', 'success', 'danger', 'warning', 'info'],
      mapping: {
        default: { default: true, accent: false, primary: false, secondary: false, tertiary: false, success: false, danger: false, warning: false, info: false },
        accent: { default: false, accent: true, primary: false, secondary: false, tertiary: false, success: false, danger: false, warning: false, info: false },
        primary: { default: false, accent: false, primary: true, secondary: false, tertiary: false, success: false, danger: false, warning: false, info: false },
        secondary: { default: false, accent: false, primary: false, secondary: true, tertiary: false, success: false, danger: false, warning: false, info: false },
        tertiary: { default: false, accent: false, primary: false, secondary: false, tertiary: true, success: false, danger: false, warning: false, info: false },
        success: { default: false, accent: false, primary: false, secondary: false, tertiary: false, success: true, danger: false, warning: false, info: false },
        danger: { default: false, accent: false, primary: false, secondary: false, tertiary: false, success: false, danger: true, warning: false, info: false },
        warning: { default: false, accent: false, primary: false, secondary: false, tertiary: false, success: false, danger: false, warning: true, info: false },
        info: { default: false, accent: false, primary: false, secondary: false, tertiary: false, success: false, danger: false, warning: false, info: true }
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
    md: true,
    semibold: true,
    notItalic: true,
    noUnderline: true,
    normalCase: true,
    sans: true,
    default: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    sm: true,
    semibold: true,
    notItalic: true,
    noUnderline: true,
    normalCase: true,
    sans: true,
    default: true,
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    lg: true,
    semibold: true,
    notItalic: true,
    noUnderline: true,
    normalCase: true,
    sans: true,
    default: true,
  },
};

export const Bold: Story = {
  args: {
    children: 'Bold Button',
    md: true,
    bold: true,
    notItalic: true,
    noUnderline: true,
    normalCase: true,
    sans: true,
    default: true,
  },
}; 