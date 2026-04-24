import {
  ThemeProvider,
  defaultTheme,
  Row,
  Col,
  Text,
  Title,
  Section,
  Card,
  Container,
  Divider,
  Code,
  PageTitle,
  SectionTitle,
  List,
  ListItem,
  Label,
  Input,
  Checkbox,
  Menu,
  MenuItem,
  MenuLabel,
  Button,
} from '../../src';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>List & ListItem Showcase</PageTitle>
          <Text secondary>
            Exploring <Code sm>List</Code> with <Code sm>inside</Code>/<Code sm>outside</Code> position,
            extended markers, nested progression, <Code sm>gap</Code> control, and custom icons.
          </Text>

          {/* ═══ 1. MARKER TYPES ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Marker Types</SectionTitle>

          <Card>
            <Title>Six list-style markers</Title>
            <Text sm secondary>
              <Code sm>disc</Code>, <Code sm>circle</Code>, <Code sm>square</Code>,{' '}
              <Code sm>decimal</Code>, <Code sm>lowerAlpha</Code>, <Code sm>lowerRoman</Code>.
              The last two render as <Code sm>{'<ol>'}</Code>.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>disc (default)</Text>
                <List>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>circle</Text>
                <List circle>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>square</Text>
                <List square>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>decimal</Text>
                <List decimal>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>lowerAlpha</Text>
                <List lowerAlpha>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>lowerRoman</Text>
                <List lowerRoman>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 2. MARKER POSITION ══════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Marker Position</SectionTitle>

          <Card>
            <Title>outside (default) vs inside</Title>
            <Text sm secondary>
              <Code sm>outside</Code> hangs markers outside the content box so wrapped text aligns
              under the first character. <Code sm>inside</Code> keeps markers inline with text —
              compact, but wrapped lines flow under the marker.
            </Text>
            <Row mobileCol itemsStart>
              <Col>
                <Text sm bold>outside (default)</Text>
                <List className="w-64">
                  <ListItem>A short item.</ListItem>
                  <ListItem>A much longer item that wraps onto a second line so the hanging marker is visible.</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>inside</Text>
                <List inside className="w-64">
                  <ListItem>A short item.</ListItem>
                  <ListItem>A much longer item that wraps onto a second line — markers flow inline with text.</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 3. NESTED MARKER PROGRESSION ════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Nested Marker Progression</SectionTitle>

          <Card>
            <Title>disc → circle → square &nbsp;&middot;&nbsp; decimal → lowerAlpha → lowerRoman</Title>
            <Text sm secondary>
              Nested lists progress marker style automatically. Override a single nested list with
              inline <Code sm>{'style={{ listStyleType: "..." }}'}</Code>. Progression caps at 3 levels.
            </Text>
            <Row mobileCol itemsStart>
              <Col>
                <Text sm bold>Unordered (ul)</Text>
                <List>
                  <ListItem>Level 0 — disc</ListItem>
                  <ListItem>
                    Parent
                    <List>
                      <ListItem>Level 1 — circle</ListItem>
                      <ListItem>
                        Parent
                        <List>
                          <ListItem>Level 2 — square</ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>Ordered (ol)</Text>
                <List decimal>
                  <ListItem>Level 0 — decimal</ListItem>
                  <ListItem>
                    Parent
                    <List decimal>
                      <ListItem>Level 1 — lowerAlpha</ListItem>
                      <ListItem>
                        Parent
                        <List decimal>
                          <ListItem>Level 2 — lowerRoman</ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 4. ITEM SPACING ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Item Spacing</SectionTitle>

          <Card>
            <Title>gap (default) vs noGap</Title>
            <Text sm secondary>
              Lists apply sibling margin driven by <Code sm>--gap</Code>. Use <Code sm>noGap</Code>
              to remove the spacing entirely.
            </Text>
            <Row mobileCol itemsStart>
              <Col>
                <Text sm bold>default gap</Text>
                <List>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                  <ListItem>Item three</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>noGap</Text>
                <List noGap>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                  <ListItem>Item three</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Gap + font-size scale with size (now correctly inherited)</Title>
            <Text sm secondary>
              Same two items at every size — <Code sm>xs</Code> → <Code sm>xl</Code>.
              <Code sm>ListItem</Code> has no size default, so font-size and gap cascade
              from the parent <Code sm>List</Code>. Set a size on a specific item to opt out.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>xs</Text>
                <List xs>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>sm</Text>
                <List sm>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <List>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>lg</Text>
                <List lg>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <List xl>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 5. CUSTOM ICON MARKERS ══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>5. Custom Icon Markers</SectionTitle>

          <Card>
            <Title>Per-item icon via <Code sm>icon</Code> prop</Title>
            <Text sm secondary>
              Pass any React node as the <Code sm>icon</Code> prop on a <Code sm>ListItem</Code>.
              The native marker is suppressed on that item via <Code sm>data-has-icon="true"</Code>.
              For decorative glyphs, pass <Code sm>aria-hidden="true"</Code> on the icon node.
            </Text>
            <List>
              <ListItem icon={<span aria-hidden="true">✓</span>}>Ship the feature</ListItem>
              <ListItem icon={<span aria-hidden="true">✓</span>}>Write the tests</ListItem>
              <ListItem icon={<span aria-hidden="true">→</span>}>Update the docs</ListItem>
              <ListItem>Plain item keeps the native marker</ListItem>
            </List>
          </Card>

          <Card>
            <Title>Icon gap scales with size</Title>
            <Text sm secondary>
              The icon wrapper uses <Code sm>mr-(--gap)</Code>, so icon-to-text spacing matches
              everything else driven by size.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>xs</Text>
                <List xs>
                  <ListItem icon={<span aria-hidden="true">✓</span>}>Small checklist</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <List>
                  <ListItem icon={<span aria-hidden="true">✓</span>}>Default checklist</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <List xl>
                  <ListItem icon={<span aria-hidden="true">✓</span>}>Large checklist</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 6. FILLED APPEARANCE VARIANTS ═══════════════════════════════ */}
          <Divider />
          <SectionTitle>6. Filled Appearance Variants</SectionTitle>

          <Card>
            <Title>Outline vs filled</Title>
            <Text sm secondary>
              Lists default to <Code sm>outline</Code>. Pass <Code sm>filled</Code> to get a
              colored background. Pair with any appearance.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>primary outline</Text>
                <List primary>
                  <ListItem>Docs</ListItem>
                  <ListItem>Guides</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>primary filled</Text>
                <List primary filled>
                  <ListItem>Docs</ListItem>
                  <ListItem>Guides</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>success filled</Text>
                <List success filled>
                  <ListItem>Shipped</ListItem>
                  <ListItem>Tested</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>danger filled</Text>
                <List danger filled>
                  <ListItem>Breaking</ListItem>
                  <ListItem>Security</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>warning filled</Text>
                <List warning filled>
                  <ListItem>Deprecated</ListItem>
                  <ListItem>Flaky</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>info filled</Text>
                <List info filled>
                  <ListItem>FYI</ListItem>
                  <ListItem>Notes</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Filled at every size</Title>
            <Text sm secondary>
              Size scales padding, border-radius, font-size, and the sibling gap — all via
              the shared CSS variable pipeline.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>xs</Text>
                <List xs primary filled>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <List primary filled>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <List xl primary filled>
                  <ListItem>Item one</ListItem>
                  <ListItem>Item two</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ 7. PARENT→CHILD SIZE INHERITANCE ════════════════════════════ */}
          <Divider />
          <SectionTitle>7. Parent → Child Size Inheritance</SectionTitle>

          <Card>
            <Title>Label → Input / Checkbox</Title>
            <Text sm secondary>
              <Code sm>Label</Code> propagates its size to nested <Code sm>Input</Code> and{' '}
              <Code sm>Checkbox</Code>. The form control scales with the label without having
              to repeat the size. Set a size on the child to opt out.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>default (sm)</Text>
                <Label>
                  Email
                  <Input placeholder="you@example.com" />
                </Label>
                <Label>
                  <Checkbox />
                  I agree
                </Label>
              </Col>
              <Col>
                <Text sm bold>lg</Text>
                <Label lg>
                  Email
                  <Input placeholder="you@example.com" />
                </Label>
                <Label lg>
                  <Checkbox />
                  I agree
                </Label>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <Label xl>
                  Email
                  <Input placeholder="you@example.com" />
                </Label>
                <Label xl>
                  <Checkbox />
                  I agree
                </Label>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Explicit child override wins</Title>
            <Text sm secondary>
              A size prop on the child always beats the label's propagation.
              Here both labels are <Code sm>xl</Code>, but the right input is explicitly{' '}
              <Code sm>xs</Code>.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>Label xl → input xl</Text>
                <Label xl>
                  Big field
                  <Input placeholder="auto-inherits xl" />
                </Label>
              </Col>
              <Col>
                <Text sm bold>Label xl → Input xs (override)</Text>
                <Label xl>
                  Big label, small field
                  <Input xs placeholder="explicit xs" />
                </Label>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Menu → MenuItem / MenuLabel / Divider</Title>
            <Text sm secondary>
              When you explicitly size a <Code sm>Menu</Code>, every menu item, label, and
              divider inside the dropdown inherits that size.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>default</Text>
                <Menu trigger={<Button>Actions</Button>}>
                  <MenuLabel>Actions</MenuLabel>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <Divider />
                  <MenuItem danger>Delete</MenuItem>
                </Menu>
              </Col>
              <Col>
                <Text sm bold>lg</Text>
                <Menu lg trigger={<Button lg>Actions</Button>}>
                  <MenuLabel>Actions</MenuLabel>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <Divider />
                  <MenuItem danger>Delete</MenuItem>
                </Menu>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <Menu xl trigger={<Button xl>Actions</Button>}>
                  <MenuLabel>Actions</MenuLabel>
                  <MenuItem>Edit</MenuItem>
                  <MenuItem>Duplicate</MenuItem>
                  <Divider />
                  <MenuItem danger>Delete</MenuItem>
                </Menu>
              </Col>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
