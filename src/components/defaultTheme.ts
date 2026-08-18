import type { ThemeProps } from './themeTypes';
import { defaultButtonTheme } from './ui/button/defaultButtonTheme';
import { defaultButtonSpinnerTheme } from './ui/button/defaultButtonSpinnerTheme';
import { defaultBadgeTheme } from './ui/badge/defaultBadgeTheme';
import { defaultChipTheme } from './ui/chip/defaultChipTheme';
import { defaultCodeTheme } from './ui/code/defaultCodeTheme';
import { defaultTextTheme } from './ui/typography/text/defaultTextTheme';
import { defaultTitleTheme } from './ui/typography/title/defaultTitleTheme';
import { defaultSectionTitleTheme } from './ui/typography/sectionTitle/defaultSectionTitleTheme';
import { defaultPageTitleTheme } from './ui/typography/pageTitle/defaultPageTitleTheme';
import { defaultLinkTheme } from './ui/typography/link/defaultLinkTheme';
import { defaultListTheme } from './ui/typography/list/defaultListTheme';
import { defaultListItemTheme } from './ui/typography/listItem/defaultListItemTheme';
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
import { defaultFieldTheme } from './ui/field/defaultFieldTheme';
import { defaultAlertTheme } from './ui/alert/defaultAlertTheme';
import { defaultSpinnerTheme } from './ui/spinner/defaultSpinnerTheme';
import { defaultTooltipTheme } from './ui/tooltip/defaultTooltipTheme';
import { defaultFieldLabelTheme } from './ui/field/defaultFieldLabelTheme';
import { defaultFieldDescriptionTheme } from './ui/field/defaultFieldDescriptionTheme';
import { defaultFieldErrorTheme } from './ui/field/defaultFieldErrorTheme';
import { defaultImgTheme } from './ui/img/defaultImgTheme';
import { defaultInputTheme } from './ui/input/defaultInputTheme';
import { defaultInputErrorIconTheme } from './ui/input/defaultInputErrorIconTheme';
import { defaultInputWrapperTheme } from './ui/input/defaultInputWrapperTheme';
import { defaultTextareaTheme } from './ui/textarea/defaultTextareaTheme';
import { defaultSelectTheme } from './ui/select/defaultSelectTheme';
import { defaultSelectChevronTheme } from './ui/select/defaultSelectChevronTheme';
import { defaultSelectWrapperTheme } from './ui/select/defaultSelectWrapperTheme';
import { defaultSwitchTheme } from './ui/switch/defaultSwitchTheme';
import { defaultSwitchThumbTheme } from './ui/switch/defaultSwitchThumbTheme';
import { defaultSwitchWrapperTheme } from './ui/switch/defaultSwitchWrapperTheme';
import { defaultRadioTheme } from './ui/radio/defaultRadioTheme';
import { defaultRadioDotTheme } from './ui/radio/defaultRadioDotTheme';
import { defaultRadioWrapperTheme } from './ui/radio/defaultRadioWrapperTheme';
import { defaultRadioGroupTheme } from './ui/radio/defaultRadioGroupTheme';
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
import { defaultBlockquoteTheme } from './ui/typography/blockquote/defaultBlockquoteTheme';
import { defaultBlockquoteCiteTheme } from './ui/typography/blockquote/defaultBlockquoteCiteTheme';
import { defaultKbdTheme } from './ui/kbd/defaultKbdTheme';
import { defaultMarkTheme } from './ui/mark/defaultMarkTheme';
import { defaultMenuItemTheme } from './ui/menu/defaultMenuItemTheme';
import { defaultMenuLabelTheme } from './ui/menu/defaultMenuLabelTheme';
import { defaultMenuPopupTheme } from './ui/menu/defaultMenuPopupTheme';
import { defaultNavLinkTheme } from './ui/navLink/defaultNavLinkTheme';
import { defaultNavLinkLabelTheme } from './ui/navLink/defaultNavLinkLabelTheme';
import { defaultTableTheme } from './ui/table/defaultTableTheme';
import { defaultTheadTheme } from './ui/table/defaultTheadTheme';
import { defaultTbodyTheme } from './ui/table/defaultTbodyTheme';
import { defaultTfootTheme } from './ui/table/defaultTfootTheme';
import { defaultTrTheme } from './ui/table/defaultTrTheme';
import { defaultThTheme } from './ui/table/defaultThTheme';
import { defaultTdTheme } from './ui/table/defaultTdTheme';
import { defaultCaptionTheme } from './ui/table/defaultCaptionTheme';

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
  pageTitle: defaultPageTitleTheme,
  sectionTitle: defaultSectionTitleTheme,
  title: defaultTitleTheme,
  text: defaultTextTheme,
  blockquote: defaultBlockquoteTheme,
  blockquoteCite: defaultBlockquoteCiteTheme,
  link: defaultLinkTheme,
  listItem: defaultListItemTheme,
  list: defaultListTheme,
  checkbox: {
    input: defaultCheckboxTheme,
    check: defaultCheckboxCheckTheme,
    indeterminate: defaultCheckboxIndeterminateTheme,
    wrapper: defaultCheckboxWrapperTheme,
  },
  label: defaultLabelTheme,
  field: {
    main: defaultFieldTheme,
    label: defaultFieldLabelTheme,
    description: defaultFieldDescriptionTheme,
    error: defaultFieldErrorTheme,
  },
  img: defaultImgTheme,
  input: defaultInputTheme,
  inputErrorIcon: defaultInputErrorIconTheme,
  inputWrapper: defaultInputWrapperTheme,
  textarea: defaultTextareaTheme,
  select: defaultSelectTheme,
  selectChevron: defaultSelectChevronTheme,
  selectWrapper: defaultSelectWrapperTheme,
  switch: {
    input: defaultSwitchTheme,
    thumb: defaultSwitchThumbTheme,
    wrapper: defaultSwitchWrapperTheme,
  },
  radio: {
    input: defaultRadioTheme,
    dot: defaultRadioDotTheme,
    wrapper: defaultRadioWrapperTheme,
  },
  radioGroup: defaultRadioGroupTheme,
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
  tooltip: defaultTooltipTheme,
  alert: defaultAlertTheme,
  spinner: defaultSpinnerTheme,
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
  table: {
    main: defaultTableTheme,
    thead: defaultTheadTheme,
    tbody: defaultTbodyTheme,
    tfoot: defaultTfootTheme,
    tr: defaultTrTheme,
    th: defaultThTheme,
    td: defaultTdTheme,
    caption: defaultCaptionTheme,
  },
};
