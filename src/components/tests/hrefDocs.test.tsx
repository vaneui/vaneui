import '@testing-library/jest-dom';
import * as fs from 'fs';
import * as path from 'path';
import React from 'react';
import { render } from '@testing-library/react';

import * as Vane from '../../index';

/**
 * CLAUDE.md names the components whose `href` renders an `<a>`. It used to say every component
 * does, while Section, Container, Grid*, Alert, Divider, Icon, Kbd, Mark, Table, List and others
 * render their own element with an `href` attribute, which is not a link.
 */
const claudeMd = fs.readFileSync(path.resolve(__dirname, '../../../CLAUDE.md'), 'utf-8');
const sentence = claudeMd.match(/`href` renders an `<a>` on these components only: ([^.]+?), and `Link` is always an `<a>`\./)?.[1];
const documented = [...(sentence ?? '').matchAll(/`(\w+)`/g)].map(m => m[1]);

/** The exports that render on their own, without a parent, an open state or an anchor. */
const STANDALONE = [
  'Button', 'IconButton', 'Icon', 'Badge', 'Divider', 'Chip', 'Code', 'Kbd', 'Mark', 'Checkbox', 'Label',
  'Field', 'Alert', 'Spinner', 'Img', 'Input', 'Textarea', 'Select', 'Switch', 'Radio', 'RadioGroup',
  'NavLink', 'MenuItem', 'MenuLabel', 'Section', 'Container', 'Col', 'Row', 'Stack',
  'Grid2', 'Grid3', 'Grid4', 'Grid5', 'Grid6', 'Card', 'CardHeader', 'CardBody', 'CardFooter', 'Table',
  'Text', 'Title', 'Link', 'List', 'ListItem', 'SectionTitle', 'PageTitle', 'Blockquote',
] as const;

const TABLE_PARTS: Record<string, (el: React.ReactNode) => React.ReactNode> = {
  Thead: el => <Vane.Table>{el}</Vane.Table>,
  Tbody: el => <Vane.Table>{el}</Vane.Table>,
  Tfoot: el => <Vane.Table>{el}</Vane.Table>,
  Tr: el => <Vane.Table><Vane.Tbody>{el}</Vane.Tbody></Vane.Table>,
  Td: el => <Vane.Table><Vane.Tbody><Vane.Tr>{el}</Vane.Tr></Vane.Tbody></Vane.Table>,
  Th: el => <Vane.Table><Vane.Tbody><Vane.Tr>{el}</Vane.Tr></Vane.Tbody></Vane.Table>,
};

function rendersLink(name: string): boolean {
  const component = (Vane as unknown as Record<string, React.ElementType>)[name];
  const element = React.createElement(component, { href: '/x', 'aria-label': name }, 'x');
  const wrap = TABLE_PARTS[name] ?? ((el: React.ReactNode) => el);
  const { container, unmount } = render(<>{wrap(element)}</>);
  const linked = container.querySelector('a[href="/x"]') !== null;
  unmount();
  return linked;
}

describe('the components CLAUDE.md says turn into a link with href', () => {
  let warn: jest.SpyInstance;
  let error: jest.SpyInstance;
  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    error = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    warn.mockRestore();
    error.mockRestore();
  });

  it('are listed', () => {
    expect(documented.length).toBeGreaterThan(10);
  });

  it('are exactly the ones that render an <a>, with Link', () => {
    const names = [...STANDALONE, ...Object.keys(TABLE_PARTS)];
    const linked = names.filter(rendersLink);
    expect(linked.sort()).toEqual([...documented, 'Link'].sort());
  });
});
