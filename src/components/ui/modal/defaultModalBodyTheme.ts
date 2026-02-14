import { ComponentTheme, layoutClassMappers } from "../theme/common";
import type { ModalBodyProps } from "./ModalBodyProps";
import type { ModalBodyTheme } from "./ModalBodyTheme";
import { MODAL_BODY_CATEGORIES } from "./ModalBodyCategories";
import { modalBodyDefaults } from "./modalBodyDefaults";

export const defaultModalBodyTheme = new ComponentTheme<ModalBodyProps, ModalBodyTheme>(
  'div',
  'vane-modal-body',
  {
    size: layoutClassMappers.size,
    appearance: layoutClassMappers.appearance,
    layout: layoutClassMappers.layout,
  },
  modalBodyDefaults,
  MODAL_BODY_CATEGORIES,
  undefined,
  'layout'
);
