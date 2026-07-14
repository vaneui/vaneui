import {
  LAYOUT_CORE,
  WIDTH,
  HEIGHT,
  COMMON_MODIFIERS,
} from "../props/categoryBuilders";

/** Blur effect property for backdrop blur */
const BLUR = ['blur'] as const;
/** Pointer events property for controlling element interactivity */
const POINTER_EVENTS = ['pointerEvents'] as const;
/**
 * Categories for overlay backdrop components.
 *
 * A scrim only needs layout, sizing, backdrop blur, pointer-events, and the
 * `transparent`/`responsive` modifiers. Decorative axes (appearance, variant,
 * shadow, ring) are deliberately excluded: they can't render meaningfully on a
 * fixed full-viewport backdrop, so listing them would only over-promise in the
 * generated prop docs.
 */
export const OVERLAY_CATEGORIES = [
  ...LAYOUT_CORE,
  ...BLUR,
  ...POINTER_EVENTS,
  ...WIDTH,
  ...HEIGHT,
  ...COMMON_MODIFIERS,
] as const;
