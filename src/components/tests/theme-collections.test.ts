import { COMPONENT, defaultTheme, type ThemeExtraClasses } from '../../';

// Utility to compare sets irrespective of order
const toSorted = (arr: string[]) => [...arr].sort();

/**
 * Tailwind classes that correspond to VaneUI boolean props.
 * These must NEVER appear in a component's base class string —
 * use the defaults object with the boolean prop instead.
 *
 * Allowed exceptions (comment with reason in base class):
 * - Child selectors: [&_svg]:pointer-events-none (applies to children, not self)
 * - Conditional selectors: hover:underline, has-[input]:cursor-pointer
 * - CSS resets: appearance-none, ring-transparent
 * - Structural classes with no prop: align-middle, aspect-square, list-inside
 */
const REPLACEABLE_CLASSES: Record<string, string> = {
  // items
  'items-start': 'itemsStart', 'items-end': 'itemsEnd', 'items-center': 'itemsCenter',
  'items-baseline': 'itemsBaseline', 'items-stretch': 'itemsStretch',
  // justify
  'justify-start': 'justifyStart', 'justify-end': 'justifyEnd', 'justify-center': 'justifyCenter',
  'justify-between': 'justifyBetween', 'justify-around': 'justifyAround', 'justify-evenly': 'justifyEvenly',
  // cursor
  'cursor-pointer': 'cursorPointer', 'cursor-default': 'cursorDefault',
  'cursor-not-allowed': 'cursorNotAllowed', 'cursor-none': 'cursorNone',
  // position
  'relative': 'relative', 'absolute': 'absolute', 'fixed': 'fixed', 'sticky': 'sticky',
  // display
  'flex': 'flex', 'inline-flex': 'inlineFlex', 'block': 'block', 'inline-block': 'inlineBlock',
  'grid': 'grid', 'hidden': 'hidden', 'inline': 'inline', 'contents': 'contents',
  // overflow
  'overflow-auto': 'overflowAuto', 'overflow-hidden': 'overflowHidden',
  'overflow-scroll': 'overflowScroll', 'overflow-visible': 'overflowVisible',
  // direction
  'flex-row': 'row', 'flex-col': 'column',
  'flex-row-reverse': 'rowReverse', 'flex-col-reverse': 'columnReverse',
  // wrap
  'flex-wrap': 'flexWrap', 'flex-nowrap': 'flexNoWrap',
  // font weight
  'font-thin': 'thin', 'font-light': 'light', 'font-normal': 'normal',
  'font-medium': 'medium', 'font-semibold': 'semibold', 'font-bold': 'bold',
  'font-extrabold': 'extrabold', 'font-black': 'black',
  // text align
  'text-left': 'textLeft', 'text-center': 'textCenter',
  'text-right': 'textRight', 'text-justify': 'textJustify',
  // text decoration
  'underline': 'underline', 'line-through': 'lineThrough', 'no-underline': 'noUnderline',
  // text transform
  'uppercase': 'uppercase', 'lowercase': 'lowercase', 'capitalize': 'capitalize',
  // width
  'w-full': 'wFull', 'w-fit': 'wFit', 'w-auto': 'wAuto',
  // height
  'h-full': 'hFull', 'h-fit': 'hFit', 'h-auto': 'hAuto',
};

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
      kbd: {},
      mark: {},
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
      blockquote: {},
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

  test('No replaceable Tailwind classes in component base class strings', () => {
    // Base class strings should use boolean prop defaults instead of hardcoded
    // Tailwind classes when a corresponding boolean prop exists.
    //
    // Exceptions (not flagged):
    // - Child selectors like [&_svg]:pointer-events-none
    // - Conditional selectors like hover:underline, has-[...]:cursor-pointer
    // - Classes inside arbitrary value brackets like [--icon-size:...]
    const violations: string[] = [];

    function checkBase(name: string, base: string) {
      const tokens = base.split(/\s+/);
      for (const token of tokens) {
        // Skip child/variant/conditional selectors (contain : before the class)
        if (token.includes(':')) continue;
        // Skip arbitrary value brackets
        if (token.includes('[')) continue;

        if (REPLACEABLE_CLASSES[token]) {
          violations.push(
            `${name}: base class "${token}" should use ` +
            `"${REPLACEABLE_CLASSES[token]}" in defaults instead`
          );
        }
      }
    }

    for (const key of Object.keys(defaultTheme)) {
      const value = (defaultTheme as unknown as Record<string, unknown>)[key];
      if (value && typeof value === 'object' && 'base' in value && typeof (value as { base: unknown }).base === 'string') {
        checkBase(key, (value as { base: string }).base);
      } else if (value && typeof value === 'object') {
        // Handle nested themes (checkbox.input, checkbox.wrapper, modal.content, etc.)
        for (const subKey of Object.keys(value)) {
          const subTheme = (value as Record<string, unknown>)[subKey];
          if (subTheme && typeof subTheme === 'object' && 'base' in subTheme && typeof (subTheme as { base: unknown }).base === 'string') {
            checkBase(`${key}.${subKey}`, (subTheme as { base: string }).base);
          }
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
