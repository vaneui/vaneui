import type { ThemeDefaults } from '../../themeContext';

// Import defaults from each component theme file
import { buttonDefaults } from '../button/buttonDefaults';
import { buttonSpinnerDefaults } from '../button/buttonSpinnerDefaults';
import { iconButtonDefaults } from '../iconButton/iconButtonDefaults';
import { badgeDefaults } from '../badge/badgeDefaults';
import { iconDefaults } from '../icon/iconDefaults';
import { chipDefaults } from '../chip/chipDefaults';
import { codeDefaults } from '../code/codeDefaults';
import { cardDefaults } from '../card/cardDefaults';
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
import { overlayDefaults } from '../overlay/overlayDefaults';
import { modalContentDefaults } from '../modal/modalContentDefaults';
import { modalOverlayDefaults } from '../modal/modalOverlayDefaults';
import { popupDefaults } from '../popup/popupDefaults';
import {
  pageTitleDefaults,
  sectionTitleDefaults,
  titleDefaults,
  textDefaults,
  linkDefaults,
  listItemDefaults,
  listDefaults,
} from '../typography';

/**
 * Aggregated default props for all components.
 * Each component's defaults are defined in their respective theme files
 * and imported here for convenient access.
 */
export const themeDefaults: ThemeDefaults = {
  button: {
    main: buttonDefaults,
    spinner: buttonSpinnerDefaults,
  },
  iconButton: {
    main: iconButtonDefaults,
  },
  badge: badgeDefaults,
  icon: iconDefaults,
  chip: chipDefaults,
  code: codeDefaults,
  card: cardDefaults,
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
  overlay: overlayDefaults,
  modal: {
    content: modalContentDefaults,
    overlay: modalOverlayDefaults,
  },
  popup: popupDefaults,
};