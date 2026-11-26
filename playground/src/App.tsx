import { useState } from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Code,
  Col,
  Container,
  Divider,
  Field,
  Grid2,
  Img,
  Input,
  Kbd,
  Label,
  Link,
  NavLink,
  PageTitle,
  Row,
  Section,
  SectionTitle,
  SegmentedControl,
  SegmentedControlItem,
  Select,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Title,
  Tr,
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

function ChecksTable(props: { success?: boolean; filled?: boolean; striped?: boolean; hoverable?: boolean }) {
  return (
    <Table {...props}>
      <Thead>
        <Tr><Th>Check</Th><Th>Result</Th></Tr>
      </Thead>
      <Tbody>
        <Tr><Td>Build</Td><Td>Passed</Td></Tr>
        <Tr><Td>Tests</Td><Td>Passed</Td></Tr>
        <Tr><Td>Lint</Td><Td>Passed</Td></Tr>
        <Tr><Td>E2E</Td><Td>Running</Td></Tr>
      </Tbody>
    </Table>
  );
}

const SearchSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

/* A local stand-in for a photo, so the playground needs no network */
const PHOTO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 90"><defs><linearGradient id="g" x2="1" y2="1">'
  + '<stop offset="0" stop-color="#7dd3fc"/><stop offset="1" stop-color="#6366f1"/></linearGradient></defs>'
  + '<rect width="120" height="90" fill="url(#g)"/><circle cx="60" cy="38" r="16" fill="#fff" fill-opacity=".85"/>'
  + '<ellipse cx="60" cy="88" rx="32" ry="26" fill="#fff" fill-opacity=".85"/></svg>'
)}`;

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const TEAM = ['Ada Lovelace', 'Alan Turing', 'Grace Hopper', 'Katherine Johnson', 'Edsger Dijkstra', 'Barbara Liskov'];

/* A clear button that comes and goes as you type: the input keeps focus and its text. */
function SearchField() {
  const [query, setQuery] = useState('');
  return (
    <Input
      aria-label="Search docs"
      placeholder="Search docs"
      value={query}
      onChange={event => setQuery(event.target.value)}
      startSection={<SearchSvg />}
      endSection={query ? (
        <Button type="button" xs ghost secondary onClick={() => setQuery('')}>Clear</Button>
      ) : <Kbd xs>/</Kbd>}
    />
  );
}

function ProfileCard(props: { loading: boolean }) {
  return (
    <Card skeleton={props.loading} className="w-80">
      <Row>
        <Avatar src={PHOTO} name="Ada Lovelace" />
        <Col noGap>
          <Title sm>Ada Lovelace</Title>
          <Text sm secondary>Analyst, London</Text>
        </Col>
      </Row>
      <Text>Wrote the first program for a machine that did not exist yet.</Text>
      <Row>
        <Badge success dot>Online</Badge>
        <Chip sm>Math</Chip>
      </Row>
      <Row>
        <Button filled><TestSvg /> Follow</Button>
        <Link href="#profile">Profile</Link>
      </Row>
    </Card>
  );
}

function SkeletonShowcase() {
  const [loading, setLoading] = useState(true);
  return (
    <Card>
      <Title>One prop, the same layout</Title>
      <Text sm secondary>
        <Code sm>skeleton</Code> on the Card turns the components inside it into placeholders: text
        into bars as long as each line, buttons, badges, fields and avatars into shapes of their own
        size. The Card keeps its surface, and nothing inside takes focus.
      </Text>
      <Label row>
        <Checkbox checked={loading} onChange={() => setLoading(!loading)} />
        Loading
      </Label>
      <Row tabletStack itemsStart>
        <ProfileCard loading={loading} />
        <div data-theme="dark"><ProfileCard loading={loading} /></div>
        <Col skeleton={loading} noGap className="w-56">
          <NavLink href="#home" active><TestSvg /> Dashboard</NavLink>
          <NavLink href="#settings"><TestSvg /> Settings</NavLink>
          <NavLink href="#team"><TestSvg /> Team</NavLink>
        </Col>
      </Row>
      <Text sm secondary>
        <Code sm>Skeleton</Code> is a plain box for an area with no component of its own, such as a
        chart. It is one line of text tall at its size; aspect props, a height or a class set its shape.
      </Text>
      <Row itemsStart flexWrap>
        <Skeleton aspectVideo className="w-64" />
        <Col className="w-64">
          <Skeleton />
          <Skeleton sm className="w-1/2" />
          <Skeleton pill aspectSquare className="w-12" />
        </Col>
      </Row>
    </Card>
  );
}

const ISSUES = [
  { title: 'Fix the Safari export button', status: 'open' },
  { title: 'Add a dark logo', status: 'closed' },
  { title: 'Translate the docs', status: 'draft' },
  { title: 'Cache the search index', status: 'open' },
];

function SegmentedControlShowcase() {
  const [status, setStatus] = useState('all');
  const shown = ISSUES.filter(issue => status === 'all' || issue.status === status);
  return (
    <>
      <Card>
        <Title>A filter</Title>
        <Text sm secondary>
          One choice out of a few, always visible. The segments are native radios, so the arrow keys
          move the choice and a form gets the value.
        </Text>
        <SegmentedControl aria-label="Status" value={status} onChange={event => setStatus(event.target.value)}>
          <SegmentedControlItem value="all">All</SegmentedControlItem>
          <SegmentedControlItem value="open">Open</SegmentedControlItem>
          <SegmentedControlItem value="closed">Closed</SegmentedControlItem>
          <SegmentedControlItem value="draft">Draft</SegmentedControlItem>
        </SegmentedControl>
        <Col gapXs>
          {shown.map(issue => <Text key={issue.title} sm>{issue.title}</Text>)}
        </Col>
      </Card>

      <Card>
        <Title>Sizes, colors and width</Title>
        <Text sm secondary>
          The control is as tall as a Button of its size. Its appearance and variant color the
          selected segment; the track stays neutral.
        </Text>
        <Row flexWrap>
          <SegmentedControl xs aria-label="Range" defaultValue="w">
            <SegmentedControlItem value="d">Day</SegmentedControlItem>
            <SegmentedControlItem value="w">Week</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl md accent filled aria-label="View" defaultValue="board">
            <SegmentedControlItem value="list">List</SegmentedControlItem>
            <SegmentedControlItem value="board">Board</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl lg pill aria-label="Layout" defaultValue="grid">
            <SegmentedControlItem value="list" aria-label="List"><TestSvg /></SegmentedControlItem>
            <SegmentedControlItem value="grid" aria-label="Grid"><TestSvg /></SegmentedControlItem>
            <SegmentedControlItem value="both" disabled><TestSvg /> Both</SegmentedControlItem>
          </SegmentedControl>
          <Button md>Button md</Button>
        </Row>
        <SegmentedControl wFull aria-label="Billing" defaultValue="year">
          <SegmentedControlItem value="month">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="year">Yearly</SegmentedControlItem>
        </SegmentedControl>
      </Card>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>VaneUI Playground</PageTitle>
          <Text secondary>
            Default sizes and parts, light islands inside <Code sm>data-theme="dark"</Code>, the new
            Avatar and Breadcrumb, field sections, the new small props, loading placeholders and the
            SegmentedControl.
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
            <Title>Header, body and footer</Title>
            <Text sm secondary>
              The parts meet one inset apart. A header with <Code sm>borderB</Code> keeps the room
              for its line. A card reads a step smaller than the page: its title is 18px and an
              unsized text 14px.
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

          {/* ═══ 3. AVATAR AND BREADCRUMB ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Avatar and Breadcrumb</SectionTitle>

          <Card>
            <Title>Avatar content and sizes</Title>
            <Text sm secondary>
              An image, the initials of the name when there is no image or it fails to load, then a
              person icon. The size sets the box, the radius and the initials together.
            </Text>
            {SIZES.map(size => (
              <Row key={size} flexWrap>
                <Avatar {...{ [size]: true }} src={PHOTO} name="Ada Lovelace" />
                <Avatar {...{ [size]: true }} src="/missing.png" name="Grace Hopper" />
                <Avatar {...{ [size]: true }} name="Alan Turing" primary filled />
                <Avatar {...{ [size]: true }} rounded success />
                <Avatar {...{ [size]: true }} />
              </Row>
            ))}
          </Card>

          <Card>
            <Title>AvatarGroup</Title>
            <Text sm secondary>
              Avatars overlap and take the group's size. <Code sm>max</Code> counts the rest in one
              avatar, and <Code sm>total</Code> counts against a list you only load in part.
            </Text>
            <Row flexWrap>
              <AvatarGroup aria-label="Editors" max={4}>
                {TEAM.map(name => <Avatar key={name} name={name} />)}
              </AvatarGroup>
              <AvatarGroup lg aria-label="Reviewers" total={48}>
                <Avatar src={PHOTO} name="Alan Turing" />
                <Avatar name="Barbara Liskov" info filled />
                <Avatar name="Edsger Dijkstra" warning filled />
              </AvatarGroup>
            </Row>
          </Card>

          <Card>
            <Title>Breadcrumb</Title>
            <Text sm secondary>
              A labelled <Code sm>nav</Code> with an ordered list. The last item is the current page
              unless one item sets <Code sm>current</Code>. The trail wraps on a narrow screen, and
              its text follows the size prop (12 to 20px, 14px by default).
            </Text>
            <Breadcrumb>
              <BreadcrumbItem href="#home">Home</BreadcrumbItem>
              <BreadcrumbItem href="#docs">Docs</BreadcrumbItem>
              <BreadcrumbItem href="#components">Components</BreadcrumbItem>
              <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
            <Breadcrumb md separator="/">
              <BreadcrumbItem href="#home">Home</BreadcrumbItem>
              <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
              <BreadcrumbItem>Billing</BreadcrumbItem>
            </Breadcrumb>
            {(['xs', 'lg', 'xl'] as const).map((size) => (
              <Breadcrumb key={size} {...{ [size]: true }}>
                <BreadcrumbItem href="#home">Home</BreadcrumbItem>
                <BreadcrumbItem>{size}</BreadcrumbItem>
              </Breadcrumb>
            ))}
          </Card>

          {/* ═══ 4. FIELD SECTIONS ═══════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Field sections and Textarea</SectionTitle>

          <Card>
            <Title>Start and end sections</Title>
            <Text sm secondary>
              A section overlays the field and the field reserves its measured width, so a prefix
              like https:// is as wide as its text. A section follows the field's size.
            </Text>
            <Grid2 itemsStart>
              <SearchField />
              <Input aria-label="Site" startSection="https://" placeholder="vaneui.com" />
              <Input aria-label="Weight" type="number" endSection="kg" defaultValue="72" invalid />
              <Select aria-label="Region" startSection={<TestSvg />}>
                <option>Europe</option>
                <option>North America</option>
              </Select>
              <Field type="url" label="Homepage" startSection="https://" description="Field passes the section to its input." />
              <Input lg aria-label="Large search" startSection={<SearchSvg />} placeholder="Large" />
            </Grid2>
          </Card>

          <Card>
            <Title>Textarea autosize and resize</Title>
            <Text sm secondary>
              <Code sm>autosize</Code> grows the box with its text and drops the handle.
              <Code sm>resizeNone</Code>, <Code sm>resizeX</Code> and <Code sm>resize</Code> change the
              handle; the default resizes vertically.
            </Text>
            <Grid2>
              <Field textarea autosize label="Autosize" defaultValue={'Type a few lines.\nThe box grows with them.'} />
              <Field textarea resizeNone label="No handle" defaultValue="This one keeps its height." />
            </Grid2>
          </Card>

          {/* ═══ 5. SMALL PROPS ══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>5. Small props</SectionTitle>

          <Card>
            <Title>Table striped and hoverable, Badge dot</Title>
            <Text sm secondary>
              Stripes and the hover tint are a tint of the row's own text color, so they read on any
              appearance. A dot badge with no text and an <Code sm>aria-label</Code> is one image.
            </Text>
            <Row tabletStack itemsStart>
              <ChecksTable striped hoverable />
              <ChecksTable striped success />
            </Row>
            <Row flexWrap>
              <Badge success dot>Online</Badge>
              <Badge warning dot>Away</Badge>
              <Badge danger filled dot>Offline</Badge>
              <Badge info dot aria-label="New messages" />
              <Text sm>Build status <Badge xs success dot aria-label="Passing" /></Text>
            </Row>
          </Card>

          <Card>
            <Title>Fixed gaps, aspect ratio and srOnly</Title>
            <Text sm secondary>
              <Code sm>gapXs</Code> to <Code sm>gapXl</Code> keep one gap at every size and width.
              <Code sm>aspectSquare</Code> and <Code sm>aspectVideo</Code> fix the shape of an image or a
              box. <Code sm>srOnly</Code> keeps text for screen readers only.
            </Text>
            <Row flexWrap>
              {(['gapXs', 'gapSm', 'gapMd', 'gapLg', 'gapXl'] as const).map(gap => (
                <Row key={gap} lg {...{ [gap]: true }}>
                  <Chip sm>{gap}</Chip><Chip sm>b</Chip><Chip sm>c</Chip>
                </Row>
              ))}
            </Row>
            <Row itemsStart flexWrap>
              <Img aspectSquare src={PHOTO} alt="A square crop" className="w-40" />
              <Card aspectVideo secondary filled itemsCenter justifyCenter className="w-64">
                <Text>16:9 card</Text>
              </Card>
              <Button>
                <TestSvg />
                <Text tag="span" srOnly>Add to favorites</Text>
              </Button>
            </Row>
          </Card>

          {/* ═══ 6. SKELETON ═══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>6. Skeleton</SectionTitle>

          <SkeletonShowcase />

          {/* ═══ 7. SEGMENTED CONTROL ═══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>7. SegmentedControl</SectionTitle>

          <SegmentedControlShowcase />

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
