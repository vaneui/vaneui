import type { ThemeProps } from './themeTypes';
import { defaultButtonTheme } from './ui/button/defaultButtonTheme';
import { defaultButtonSpinnerTheme } from './ui/button/defaultButtonSpinnerTheme';
import { defaultBadgeTheme } from './ui/badge/defaultBadgeTheme';
import { defaultChipTheme } from './ui/chip/defaultChipTheme';
import { defaultCodeTheme } from './ui/code/defaultCodeTheme';
import { textTheme } from './ui/typography/text/defaultTextTheme';
import { titleTheme } from './ui/typography/title/defaultTitleTheme';
import { sectionTitleTheme } from './ui/typography/sectionTitle/defaultSectionTitleTheme';
import { pageTitleTheme } from './ui/typography/pageTitle/defaultPageTitleTheme';
import { linkTheme } from './ui/typography/link/defaultLinkTheme';
import { listTheme } from './ui/typography/list/defaultListTheme';
import { listItemTheme } from './ui/typography/listItem/defaultListItemTheme';
import { defaultCardTheme } from "./ui/card/defaultCardTheme";
import { defaultCardHeaderTheme } from './ui/card/defaultCardHeaderTheme';
import { defaultCardBodyTheme } from './ui/card/defaultCardBodyTheme';
import { defaultCardFooterTheme } from './ui/card/defaultCardFooterTheme';
import { defaultRowTheme } from "./ui/row/defaultRowTheme";
import { defaultDividerTheme } from './ui/divider/defaultDividerTheme';
import { defaultMenuDividerTheme } from './ui/divider/defaultMenuDividerTheme';
import { defaultContainerTheme } from './ui/container/defaultContainerTheme';
import { defaultColTheme } from './ui/col/defaultColTheme';
import { defaultStackTheme } from './ui/stack/defaultStackTheme';
import { defaultSectionTheme } from "./ui/section/defaultSectionTheme";
import { defaultGrid2Theme } from "./ui/grid/defaultGrid2Theme";
import { defaultGrid3Theme } from "./ui/grid/defaultGrid3Theme";
import { defaultGrid4Theme } from "./ui/grid/defaultGrid4Theme";
import { defaultGrid5Theme } from "./ui/grid/defaultGrid5Theme";
import { defaultGrid6Theme } from "./ui/grid/defaultGrid6Theme";
import { defaultCheckboxTheme } from './ui/checkbox/defaultCheckboxTheme';
import { defaultCheckboxCheckTheme } from './ui/checkbox/defaultCheckboxCheckTheme';
import { defaultCheckboxIndeterminateTheme } from './ui/checkbox/defaultCheckboxIndeterminateTheme';
import { defaultCheckboxWrapperTheme } from './ui/checkbox/defaultCheckboxWrapperTheme';
import { defaultLabelTheme } from './ui/label/defaultLabelTheme';
import { defaultImgTheme } from './ui/img/defaultImgTheme';
import { defaultInputTheme } from './ui/input/defaultInputTheme';
import { defaultOverlayTheme } from './ui/overlay/defaultOverlayTheme';
import { defaultModalContentTheme } from './ui/modal/defaultModalContentTheme';
import { defaultModalOverlayTheme } from './ui/modal/defaultModalOverlayTheme';
import { defaultModalHeaderTheme } from './ui/modal/defaultModalHeaderTheme';
import { defaultModalBodyTheme } from './ui/modal/defaultModalBodyTheme';
import { defaultModalFooterTheme } from './ui/modal/defaultModalFooterTheme';
import { defaultModalCloseButtonTheme } from './ui/modal/defaultModalCloseButtonTheme';
import { defaultPopupTheme } from './ui/popup/defaultPopupTheme';
import { defaultIconButtonTheme } from './ui/iconButton/defaultIconButtonTheme';
import { defaultIconTheme } from './ui/icon/defaultIconTheme';
import { blockquoteTheme } from './ui/typography/blockquote/defaultBlockquoteTheme';
import { defaultKbdTheme } from './ui/kbd/defaultKbdTheme';
import { defaultMarkTheme } from './ui/mark/defaultMarkTheme';
import { defaultMenuItemTheme } from './ui/menu/defaultMenuItemTheme';
import { defaultMenuLabelTheme } from './ui/menu/defaultMenuLabelTheme';
import { defaultMenuPopupTheme } from './ui/menu/defaultMenuPopupTheme';
import { defaultNavLinkTheme } from './ui/navLink/defaultNavLinkTheme';
import { defaultNavLinkLabelTheme } from './ui/navLink/defaultNavLinkLabelTheme';

export const defaultTheme: ThemeProps = {
  button: {
    main: defaultButtonTheme,
    spinner: defaultButtonSpinnerTheme,
  },
  iconButton: defaultIconButtonTheme,
  badge: defaultBadgeTheme,
  icon: defaultIconTheme,
  chip: defaultChipTheme,
  code: defaultCodeTheme,
  kbd: defaultKbdTheme,
  mark: defaultMarkTheme,
  card: {
    main: defaultCardTheme,
    header: defaultCardHeaderTheme,
    body: defaultCardBodyTheme,
    footer: defaultCardFooterTheme,
  },
  divider: defaultDividerTheme,
  container: defaultContainerTheme,
  row: defaultRowTheme,
  col: defaultColTheme,
  stack: defaultStackTheme,
  section: defaultSectionTheme,
  grid2: defaultGrid2Theme,
  grid3: defaultGrid3Theme,
  grid4: defaultGrid4Theme,
  grid5: defaultGrid5Theme,
  grid6: defaultGrid6Theme,
  pageTitle: pageTitleTheme,
  sectionTitle: sectionTitleTheme,
  title: titleTheme,
  text: textTheme,
  blockquote: blockquoteTheme,
  link: linkTheme,
  listItem: listItemTheme,
  list: listTheme,
  checkbox: {
    input: defaultCheckboxTheme,
    check: defaultCheckboxCheckTheme,
    indeterminate: defaultCheckboxIndeterminateTheme,
    wrapper: defaultCheckboxWrapperTheme,
  },
  label: defaultLabelTheme,
  img: defaultImgTheme,
  input: defaultInputTheme,
  overlay: defaultOverlayTheme,
  modal: {
    content: defaultModalContentTheme,
    overlay: defaultModalOverlayTheme,
    header: defaultModalHeaderTheme,
    body: defaultModalBodyTheme,
    footer: defaultModalFooterTheme,
    closeButton: defaultModalCloseButtonTheme,
  },
  popup: defaultPopupTheme,
  menu: {
    item: defaultMenuItemTheme,
    popup: defaultMenuPopupTheme,
    divider: defaultMenuDividerTheme,
    label: defaultMenuLabelTheme,
  },
  navLink: {
    root: defaultNavLinkTheme,
    label: defaultNavLinkLabelTheme,
  },
};
