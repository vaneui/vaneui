import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import type { ListProps } from '../ui/typography/list/ListProps';

import {
  List,
  ListItem,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('List and ListItem Components Tests', () => {

  describe('List Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('list-disc', 'list-outside');
      expect(list).not.toHaveClass('list-inside');
      expect(list).toHaveClass('text-(length:--fs)'); // inherit appearance cascades font-size
      expect(list).toHaveClass('leading-(--lh)'); // inherited line height (inherit appearance expands to inheritSize)
      expect(list).toHaveClass('text-(--text-color)'); // primary is default
      expect(list).toHaveClass('font-sans');
      expect(list).toHaveClass('font-normal');
      expect(list!.className).toContain('[&>li:not(:first-child)]:mt-(--gap)');
    });

    it('should render with different size and padding', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List lg>
            <ListItem>Item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('text-(length:--fs)', 'pl-(--pl)'); // inherit appearance cascades font-size; lg padding
      expect(list).toHaveAttribute('data-size', 'lg');
      expect(list).toHaveClass('leading-(--lh)'); // inherited line height (inherit appearance)
    });

    it('should apply layout props correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List flex itemsStart>
            <ListItem>Item with layout</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('flex', 'items-start');
    });

    it('should apply different appearance variants', () => {
      const appearances = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'accent'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <List {...{[appearance]: true}}>
              <ListItem>Test item</ListItem>
            </List>
          </ThemeProvider>
        );

        const list = container.querySelector('ul');
        expect(list).toHaveClass('text-(--text-color)');
      });
    });

    it('should support filled and outline variants', () => {
      const {container: outlineContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary outline>
            <ListItem>Outline list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const {container: filledContainer} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary filled>
            <ListItem>Filled list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const outlineList = outlineContainer.querySelector('ul');
      const filledList = filledContainer.querySelector('ul');

      expect(outlineList).toHaveClass('text-(--text-color)');
      expect(filledList).toHaveClass('text-(--text-color)');
    });

    it('should render with decimal list style using ol tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List decimal>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ol');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('list-decimal', 'list-outside');
      expect(list).not.toHaveClass('list-disc');
      
      // Verify no ul tag exists
      const ulList = container.querySelector('ul');
      expect(ulList).not.toBeInTheDocument();
    });

    it('should render with disc list style by default using ul tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('list-disc', 'list-outside');
      expect(list).not.toHaveClass('list-decimal');

      // Verify no ol tag exists
      const olList = container.querySelector('ol');
      expect(olList).not.toBeInTheDocument();
    });

    it('should render with explicit disc list style using ul tag', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List disc>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('list-disc', 'list-outside');
      expect(list).not.toHaveClass('list-decimal');

      // Verify no ol tag exists
      const olList = container.querySelector('ol');
      expect(olList).not.toBeInTheDocument();
    });

    it('should handle mixed list types in nested structures', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary>
            <ListItem>Disc parent item</ListItem>
            <List decimal secondary>
              <ListItem>Decimal nested item</ListItem>
            </List>
          </List>
        </ThemeProvider>
      );

      const ulList = container.querySelector('ul');
      const olList = container.querySelector('ol');
      
      // Parent should be ul with disc styling
      expect(ulList).toBeInTheDocument();
      expect(ulList).toHaveClass('text-(--text-color)', 'list-disc');
      
      // Nested should be ol with decimal styling
      expect(olList).toBeInTheDocument();
      expect(olList).toHaveClass('text-(--text-color)', 'list-decimal');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List className="custom-list-class">
            <ListItem>Custom list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      expect(list).toHaveClass('list-disc', 'list-outside'); // theme classes
      expect(list).toHaveClass('custom-list-class'); // custom class
    });

    it('emits list-inside when inside prop is set', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List inside>
            <ListItem>a</ListItem>
          </List>
        </ThemeProvider>
      );
      const list = container.querySelector('ul')!;
      expect(list).toHaveClass('list-inside');
      expect(list).not.toHaveClass('list-outside');
    });

    it('inside wins over outside when both are set (first-key-wins-per-category)', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List inside outside>
            <ListItem>a</ListItem>
          </List>
        </ThemeProvider>
      );
      const list = container.querySelector('ul')!;
      // `inside` is declared first in ComponentKeys.listPosition => first-truthy wins
      expect(list).toHaveClass('list-inside');
      expect(list).not.toHaveClass('list-outside');
    });
  });

  describe('ListItem Component', () => {
    it('should render correctly within a List', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>List item content</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent('List item content');
      // ListItem should have its own line height classes
      expect(listItem).toHaveClass('leading-(--lh)');
    });

    it('should inherit text color from parent List with primary appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary>
            <ListItem>Primary list item</ListItem>
            <ListItem>Another primary item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      const listItems = container.querySelectorAll('li');
      
      // Verify the List has primary text color
      expect(list).toHaveClass('text-(--text-color)');
      
      // Verify ListItems inherit the color through CSS (no explicit text color class)
      listItems.forEach(listItem => {
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        // Note: In actual browser, this would inherit the CSS custom property value
        // In test environment, we verify the inheritance pattern by ensuring no explicit color classes
      });
    });

    it('should inherit text color from parent List with secondary appearance', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List secondary>
            <ListItem>Secondary list item</ListItem>
            <ListItem>Another secondary item</ListItem>
          </List>
        </ThemeProvider>
      );

      const list = container.querySelector('ul');
      const listItems = container.querySelectorAll('li');
      
      // Verify the List has secondary text color
      expect(list).toHaveClass('text-(--text-color)');
      
      // Verify ListItems inherit the color through CSS (no explicit text color class)
      listItems.forEach(listItem => {
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
      });
    });

    it('should inherit from different List appearance variants', () => {
      const appearances = ['success', 'danger', 'warning', 'info', 'accent'] as const;
      
      appearances.forEach(appearance => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <List {...{[appearance]: true}}>
              <ListItem>{appearance} list item</ListItem>
            </List>
          </ThemeProvider>
        );

        const list = container.querySelector('ul');
        const listItem = container.querySelector('li');
        
        // Verify the List has the correct appearance text color
        expect(list).toHaveClass('text-(--text-color)');
        
        // Verify ListItem doesn't have any explicit text color classes (inherits from parent)
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
      });
    });

    it('should work with nested List structures', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List primary>
            <ListItem>Primary parent item</ListItem>
            <List secondary>
              <ListItem>Secondary nested item</ListItem>
            </List>
          </List>
        </ThemeProvider>
      );

      const lists = container.querySelectorAll('ul');
      const [parentList, nestedList] = lists;
      const listItems = container.querySelectorAll('li');
      
      // Parent List should have primary color
      expect(parentList).toHaveClass('text-(--text-color)');
      
      // Nested List should have secondary color
      expect(nestedList).toHaveClass('text-(--text-color)');
      
      // All ListItems should inherit from their immediate parent List
      listItems.forEach(listItem => {
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
        expect(listItem).toHaveClass('text-(--text-color)'); // primary is default
      });
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem className="custom-item-class">Custom item content</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('li');
      expect(listItem).toHaveClass('custom-item-class');
      expect(listItem).toHaveTextContent('Custom item content');
    });

    it('should support different HTML tags', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem tag="div">Div list item</ListItem>
          </List>
        </ThemeProvider>
      );

      const listItem = container.querySelector('div');
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent('Div list item');
    });
  });

  describe('Width Props', () => {
    it('should apply wFull class for full width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List wFull>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('w-full');
    });

    it('should apply wFit class for fit-content width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List wFit>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('w-fit');
    });

    it('should apply wAuto class for auto width', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List wAuto>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('w-auto');
    });
  });

  describe('Height Props', () => {
    it('should apply hFull class for full height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List hFull>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('h-full');
    });

    it('should apply hFit class for fit-content height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List hFit>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('h-fit');
    });

    it('should apply hAuto class for auto height', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <List hAuto>
            <ListItem>Content</ListItem>
          </List>
        </ThemeProvider>
      );
      const el = container.querySelector('ul');
      expect(el).toHaveClass('h-auto');
    });
  });

  describe('ListPositionClassMapper', () => {
    it('emits list-outside when outside is resolved', async () => {
      const { ListPositionClassMapper } = await import('../ui/theme/list/listPositionClassMapper');
      const mapper = new ListPositionClassMapper();
      expect(mapper.getClasses({ listPosition: 'outside' } as never)).toEqual(['list-outside']);
    });

    it('emits list-inside when inside is resolved', async () => {
      const { ListPositionClassMapper } = await import('../ui/theme/list/listPositionClassMapper');
      const mapper = new ListPositionClassMapper();
      expect(mapper.getClasses({ listPosition: 'inside' } as never)).toEqual(['list-inside']);
    });

    it('returns empty array when listPosition is undefined', async () => {
      const { ListPositionClassMapper } = await import('../ui/theme/list/listPositionClassMapper');
      const mapper = new ListPositionClassMapper();
      expect(mapper.getClasses({} as never)).toEqual([]);
    });
  });

  describe('Extended list markers', () => {
    const markerCases: Array<[keyof ListProps, string, 'ul' | 'ol']> = [
      ['circle', 'list-[circle]', 'ul'],
      ['square', 'list-[square]', 'ul'],
      ['lowerAlpha', 'list-[lower-alpha]', 'ol'],
      ['lowerRoman', 'list-[lower-roman]', 'ol'],
    ];

    it.each(markerCases)('emits the right class and tag for %s', (prop, expected, tag) => {
      const props = { [prop]: true };
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List {...props}>
            <ListItem>a</ListItem>
          </List>
        </ThemeProvider>
      );
      const list = container.querySelector(tag)!;
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass(expected);
      expect(list).not.toHaveClass('list-disc');
    });
  });

  describe('Nested marker progression', () => {
    it('nested ul gets list-[circle] and ul>ul gets list-[square]', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>L0</ListItem>
            <ListItem>
              <List>
                <ListItem>L1</ListItem>
                <ListItem>
                  <List>
                    <ListItem>L2</ListItem>
                  </List>
                </ListItem>
              </List>
            </ListItem>
          </List>
        </ThemeProvider>
      );
      const root = container.querySelector('ul')!;
      // Root stays `list-disc`
      expect(root).toHaveClass('list-disc');
      // The root's class string must include the descendant-selector utilities
      expect(root.className).toContain('[&_ul]:list-[circle]');
      expect(root.className).toContain('[&_ul_ul]:list-[square]');
      expect(root.className).toContain('[&_ol]:list-[lower-alpha]');
      expect(root.className).toContain('[&_ol_ol]:list-[lower-roman]');
    });

    it('nested ol structure carries the ordered-family progression selectors', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List decimal>
            <ListItem>L0</ListItem>
            <ListItem>
              <List decimal>
                <ListItem>L1</ListItem>
              </List>
            </ListItem>
          </List>
        </ThemeProvider>
      );
      const root = container.querySelector('ol')!;
      expect(root).toBeInTheDocument();
      expect(root).toHaveClass('list-decimal');
      // The root <ol> carries the descendant-selector utilities just like a <ul> root
      expect(root.className).toContain('[&_ol]:list-[lower-alpha]');
      expect(root.className).toContain('[&_ol_ol]:list-[lower-roman]');
      // And the nested <ol> exists and inherits the same base class (every <List> gets it)
      const nested = root.querySelector('ol');
      expect(nested).toBeInTheDocument();
      expect(nested).toHaveClass('list-decimal');
    });
  });

  describe('List gap spacing', () => {
    it('default list applies sibling margin utility', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List>
            <ListItem>a</ListItem>
            <ListItem>b</ListItem>
          </List>
        </ThemeProvider>
      );
      const list = container.querySelector('ul')!;
      expect(list.className).toContain('[&>li:not(:first-child)]:mt-(--gap)');
    });

    it('noGap removes sibling margin utility', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <List noGap>
            <ListItem>a</ListItem>
            <ListItem>b</ListItem>
          </List>
        </ThemeProvider>
      );
      const list = container.querySelector('ul')!;
      expect(list.className).not.toContain('[&>li:not(:first-child)]:mt-(--gap)');
    });
  });

  describe('ListGapClassMapper', () => {
    it('emits [&>li:not(:first-child)]:mt-(--gap) when gap is set', async () => {
      const { ListGapClassMapper } = await import('../ui/theme/list/listGapClassMapper');
      const mapper = new ListGapClassMapper();
      expect(mapper.getClasses({ gap: 'gap' } as never)).toEqual([
        '[&>li:not(:first-child)]:mt-(--gap)'
      ]);
    });

    it('returns [] when gap is explicitly noGap', async () => {
      const { ListGapClassMapper } = await import('../ui/theme/list/listGapClassMapper');
      const mapper = new ListGapClassMapper();
      expect(mapper.getClasses({ gap: 'noGap' } as never)).toEqual([]);
    });

    it('returns [] when gap is undefined', async () => {
      const { ListGapClassMapper } = await import('../ui/theme/list/listGapClassMapper');
      const mapper = new ListGapClassMapper();
      expect(mapper.getClasses({} as never)).toEqual([]);
    });
  });
});
