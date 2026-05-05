/**
 * Flex-grow/shrink shorthand props for controlling how a flex item
 * distributes free space along its parent's main axis.
 *
 * These map to Tailwind's `flex` shorthand utilities and are mutually
 * exclusive — only one value is active at a time.
 */

export interface FlexProps {
  /** Take up remaining space (= `flex-1`, i.e. `flex: 1 1 0%`) */
  flex1?: boolean;
  /** Grow but respect intrinsic size (= `flex-auto`, i.e. `flex: 1 1 auto`) */
  flexAuto?: boolean;
  /** Don't grow and don't shrink (= `flex-none`, i.e. `flex: none`) */
  flexNone?: boolean;
}
