import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ModalHeaderProps } from "./ModalHeaderProps";
import type { ModalHeaderTheme } from "./ModalHeaderTheme";
import { MODAL_HEADER_CATEGORIES } from "./ModalHeaderCategories";
import { modalHeaderDefaults } from "./modalHeaderDefaults";

export const defaultModalHeaderTheme = new ComponentTheme<ModalHeaderProps, ModalHeaderTheme>(
  'div',
  'vane-modal-header',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  modalHeaderDefaults,
  MODAL_HEADER_CATEGORIES,
  undefined,
  'layout'
);
