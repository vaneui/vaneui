import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Stack,
  Card,
  Button,
  Badge,
  Container,
  Divider,
  Code,
  PageTitle,
  SectionTitle,
  Icon,
  IconButton
} from '../../src';

// ═══════════════════════════════════════════════════════════════════════════════
//  INLINE SVG ICONS
// ═══════════════════════════════════════════════════════════════════════════════

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
  </svg>
);

const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a.53.53 0 0 0 .4.29l5.16.754a.53.53 0 0 1 .294.904l-3.733 3.638a.53.53 0 0 0-.153.469l.882 5.14a.53.53 0 0 1-.77.56l-4.614-2.425a.53.53 0 0 0-.494 0L7.14 18.73a.53.53 0 0 1-.77-.56l.882-5.14a.53.53 0 0 0-.153-.47L3.367 8.923a.53.53 0 0 1 .294-.906l5.16-.753a.53.53 0 0 0 .4-.29z"/>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>Icon Component Playground</PageTitle>
          <Text secondary>
            Lightweight <Code>{'<span>'}</Code> wrapper for SVG icons. Sizes SVGs via CSS variables,
            inherits <Code>currentColor</Code> by default.
          </Text>

          {/* ═══ DEFAULT BEHAVIOR ══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Default Behavior</SectionTitle>

          <Card>
            <Title>currentColor Inheritance</Title>
            <Text sm secondary>
              Icon has no appearance by default — it inherits the parent's text color
              via <Code sm>currentColor</Code>. Wrap in a colored parent to see it.
            </Text>
            <Row flexWrap itemsCenter>
              <Icon><SearchIcon /></Icon>
              <Text sm secondary>Inherits body color</Text>
            </Row>
            <Row flexWrap itemsCenter>
              <Text danger>
                <Icon><AlertIcon /></Icon> Danger context
              </Text>
              <Text success>
                <Icon><CheckIcon /></Icon> Success context
              </Text>
              <Text brand>
                <Icon><StarIcon /></Icon> Brand context
              </Text>
            </Row>
          </Card>

          {/* ═══ SIZE VARIANTS ═════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Size Variants</SectionTitle>

          <Card>
            <Title>Icon Sizes — xs through xl</Title>
            <Text sm secondary>
              Size controls the <Code sm>--fs</Code> CSS variable,
              which sets the SVG's <Code sm>width</Code> and <Code sm>height</Code> via <Code sm>--icon-size</Code>.
            </Text>
            <Row flexWrap itemsEnd>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Col key={size} noGap itemsCenter>
                  <Text xs secondary>{size}</Text>
                  <Icon {...{[size]: true}}><SearchIcon /></Icon>
                </Col>
              ))}
            </Row>
          </Card>

          <Card>
            <Title>Size Comparison — Icon vs IconButton</Title>
            <Text sm secondary>
              Icon is a bare <Code sm>{'<span>'}</Code> with no padding, border, or background.
              IconButton adds padding, background, border-radius, and interactive states.
            </Text>
            <Row flexWrap itemsEnd>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Col key={size} noGap itemsCenter>
                  <Text xs secondary>{size}</Text>
                  <Row itemsCenter>
                    <Icon {...{[size]: true}}><GearIcon /></Icon>
                    <IconButton {...{[size]: true}} aria-label="Settings"><GearIcon /></IconButton>
                  </Row>
                </Col>
              ))}
            </Row>
          </Card>

          {/* ═══ APPEARANCE VARIANTS ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>Appearance Variants</SectionTitle>

          <Card>
            <Title>Colored Icons — Outline Variant</Title>
            <Text sm secondary>
              Pass an appearance prop to apply themed text color. The default variant
              is <Code sm>outline</Code>, which uses the base text color for each appearance.
            </Text>
            <Row flexWrap itemsCenter>
              <Col noGap itemsCenter>
                <Icon primary><SearchIcon /></Icon>
                <Text xs secondary>primary</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon brand><StarIcon /></Icon>
                <Text xs secondary>brand</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon accent><HeartIcon /></Icon>
                <Text xs secondary>accent</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon success><CheckIcon /></Icon>
                <Text xs secondary>success</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon danger><TrashIcon /></Icon>
                <Text xs secondary>danger</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon warning><AlertIcon /></Icon>
                <Text xs secondary>warning</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon info><InfoIcon /></Icon>
                <Text xs secondary>info</Text>
              </Col>
              <Col noGap itemsCenter>
                <Icon secondary><GearIcon /></Icon>
                <Text xs secondary>secondary</Text>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Colored Icons — Filled Variant</Title>
            <Text sm secondary>
              With <Code sm>filled</Code>, the icon uses the filled text color (lighter, for dark backgrounds).
              Useful when placing icons on colored containers.
            </Text>
            <Row flexWrap itemsCenter>
              <Card filled primary sm noPadding className="p-3">
                <Icon filled primary><SearchIcon /></Icon>
              </Card>
              <Card filled brand sm noPadding className="p-3">
                <Icon filled brand><StarIcon /></Icon>
              </Card>
              <Card filled success sm noPadding className="p-3">
                <Icon filled success><CheckIcon /></Icon>
              </Card>
              <Card filled danger sm noPadding className="p-3">
                <Icon filled danger><TrashIcon /></Icon>
              </Card>
              <Card filled warning sm noPadding className="p-3">
                <Icon filled warning><AlertIcon /></Icon>
              </Card>
              <Card filled info sm noPadding className="p-3">
                <Icon filled info><InfoIcon /></Icon>
              </Card>
            </Row>
          </Card>

          <Card>
            <Title>Large Colored Icons</Title>
            <Row flexWrap itemsCenter>
              <Icon xl primary><SearchIcon /></Icon>
              <Icon xl success><CheckIcon /></Icon>
              <Icon xl danger><TrashIcon /></Icon>
              <Icon xl warning><AlertIcon /></Icon>
              <Icon xl info><InfoIcon /></Icon>
              <Icon xl brand><StarIcon /></Icon>
              <Icon xl accent><HeartIcon /></Icon>
            </Row>
          </Card>

          {/* ═══ REAL-WORLD USE CASES ═════════════════════════════════ */}
          <Divider />
          <SectionTitle>Real-World Use Cases</SectionTitle>

          <Card>
            <Title>Icon + Text — Inline Labels</Title>
            <Text sm secondary>
              Icon is <Code sm>inline-flex</Code> by default, so it sits naturally in text flow.
              It inherits the parent's color without any appearance prop.
            </Text>
            <Stack noGap noPadding>
              <Row itemsCenter>
                <Icon sm success><CheckIcon /></Icon>
                <Text>All checks passed</Text>
              </Row>
              <Row itemsCenter>
                <Icon sm danger><AlertIcon /></Icon>
                <Text>3 errors detected</Text>
              </Row>
              <Row itemsCenter>
                <Icon sm info><InfoIcon /></Icon>
                <Text>Click to learn more</Text>
              </Row>
              <Row itemsCenter>
                <Icon sm><MailIcon /></Icon>
                <Text>5 new messages</Text>
              </Row>
            </Stack>
          </Card>

          <Card>
            <Title>Icon in Badges</Title>
            <Text sm secondary>
              Pair icons with Badge for status indicators.
            </Text>
            <Row flexWrap>
              <Badge success filled>
                <Icon xs><CheckIcon /></Icon> Deployed
              </Badge>
              <Badge danger filled>
                <Icon xs><AlertIcon /></Icon> Failed
              </Badge>
              <Badge warning filled>
                <Icon xs><AlertIcon /></Icon> Pending
              </Badge>
              <Badge info filled>
                <Icon xs><InfoIcon /></Icon> Running
              </Badge>
            </Row>
          </Card>

          <Card>
            <Title>Feature List</Title>
            <Text sm secondary>Common pattern: icon + title + description in a grid.</Text>
            <Row flexWrap>
              <Card sm className="w-56">
                <Icon lg brand><ShieldIcon /></Icon>
                <Title sm>Secure</Title>
                <Text sm secondary>End-to-end encryption for all data.</Text>
              </Card>
              <Card sm className="w-56">
                <Icon lg success><CheckIcon /></Icon>
                <Title sm>Reliable</Title>
                <Text sm secondary>99.9% uptime guarantee.</Text>
              </Card>
              <Card sm className="w-56">
                <Icon lg info><GearIcon /></Icon>
                <Title sm>Configurable</Title>
                <Text sm secondary>Customize every aspect of your workflow.</Text>
              </Card>
            </Row>
          </Card>

          <Card>
            <Title>Icon vs IconButton — When to Use Each</Title>
            <Text sm secondary>
              Use <Code sm>Icon</Code> for decorative/informational display.
              Use <Code sm>IconButton</Code> when the icon is clickable.
            </Text>
            <Row flexWrap itemsCenter>
              <Stack noGap noPadding itemsCenter>
                <Text xs secondary bold>Icon (display)</Text>
                <Row>
                  <Icon danger><AlertIcon /></Icon>
                  <Icon success><CheckIcon /></Icon>
                  <Icon info><InfoIcon /></Icon>
                </Row>
              </Stack>
              <Divider />
              <Stack noGap noPadding itemsCenter>
                <Text xs secondary bold>IconButton (action)</Text>
                <Row>
                  <IconButton danger aria-label="Delete"><TrashIcon /></IconButton>
                  <IconButton success aria-label="Confirm"><CheckIcon /></IconButton>
                  <IconButton aria-label="Settings"><GearIcon /></IconButton>
                </Row>
              </Stack>
            </Row>
          </Card>

          <Card>
            <Title>Inline with Button</Title>
            <Text sm secondary>
              Icons can decorate button labels for visual hierarchy.
              Compare standalone Icon next to a Button with an embedded SVG.
            </Text>
            <Row flexWrap itemsCenter>
              <Row itemsCenter>
                <Icon success><CheckIcon /></Icon>
                <Button success filled><CheckIcon /> Approve</Button>
              </Row>
              <Row itemsCenter>
                <Icon danger><TrashIcon /></Icon>
                <Button danger filled><TrashIcon /> Delete</Button>
              </Row>
              <Row itemsCenter>
                <Icon><SearchIcon /></Icon>
                <Button><SearchIcon /> Search</Button>
              </Row>
            </Row>
          </Card>

          {/* ═══ DISPLAY & HIDE ═══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Display & Hide Props</SectionTitle>

          <Card>
            <Title>Responsive Visibility</Title>
            <Text sm secondary>
              Use <Code sm>mobileHide</Code> / <Code sm>tabletHide</Code> / <Code sm>desktopHide</Code> to
              control icon visibility at breakpoints. Resize the viewport to test.
            </Text>
            <Row flexWrap itemsCenter>
              <Row itemsCenter>
                <Icon mobileHide danger><AlertIcon /></Icon>
                <Text sm>Hidden on mobile</Text>
              </Row>
              <Row itemsCenter>
                <Icon desktopHide success><CheckIcon /></Icon>
                <Text sm>Hidden on desktop</Text>
              </Row>
            </Row>
          </Card>

          <Card>
            <Title>Display Modes</Title>
            <Text sm secondary>
              Default is <Code sm>inline-flex</Code>. Switch to <Code sm>block</Code> or <Code sm>hidden</Code> as needed.
            </Text>
            <Row flexWrap itemsCenter>
              <Col noGap>
                <Text xs secondary>inline-flex (default)</Text>
                <Text>Text <Icon info><InfoIcon /></Icon> inline with text</Text>
              </Col>
              <Col noGap>
                <Text xs secondary>block</Text>
                <div>
                  <Text>Text</Text>
                  <Icon block info><InfoIcon /></Icon>
                  <Text>on own line</Text>
                </div>
              </Col>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
