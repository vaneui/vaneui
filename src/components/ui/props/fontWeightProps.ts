/**
 * Font weight props for controlling text weight
 */

export interface FontWeightProps {
  /** Thin font weight (100) — emits font-thin */
  fontThin?: boolean;
  /** Extra light font weight (200) — emits font-extralight */
  fontExtralight?: boolean;
  /** Light font weight (300) — emits font-light */
  fontLight?: boolean;
  /** Normal font weight (400) — emits font-normal */
  fontNormal?: boolean;
  /** Medium font weight (500) — emits font-medium */
  fontMedium?: boolean;
  /** Semibold font weight (600) — emits font-semibold */
  fontSemibold?: boolean;
  /** Bold font weight (700) — emits font-bold */
  fontBold?: boolean;
  /** Extra bold font weight (800) — emits font-extrabold */
  fontExtrabold?: boolean;
  /** Black font weight (900) — emits font-black */
  fontBlack?: boolean;
}
