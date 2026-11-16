import { useState, type InputHTMLAttributes } from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Col,
  Stack,
  Text,
  Title,
  Section,
  Card,
  Grid3,
  Img,
  NavLink,
  CardHeader,
  CardBody,
  Container,
  Divider,
  Code,
  PageTitle,
  SectionTitle,
  Tooltip,
  Button,
  IconButton,
  Badge,
  Chip,
  Input,
  Checkbox,
  Label,
  Link,
  Menu,
  MenuItem,
  Field,
  useFieldControlProps,
  Radio,
  Switch,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../src';

const TestSvg = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
    <path
      d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.1 1.13-6.58-4.78-4.66 6.6-.96L12 2.5z"
      fill="currentColor"
    />
  </svg>
);

/* Identical composition rendered once per color scheme — Buttons across
   appearances/variants, a nested Card with Badge + Chip, form controls,
   and a Link. Rendered inside the light wrapper and inside the
   data-theme="dark" wrapper for a one-to-one comparison. */
function ThemeShowcase() {
  return (
    <Card className="flex-1">
      <Title>Project settings</Title>
      <Text sm secondary>
        Buttons, badges, forms and links under the active scheme.
      </Text>

      <Row flexWrap>
        <Button>Primary</Button>
        <Button filled>Primary filled</Button>
        <Button danger>Danger</Button>
        <Button danger filled>Danger filled</Button>
        <Button info filled>Info filled</Button>
        <Button success>Success</Button>
      </Row>

      <Card sm>
        <CardHeader>
          <Title sm>Deployment</Title>
          <Badge success filled>Live</Badge>
        </CardHeader>
        <CardBody>
          <Text sm>Build 412 shipped to production 12 minutes ago.</Text>
          <Row flexWrap>
            <Chip sm>v2.4.0</Chip>
            <Chip sm info>europe-west</Chip>
          </Row>
        </CardBody>
      </Card>

      <Label>
        Email
        <Input placeholder="you@example.com" />
      </Label>
      <Label>
        <Checkbox defaultChecked />
        Email me release notes
      </Label>

      <Text sm>
        Need help? Read the <Link href="https://vaneui.com">documentation</Link>.
      </Text>
    </Card>
  );
}

const LOGO_SRC = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/></svg>')}`;

/* A Tooltip and a Menu on one trigger, a dialog opened from a menu item, and a second dialog
   on top of it. */
function ProjectMenu() {
  const [rename, setRename] = useState(false);
  const [discard, setDiscard] = useState(false);
  return (
    <>
      <Menu trigger={<Tooltip content="Project actions"><IconButton aria-label="Project actions"><TestSvg /></IconButton></Tooltip>}>
        <MenuItem onClick={() => setRename(true)}>Rename</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <Divider />
        <MenuItem danger>Delete</MenuItem>
      </Menu>
      <Modal open={rename} onClose={() => setRename(false)} aria-label="Rename project">
        <ModalHeader>
          <Title>Rename project</Title>
        </ModalHeader>
        <ModalBody>
          <Field label="Name" description="Select the text and let go over the backdrop: the dialog stays open.">
            <Input defaultValue="vaneui-web" />
          </Field>
        </ModalBody>
        <ModalFooter>
          <Button type="button" secondary onClick={() => setDiscard(true)}>Discard</Button>
          <Button type="button" filled onClick={() => setRename(false)}>Save</Button>
        </ModalFooter>
      </Modal>
      <Modal sm open={discard} onClose={() => setDiscard(false)} aria-label="Discard changes">
        <ModalBody>
          <Text>Escape closes this dialog first, then the one under it.</Text>
        </ModalBody>
        <ModalFooter>
          <Button type="button" danger filled onClick={() => { setDiscard(false); setRename(false); }}>Discard</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

const TIME_ZONES = Array.from({ length: 27 }, (_, i) => `UTC${i < 12 ? '-' : '+'}${Math.abs(i - 12)}`);

/* Validates on every keystroke, so `invalid` flips while the field has focus. */
function LiveValidation() {
  const [email, setEmail] = useState('');
  const error = email && !email.includes('@') ? 'An address needs an @.' : '';
  return (
    <Field label="Email" error={error} description="Type a few letters, then an @.">
      <Input type="email" value={email} onChange={event => setEmail(event.target.value)} />
    </Field>
  );
}

function ReadOnlyToggles() {
  const [checked, setChecked] = useState(true);
  const toggle = () => setChecked(value => !value);
  return (
    <Col whitespaceNowrap>
      <Label row><Checkbox readOnly checked={checked} onChange={toggle} /> Read-only checkbox</Label>
      <Label row><Switch readOnly checked={checked} onChange={toggle} /> Read-only switch</Label>
    </Col>
  );
}

/* A control the library does not ship: the hook hands it the Field's id and aria attributes. */
function DateInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" {...useFieldControlProps(props)} />;
}

/* Parts rendered by a component: the Card cannot see them among its own children. */
function PlanParts() {
  return (
    <>
      <CardHeader>
        <Title sm>Team plan</Title>
        <Badge success>Active</Badge>
      </CardHeader>
      <CardBody>
        <Text sm>Header and body come from a component of your own.</Text>
      </CardBody>
    </>
  );
}

function ChecksTable(props: { success?: boolean; filled?: boolean }) {
  return (
    <Table sm {...props}>
      <Thead>
        <Tr><Th>Check</Th><Th>Result</Th></Tr>
      </Thead>
      <Tbody>
        <Tr><Td>Build</Td><Td>Passed</Td></Tr>
        <Tr><Td>Tests</Td><Td>Passed</Td></Tr>
      </Tbody>
    </Table>
  );
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>VaneUI Playground</PageTitle>
          <Text secondary>
            Divided grids, strong borders, NavLink indicators, shadow sizes, light islands inside{' '}
            <Code sm>data-theme="dark"</Code>, the label-sized <Code sm>Tooltip</Code>, and the fixes
            from the project review.
          </Text>

          {/* ═══ 1. GRIDS, BORDERS, INDICATORS ═══════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Grids, borders and indicators</SectionTitle>

          <Card>
            <Title>Divided grid</Title>
            <Text sm secondary>
              <Code sm>divided</Code> swaps the gap for 1px lines in the divider color, between and
              around the cells. Give the cells their own padding.
            </Text>
            <Grid3 divided>
              {['Boolean props', 'Theme overrides', 'Dark mode', 'Tailwind CSS v4', 'Accessible', 'Server components'].map(t => (
                <Stack key={t} sm>
                  <Title sm>{t}</Title>
                  <Text sm secondary>One cell of a divided grid.</Text>
                </Stack>
              ))}
            </Grid3>
          </Card>

          <Card>
            <Title>Strong border</Title>
            <Text sm secondary>
              <Code sm>strongBorder</Code> paints the border in the appearance's strong color, for a
              selected card or a highlighted plan.
            </Text>
            <Row itemsStretch tabletStack>
              <Card sm flex1><Title sm>Starter</Title><Text sm secondary>Soft border</Text></Card>
              <Card sm flex1 strongBorder><Title sm>Team</Title><Text sm secondary>strongBorder</Text></Card>
              <Card sm flex1 accent strongBorder><Title sm>Business</Title><Text sm secondary>accent strongBorder</Text></Card>
            </Row>
          </Card>

          <Card>
            <Title>NavLink indicators</Title>
            <Text sm secondary>
              <Code sm>indicatorStart</Code> draws a rail that turns into an accent mark on the active
              or selected link. <Code sm>indicatorBottom</Code> marks the active tab. Neither moves the text.
            </Text>
            <Row itemsStart tabletStack>
              <Col noGap className="w-48">
                <NavLink href="#install" indicatorStart ghost sharp secondary>Installation</NavLink>
                <NavLink href="#concepts" indicatorStart ghost sharp active>Core concepts</NavLink>
                <NavLink href="#theming" indicatorStart ghost sharp secondary>Theming</NavLink>
              </Col>
              <Col noGap role="listbox" aria-label="Search results" className="w-48">
                <NavLink role="option" aria-selected="true" indicatorStart ghost sharp>Button</NavLink>
                <NavLink role="option" aria-selected="false" indicatorStart ghost sharp secondary>Badge</NavLink>
              </Col>
              <Row noGap borderB>
                <NavLink href="#docs" indicatorBottom ghost sharp active fontNormal wFit>Docs</NavLink>
                <NavLink href="#playground" indicatorBottom ghost sharp secondary fontNormal wFit>Playground</NavLink>
                <NavLink href="#changelog" indicatorBottom ghost sharp secondary fontNormal wFit>Changelog</NavLink>
              </Row>
            </Row>
          </Card>

          <Card>
            <Title>Shadow sizes</Title>
            <Text sm secondary>
              <Code sm>shadow</Code> follows the component size. <Code sm>shadowXs</Code> to{' '}
              <Code sm>shadowXl</Code> pick a size on the same ramp, whatever the component size.
            </Text>
            <Row flexWrap>
              {(['shadowXs', 'shadowSm', 'shadowMd', 'shadowLg', 'shadowXl'] as const).map(s => (
                <Card key={s} sm {...{ [s]: true }}><Text sm>{s}</Text></Card>
              ))}
            </Row>
          </Card>

          <Card>
            <Title>Pointer events, whitespace and Img noShrink</Title>
            <Text sm secondary>
              Layout components take <Code sm>pointerEventsNone</Code> and{' '}
              <Code sm>whitespaceNowrap</Code>, and <Code sm>Img noShrink</Code> keeps a logo its size in a tight row.
            </Text>
            <Row whitespaceNowrap overflowHidden className="max-w-80">
              <Img noShrink src={LOGO_SRC} alt="" width={24} height={24} />
              <Text sm>A long label that stays on one line and clips at the edge of its row</Text>
            </Row>
          </Card>

          {/* ═══ 2. DARK MODE ════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Dark Mode</SectionTitle>

          <Card>
            <Title>Light vs data-theme="dark"</Title>
            <Text sm secondary>
              The same composition rendered side by side. The right column is
              wrapped in <Code sm>{'<div data-theme="dark">'}</Code> — the dark
              block in <Code sm>tokens.css</Code> re-declares the color tokens
              and every component re-resolves against them. The dark column's
              root surface is a primary-bg <Code sm>Card</Code>, which paints
              the dark page surface.
            </Text>
            <Row itemsStretch tabletStack>
              <div className="flex flex-1">
                <ThemeShowcase />
              </div>
              <div data-theme="dark" className="flex flex-1">
                <ThemeShowcase />
              </div>
            </Row>
          </Card>

          <Card>
            <Title>Inherit-mode text inside a dark subtree</Title>
            <Text sm secondary>
              A bare <Code sm>Text</Code> (default <Code sm>inherit</Code>{' '}
              appearance) inside <Code sm>{'<div data-theme="dark">'}</Code> with
              no appearance-bearing wrapper must re-resolve to the dark scheme's
              light-on-dark text — not keep the root-resolved light color.
            </Text>
            <div data-theme="dark">
              <Card>
                <Text>
                  This paragraph re-resolves <Code sm>--text-color</Code> against
                  the dark tokens at the theme boundary.
                </Text>
              </Card>
            </div>
          </Card>

          <Card>
            <Title>Light island inside dark</Title>
            <Text sm secondary>
              <Code sm>{'<div data-theme="light">'}</Code> inside a dark wrapper is light again: the light
              block re-declares every token the dark block sets.
            </Text>
            <div data-theme="dark">
              <Card>
                <Text>Dark surface</Text>
                <div data-theme="light">
                  <Card sm>
                    <Text>Light card inside the dark surface</Text>
                    <Row><Button>Primary</Button><Button filled>Filled</Button></Row>
                  </Card>
                </div>
              </Card>
            </div>
          </Card>

          {/* ═══ 3. TOOLTIP ══════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Tooltip</SectionTitle>

          <Card>
            <Title>Basic usage</Title>
            <Text sm secondary>
              An ink label on hover and keyboard focus, near-white in dark mode. It describes its
              trigger with <Code sm>aria-describedby</Code> and adds no tab stop.
            </Text>
            <Row flexWrap>
              <Tooltip content="Saves without leaving the page">
                <Button>Hover me</Button>
              </Tooltip>
              <Tooltip content="Focus me with the keyboard too">
                <Button secondary>Tab to me</Button>
              </Tooltip>
            </Row>
          </Card>

          <Card>
            <Title>Sizes</Title>
            <Text sm secondary>
              Size goes straight on <Code sm>Tooltip</Code>. Its text sits one step under a Button
              of the same size, and its padding and radius follow the Button ramp, so the two line up.
            </Text>
            <Row flexWrap>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Tooltip key={size} {...{ [size]: true }} content={`Tooltip ${size}`}>
                  <Button {...{ [size]: true }}>Button {size}</Button>
                </Tooltip>
              ))}
            </Row>
          </Card>

          <Card>
            <Title>Placement, arrow and colour</Title>
            <Text sm secondary>
              Placement, <Code sm>arrow</Code> and appearance are direct props too.{' '}
              <Code sm>popupProps</Code> still works.
            </Text>
            <Row flexWrap>
              <Tooltip placeBottom content="Opens below its trigger">
                <Button secondary>placeBottom</Button>
              </Tooltip>
              <Tooltip placeRight arrow content="Points at its trigger">
                <Button secondary>placeRight arrow</Button>
              </Tooltip>
              <Tooltip danger content="Deletes the project for everyone">
                <Button danger>Delete project</Button>
              </Tooltip>
              <Tooltip secondary content="The gray tooltip from earlier releases">
                <Button secondary>secondary</Button>
              </Tooltip>
            </Row>
          </Card>

          <Card>
            <Title>Long hints and screen edges</Title>
            <Text sm secondary>
              A long hint wraps inside a width cap that grows with size. On a narrow window the
              tooltips at either end line up with their trigger instead of being cut off.
            </Text>
            <Row justifyBetween>
              <Tooltip content="Add to favourites">
                <IconButton aria-label="Add to favourites"><TestSvg /></IconButton>
              </Tooltip>
              <Tooltip content="Archiving moves the conversation out of your inbox. Replies bring it back, and nothing is deleted.">
                <Button secondary>Archive</Button>
              </Tooltip>
              <Tooltip content="Archive this conversation">
                <IconButton aria-label="Archive this conversation"><TestSvg /></IconButton>
              </Tooltip>
            </Row>
          </Card>

          {/* ═══ 4. REVIEW FIXES ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Fixes from the project review</SectionTitle>

          <Card>
            <Title>Menus and dialogs</Title>
            <Text sm secondary>
              The first trigger has a <Code sm>Tooltip</Code> and a <Code sm>Menu</Code>: the menu
              stays on its button after the tooltip closes. Rename opens a dialog that returns focus
              to the trigger, and what you type stays while it fades out. The second menu has more
              items than fit, so it scrolls.
            </Text>
            <Row>
              <ProjectMenu />
              <Menu trigger={<Button secondary>Time zone</Button>}>
                {TIME_ZONES.map(zone => <MenuItem key={zone}>{zone}</MenuItem>)}
              </Menu>
            </Row>
          </Card>

          <Card>
            <Title>Form state</Title>
            <Text sm secondary>
              An <Code sm>Input</Code> keeps focus while <Code sm>invalid</Code> flips, read-only
              toggles do not call <Code sm>onChange</Code>, and a plain input takes the Field's
              wiring from <Code sm>useFieldControlProps</Code>.
            </Text>
            <Row tabletStack itemsStart>
              <LiveValidation />
              <ReadOnlyToggles />
              <Field label="Start date" description="A plain date input.">
                <DateInput />
              </Field>
            </Row>
          </Card>

          <Card>
            <Title>Checked state in every variant</Title>
            <Text sm secondary>
              The mark and the box stay visible in <Code sm>outline</Code> and <Code sm>ghost</Code>.
              A disabled <Code sm>Chip</Code> link cannot be followed.
            </Text>
            <Row flexWrap>
              <Label row><Checkbox defaultChecked /> filled</Label>
              <Label row><Checkbox outline defaultChecked /> outline</Label>
              <Label row><Checkbox ghost defaultChecked /> ghost</Label>
              <Label row><Radio outline name="variant-outline" defaultChecked /> outline</Label>
              <Label row><Radio ghost name="variant-ghost" defaultChecked /> ghost</Label>
              <Chip href="https://vaneui.com" disabled>Disabled link</Chip>
            </Row>
          </Card>

          <Card>
            <Title>Card parts, Table colors and className</Title>
            <Text sm secondary>
              A <Code sm>Card</Code> drops its own padding when its parts come from another
              component. An appearance or <Code sm>filled</Code> on a <Code sm>Table</Code> reaches
              its cells. <Code sm>className="py-8"</Code> on the last card holds on a phone too.
            </Text>
            <Row tabletStack itemsStart>
              <Card sm><PlanParts /></Card>
              <Card sm className="py-8"><Text sm>py-8 at every width</Text></Card>
            </Row>
            <Row tabletStack itemsStart>
              <ChecksTable success />
              <ChecksTable filled />
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
