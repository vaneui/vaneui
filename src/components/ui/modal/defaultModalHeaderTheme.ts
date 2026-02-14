import { ComponentTheme } from "../theme/common/ComponentTheme";
import type { ModalHeaderProps } from "./ModalHeaderProps";
import type { ModalHeaderTheme } from "./ModalHeaderTheme";
import { MODAL_HEADER_CATEGORIES } from "./ModalHeaderCategories";
import { modalHeaderDefaults } from "./modalHeaderDefaults";
import { layoutClassMappers } from "../theme/common/layoutClassMappers";

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
