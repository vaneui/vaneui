import type { InputSectionProps } from "./InputSectionProps";

/** Default props for the input section element: overlaid on the field's edge, clicks fall through to the field */
export const inputSectionDefaults: Partial<InputSectionProps> = {
  sm: true,
  absolute: true,
  flex: true,
  itemsCenter: true,
  gap: true,
  pointerEventsNone: true,
  whitespaceNowrap: true,
};
