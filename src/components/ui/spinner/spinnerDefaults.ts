import type { SpinnerProps } from "./SpinnerProps";

/** Default props for Spinner component */
export const spinnerDefaults: Partial<SpinnerProps> = {
  md: true,
  inlineBlock: true,
  noMargin: true,
  // matches Text: inherit the surrounding color until an appearance is set,
  // so a bare Spinner still reads correctly on a filled Button or Badge
  inheritAppearance: true,
  outline: true,
};
