import { ComponentTheme, interactiveClassMappers, bgActiveAppearance, shadowAppearance } from "../theme/common";
import type { ModalCloseButtonProps } from "./ModalCloseButtonProps";
import type { ModalCloseButtonTheme } from "./ModalCloseButtonTheme";
import { MODAL_CLOSE_BUTTON_CATEGORIES } from "./ModalCloseButtonCategories";
import { modalCloseButtonDefaults } from "./modalCloseButtonDefaults";

export const defaultModalCloseButtonTheme = new ComponentTheme<ModalCloseButtonProps, ModalCloseButtonTheme>(
  'button',
  'vane-modal-close',
  {
    ...interactiveClassMappers,
    appearance: {
      ...interactiveClassMappers.appearance,
      background: bgActiveAppearance,
      shadow: shadowAppearance,
    },
  },
  modalCloseButtonDefaults,
  MODAL_CLOSE_BUTTON_CATEGORIES,
  undefined,
  'ui'
);
