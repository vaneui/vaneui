import type { InputWrapperProps } from "./InputWrapperProps";

/** Default props for the input wrapper element (its box in the error state; a valid Input's wrapper is `contents`) */
export const inputWrapperDefaults: Partial<InputWrapperProps> = {
  relative: true,
  flex: true,
  wFull: true,
};
