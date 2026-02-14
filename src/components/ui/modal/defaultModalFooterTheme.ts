import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ModalFooterProps } from "./ModalFooterProps";
import type { ModalFooterTheme } from "./ModalFooterTheme";
import { MODAL_FOOTER_CATEGORIES } from "./ModalFooterCategories";
import { modalFooterDefaults } from "./modalFooterDefaults";

export const defaultModalFooterTheme = new ComponentTheme<ModalFooterProps, ModalFooterTheme>(
  'div',
  'vane-modal-footer',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  modalFooterDefaults,
  MODAL_FOOTER_CATEGORIES,
  undefined,
  'layout'
);
