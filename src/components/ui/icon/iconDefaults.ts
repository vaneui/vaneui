import type { IconProps } from "./IconProps";

/** Default props for Icon component.
 *  noPadding/noBorder/noRing preserve the lightweight inline rendering when
 *  no container props are explicitly set. Adding `padding` + `pill`/`sharp`
 *  + `filled` + an appearance prop opts the icon into container mode. */
export const iconDefaults: Partial<IconProps> = {
  md: true,
  inlineFlex: true,
  itemsCenter: true,
  justifyCenter: true,
  outline: true,
  noPadding: true,
  noBorder: true,
  noRing: true,
};
