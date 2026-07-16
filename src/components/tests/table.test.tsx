import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Caption,
  ThemeProvider,
  defaultTheme,
} from '../../index';

const BORDER_B_CLASS = 'border-b-[length:var(--bw)]';

// Cells must live inside table markup for valid DOM nesting.
function renderInRow(ui: React.ReactNode) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <table>
        <tbody>
          <tr>{ui}</tr>
        </tbody>
      </table>
    </ThemeProvider>
  );
}

const TableBody = () => <tbody><tr><td>cell</td></tr></tbody>;

function renderTable(props: Record<string, unknown> = {}, ref?: React.Ref<HTMLTableElement>) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      {React.createElement(Table, { ...props, ref }, <TableBody />)}
    </ThemeProvider>
  );
}

describe('Table Component Tests', () => {
  describe('Table', () => {
    it('renders as a <table> with base classes', () => {
      const { container } = renderTable();
      const table = container.querySelector('table.vane-table');
      expect(table).toBeInTheDocument();
      expect(table?.tagName.toLowerCase()).toBe('table');
      expect(table).toHaveClass('border-collapse', 'w-full');
    });

    it('has data-vane-type="layout"', () => {
      const { container } = renderTable();
      expect(container.querySelector('.vane-table')).toHaveAttribute('data-vane-type', 'layout');
    });

    it('emits data-size for every size', () => {
      (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach(size => {
        const { container } = renderTable({ [size]: true });
        expect(container.querySelector('.vane-table')).toHaveAttribute('data-size', size);
      });
    });

    it('emits secondary/outline data attributes by default', () => {
      const { container } = renderTable();
      const table = container.querySelector('.vane-table');
      expect(table).toHaveAttribute('data-appearance', 'secondary');
      expect(table).toHaveAttribute('data-variant', 'outline');
    });

    it('has no outer border by default (noBorder)', () => {
      const { container } = renderTable();
      const table = container.querySelector('.vane-table') as HTMLElement;
      expect(table.className).not.toMatch(/\bborder\b(?!-)/);
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLTableElement>();
      renderTable({}, ref);
      expect(ref.current).toBeInstanceOf(HTMLTableElement);
      expect(ref.current).toHaveClass('vane-table');
    });

    it('merges custom className', () => {
      const { container } = renderTable({ className: 'custom-table' });
      const table = container.querySelector('.vane-table');
      expect(table).toHaveClass('border-collapse', 'custom-table');
    });

    it('does not leak boolean props to the DOM', () => {
      const { container } = renderTable({ secondary: true, outline: true, rounded: true, wFull: true });
      const table = container.querySelector('.vane-table');
      expect(table).not.toHaveAttribute('secondary');
      expect(table).not.toHaveAttribute('outline');
      expect(table).not.toHaveAttribute('rounded');
      expect(table).not.toHaveAttribute('wFull');
    });
  });

  describe('Thead / Tbody / Tfoot', () => {
    const cases = [
      ['Thead', Thead, 'thead', 'vane-table-head'],
      ['Tbody', Tbody, 'tbody', 'vane-table-body'],
      ['Tfoot', Tfoot, 'tfoot', 'vane-table-foot'],
    ] as const;

    cases.forEach(([name, Comp, tag, cls]) => {
      it(`${name} renders <${tag}> with ${cls} and data-vane-type="layout"`, () => {
        const { container } = render(
          <ThemeProvider theme={defaultTheme}>
            <table>{React.createElement(Comp, {}, <tr><td>c</td></tr>)}</table>
          </ThemeProvider>
        );
        const el = container.querySelector(`${tag}.${cls}`);
        expect(el).toBeInTheDocument();
        expect(el?.tagName.toLowerCase()).toBe(tag);
        expect(el).toHaveAttribute('data-vane-type', 'layout');
      });

      it(`${name} forwards ref`, () => {
        const ref = React.createRef<HTMLTableSectionElement>();
        render(
          <ThemeProvider theme={defaultTheme}>
            <table>{React.createElement(Comp, { ref }, <tr><td>c</td></tr>)}</table>
          </ThemeProvider>
        );
        expect(ref.current).toBeInstanceOf(HTMLTableSectionElement);
        expect(ref.current).toHaveClass(cls);
      });
    });
  });

  describe('Tr', () => {
    it('renders <tr> with vane-table-row and data-vane-type="layout"', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <table><tbody><Tr><td>c</td></Tr></tbody></table>
        </ThemeProvider>
      );
      const tr = container.querySelector('tr.vane-table-row');
      expect(tr).toBeInTheDocument();
      expect(tr).toHaveAttribute('data-vane-type', 'layout');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLTableRowElement>();
      render(
        <ThemeProvider theme={defaultTheme}>
          <table><tbody><Tr ref={ref}><td>c</td></Tr></tbody></table>
        </ThemeProvider>
      );
      expect(ref.current).toBeInstanceOf(HTMLTableRowElement);
      expect(ref.current).toHaveClass('vane-table-row');
    });
  });

  describe('Th', () => {
    it('renders as <th> with header/cell base classes', () => {
      const { container } = renderInRow(<Th>Header</Th>);
      const th = container.querySelector('th.vane-table-cell');
      expect(th).toBeInTheDocument();
      expect(th?.tagName.toLowerCase()).toBe('th');
      expect(th).toHaveClass('vane-table-head-cell', 'align-top');
    });

    it('is semibold with a bottom row-rule border and muted text color', () => {
      const { container } = renderInRow(<Th>Header</Th>);
      const th = container.querySelector('th');
      expect(th).toHaveClass('font-semibold');
      expect(th).toHaveClass(BORDER_B_CLASS);
      expect(th).toHaveClass('border-(--border-color)');
      expect(th).toHaveClass('text-(--text-color)'); // secondary muted header text
      expect(th).toHaveClass('text-left');
      expect(th).toHaveClass('px-(--px)', 'py-(--py)');
    });

    it('has data-vane-type="layout" and secondary appearance', () => {
      const { container } = renderInRow(<Th>H</Th>);
      const th = container.querySelector('th');
      expect(th).toHaveAttribute('data-vane-type', 'layout');
      expect(th).toHaveAttribute('data-appearance', 'secondary');
    });

    it('forwards colSpan / rowSpan / scope to the DOM', () => {
      const { container } = renderInRow(<Th colSpan={2} rowSpan={3} scope="col">H</Th>);
      const th = container.querySelector('th');
      expect(th).toHaveAttribute('colspan', '2');
      expect(th).toHaveAttribute('rowspan', '3');
      expect(th).toHaveAttribute('scope', 'col');
    });

    it('scales cell padding per size (xs vs xl both emit px/py)', () => {
      (['xs', 'xl'] as const).forEach(size => {
        const { container } = renderInRow(React.createElement(Th, { [size]: true }, 'H'));
        const th = container.querySelector('th');
        expect(th).toHaveClass('px-(--px)', 'py-(--py)');
        expect(th).toHaveAttribute('data-size', size);
      });
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      renderInRow(<Th ref={ref}>H</Th>);
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current).toHaveClass('vane-table-head-cell');
    });

    it('does not leak boolean props to the DOM', () => {
      const { container } = renderInRow(<Th secondary outline borderB padding semibold textLeft>H</Th>);
      const th = container.querySelector('th');
      expect(th).not.toHaveAttribute('secondary');
      expect(th).not.toHaveAttribute('borderB');
      expect(th).not.toHaveAttribute('semibold');
      expect(th).not.toHaveAttribute('textLeft');
      expect(th).not.toHaveAttribute('padding');
    });

    it('merges custom className', () => {
      const { container } = renderInRow(<Th className="custom-th">H</Th>);
      const th = container.querySelector('th');
      expect(th).toHaveClass('vane-table-cell', 'custom-th');
    });
  });

  describe('Td', () => {
    it('renders as <td> with cell base classes (no head-cell class)', () => {
      const { container } = renderInRow(<Td>Body</Td>);
      const td = container.querySelector('td.vane-table-cell');
      expect(td).toBeInTheDocument();
      expect(td?.tagName.toLowerCase()).toBe('td');
      expect(td).toHaveClass('align-top');
      expect(td).not.toHaveClass('vane-table-head-cell');
    });

    it('has a bottom row-rule border but no tinted body text', () => {
      const { container } = renderInRow(<Td>Body</Td>);
      const td = container.querySelector('td');
      expect(td).toHaveClass(BORDER_B_CLASS);
      expect(td).toHaveClass('border-(--border-color)');
      expect(td).toHaveClass('text-left');
      expect(td).toHaveClass('px-(--px)', 'py-(--py)');
      // Td omits the text-color mapper so body text stays uncolored
      expect(td).not.toHaveClass('text-(--text-color)');
      expect(td).not.toHaveClass('font-semibold');
    });

    it('forwards colSpan / rowSpan to the DOM', () => {
      const { container } = renderInRow(<Td colSpan={2} rowSpan={2}>B</Td>);
      const td = container.querySelector('td');
      expect(td).toHaveAttribute('colspan', '2');
      expect(td).toHaveAttribute('rowspan', '2');
    });

    it('has data-vane-type="layout"', () => {
      const { container } = renderInRow(<Td>B</Td>);
      expect(container.querySelector('td')).toHaveAttribute('data-vane-type', 'layout');
    });

    it('forwards ref', () => {
      const ref = React.createRef<HTMLTableCellElement>();
      renderInRow(<Td ref={ref}>B</Td>);
      expect(ref.current).toBeInstanceOf(HTMLTableCellElement);
      expect(ref.current).toHaveClass('vane-table-cell');
    });
  });

  describe('Caption', () => {
    it('renders as <caption> with muted text', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <table><Caption>My table</Caption><tbody><tr><td>c</td></tr></tbody></table>
        </ThemeProvider>
      );
      const caption = container.querySelector('caption.vane-table-caption');
      expect(caption).toBeInTheDocument();
      expect(caption?.tagName.toLowerCase()).toBe('caption');
      expect(caption).toHaveClass('text-(--text-color)', 'text-left');
      expect(caption).toHaveAttribute('data-vane-type', 'layout');
    });
  });

  describe('Composed table', () => {
    it('renders a full Thead/Tbody/Tr/Th/Td structure', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Ada</Td>
                <Td>Engineer</Td>
              </Tr>
            </Tbody>
          </Table>
        </ThemeProvider>
      );
      expect(container.querySelector('table.vane-table')).toBeInTheDocument();
      expect(container.querySelectorAll('th.vane-table-cell')).toHaveLength(2);
      expect(container.querySelectorAll('td.vane-table-cell')).toHaveLength(2);
      expect(container.querySelectorAll('tr.vane-table-row')).toHaveLength(2);
    });
  });
});
