import { forwardRef } from 'react';
import type { LabelProps } from "./LabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme, ThemeProvider } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";

/**
 * A label component for form fields and inputs.
 *
 * Renders a semantic HTML label element with typography and styling support.
 * Typically used with form inputs like Input or Checkbox to provide
 * accessible labels. Clicking the label focuses the associated input.
 *
 * Nested Input and Checkbox components automatically pick up the label's
 * resolved size, so `<Label lg><Input/></Label>` renders a large input
 * without having to repeat the size. Pass an explicit size on the child
 * to opt out: `<Label lg><Input sm/></Label>`.
 *
 * @example
 * ```tsx
 * // Basic label
 * <Label htmlFor="email">Email Address</Label>
 * ```
 *
 * @example
 * ```tsx
 * // Label with checkbox — checkbox inherits label size
 * <Label>
 *   <Checkbox id="terms" />
 *   I agree to the terms
 * </Label>
 * ```
 *
 * @example
 * ```tsx
 * // Styled label with custom appearance
 * <Label semibold primary>Username</Label>
 * ```
 *
 * @see {@link LabelProps} for all available props
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const theme = useTheme();

    // Resolve the label's size from the user's explicit prop or the label's
    // theme defaults, then propagate it to nested Input and Checkbox via
    // ThemeProvider. mergeDefaults (inside ThemeProvider) zeroes out the
    // other size keys on those child themes so the new size always wins
    // unless the child has its own explicit size prop.
    const resolvedSize = pickFirstTruthyKeyByCategory(
      props as Record<string, unknown>,
      theme.label.defaults as Record<string, unknown>,
      'size'
    ) ?? 'md';

    return (
      <ThemedComponent theme={theme.label} ref={ref} {...props}>
        <ThemeProvider themeDefaults={{
          input: { [resolvedSize]: true },
          checkbox: {
            wrapper: { [resolvedSize]: true },
            input: { [resolvedSize]: true },
          },
        }}>
          {props.children}
        </ThemeProvider>
      </ThemedComponent>
    );
  }
);

Label.displayName = 'Label';
