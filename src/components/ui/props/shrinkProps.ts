/**
 * Flex-shrink override prop. Independent toggle (not part of the `flex`
 * shorthand) so it can be combined with `flex1`/`flexAuto`/explicit grow.
 */

export interface ShrinkProps {
  /** Prevent the flex item from shrinking below its content size (= `shrink-0`) */
  noShrink?: boolean;
}
