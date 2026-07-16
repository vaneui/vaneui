/**
 * @jest-environment node
 *
 * SSR smoke test: every exported component must render via renderToString
 * with no DOM available (no window/document). This catches module-scope DOM
 * access, render-time browser API reads, and portal-guard regressions for
 * the whole public API — the rest of the suite runs in jsdom where SSR
 * breakage is structurally invisible.
 */
import { renderToString } from 'react-dom/server';
import * as VaneUI from '../../index';
import {
  ThemeProvider,
  Button, IconButton, Icon, Badge, Divider, Chip, Code, Kbd, Mark,
  Checkbox, Label, Img, Input, Overlay,
  Modal, ModalHeader, ModalBody, ModalFooter, ModalCloseButton,
  Popup, PopupTrigger, Menu, MenuItem, MenuLabel, NavLink,
  Section, Container, Col, Row, Stack, Grid2, Grid3, Grid4, Grid5, Grid6,
  Card, CardHeader, CardBody, CardFooter,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, Caption,
  Text, Title, Link, List, ListItem, SectionTitle, PageTitle, Blockquote,
} from '../../index';

const renderSSR = (node: React.ReactNode): string =>
  renderToString(<ThemeProvider>{node}</ThemeProvider>);

describe('SSR rendering', () => {
  it('should render every non-portaled component to a string on the server', () => {
    const html = renderSSR(
      <Container>
        <Section>
          <PageTitle>Page</PageTitle>
          <SectionTitle>Section</SectionTitle>
          <Title>Title</Title>
          <Text>Text</Text>
          <Blockquote>Quote</Blockquote>
          <Link href="/x">Link</Link>
          <List>
            <ListItem>Item</ListItem>
          </List>
          <Row>
            <Button>Button</Button>
            <IconButton aria-label="icon"><svg /></IconButton>
            <Icon><svg /></Icon>
            <Badge>Badge</Badge>
            <Chip>Chip</Chip>
            <Code>code</Code>
            <Kbd>K</Kbd>
            <Mark>mark</Mark>
            <NavLink href="/nav">Nav</NavLink>
          </Row>
          <Col>
            <Label>
              Email
              <Input placeholder="email" />
            </Label>
            <Label>
              <Checkbox />
              Agree
            </Label>
          </Col>
          <Stack>
            <Card>
              <CardHeader>Header</CardHeader>
              <CardBody>Body</CardBody>
              <CardFooter>Footer</CardFooter>
            </Card>
          </Stack>
          <Grid2><div /><div /></Grid2>
          <Grid3><div /><div /><div /></Grid3>
          <Grid4><div /></Grid4>
          <Grid5><div /></Grid5>
          <Grid6><div /></Grid6>
          <Table>
            <Caption>Cap</Caption>
            <Thead><Tr><Th>H</Th></Tr></Thead>
            <Tbody><Tr><Td>D</Td></Tr></Tbody>
            <Tfoot><Tr><Td>F</Td></Tr></Tfoot>
          </Table>
          <Divider />
          <Img src="/x.png" alt="img" />
        </Section>
      </Container>
    );

    expect(html.length).toBeGreaterThan(0);
    expect(html).toContain('Button');
    expect(html).toContain('Page');
  });

  it('should render SSR-open portaled components as null on the server without throwing', () => {
    // portal target (document.body) cannot exist server-side; rendering
    // inline would guarantee a hydration mismatch — these must emit nothing
    const modalHtml = renderSSR(
      <Modal open title="Dialog">Body</Modal>
    );
    expect(modalHtml).not.toContain('role="dialog"');

    const overlayHtml = renderSSR(<Overlay open />);
    expect(overlayHtml).toBe('');

    expect(() =>
      renderSSR(
        <Popup open anchorRef={{ current: null }}>popup</Popup>
      )
    ).not.toThrow();
  });

  it('should SSR-render an open modal inline when portal is disabled', () => {
    const html = renderSSR(
      <Modal open portal={false} title="Server dialog">
        Body content
      </Modal>
    );

    expect(html).toContain('role="dialog"');
    expect(html).toContain('Server dialog');
  });

  it('should SSR-render modal compound mode and menu/popup trigger wiring', () => {
    const html = renderSSR(
      <>
        <Modal open portal={false}>
          <ModalHeader>
            <Title>T</Title>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>B</ModalBody>
          <ModalFooter>F</ModalFooter>
        </Modal>
        <Menu trigger={<Button>Actions</Button>}>
          <MenuItem>Edit</MenuItem>
          <MenuLabel>Group</MenuLabel>
        </Menu>
        <PopupTrigger popup={<div>P</div>}>
          <Button>Open</Button>
        </PopupTrigger>
      </>
    );

    expect(html).toContain('Actions');
    expect(html).toContain('Open');
  });

  it('should cover every component export of the package in this smoke test', () => {
    const covered = new Set([
      'ThemeProvider', 'Button', 'IconButton', 'Icon', 'Badge', 'Divider', 'Chip', 'Code', 'Kbd',
      'Mark', 'Checkbox', 'Label', 'Img', 'Input', 'Overlay', 'Modal', 'ModalHeader', 'ModalBody',
      'ModalFooter', 'ModalCloseButton', 'Popup', 'PopupTrigger', 'Menu', 'MenuItem', 'MenuLabel',
      'NavLink', 'Section', 'Container', 'Col', 'Row', 'Stack', 'Grid2', 'Grid3', 'Grid4', 'Grid5',
      'Grid6', 'Card', 'CardHeader', 'CardBody', 'CardFooter', 'Text', 'Title', 'Link', 'List',
      'ListItem', 'SectionTitle', 'PageTitle', 'Blockquote',
      'Table', 'Thead', 'Tbody', 'Tfoot', 'Tr', 'Th', 'Td', 'Caption',
    ]);

    const componentExports = Object.entries(VaneUI)
      .filter(([name, value]) => {
        if (!/^[A-Z]/.test(name)) return false; // hooks/values like useTheme, defaultTheme, themeDefaults
        if (name === 'COMPONENT' || name === 'ComponentKeys' || name === 'ComponentCategories') return false;
        const v = value as { $$typeof?: symbol };
        return typeof value === 'function' || (typeof value === 'object' && v !== null && !!v.$$typeof);
      })
      .map(([name]) => name);

    const missing = componentExports.filter(name => !covered.has(name));
    expect(missing).toEqual([]);
  });
});
