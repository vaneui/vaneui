import { ComponentTheme, defaultTypographyClassMappers, layoutClassMappers, bgAppearance, textAppearance, borderAppearance, ringAppearance, shadowAppearance } from "../theme/common";
import type { ModalProps } from "./ModalProps";
import type { ModalContentTheme } from "./ModalContentTheme";
import { MODAL_CATEGORIES } from "./ModalCategories";
import { modalContentDefaults } from "./modalContentDefaults";

export const defaultModalContentTheme = new ComponentTheme<ModalProps, ModalContentTheme>(
  'div',
  'vane-modal max-w-(--modal-width) max-h-(--modal-max-height)',
  {
    size: layoutClassMappers.size,
    layout: {
      ...layoutClassMappers.layout,
      shadow: shadowAppearance,
    },
    appearance: {
      background: bgAppearance,
      text: textAppearance,
      border: borderAppearance,
      ring: ringAppearance,
    },
    typography: defaultTypographyClassMappers,
  },
  modalContentDefaults,
  MODAL_CATEGORIES,
  undefined,
  'layout'
);
