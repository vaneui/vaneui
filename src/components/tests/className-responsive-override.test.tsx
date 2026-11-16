import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { twMerge } from 'tailwind-merge';

import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Grid3,
  PageTitle,
  Row,
  Section,
  SectionTitle,
  Stack,
  Text,
  ThemeProvider,
  Title,
  defaultTheme,
} from '../../index';

// A responsive component sets one value with three classes: a desktop class and its
// `max-tablet:` / `max-mobile:` repeats. A `className` that overrides the value has to take
// out all three, or the override holds on desktop only.

const PY = ['py-(--py-desktop)', 'max-tablet:py-(--py-tablet)', 'max-mobile:py-(--py-mobile)'];
const PX = ['px-(--px-desktop)', 'max-tablet:px-(--px-tablet)', 'max-mobile:px-(--px-mobile)'];
const GAP = ['gap-(--gap-desktop)', 'max-tablet:gap-(--gap-tablet)', 'max-mobile:gap-(--gap-mobile)'];
const FS = ['text-(length:--fs-desktop)', 'max-tablet:text-(length:--fs-tablet)', 'max-mobile:text-(length:--fs-mobile)'];

// The stylesheet build scans this file for class names. A class that exists only for a
// test here is put together at run time, so the build does not add it to the stylesheet.
const withVariant = (variant: string, cls: string) => `${variant}:${cls}`;

function classesOf(ui: React.ReactElement): string[] {
  const { container } = render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
  return Array.from((container.firstElementChild as HTMLElement).classList);
}

const expectAll = (classes: string[], expected: string[]) => {
  for (const cls of expected) expect(classes).toContain(cls);
};
const expectNone = (classes: string[], unexpected: string[]) => {
  for (const cls of unexpected) expect(classes).not.toContain(cls);
};

describe('className against the theme\'s responsive classes', () => {
  describe('the pairs a responsive component emits', () => {
    it('Section emits the padding and gap triples, PageTitle the font-size triple', () => {
      const section = classesOf(<Section>content</Section>);
      expectAll(section, [...PY, ...PX, ...GAP]);
      const title = classesOf(<PageTitle>Title</PageTitle>);
      expectAll(title, FS);
      // line height is a single class with no below-breakpoint repeat
      expect(title.filter(cls => cls.includes('leading-'))).toEqual(['leading-(--lh)']);
    });
  });

  describe('vertical padding', () => {
    it('py-8 replaces the whole triple and leaves the other values alone', () => {
      const classes = classesOf(<Section className="py-8">content</Section>);
      expect(classes).toContain('py-8');
      expectNone(classes, PY);
      expectAll(classes, [...PX, ...GAP]);
    });

    it('an arbitrary value and a variable value do the same', () => {
      expectNone(classesOf(<Section className="py-[20px]">content</Section>), PY);
      const classes = classesOf(<Section className="py-(--py)">content</Section>);
      expect(classes).toContain('py-(--py)');
      expectNone(classes, PY);
    });
  });

  describe('horizontal padding', () => {
    it('px-6 replaces the whole triple and leaves the other values alone', () => {
      const classes = classesOf(<Section className="px-6">content</Section>);
      expect(classes).toContain('px-6');
      expectNone(classes, PX);
      expectAll(classes, [...PY, ...GAP]);
    });
  });

  describe('padding shorthand', () => {
    it('p-6 replaces both padding triples', () => {
      const classes = classesOf(<Section className="p-6">content</Section>);
      expect(classes).toContain('p-6');
      expectNone(classes, [...PY, ...PX]);
      expectAll(classes, GAP);
    });
  });

  describe('gap', () => {
    it('gap-2 replaces the whole triple and leaves the other values alone', () => {
      const classes = classesOf(<Section className="gap-2">content</Section>);
      expect(classes).toContain('gap-2');
      expectNone(classes, GAP);
      expectAll(classes, [...PY, ...PX]);
    });
  });

  describe('font size', () => {
    it('text-5xl replaces the whole triple', () => {
      const classes = classesOf(<PageTitle className="text-5xl">Title</PageTitle>);
      expect(classes).toContain('text-5xl');
      expectNone(classes, FS);
    });

    it('an arbitrary length does the same', () => {
      expectNone(classesOf(<PageTitle className="text-[10px]">Title</PageTitle>), FS);
    });

    it('a text color class is not a font size and removes nothing', () => {
      const classes = classesOf(<PageTitle className="text-red-500">Title</PageTitle>);
      expect(classes).toContain('text-red-500');
      expectAll(classes, FS);
    });
  });

  describe('line height', () => {
    it('leading-loose replaces the single line-height class and keeps the font-size triple', () => {
      const classes = classesOf(<PageTitle className="leading-loose">Title</PageTitle>);
      expect(classes.filter(cls => cls.includes('leading-'))).toEqual(['leading-loose']);
      expectAll(classes, FS);
    });
  });

  describe('several values at once', () => {
    it('py-8 gap-2 replaces both triples', () => {
      const classes = classesOf(<Section className="py-8 gap-2">content</Section>);
      expectAll(classes, ['py-8', 'gap-2']);
      expectNone(classes, [...PY, ...GAP]);
      expectAll(classes, PX);
    });
  });

  describe.each([
    ['Section', Section],
    ['Card', Card],
    ['Stack', Stack],
    ['Alert', Alert],
  ] as const)('%s', (_name, Component) => {
    it('drops its padding and gap triples for p-6 gap-4', () => {
      const plain = classesOf(React.createElement(Component, null, 'content'));
      expectAll(plain, [...PY, ...PX, ...GAP]);
      const classes = classesOf(React.createElement(Component, { className: 'p-6 gap-4' }, 'content'));
      expectAll(classes, ['p-6', 'gap-4']);
      expectNone(classes, [...PY, ...PX, ...GAP]);
    });
  });

  it('Container drops its gap triple for gap-4', () => {
    expectAll(classesOf(<Container>content</Container>), GAP);
    expectNone(classesOf(<Container className="gap-4">content</Container>), GAP);
  });

  describe.each([
    ['PageTitle', PageTitle],
    ['SectionTitle', SectionTitle],
    ['Title', Title],
  ] as const)('%s', (_name, Component) => {
    it('drops its font-size triple for text-2xl', () => {
      expectAll(classesOf(React.createElement(Component, null, 'Title')), FS);
      const classes = classesOf(React.createElement(Component, { className: 'text-2xl' }, 'Title'));
      expect(classes).toContain('text-2xl');
      expectNone(classes, FS);
    });
  });

  describe('a user class with its own variant', () => {
    const ownTablet = withVariant('max-tablet', 'py-4');

    it('stays, next to the class that covers every width', () => {
      const classes = classesOf(<Section className={`py-8 ${ownTablet}`}>content</Section>);
      expectAll(classes, ['py-8', ownTablet]);
      expectNone(classes, PY);
    });

    it('alone, replaces only the theme class of the same variant', () => {
      const classes = classesOf(<Section className={ownTablet}>content</Section>);
      expect(classes).toContain(ownTablet);
      expect(classes).not.toContain('max-tablet:py-(--py-tablet)');
      // no class for every width was given, so the rest of the triple is the theme's
      expectAll(classes, ['py-(--py-desktop)', 'max-mobile:py-(--py-mobile)']);
    });

    it('with a state or min-width variant, removes nothing', () => {
      expectAll(classesOf(<Section className={withVariant('hover', 'py-8')}>content</Section>), PY);
      expectAll(classesOf(<Section className={withVariant('lg', 'py-8')}>content</Section>), PY);
    });
  });

  describe('classes that do not override the value', () => {
    it('a one-sided class leaves the two-sided triple in place', () => {
      const classes = classesOf(<Section className="pl-6">content</Section>);
      expect(classes).toContain('pl-6');
      expectAll(classes, PX);
    });

    it('an unrelated class changes nothing', () => {
      const plain = classesOf(<Section>content</Section>);
      const classes = classesOf(<Section className="min-h-screen">content</Section>);
      expect(classes).toEqual([...plain, 'min-h-screen']);
    });
  });

  describe('explicit responsive props are not part of a pair', () => {
    it('mobileStack survives a flex-direction class', () => {
      expect(classesOf(<Row mobileStack className="flex-row-reverse">content</Row>)).toContain('max-mobile:flex-col');
    });

    it('mobileHide survives a display class', () => {
      expect(classesOf(<Col mobileHide className="grid">content</Col>)).toContain('max-mobile:hidden');
    });

    it('mobileWFull survives a width class', () => {
      expect(classesOf(<Button mobileWFull className="w-48">Go</Button>)).toContain('max-mobile:w-full');
    });

    it('the Grid column collapse survives a column-count class', () => {
      const classes = classesOf(<Grid3 className="grid-cols-4">content</Grid3>);
      expectAll(classes, ['grid-cols-4', 'max-tablet:grid-cols-2', 'max-mobile:grid-cols-1']);
    });
  });

  describe('without a conflicting className the class string is what it was', () => {
    const cases: Array<[string, React.ReactElement]> = [
      ['Section', <Section>content</Section>],
      ['Card', <Card>content</Card>],
      ['PageTitle', <PageTitle>Title</PageTitle>],
      ['Section with an unrelated class', <Section className="min-h-screen">content</Section>],
      ['Text (not responsive) with a size class', <Text className="text-5xl">text</Text>],
      ['Card without responsive sizing, with p-6', <Card responsiveSizing={false} className="p-6">content</Card>],
    ];

    it.each(cases)('%s', (_name, element) => {
      const theme = (element.type === Section ? defaultTheme.section
        : element.type === Card ? defaultTheme.card.main
        : element.type === PageTitle ? defaultTheme.pageTitle
        : defaultTheme.text) as { getClasses(props: object): string[] };
      const props = element.props as { className?: string };
      // the plain merge the engine did before: theme classes, then className
      const expected = twMerge(...theme.getClasses(props), props.className);
      const { container } = render(<ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>);
      expect((container.firstElementChild as HTMLElement).className).toBe(expected);
    });
  });

  describe('the class cache', () => {
    it('is not changed by a render with className', () => {
      const before = classesOf(<Section>content</Section>);
      classesOf(<Section className="py-8 gap-2">content</Section>);
      expect(classesOf(<Section>content</Section>)).toEqual(before);
      expectAll(defaultTheme.section.getClasses({}), [...PY, ...PX, ...GAP]);
    });

    it('stays right past the number of class names it remembers', () => {
      for (let i = 0; i < 450; i++) {
        const overrides = i % 2 === 0;
        const classes = classesOf(<Section className={overrides ? `item-${i} py-8` : `item-${i}`}>content</Section>);
        expect(classes).toContain(`item-${i}`);
        expect(classes.includes('max-tablet:py-(--py-tablet)')).toBe(!overrides);
        expect(classes.includes('max-mobile:py-(--py-mobile)')).toBe(!overrides);
      }
      // and an early one again, after it was dropped from memory
      expectNone(classesOf(<Section className="item-0 py-8">content</Section>), PY);
    });

    it('gives each className its own result', () => {
      const first = classesOf(<Section className="py-8">content</Section>);
      const second = classesOf(<Section className="gap-2">content</Section>);
      const third = classesOf(<Section className="py-8">content</Section>);
      expectNone(first, PY);
      expectAll(second, PY);
      expectNone(second, GAP);
      expect(third).toEqual(first);
    });
  });

  describe('a customized theme', () => {
    it('drops a below-breakpoint class that themeOverride rewrote', () => {
      const rewritten = withVariant('max-tablet', 'py-4');
      const override = (theme: typeof defaultTheme) => {
        theme.section.themes.size.py.tablet = rewritten;
        return theme;
      };
      const plain = render(
        <ThemeProvider themeOverride={override}><Section>content</Section></ThemeProvider>
      ).container.firstElementChild as HTMLElement;
      expect(plain).toHaveClass(rewritten);

      const overridden = render(
        <ThemeProvider themeOverride={override}><Section className="py-8">content</Section></ThemeProvider>
      ).container.firstElementChild as HTMLElement;
      expect(overridden).toHaveClass('py-8');
      expect(overridden).not.toHaveClass(rewritten);
      expect(overridden).not.toHaveClass('max-mobile:py-(--py-mobile)');
    });
  });
});
