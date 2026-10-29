/**
 * Shadow props for controlling drop shadows
 */

export interface ShadowProps {
  /** Enable drop shadow at the component's size */
  shadow?: boolean;
  /** Extra-small drop shadow, whatever the component's size */
  shadowXs?: boolean;
  /** Small drop shadow, whatever the component's size */
  shadowSm?: boolean;
  /** Medium drop shadow, whatever the component's size */
  shadowMd?: boolean;
  /** Large drop shadow, whatever the component's size */
  shadowLg?: boolean;
  /** Extra-large drop shadow, whatever the component's size */
  shadowXl?: boolean;
  /** Disable drop shadow */
  noShadow?: boolean;
}
