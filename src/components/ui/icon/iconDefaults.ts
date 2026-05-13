import type { IconProps } from "./IconProps";

/** Default props for Icon component.
 *  noPadding/noBorder/noRing preserve the lightweight inline rendering when
 *  no container props are explicitly set. Adding `padding` + `filled` + an
 *  appearance prop opts the icon into container mode; pass `pill` or `sharp`
 *  to override the default `rounded` corners.
 *  rounded matches the Card/Button shape default — invisible on inline use
 *  (no fill or border to reveal corners), visible in container mode.
 *  wFit prevents the inline-flex span from being stretched by flex-column
 *  ancestors (e.g., a parent Col with default itemsStretch) — Icon should
 *  size to its content (SVG + symmetric padding), not to the parent's width. */
export const iconDefaults: Partial<IconProps> = {
  md: true,
  inlineFlex: true,
  itemsCenter: true,
  justifyCenter: true,
  outline: true,
  rounded: true,
  noPadding: true,
  noBorder: true,
  noRing: true,
  wFit: true,
};
