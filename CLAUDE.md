# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VaneUI is a React component library built with TypeScript and styled using Tailwind CSS. The library provides reusable UI components for building consistent and responsive user interfaces. Components are organized into basic UI components and complex composite components.

## Common Commands

### Build Commands
- `npm run build` - Full build process (includes TypeScript compilation, CSS generation, and cleanup)
- `npm run build:js` - TypeScript compilation and bundling only
- `npm run build:css:ui` - Generate main UI CSS file
- `npm run build:css:vars` - Generate CSS variables file
- `npm run clean` - Clean the dist directory

### Development Commands
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm test` - Run Jest tests with experimental VM modules support

### Component Development
- All components use the `ComponentTheme` pattern for consistent theming
- Components are exported from `src/index.ts` for public API
- CSS is built using Tailwind CLI and exported separately

## Architecture

### Core Theme System
The library uses a sophisticated theme system centered around `ComponentTheme<P, T>` class:
- **ThemeProvider**: Context provider for global theme configuration
- **ComponentTheme**: Base class that handles prop-to-class mapping and component configuration
- **ThemedComponent**: Generic component wrapper that applies themes
- **BaseTheme**: Foundation for all theme implementations

### Component Structure
```
src/
├── components/
│   ├── ui/                 # Basic UI components (Button, Card, etc.)
│   │   ├── props/          # Component prop type definitions
│   │   └── theme/          # Theme implementations for each component
│   ├── complex/            # Composite components (DataTable, etc.)
│   ├── utils/              # Utility functions (componentUtils, deepMerge)
│   ├── themeContext.tsx    # Theme provider and context
│   └── themedComponent.tsx # Generic themed component wrapper
└── index.ts                # Main export file
```

### Theme System Details
- Each component has its own theme class extending `ComponentTheme`
- Themes define default classes, variants, and prop-to-class mappings
- The `getClasses()` method resolves final CSS classes from props and defaults
- `pickFirstTruthyKey()` utility handles prop priority resolution
- Tailwind classes are merged using `twMerge` for deduplication

### CSS Organization
- `src/components/css/vars.css` - CSS variables and theme tokens
- `src/components/index.css` - Main component styles
- Built CSS is exported as separate files for modular consumption

### Key Patterns
- Components use boolean props for variants (e.g., `primary`, `secondary`)
- Theme defaults can be overridden at the provider level
- All components support custom `className` and `tag` props
- TypeScript is used throughout with strict type definitions