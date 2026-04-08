import { forwardRef } from 'react';
import type { StackProps } from "./StackProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";

/**
 * A vertical flex container for stacking elements with built-in padding.
 *
 * Arranges children vertically with consistent spacing. Differs from `Col`
 * by including default padding and `flexWrap`. Use for padded sections of
 * content that should stack vertically.
 *
 * @example
 * ```tsx
 * // Basic vertical stack
 * <Stack>
 *   <Button>Button 1</Button>
 *   <Button>Button 2</Button>
 *   <Button>Button 3</Button>
 * </Stack>
 * ```
 *
 * @example
 * ```tsx
 * // Stack with centered alignment
 * <Stack itemsCenter>
 *   <Title>Centered Content</Title>
 *   <Text>All items are centered</Text>
 * </Stack>
 * ```
 *
 * @see {@link StackProps} for all available props
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  function Stack(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.stack} {...props} />
  }
);

Stack.displayName = 'Stack';
