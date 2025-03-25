# VaneUI Project Guidelines

## Project Overview

VaneUI is a React component library built with TypeScript and styled using Tailwind CSS. It provides a collection of reusable UI components designed to help developers build consistent and responsive user interfaces quickly.

The library is organized into two main categories:
- **UI Components**: Basic building blocks and primitive components
- **Complex Components**: Higher-level components composed of multiple UI components

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

## Development Guidelines

### Component Development

1. **Component Builder Pattern**: Use the componentBuilder utility for consistent component creation
2. **Tailwind Integration**: Utilize Tailwind CSS classes for styling
3. **TypeScript**: Write all components using TypeScript with proper type definitions
4. **Props Structure**: Follow the established props pattern for component properties

### Styling Guidelines

1. Use Tailwind CSS classes for styling
2. Maintain consistent naming conventions
3. Use the theme variables defined in the theme directory
4. Ensure responsive design across different screen sizes

### Build Process

The build process generates:
- JavaScript files (ESM and CommonJS)
- CSS files (complete, theme variables, UI components, complex components)

## Usage

Import components from the library:

```jsx
import { Button, Card } from '@vaneui/ui';
```

Import styles:

```jsx
import '@vaneui/ui/css'; // All styles
// or
import '@vaneui/ui/css/ui'; // Only UI component styles
import '@vaneui/ui/css/complex'; // Only complex component styles
import '@vaneui/ui/css/vars'; // Only theme variables
```

## Contributing

When contributing to this project:
1. Follow the established code style and patterns
2. Write tests for new components
3. Update documentation as needed
4. Ensure backward compatibility