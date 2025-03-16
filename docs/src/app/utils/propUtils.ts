import { PropDefinition, PropCategory } from '../types';

// Common prop definitions that most components share
export const commonPropDefinitions: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'The content to be displayed inside the component.',
  },
  {
    name: 'className',
    type: 'string',
    description: 'Additional CSS classes to apply to the component.',
  },
  {
    name: 'tag',
    type: 'string',
    description: 'The HTML element tag to use for the component.',
  },
];

// Size props that many components use
export const sizePropDefinitions: PropDefinition[] = [
  {
    name: 'xs',
    type: 'boolean',
    description: 'Apply extra small size to the component.',
  },
  {
    name: 'sm',
    type: 'boolean',
    description: 'Apply small size to the component.',
  },
  {
    name: 'md',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Apply medium size to the component (default).',
  },
  {
    name: 'lg',
    type: 'boolean',
    description: 'Apply large size to the component.',
  },
  {
    name: 'xl',
    type: 'boolean',
    description: 'Apply extra large size to the component.',
  },
];

// Appearance props that many components use
export const appearancePropDefinitions: PropDefinition[] = [
  {
    name: 'default',
    type: 'boolean',
    defaultValue: 'true',
    description: 'Apply default appearance.',
  },
  {
    name: 'primary',
    type: 'boolean',
    description: 'Apply primary appearance.',
  },
  {
    name: 'secondary',
    type: 'boolean',
    description: 'Apply secondary appearance.',
  },
  {
    name: 'tertiary',
    type: 'boolean',
    description: 'Apply tertiary appearance.',
  },
  {
    name: 'muted',
    type: 'boolean',
    description: 'Apply muted appearance.',
  },
  {
    name: 'accent',
    type: 'boolean',
    description: 'Apply accent appearance.',
  },
  {
    name: 'success',
    type: 'boolean',
    description: 'Apply success appearance.',
  },
  {
    name: 'danger',
    type: 'boolean',
    description: 'Apply danger appearance.',
  },
  {
    name: 'warning',
    type: 'boolean',
    description: 'Apply warning appearance.',
  },
  {
    name: 'info',
    type: 'boolean',
    description: 'Apply info appearance.',
  },
];

// Typography props that text-based components use
export const typographyPropDefinitions: Record<string, PropDefinition[]> = {
  fontWeight: [
    {
      name: 'thin',
      type: 'boolean',
      description: 'Apply thin font weight (100).',
    },
    {
      name: 'extralight',
      type: 'boolean',
      description: 'Apply extralight font weight (200).',
    },
    {
      name: 'light',
      type: 'boolean',
      description: 'Apply light font weight (300).',
    },
    {
      name: 'normal',
      type: 'boolean',
      description: 'Apply normal font weight (400).',
    },
    {
      name: 'medium',
      type: 'boolean',
      description: 'Apply medium font weight (500).',
    },
    {
      name: 'semibold',
      type: 'boolean',
      description: 'Apply semibold font weight (600).',
    },
    {
      name: 'bold',
      type: 'boolean',
      description: 'Apply bold font weight (700).',
    },
    {
      name: 'extrabold',
      type: 'boolean',
      description: 'Apply extrabold font weight (800).',
    },
    {
      name: 'black',
      type: 'boolean',
      description: 'Apply black font weight (900).',
    },
  ],
  fontFamily: [
    {
      name: 'sans',
      type: 'boolean',
      description: 'Use sans-serif font family.',
    },
    {
      name: 'serif',
      type: 'boolean',
      description: 'Use serif font family.',
    },
    {
      name: 'mono',
      type: 'boolean',
      description: 'Use monospace font family.',
    },
  ],
  textDecoration: [
    {
      name: 'underline',
      type: 'boolean',
      description: 'Apply underline decoration.',
    },
    {
      name: 'lineThrough',
      type: 'boolean',
      description: 'Apply line-through decoration.',
    },
    {
      name: 'noUnderline',
      type: 'boolean',
      description: 'Remove underline decoration.',
    },
    {
      name: 'overline',
      type: 'boolean',
      description: 'Apply overline decoration.',
    },
  ],
  textTransform: [
    {
      name: 'uppercase',
      type: 'boolean',
      description: 'Transform text to uppercase.',
    },
    {
      name: 'lowercase',
      type: 'boolean',
      description: 'Transform text to lowercase.',
    },
    {
      name: 'capitalize',
      type: 'boolean',
      description: 'Capitalize the first letter of each word.',
    },
    {
      name: 'normalCase',
      type: 'boolean',
      description: 'Use normal case (no transformation).',
    },
  ],
};

// Helper function to create default prop categories for a component
export function createDefaultPropCategories(options: {
  includeCommon?: boolean;
  includeSize?: boolean;
  includeAppearance?: boolean;
  includeTypography?: boolean;
  extraCategories?: PropCategory[];
}): PropCategory[] {
  const {
    includeCommon = true,
    includeSize = true,
    includeAppearance = true,
    includeTypography = false,
    extraCategories = [],
  } = options;

  const categories: PropCategory[] = [];

  if (includeCommon) {
    categories.push({
      title: 'Common Props',
      props: commonPropDefinitions,
    });
  }

  if (includeSize) {
    categories.push({
      title: 'Size Props',
      props: sizePropDefinitions,
    });
  }

  if (includeAppearance) {
    categories.push({
      title: 'Appearance Props',
      props: appearancePropDefinitions,
    });
  }

  if (includeTypography) {
    categories.push({
      title: 'Font Weight Props',
      props: typographyPropDefinitions.fontWeight,
    });
    categories.push({
      title: 'Font Family Props',
      props: typographyPropDefinitions.fontFamily,
    });
    categories.push({
      title: 'Text Decoration Props',
      props: typographyPropDefinitions.textDecoration,
    });
    categories.push({
      title: 'Text Transform Props',
      props: typographyPropDefinitions.textTransform,
    });
  }

  return [...categories, ...extraCategories];
} 