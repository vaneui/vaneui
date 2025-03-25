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
import { Button, Card } from '@vaneui/ui';

// For complex components
import { DataTable } from '@vaneui/ui/complex';
```

### Importing Styles

```jsx
// Import all styles
import '@vaneui/ui/css';

// Or import specific style categories
import '@vaneui/ui/css/vars'; // Only theme variables
import '@vaneui/ui/css/ui'; // Only UI component styles
import '@vaneui/ui/css/complex'; // Only complex component styles
```

### Basic Example

```jsx
import React from 'react';
import { Button, Stack } from '@vaneui/ui';
import '@vaneui/ui/css';

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

- Button
- Card
- Input
- Stack
- Text
- And more...

### Complex Components

Higher-level components composed of multiple UI components:

- DataTable
- Form
- Modal
- And more...

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

# Watch mode for development
npm run watch
```

### Component Development Guidelines

1. **Component Builder Pattern**: Use the componentBuilder utility for consistent component creation
2. **Tailwind Integration**: Utilize Tailwind CSS classes for styling
3. **TypeScript**: Write all components using TypeScript with proper type definitions
4. **Props Structure**: Follow the established props pattern for component properties

### Styling Guidelines

1. Use Tailwind CSS classes for styling
2. Maintain consistent naming conventions
3. Use the theme variables defined in the theme directory
4. Ensure responsive design across different screen sizes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

When contributing to this project:
1. Follow the established code style and patterns
2. Write tests for new components
3. Update documentation as needed
4. Ensure backward compatibility

## License

This project is licensed under the ISC License.