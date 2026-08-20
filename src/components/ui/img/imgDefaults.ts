import type { ImgProps } from "./ImgProps";

/** Default props for Img component */
export const imgDefaults: Partial<ImgProps> = {
  md: true,
  rounded: true,
  objectCover: true,
  // without a variant the element emits no data-variant, so --app-* never resolves
  // into --border-color and every appearance paints the same neutral border
  outline: true,
};
