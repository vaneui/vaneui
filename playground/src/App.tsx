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
  CardHeader,
  CardBody,
  Container,
  Divider,
  Code,
  PageTitle,
  SectionTitle,
  Button,
  Icon,
  Badge,
  Chip,
  Input,
  Checkbox,
  Label,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
        <Button brand filled>Brand filled</Button>
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

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>VaneUI Playground</PageTitle>
          <Text secondary>
            Icon inline + container modes, and the <Code sm>data-theme="dark"</Code>{' '}
            color-scheme comparison.
          </Text>

          {/* ═══ 1. ICON — INLINE ════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Icon — Inline</SectionTitle>

          <Card>
            <Title>Bare Icon inherits parent color</Title>
            <Text sm secondary>
              With no appearance prop, <Code sm>Icon</Code> uses{' '}
              <Code sm>currentColor</Code> and adopts whatever color its parent
              renders in.
            </Text>
            <Stack noPadding>
              <Text>
                Default text color — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text danger>
                Danger text — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text secondary>
                Secondary text — <Icon><TestSvg /></Icon> inherits.
              </Text>
            </Stack>
          </Card>

          <Card>
            <Title>Sizes and appearances</Title>
            <Text sm secondary>
              The size prop scales the SVG via the shared font-size pipeline;
              appearance props tint it via <Code sm>currentColor</Code> — no box,
              no padding.
            </Text>
            <Row itemsEnd flexWrap>
              <Col>
                <Text sm bold>xs</Text>
                <Icon xs><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <Icon><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <Icon xl><TestSvg /></Icon>
              </Col>
            </Row>
            <Row flexWrap>
              <Col>
                <Text sm bold>brand</Text>
                <Icon brand><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>success</Text>
                <Icon success><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>danger</Text>
                <Icon danger><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>warning</Text>
                <Icon warning><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 2. ICON — CONTAINER MODE ════════════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Icon — Container Mode</SectionTitle>

          <Card>
            <Title>Badge recipes</Title>
            <Text sm secondary>
              <Code sm>padding</Code> + <Code sm>filled</Code>/<Code sm>border</Code>/
              <Code sm>ring</Code> + shape + appearance produce a self-contained
              icon badge.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>filled rounded</Text>
                <Icon padding primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>filled pill</Text>
                <Icon padding pill success filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>filled sharp</Text>
                <Icon padding sharp danger filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>border pill</Text>
                <Icon padding pill warning border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>ring pill</Text>
                <Icon padding pill primary ring><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>ring + filled</Text>
                <Icon padding pill primary filled ring><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Container size scaling</Title>
            <Text sm secondary>
              Same <Code sm>padding pill primary filled</Code> recipe at every
              size — padding and SVG scale together through the CSS variable
              pipeline.
            </Text>
            <Row flexWrap itemsEnd>
              <Col>
                <Text sm bold>xs</Text>
                <Icon xs padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>sm</Text>
                <Icon sm padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <Icon padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>lg</Text>
                <Icon lg padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <Icon xl padding pill primary filled><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 3. DARK MODE ════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Dark Mode</SectionTitle>

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
            <Row itemsStretch tabletCol>
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

          {/* ═══ 4. TABLE ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Table</SectionTitle>

          <Card>
            <Title>Row-rule table (light and dark)</Title>
            <Text sm secondary>
              <Code sm>Table</Code> + <Code sm>Thead/Tbody/Tr/Th/Td</Code> render
              a clean, dark-mode-correct table — <Code sm>secondary</Code> cell
              borders give the 1px row rule and a muted semibold header, with
              size-scaled cell padding. Wrap in <Code sm>{'<Col overflowXAuto>'}</Code>{' '}
              for horizontal scroll.
            </Text>
            <Row itemsStretch tabletCol>
              <Col overflowXAuto className="flex-1">
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Service</Th>
                      <Th>Region</Th>
                      <Th textRight>Latency</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>api-gateway</Td>
                      <Td>europe-west</Td>
                      <Td textRight>42 ms</Td>
                    </Tr>
                    <Tr>
                      <Td>auth</Td>
                      <Td>us-east</Td>
                      <Td textRight>88 ms</Td>
                    </Tr>
                    <Tr>
                      <Td>billing</Td>
                      <Td>us-east</Td>
                      <Td textRight>17 ms</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Col>
              <div data-theme="dark" className="flex flex-1">
                <Col overflowXAuto className="flex-1">
                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Service</Th>
                        <Th>Region</Th>
                        <Th textRight>Latency</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>api-gateway</Td>
                        <Td>europe-west</Td>
                        <Td textRight>42 ms</Td>
                      </Tr>
                      <Tr>
                        <Td>auth</Td>
                        <Td>us-east</Td>
                        <Td textRight>88 ms</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Col>
              </div>
            </Row>
          </Card>

          <Card>
            <Title>One size prop sizes the whole table</Title>
            <Text sm secondary>
              <Code sm>{'<Table sm>'}</Code> / <Code sm>{'<Table md>'}</Code> /{' '}
              <Code sm>{'<Table lg>'}</Code> cascade text + padding to every cell. A
              size on a <Code sm>Th</Code>/<Code sm>Td</Code> or <Code sm>Tr</Code>{' '}
              overrides for that cell/row.
            </Text>
            {(['sm', 'md', 'lg'] as const).map(size => (
              <Table key={size} {...{ [size]: true }}>
                <Thead>
                  <Tr><Th>Size {size}</Th><Th textRight>Value</Th></Tr>
                </Thead>
                <Tbody>
                  <Tr><Td>text + padding</Td><Td textRight>cascade</Td></Tr>
                </Tbody>
              </Table>
            ))}
            {/* Override: xs table, but an xl cell and an lg row stay large */}
            <Table xs>
              <Thead>
                <Tr><Th>xs table</Th><Th xl textRight>xl cell</Th></Tr>
              </Thead>
              <Tbody>
                <Tr><Td>tiny</Td><Td xl textRight>large</Td></Tr>
                <Tr lg><Td>lg row</Td><Td textRight>lg row</Td></Tr>
              </Tbody>
            </Table>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
