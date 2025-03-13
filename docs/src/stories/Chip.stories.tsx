import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from 'vaneui';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    xs: { control: 'boolean' },
    sm: { control: 'boolean' },
    md: { control: 'boolean' },
    lg: { control: 'boolean' },
    xl: { control: 'boolean' },
    default: { control: 'boolean' },
    accent: { control: 'boolean' },
    primary: { control: 'boolean' },
    secondary: { control: 'boolean' },
    tertiary: { control: 'boolean' },
    success: { control: 'boolean' },
    danger: { control: 'boolean' },
    warning: { control: 'boolean' },
    info: { control: 'boolean' },
  },
} as const;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Chip',
    md: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Chip xs>Extra Small</Chip>
      <Chip sm>Small</Chip>
      <Chip md>Medium</Chip>
      <Chip lg>Large</Chip>
      <Chip xl>Extra Large</Chip>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Chip md default>Default</Chip>
      <Chip md accent>Accent</Chip>
      <Chip md primary>Primary</Chip>
      <Chip md secondary>Secondary</Chip>
      <Chip md tertiary>Tertiary</Chip>
      <Chip md success>Success</Chip>
      <Chip md danger>Danger</Chip>
      <Chip md warning>Warning</Chip>
      <Chip md info>Info</Chip>
    </div>
  ),
};

export const WithCustomText: Story = {
  args: {
    children: 'Custom Text',
    md: true,
    primary: true,
  },
}; 