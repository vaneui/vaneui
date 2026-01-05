/**
 * Base prop interfaces - manually maintained
 *
 * Each prop interface is defined in its own file for better organization.
 * Component-specific props (ButtonProps, BadgeProps, etc.) are defined
 * in their respective component files (button.tsx, badge.tsx, etc.)
 */

// Base props
export * from './baseProps';

// Size and appearance
export * from './sizeProps';
export * from './appearanceProps';
export * from './variantProps';
export * from './shapeProps';

// Typography
export * from './fontFamilyProps';
export * from './fontWeightProps';
export * from './fontStyleProps';
export * from './textDecorationProps';
export * from './textTransformProps';
export * from './textAlignProps';

// Layout and spacing
export * from './paddingProps';
export * from './gapProps';
export * from './borderProps';
export * from './shadowProps';
export * from './ringProps';
export * from './focusVisibleProps';

// Flexbox
export * from './itemsProps';
export * from './justifyProps';
export * from './flexDirectionProps';
export * from './reverseProps';
export * from './wrapProps';

// Display and positioning
export * from './displayProps';
export * from './positionProps';
export * from './overflowProps';

// Responsive
export * from './breakpointProps';
export * from './hideProps';

// List
export * from './listStyleProps';
