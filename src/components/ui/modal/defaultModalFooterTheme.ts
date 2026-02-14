import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ModalFooterProps } from "./ModalFooterProps";
import type { ModalFooterTheme } from "./ModalFooterTheme";
import { MODAL_FOOTER_CATEGORIES } from "./ModalFooterCategories";
import { modalFooterDefaults } from "./modalFooterDefaults";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";

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
