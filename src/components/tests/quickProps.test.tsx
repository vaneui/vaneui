import '@testing-library/jest-dom';
import * as fs from 'fs';
import * as path from 'path';
import { type ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  Badge, Card, Col, Img, Label, Progress, Row, Stack, Table, Tbody, Td, Text, Textarea, Title, Tr,
  ThemeProvider, defaultTheme,
} from '../../index';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const rulesCss = fs.readFileSync(path.resolve(__dirname, '../css/rules.css'), 'utf-8');

describe('fixed gap steps', () => {
  it.each([
    ['gapXs', 'xs'], ['gapSm', 'sm'], ['gapMd', 'md'], ['gapLg', 'lg'], ['gapXl', 'xl'],
  ] as const)('should give %s the %s step, whatever the size', (prop, step) => {
    const { container } = renderUi(<Row lg {...{ [prop]: true }}>a</Row>);
    const row = container.firstElementChild as HTMLElement;
    expect(row).toHaveClass(`gap-[calc(var(--gap-unit-${step})*var(--spacing))]`);
    expect(row).not.toHaveClass('gap-(--gap)');
    expect(row).not.toHaveAttribute(prop.toLowerCase());
  });

  it('should replace the responsive gap of a Stack and a Card with the fixed step', () => {
    const { container } = renderUi(<><Stack gapSm>a</Stack><Card gapXl>b</Card></>);
    const [stack, card] = Array.from(container.children) as HTMLElement[];
    expect(stack).toHaveClass('gap-[calc(var(--gap-unit-sm)*var(--spacing))]');
    expect(stack).not.toHaveClass('max-tablet:gap-(--gap-tablet)');
    expect(card).toHaveClass('gap-[calc(var(--gap-unit-xl)*var(--spacing))]');
  });

  it('should define the fixed ramp in the stylesheet', () => {
    expect(rulesCss).toContain('--gap-unit-xs');
    expect(rulesCss).toContain('--gap-unit-xl');
  });
});

describe('Textarea resize and autosize', () => {
  const textareaOf = (container: HTMLElement) => container.querySelector('textarea') as HTMLTextAreaElement;

  it('should resize vertically by default', () => {
    const { container } = renderUi(<Textarea aria-label="Bio" />);
    expect(textareaOf(container)).toHaveClass('resize-y');
  });

  it.each([
    ['resizeNone', 'resize-none'], ['resizeX', 'resize-x'], ['resize', 'resize'],
  ] as const)('should take %s', (prop, cls) => {
    const { container } = renderUi(<Textarea aria-label="Bio" {...{ [prop]: true }} />);
    const textarea = textareaOf(container);
    expect(textarea).toHaveClass(cls);
    expect(textarea).not.toHaveClass('resize-y');
    expect(textarea).not.toHaveAttribute(prop.toLowerCase());
  });

  it('should size an autosize textarea to its content and drop the handle', () => {
    const { container } = renderUi(<Textarea aria-label="Bio" autosize />);
    const textarea = textareaOf(container);
    expect(textarea).toHaveClass('field-sizing-content', 'resize-none');
    expect(textarea).not.toHaveClass('resize-y');
    expect(textarea).not.toHaveAttribute('autosize');
  });

  it('should fit the height to the content where field-sizing is not supported', () => {
    // jsdom has no field-sizing, so the fallback runs
    let scrollHeight = 120;
    const spy = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockImplementation(() => scrollHeight);
    try {
      const { container, unmount } = renderUi(<Textarea aria-label="Bio" autosize />);
      const textarea = textareaOf(container);
      expect(textarea.style.height).toBe('120px');
      scrollHeight = 168;
      fireEvent.input(textarea, { target: { value: 'a\nb\nc' } });
      expect(textarea.style.height).toBe('168px');
      unmount();
      expect(textarea.style.height).toBe('');
    } finally {
      spy.mockRestore();
    }
  });

  it('should leave the height alone without autosize', () => {
    const spy = jest.spyOn(HTMLElement.prototype, 'scrollHeight', 'get').mockReturnValue(120);
    try {
      const { container } = renderUi(<Textarea aria-label="Bio" />);
      expect(textareaOf(container).style.height).toBe('');
    } finally {
      spy.mockRestore();
    }
  });
});

describe('Table striped and hoverable', () => {
  const table = (props: Record<string, boolean>) => (
    <Table {...props}>
      <Tbody>
        <Tr><Td>1</Td></Tr>
        <Tr><Td>2</Td></Tr>
      </Tbody>
    </Table>
  );

  it('should mark a striped and a hoverable table, and leak neither prop', () => {
    const { container } = renderUi(table({ striped: true, hoverable: true }));
    const el = container.querySelector('table') as HTMLElement;
    expect(el).toHaveClass('vane-table-striped', 'vane-table-hoverable');
    expect(el).not.toHaveAttribute('striped');
    expect(el).not.toHaveAttribute('hoverable');
  });

  it('should add neither class by default', () => {
    const { container } = renderUi(table({}));
    const el = container.querySelector('table') as HTMLElement;
    expect(el).not.toHaveClass('vane-table-striped');
    expect(el).not.toHaveClass('vane-table-hoverable');
  });

  it('should tint the body rows in the stylesheet', () => {
    expect(rulesCss).toMatch(/\.vane-table-striped > tbody > tr:nth-child\(even\)/);
    expect(rulesCss).toMatch(/\.vane-table-hoverable > tbody > tr:hover/);
  });
});

describe('Badge dot', () => {
  it('should draw a dot before the text', () => {
    const { container } = renderUi(<Badge success dot>Online</Badge>);
    const badge = container.querySelector('.vane-badge') as HTMLElement;
    expect(badge).toHaveClass('vane-badge-dot', "before:content-['']", 'before:rounded-full', 'before:bg-current');
    expect(badge).toHaveTextContent('Online');
    expect(badge).not.toHaveAttribute('dot');
    expect(badge).not.toHaveAttribute('role');
  });

  it('should make a labelled dot with no text one image', () => {
    const { container } = renderUi(<Badge success dot aria-label="Online" />);
    const badge = container.querySelector('.vane-badge') as HTMLElement;
    expect(badge).toHaveAttribute('role', 'img');
    expect(badge).toHaveAttribute('aria-label', 'Online');
  });

  it('should not give an unlabelled dot a role', () => {
    const { container } = renderUi(<Badge dot />);
    expect(container.querySelector('.vane-badge')).not.toHaveAttribute('role');
  });

  it('should add no dot classes without the prop', () => {
    const { container } = renderUi(<Badge>New</Badge>);
    expect(container.querySelector('.vane-badge')).not.toHaveClass('before:bg-current');
    expect(container.querySelector('.vane-badge')).not.toHaveClass('vane-badge-dot');
  });
});

describe('Progress indeterminate', () => {
  it('should leave out the value while the amount is unknown', () => {
    const { container } = renderUi(<Progress indeterminate aria-label="Uploading" />);
    const bar = container.querySelector('.vane-progress') as HTMLElement;
    expect(bar).toHaveAttribute('role', 'progressbar');
    expect(bar).not.toHaveAttribute('aria-valuenow');
    expect(bar).toHaveAttribute('data-indeterminate', 'true');
    expect(bar).not.toHaveAttribute('indeterminate');
    expect(bar.style.getPropertyValue('--progress')).toBe('');
  });

  it('should keep the value of a determinate bar', () => {
    const { container } = renderUi(<Progress value={40} aria-label="Uploading" />);
    const bar = container.querySelector('.vane-progress') as HTMLElement;
    expect(bar).toHaveAttribute('aria-valuenow', '40');
    expect(bar).not.toHaveAttribute('data-indeterminate');
  });

  it('should animate the fill and stop it for reduced motion', () => {
    expect(rulesCss).toContain('@keyframes vane-progress-slide');
    const reduced = rulesCss.match(/@media \(prefers-reduced-motion: reduce\) \{\s*\.vane-progress\[data-indeterminate="true"\][\s\S]*?\n\}/);
    expect(reduced?.[0]).toContain('animation: none');
  });
});

describe('srOnly', () => {
  it('should hide text visually on typography and Label', () => {
    const { container } = renderUi(
      <>
        <Text srOnly>Hidden text</Text>
        <Title srOnly>Hidden title</Title>
        <Label srOnly>Hidden label</Label>
      </>
    );
    for (const el of Array.from(container.children)) {
      expect(el).toHaveClass('vane-sr-only');
      expect(el).not.toHaveAttribute('sronly');
    }
  });

  it('should keep text visible without it', () => {
    const { container } = renderUi(<Text>Shown</Text>);
    expect(container.firstElementChild).not.toHaveClass('vane-sr-only');
  });

  it('should hide with an unlayered rule, so the width utilities cannot undo it', () => {
    const rule = rulesCss.match(/\.vane-sr-only \{[^}]*\}/)?.[0] ?? '';
    expect(rule).toContain('width: 1px');
    expect(rule).toContain('clip-path: inset(50%)');
  });
});

describe('aspect ratio', () => {
  it.each([
    ['aspectSquare', 'aspect-square'], ['aspectVideo', 'aspect-video'], ['aspectAuto', 'aspect-auto'],
  ] as const)('should give an Img %s', (prop, cls) => {
    const { container } = renderUi(<Img src="/a.png" alt="" {...{ [prop]: true }} />);
    const img = container.querySelector('img') as HTMLElement;
    expect(img).toHaveClass(cls);
    expect(img).not.toHaveAttribute(prop.toLowerCase());
  });

  it('should take an aspect on the layout components', () => {
    const { container } = renderUi(
      <>
        <Card aspectVideo>a</Card>
        <Row aspectSquare>b</Row>
        <Col aspectSquare>c</Col>
        <Stack aspectVideo>d</Stack>
      </>
    );
    const [card, row, col, stack] = Array.from(container.children) as HTMLElement[];
    expect(card).toHaveClass('aspect-video');
    expect(row).toHaveClass('aspect-square');
    expect(col).toHaveClass('aspect-square');
    expect(stack).toHaveClass('aspect-video');
  });
});
