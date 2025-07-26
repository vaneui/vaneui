# VaneUI

[![npm version](https://img.shields.io/npm/v/%40vaneui/ui.svg?style=flat)](https://www.npmjs.com/package/%40vaneui/ui)

A modern React component library built with TypeScript and styled using Tailwind CSS. VaneUI provides a collection of reusable UI components designed to help developers build consistent and responsive user interfaces quickly.

## Installation

```bash
# Using npm
npm install @vaneui/ui

# Using yarn
yarn add @vaneui/ui

# Using pnpm
pnpm add @vaneui/ui
```

## Requirements

VaneUI requires React 16.8.0 or later.

## Usage

### Importing Components

```jsx
import { Button, Card, Stack, Text } from '@vaneui/ui';

// For complex components
import { SocialShare } from '@vaneui/ui/complex';
```

### Importing Styles

```jsx
// Import UI component styles (includes all component styling)
import '@vaneui/ui/dist/ui.css';

// Import theme variables (CSS custom properties)
import '@vaneui/ui/dist/vars.css';

// Or import both
import '@vaneui/ui/dist/ui.css';
import '@vaneui/ui/dist/vars.css';
```

### Basic Example

```jsx
import React from 'react';
import { Button, Stack } from '@vaneui/ui';
import '@vaneui/ui/dist/ui.css';
import '@vaneui/ui/dist/vars.css';

function App() {
  return (
    <Stack gap>
      <Button primary>Primary Button</Button>
      <Button secondary>Secondary Button</Button>
      <Button danger>Danger Button</Button>
    </Stack>
  );
}
```

## Component Categories

VaneUI is organized into two main categories:

### UI Components

Basic building blocks and primitive components:

**Interactive Components:**
- Button - Interactive elements with multiple appearance variants
- Badge - Small status indicators 
- Chip - Compact elements for tags or labels

**Layout Components:**
- Stack - Flexible container for stacking elements
- Grid3, Grid4 - Pre-configured grid layouts
- Row, Col - Flexible grid system
- Card - Content containers with styling
- Container - Page-level containers
- Section - Semantic content sections

**Typography Components:**
- Text - Basic text elements with styling
- Title - Heading elements
- Link - Styled link elements
- List, ListItem - Structured lists
- SectionTitle, PageTitle - Semantic titles

**Other Components:**
- Divider - Visual separators

### Complex Components

Higher-level components composed of multiple UI components:

- SocialShare - Social media sharing component

## Theme System

VaneUI features a sophisticated theme system that provides consistent styling across all components.

### Theme Provider (Optional)

Components work out of the box with default styling. For advanced theme customization, you can use the `ThemeProvider`:

```jsx
import { ThemeProvider, defaultTheme } from '@vaneui/ui';

// Customize default component properties
const customTheme = {
  ...defaultTheme,
  Button: { ...defaultTheme.Button, primary: true }, // Make primary the default
  Text: { ...defaultTheme.Text, lg: true }           // Make lg the default size
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Components will use customized defaults */}
      <Button>This is primary by default</Button>
      <Text>This is large by default</Text>
    </ThemeProvider>
  );
}
```

### Appearance System

Components support different appearance variants:

**UI Elements (Button, Badge, Chip):**
- `default` - Default styling
- `primary` - Primary brand color
- `secondary` - Secondary color
- `tertiary` - Tertiary color
- `accent` - Accent color
- `success` - Success/positive color
- `danger` - Error/negative color
- `warning` - Warning color
- `info` - Information color

**All Other Components (Text, Card, etc.):**
All the above plus:
- `transparent` - Transparent background
- `link` - Link styling

### Component Variants

Many components support additional variants:

- **Size variants:** `xs`, `sm`, `md`, `lg`, `xl`
- **Shape variants:** `rounded`, `pill`, `sharp`
- **Layout variants:** `filled`, `outline`
- **Typography variants:** Font families, weights, decorations, etc.

### Example Usage

```jsx
<Stack gap>
  <Button primary lg>Large Primary Button</Button>
  <Badge secondary pill>Pill Badge</Badge>
  <Text link lg>Link Text</Text>
  <Card transparent rounded>Transparent Card</Card>
</Stack>
```

## Project Structure

```
vaneui/
├── .junie/           # Project guidelines and documentation
├── dist/             # Compiled output files
├── docs/             # Documentation files
├── src/              # Source code
│   ├── components/   # React components
│   │   ├── complex/  # Complex/composite components
│   │   ├── theme/    # Theme variables and settings
│   │   ├── ui/       # Basic UI components
│   │   └── utils/    # Utility functions and helpers
├── scripts/          # Build and development scripts
└── ...               # Configuration files
```

## Development

### Building the Library

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Type checking
npm run type-check

# Watch mode for development
npm run watch

# Verify package contents
npm run verify-package
```

### Publishing the Package

Before publishing, the package automatically runs the build process and verifies that all required files are present. This ensures that the published package contains all necessary files for users.

```bash
# Publish the package
npm publish
```

### Component Development Guidelines

1. **Theme System**: All components use the `ComponentTheme` pattern for consistent theming and styling
2. **Type Safety**: Components are built with TypeScript and use strongly-typed prop definitions from key arrays
3. **Prop Pattern**: Components use boolean props for variants (e.g., `primary`, `lg`, `pill`) rather than string props
4. **Appearance Keys**: UI elements (Button, Badge, Chip) use `UI_ELEMENT_APPEARANCE_KEYS`, while other components use full `APPEARANCE_KEYS`
5. **Theme Inheritance**: Components extend base themes and utilize shared theme patterns for consistency

### Styling Guidelines

1. **Tailwind CSS**: All styling is done through Tailwind CSS classes and CSS custom properties
2. **Theme Classes**: Use appearance classes from `appearanceClasses.ts` and `typographyClasses.ts`
3. **CSS Variables**: Leverage CSS custom properties for theming (defined in `vars.css`)
4. **Responsive Design**: Utilize Tailwind's responsive utilities and VaneUI's breakpoint system
5. **Component Themes**: Extend existing theme patterns rather than creating custom styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

When contributing to this project:
1. Follow the established code style and patterns
2. Write tests for new components
3. Update documentation as needed
4. Ensure backward compatibility

## License

This project is licensed under the ISC License.
