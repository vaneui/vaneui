import { forwardRef } from 'react';
import { ButtonProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

/**
 * Button - A clickable button element with customizable appearance and behavior
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button>Click me</Button>
 * 
 * // With size, appearance, and variant
 * <Button lg primary filled>Submit</Button>
 * 
 * // Outlined button
 * <Button outlined secondary>Cancel</Button>
 * 
 * // As a link
 * <Button href="/about">Learn More</Button>
 * ```
 *
 * @param props - Button props
 * @param props.children - Button content
 * @param props.className - Additional CSS classes to merge with theme classes
 *

 * SIZE PROPS:
 * @param props.xs - Extra small size
 * @param props.sm - Small size
 * @param props.md - Medium size (default)
 * @param props.lg - Large size
 * @param props.xl - Extra large size
 *

 * ALIGNMENT PROPS (Cross-axis):
 * @param props.itemsStart - Align items to start (top/left)
 * @param props.itemsEnd - Align items to end (bottom/right)
 * @param props.itemsCenter - Align items to center
 * @param props.itemsBaseline - Align items to baseline
 * @param props.itemsStretch - Stretch items to fill container
 *

 * ALIGNMENT PROPS (Main-axis):
 * @param props.justifyStart - Justify content to start
 * @param props.justifyEnd - Justify content to end
 * @param props.justifyCenter - Justify content to center
 * @param props.justifyBetween - Space between items
 * @param props.justifyAround - Space around items
 * @param props.justifyEvenly - Space evenly between items
 *

 * POSITION PROPS:
 * @param props.relative - Relative positioning
 * @param props.absolute - Absolute positioning
 * @param props.fixed - Fixed positioning
 * @param props.sticky - Sticky positioning
 * @param props.static - Static positioning
 *

 * DISPLAY PROPS:
 * @param props.flex - Display as flex container
 * @param props.block - Display as block
 * @param props.inline - Display as inline
 * @param props.inlineBlock - Display as inline-block
 * @param props.inlineFlex - Display as inline-flex
 * @param props.grid - Display as grid
 * @param props.inlineGrid - Display as inline-grid
 * @param props.contents - Display as contents
 * @param props.hidden - Hide element (display: none)
 *

 * OVERFLOW PROPS:
 * @param props.overflowAuto - Auto overflow on both axes
 * @param props.overflowHidden - Hidden overflow on both axes
 * @param props.overflowVisible - Visible overflow on both axes
 * @param props.overflowScroll - Scrollable overflow on both axes
 * @param props.overflowXAuto - Auto overflow on X axis
 * @param props.overflowYAuto - Auto overflow on Y axis
 * @param props.overflowXHidden - Hidden overflow on X axis
 * @param props.overflowYHidden - Hidden overflow on Y axis
 *

 * FLEXBOX PROPS:
 * @param props.wrap - Enable flex wrap
 * @param props.reverse - Reverse the order of children
 *

 * LAYOUT PROPS:
 * @param props.gap - Enable gap spacing between children
 * @param props.noGap - Disable gap spacing
 * @param props.padding - Enable internal padding
 * @param props.noPadding - Disable internal padding
 *

 * FLEXBOX DIRECTION PROPS:
 * @param props.row - Flex direction row (horizontal)
 * @param props.column - Flex direction column (vertical)
 * @param props.rowReverse - Flex direction row-reverse
 * @param props.columnReverse - Flex direction column-reverse
 *

 * APPEARANCE PROPS:
 * @param props.default - Default color appearance
 * @param props.primary - Primary color appearance (blue)
 * @param props.secondary - Secondary color appearance (gray)
 * @param props.tertiary - Tertiary color appearance
 * @param props.accent - Accent color appearance (rose)
 * @param props.success - Success color appearance (green)
 * @param props.danger - Danger color appearance (red)
 * @param props.warning - Warning color appearance (amber)
 * @param props.info - Info color appearance (cyan)
 * @param props.link - Link color appearance
 *

 * BORDER PROPS:
 * @param props.border - Enable border on all sides
 * @param props.borderT - Enable border on top
 * @param props.borderB - Enable border on bottom
 * @param props.borderL - Enable border on left
 * @param props.borderR - Enable border on right
 * @param props.borderX - Enable border on left and right
 * @param props.borderY - Enable border on top and bottom
 * @param props.noBorder - Disable all borders
 *

 * VISUAL DECORATION PROPS:
 * @param props.shadow - Enable drop shadow
 * @param props.noShadow - Disable drop shadow
 * @param props.ring - Enable focus ring
 * @param props.noRing - Disable focus ring
 * @param props.focusVisible - Enable focus-visible outline
 * @param props.noFocusVisible - Disable focus-visible outline
 *

 * SHAPE PROPS:
 * @param props.rounded - Medium rounded corners (default)
 * @param props.pill - Fully rounded corners (circular)
 * @param props.sharp - No rounded corners (square)
 *

 * FONT WEIGHT PROPS:
 * @param props.thin - Thin font weight (100)
 * @param props.extralight - Extra light font weight (200)
 * @param props.light - Light font weight (300)
 * @param props.normal - Normal font weight (400)
 * @param props.medium - Medium font weight (500)
 * @param props.semibold - Semibold font weight (600)
 * @param props.bold - Bold font weight (700)
 * @param props.extrabold - Extra bold font weight (800)
 * @param props.black - Black font weight (900)
 *

 * FONT STYLE PROPS:
 * @param props.italic - Italic font style
 * @param props.notItalic - Not italic (normal) font style
 *

 * TEXT DECORATION PROPS:
 * @param props.underline - Underline text decoration
 * @param props.lineThrough - Line-through text decoration
 * @param props.noUnderline - No text decoration
 *

 * TEXT TRANSFORM PROPS:
 * @param props.uppercase - Transform text to uppercase
 * @param props.lowercase - Transform text to lowercase
 * @param props.capitalize - Capitalize first letter of each word
 * @param props.normalCase - Normal text case (no transformation)
 *

 * FONT FAMILY PROPS:
 * @param props.sans - Sans-serif font family (default)
 * @param props.serif - Serif font family
 * @param props.mono - Monospace font family
 *

 * TEXT ALIGNMENT PROPS:
 * @param props.textLeft - Align text to left
 * @param props.textCenter - Align text to center
 * @param props.textRight - Align text to right
 * @param props.textJustify - Justify text
 *

 * VARIANT PROPS:
 * @param props.filled - Filled variant with solid background
 * @param props.outlined - Outlined variant with border only
 * @param props.ghost - Ghost variant with minimal styling
 *
 * @see {@link ButtonProps} for the complete type definition
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const theme = useTheme();
    return <ThemedComponent ref={ref} theme={theme.button} {...props} />
  }
);
