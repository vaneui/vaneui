import type { ThemeDefaults } from '../../themeContext';

import { buttonDefaults } from '../button/buttonDefaults';
import { buttonSpinnerDefaults } from '../button/buttonSpinnerDefaults';
import { iconButtonDefaults } from '../iconButton/iconButtonDefaults';
import { badgeDefaults } from '../badge/badgeDefaults';
import { iconDefaults } from '../icon/iconDefaults';
import { chipDefaults } from '../chip/chipDefaults';
import { codeDefaults } from '../code/codeDefaults';
import { cardDefaults } from '../card/cardDefaults';
import { cardHeaderDefaults } from '../card/cardHeaderDefaults';
import { cardBodyDefaults } from '../card/cardBodyDefaults';
import { cardFooterDefaults } from '../card/cardFooterDefaults';
import { dividerDefaults } from '../divider/dividerDefaults';
import { containerDefaults } from '../container/containerDefaults';
import { rowDefaults } from '../row/rowDefaults';
import { colDefaults } from '../col/colDefaults';
import { stackDefaults } from '../stack/stackDefaults';
import { sectionDefaults } from '../section/sectionDefaults';
import { gridDefaults } from '../grid/gridDefaults';
import { checkboxInputDefaults } from '../checkbox/checkboxInputDefaults';
import { checkboxCheckDefaults } from '../checkbox/checkboxCheckDefaults';
import { checkboxWrapperDefaults } from '../checkbox/checkboxWrapperDefaults';
import { checkboxIndeterminateDefaults } from '../checkbox/checkboxIndeterminateDefaults';
import { labelDefaults } from '../label/labelDefaults';
import { imgDefaults } from '../img/imgDefaults';
import { inputDefaults } from '../input/inputDefaults';
import { inputErrorIconDefaults } from '../input/inputErrorIconDefaults';
import { inputWrapperDefaults } from '../input/inputWrapperDefaults';
import { overlayDefaults } from '../overlay/overlayDefaults';
import { kbdDefaults } from '../kbd/kbdDefaults';
import { markDefaults } from '../mark/markDefaults';
import { modalContentDefaults } from '../modal/modalContentDefaults';
import { modalOverlayDefaults } from '../modal/modalOverlayDefaults';
import { modalHeaderDefaults } from '../modal/modalHeaderDefaults';
import { modalBodyDefaults } from '../modal/modalBodyDefaults';
import { modalFooterDefaults } from '../modal/modalFooterDefaults';
import { modalCloseButtonDefaults } from '../modal/modalCloseButtonDefaults';
import { popupDefaults } from '../popup/popupDefaults';
import { menuItemDefaults } from '../menu/menuItemDefaults';
import { menuPopupDefaults } from '../menu/menuPopupDefaults';
import { menuDividerDefaults } from '../divider/menuDividerDefaults';
import { menuLabelDefaults } from '../menu/menuLabelDefaults';
import { navLinkDefaults } from '../navLink/navLinkDefaults';
import { navLinkLabelDefaults } from '../navLink/navLinkLabelDefaults';
import { tableDefaults } from '../table/tableDefaults';
import { theadDefaults } from '../table/theadDefaults';
import { tbodyDefaults } from '../table/tbodyDefaults';
import { tfootDefaults } from '../table/tfootDefaults';
import { trDefaults } from '../table/trDefaults';
import { thDefaults } from '../table/thDefaults';
import { tdDefaults } from '../table/tdDefaults';
import { captionDefaults } from '../table/captionDefaults';
import {
  pageTitleDefaults,
  sectionTitleDefaults,
  titleDefaults,
  textDefaults,
  blockquoteDefaults,
  blockquoteCiteDefaults,
  linkDefaults,
  listItemDefaults,
  listDefaults,
} from '../typography';

export const themeDefaults: ThemeDefaults = {
  button: {
    main: buttonDefaults,
    spinner: buttonSpinnerDefaults,
  },
  iconButton: iconButtonDefaults,
  badge: badgeDefaults,
  icon: iconDefaults,
  chip: chipDefaults,
  code: codeDefaults,
  kbd: kbdDefaults,
  mark: markDefaults,
  card: {
    main: cardDefaults,
    header: cardHeaderDefaults,
    body: cardBodyDefaults,
    footer: cardFooterDefaults,
  },
  divider: dividerDefaults,
  container: containerDefaults,
  row: rowDefaults,
  col: colDefaults,
  stack: stackDefaults,
  section: sectionDefaults,
  grid2: gridDefaults,
  grid3: gridDefaults,
  grid4: gridDefaults,
  grid5: gridDefaults,
  grid6: gridDefaults,
  pageTitle: pageTitleDefaults,
  sectionTitle: sectionTitleDefaults,
  title: titleDefaults,
  text: textDefaults,
  blockquote: blockquoteDefaults,
  blockquoteCite: blockquoteCiteDefaults,
  link: linkDefaults,
  listItem: listItemDefaults,
  list: listDefaults,
  checkbox: {
    input: checkboxInputDefaults,
    check: checkboxCheckDefaults,
    indeterminate: checkboxIndeterminateDefaults,
    wrapper: checkboxWrapperDefaults,
  },
  label: labelDefaults,
  img: imgDefaults,
  input: inputDefaults,
  inputErrorIcon: inputErrorIconDefaults,
  inputWrapper: inputWrapperDefaults,
  overlay: overlayDefaults,
  modal: {
    content: modalContentDefaults,
    overlay: modalOverlayDefaults,
    header: modalHeaderDefaults,
    body: modalBodyDefaults,
    footer: modalFooterDefaults,
    closeButton: modalCloseButtonDefaults,
  },
  popup: popupDefaults,
  menu: {
    item: menuItemDefaults,
    popup: menuPopupDefaults,
    divider: menuDividerDefaults,
    label: menuLabelDefaults,
  },
  navLink: {
    root: navLinkDefaults,
    label: navLinkLabelDefaults,
  },
  table: {
    main: tableDefaults,
    thead: theadDefaults,
    tbody: tbodyDefaults,
    tfoot: tfootDefaults,
    tr: trDefaults,
    th: thDefaults,
    td: tdDefaults,
    caption: captionDefaults,
  },
};