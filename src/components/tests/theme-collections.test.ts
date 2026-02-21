import { COMPONENT, defaultTheme, type ThemeExtraClasses } from '../../';

// Utility to compare sets irrespective of order
const toSorted = (arr: string[]) => [...arr].sort();

describe('Theme structure consistency', () => {
  test('COMPONENT contains the same items as ThemeProps (defaultTheme keys)', () => {
    const componentList = Array.from(COMPONENT);
    const themeKeys = Object.keys(defaultTheme);

    expect(toSorted(themeKeys)).toEqual(toSorted(componentList));
  });

  test('ThemeExtraClasses contains all items from COMPONENT (including checkbox nested structure)', () => {
    // This literal is intentionally exhaustive; TypeScript will error if ThemeExtraClasses
    // is missing any key found in COMPONENT, providing compile-time safety.
    const allExtraClasses: ThemeExtraClasses = {
      button: {},
      iconButton: {},
      badge: {},
      chip: {},
      code: {},
      icon: {},
      card: {},
      divider: {},
      container: {},
      row: {},
      col: {},
      stack: {},
      section: {},
      grid2: {},
      grid3: {},
      grid4: {},
      grid5: {},
      grid6: {},
      pageTitle: {},
      sectionTitle: {},
      title: {},
      text: {},
      link: {},
      list: {},
      listItem: {},
      checkbox: { input: {}, check: {}, wrapper: {} },
      label: {},
      img: {},
      input: {},
      overlay: {},
      modal: {},
      popup: {},
    };

    // At runtime, also ensure the keys align with COMPONENT
    const extraKeys = Object.keys(allExtraClasses);
    const componentList = Array.from(COMPONENT);

    expect(toSorted(extraKeys)).toEqual(toSorted(componentList));
  });
});
