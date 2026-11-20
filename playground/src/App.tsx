import { useState, type InputHTMLAttributes } from 'react';
import {
  ThemeProvider,
  Alert,
  defaultTheme,
  Row,
  Col,
  Text,
  Title,
  Section,
  Card,
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
  Icon,
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
    <Table {...props}>
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
            Default sizes that line up, the Icon scale, Card and Modal parts, light islands inside{' '}
            <Code sm>data-theme="dark"</Code>, Alert sizes, and the fixes from the project review.
          </Text>

          {/* ═══ 1. DEFAULT SIZES ═══════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Default sizes and parts</SectionTitle>

          <Card>
            <Title>No size props</Title>
            <Text sm secondary>
              A field and a button with no props line up: both are <Code sm>sm</Code>. A
              <Code sm>Badge</Code> and a <Code sm>Table</Code> use the 12px and 14px steps.
            </Text>
            <Row flexWrap>
              <Input placeholder="you@example.com" wFit />
              <Button filled>Subscribe</Button>
              <Badge success>Paid</Badge>
              <Badge warning>Pending</Badge>
            </Row>
            <Field label="Project name" description="Shown in the sidebar.">
              <Input defaultValue="Website" />
            </Field>
            <ChecksTable />
          </Card>

          <Card>
            <Title>Icon scale</Title>
            <Text sm secondary>12, 16, 20, 24 and 32px. The default sits next to body text.</Text>
            <Row itemsEnd>
              <Icon xs><TestSvg /></Icon>
              <Icon sm><TestSvg /></Icon>
              <Icon><TestSvg /></Icon>
              <Icon lg><TestSvg /></Icon>
              <Icon xl><TestSvg /></Icon>
              <Row sm><Icon><TestSvg /></Icon><Text>Starred projects</Text></Row>
            </Row>
          </Card>

          <Card>
            <Title>Header, body and footer</Title>
            <Text sm secondary>
              The parts meet one inset apart. A header with <Code sm>borderB</Code> keeps the room
              for its line.
            </Text>
            <Row tabletStack itemsStart>
              <Card><PlanParts /></Card>
              <Card>
                <CardHeader borderB><Title sm>With a divider</Title></CardHeader>
                <CardBody><Text>The line sits between two insets.</Text></CardBody>
              </Card>
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

          {/* ═══ 3. ALERT ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Alert</SectionTitle>

          <Card>
            <Title>Sizes</Title>
            <Text sm secondary>
              Text, radius, gap, padding and a leading icon all follow the size. The text runs one
              step below body text (14px at <Code sm>md</Code>), the radius matches an Input of the
              same size, and the icon is 10/7 of the text, whatever width its library renders.
            </Text>
            <Col>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Alert key={size} polite {...{ [size]: true }}>
                  <TestSvg />
                  Alert {size}: a new version is available. Reload to update.
                </Alert>
              ))}
            </Col>
          </Card>

          <Card>
            <Title>Message and actions</Title>
            <Text sm secondary>
              A Text, Col, Stack or Row in an Alert takes the free width, so a trailing Button sits
              at the end edge. <Code sm>itemsCenter</Code> centres it on a two-line message. For a
              long message, put the buttons under the text instead.
            </Text>
            <Col>
              <Alert warning polite itemsCenter>
                <Col noGap>
                  <Text fontSemibold>Your trial ends in three days</Text>
                  <Text sm>Add a payment method to keep your projects running.</Text>
                </Col>
                <Button warning filled>Add card</Button>
              </Alert>
              <Alert success polite itemsCenter>
                <TestSvg />
                <Text sm>Your changes were saved.</Text>
                <Button success ghost>Undo</Button>
              </Alert>
              <Alert danger polite>
                <TestSvg />
                <Col>
                  <Col noGap>
                    <Text fontSemibold>Payment failed</Text>
                    <Text sm>
                      The card ending in 4242 was declined. Update the card or try another payment
                      method. Your projects keep running for seven days.
                    </Text>
                  </Col>
                  <Row>
                    <Button danger filled>Update card</Button>
                    <Button danger ghost>Contact support</Button>
                  </Row>
                </Col>
              </Alert>
            </Col>
          </Card>

          <Card>
            <Title>Appearances and variants</Title>
            <Col>
              <Alert polite>A new version is available.</Alert>
              <Alert success polite>Your changes were saved.</Alert>
              <Alert warning polite>Your trial ends in three days.</Alert>
              <Alert danger filled polite>Payment failed. Update your card to continue.</Alert>
            </Col>
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
              its cells, and a filled Table keeps its row lines. <Code sm>className="py-8"</Code> on
              the last card holds on a phone too. Text on the danger, accent and tertiary fills
              reads at 4.5:1.
            </Text>
            <Row tabletStack itemsStart>
              <Card sm><PlanParts /></Card>
              <Card sm className="py-8"><Text sm>py-8 at every width</Text></Card>
            </Row>
            <Row tabletStack itemsStart>
              <ChecksTable success />
              <ChecksTable filled />
              <ChecksTable filled success />
            </Row>
            <Row>
              <Badge danger filled>Overdue</Badge>
              <Badge accent filled>New</Badge>
              <Badge tertiary filled>Draft</Badge>
              <Button danger filled>Delete</Button>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
