import { ThemeDefaults } from '../../themeContext';

/**
 * Default props for all components using the existing ThemeDefaults type
 */
export const themeDefaults: ThemeDefaults = {
  button: {
    md: true,
    inlineFlex: true,
    itemsCenter: true,
    justifyCenter: true,
    outline: true,
    default: true,
    rounded: true,
    sans: true,
    semibold: true,
    textCenter: true,
    noBorder: true,
    gap: true,
    padding: true,
    ring: true,
    shadow: true,
  },

  card: {
    md: true,
    flex: true,
    default: true,
    rounded: true,
    normal: true,
    column: true,
    border: true,
    gap: true,
    padding: true,
  },

  chip: {
    md: true,
    inlineFlex: true,
    itemsCenter: true,
    outline: true,
    secondary: true,
    rounded: true,
    mono: true,
    normal: true,
    noShadow: true,
    padding: true,
    gap: true,
    ring: true,
  },

  badge: {
    md: true,
    default: true,
    inlineFlex: true,
    outline: true,
    pill: true,
    sans: true,
    semibold: true,
    uppercase: true,
    noShadow: true,
    itemsCenter: true,
    padding: true,
    gap: true,
    ring: true,
  },

  container: {
    noRing: true,
    flex: true,
    md: true,
    itemsCenter: true,
    gap: true,
    sharp: true,
  },

  section: {
    md: true,
    flex: true,
    default: true,
    itemsStart: true,
    gap: true,
    padding: true,
    noBorder: true,
    noRing: true,
    noShadow: true,
    sharp: true,
  },

  stack: {
    md: true,
    flex: true,
    column: true,
    flexWrap: true,
    gap: true,
    padding: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },

  row: {
    row: true,
    md: true,
    flex: true,
    itemsCenter: true,
    gap: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },

  col: {
    column: true,
    md: true,
    flex: true,
    gap: true,
    noBorder: true,
    noRing: true,
    sharp: true,
  },

  grid2: {
    md: true,
    grid: true,
    gap: true,
  },

  grid3: {
    md: true,
    grid: true,
    gap: true,
  },

  grid4: {
    md: true,
    grid: true,
    gap: true,
  },

  divider: {
    md: true,
    default: true,
    noPadding: true,
  },

  label: {
    md: true,
    flex: true,
    gap: true,
    sans: true,
    medium: true,
  },

  img: {
    rounded: true,
  },

  code: {
    md: true,
    mono: true,
    semibold: true,
    rounded: true,
    inline: true,
    padding: true,
    default: true,
    ring: true,
  },

  text: {
    md: true,
    sans: true,
    textLeft: true,
  },

  title: {
    md: true,
    sans: true,
    semibold: true,
    textLeft: true,
  },

  pageTitle: {
    md: true,
    sans: true,
    semibold: true,
    textLeft: true,
  },

  sectionTitle: {
    md: true,
    sans: true,
    semibold: true,
    textLeft: true,
  },

  link: {
    underline: true,
    link: true,
    sans: true,
  },

  listItem: {
    sans: true,
  },

  list: {
    md: true,
    sans: true,
    normal: true,
    padding: true,
    disc: true,
  },

  checkbox: {
    input: {
      md: true,
      default: true,
      border: true,
      rounded: true,
      noRing: true,
      noShadow: true,
      filled: true,
    },
    check: {
      default: true,
      filled: true,
    },
    wrapper: {
      transparent: true,
      md: true,
      inlineGrid: true,
      itemsCenter: true,
      justifyCenter: true,
      filled: true,
    },
  },

  input: {
    md: true,
    default: true,
    //border: true,
    rounded: true,
    outline: true,
    sans: true,
    normal: true,
    padding: true,
    //ring: true,
    noShadow: true,
    //focus: true,
    //focusVisible: true,
  },
};