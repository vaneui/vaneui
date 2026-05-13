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
} from '../../src';

/**
 * Reusable sample SVG. Uses currentColor + fixed 20x20 viewport so it inherits
 * color from the Icon wrapper. The parent <Icon> controls the rendered size.
 */
const TestSvg = () => (
  <svg viewBox="0 0 24 24" width={20} height={20} aria-hidden="true">
    <path
      d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.6l-5.9 3.1 1.13-6.58-4.78-4.66 6.6-.96L12 2.5z"
      fill="currentColor"
    />
  </svg>
);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>Icon Showcase</PageTitle>
          <Text secondary>
            Inline default behaviour plus the new container mode —{' '}
            <Code sm>padding</Code> + <Code sm>filled</Code>/<Code sm>border</Code>/
            <Code sm>ring</Code> + <Code sm>shape</Code> + <Code sm>appearance</Code>{' '}
            produce a self-contained icon badge.
          </Text>

          {/* ═══ 1. INLINE (UNCHANGED DEFAULT) ════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Inline (Unchanged Default)</SectionTitle>

          <Card>
            <Title>Bare Icon inherits parent color</Title>
            <Text sm secondary>
              With no appearance prop, <Code sm>Icon</Code> uses <Code sm>currentColor</Code>{' '}
              and adopts whatever color its parent renders in.
            </Text>
            <Stack noPadding>
              <Text>
                Default text color — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text primary>
                Primary text — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text danger>
                Danger text — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text success>
                Success text — <Icon><TestSvg /></Icon> inherits.
              </Text>
              <Text secondary>
                Secondary text — <Icon><TestSvg /></Icon> inherits.
              </Text>
            </Stack>
          </Card>

          {/* ═══ 2. SIZE VARIANTS (INLINE) ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Size Variants (Inline)</SectionTitle>

          <Card>
            <Title>xs / sm / md / lg / xl</Title>
            <Text sm secondary>
              The size prop scales the rendered SVG via the shared font-size pipeline.
            </Text>
            <Row itemsEnd flexWrap>
              <Col>
                <Text sm bold>xs</Text>
                <Icon xs><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>sm</Text>
                <Icon sm><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>md</Text>
                <Icon><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>lg</Text>
                <Icon lg><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>xl</Text>
                <Icon xl><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 3. APPEARANCE VARIANTS (INLINE) ═════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Appearance Variants (Inline)</SectionTitle>

          <Card>
            <Title>Color only, no container</Title>
            <Text sm secondary>
              Appearance props tint the SVG via <Code sm>currentColor</Code> — no box,
              no padding, no border.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>primary</Text>
                <Icon primary><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>brand</Text>
                <Icon brand><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>accent</Text>
                <Icon accent><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>secondary</Text>
                <Icon secondary><TestSvg /></Icon>
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
              <Col>
                <Text sm bold>info</Text>
                <Icon info><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 4. FILLED CONTAINERS — SHAPE VARIANTS ═══════════════════════ */}
          <Divider />
          <SectionTitle>4. Filled Containers — Shape</SectionTitle>

          <Card>
            <Title>sharp / rounded / pill</Title>
            <Text sm secondary>
              Add <Code sm>padding</Code> + <Code sm>filled</Code> + an appearance to
              produce a colored badge. Shape controls the border-radius.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>sharp</Text>
                <Icon padding sharp primary filled><TestSvg /></Icon>
                <Code sm>padding sharp primary filled</Code>
              </Col>
              <Col>
                <Text sm bold>rounded (default)</Text>
                <Icon padding primary filled><TestSvg /></Icon>
                <Code sm>padding primary filled</Code>
              </Col>
              <Col>
                <Text sm bold>pill</Text>
                <Icon padding pill primary filled><TestSvg /></Icon>
                <Code sm>padding pill primary filled</Code>
              </Col>
            </Row>
          </Card>

          {/* ═══ 5. FILLED CONTAINERS — APPEARANCE VARIANTS ══════════════════ */}
          <Divider />
          <SectionTitle>5. Filled Containers — Appearance</SectionTitle>

          <Card>
            <Title>Same shape (pill), every appearance</Title>
            <Text sm secondary>
              Filled appearance variants render as solid colored badges using the
              theme's appearance color tokens.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>primary</Text>
                <Icon padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>brand</Text>
                <Icon padding pill brand filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>accent</Text>
                <Icon padding pill accent filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>secondary</Text>
                <Icon padding pill secondary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>success</Text>
                <Icon padding pill success filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>danger</Text>
                <Icon padding pill danger filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>warning</Text>
                <Icon padding pill warning filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>info</Text>
                <Icon padding pill info filled><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 6. BORDERED CONTAINERS ══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>6. Bordered Containers</SectionTitle>

          <Card>
            <Title>Outlined box, no fill</Title>
            <Text sm secondary>
              Swap <Code sm>filled</Code> for <Code sm>border</Code> to get an outlined
              badge — the SVG keeps the appearance's text color and the border picks up
              the same hue.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>rounded</Text>
                <Icon padding primary border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>pill</Text>
                <Icon padding pill primary border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>sharp</Text>
                <Icon padding sharp primary border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>success border</Text>
                <Icon padding pill success border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>danger border</Text>
                <Icon padding pill danger border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>warning border</Text>
                <Icon padding pill warning border><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 7. RING ═════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>7. Ring</SectionTitle>

          <Card>
            <Title>Inset ring — alone or combined with border</Title>
            <Text sm secondary>
              <Code sm>ring</Code> draws an inset outline. It can stand on its own or be
              layered with <Code sm>border</Code> for a two-tone badge.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm bold>ring only</Text>
                <Icon padding pill primary ring><TestSvg /></Icon>
                <Code sm>padding pill primary ring</Code>
              </Col>
              <Col>
                <Text sm bold>ring + border</Text>
                <Icon padding pill primary ring border><TestSvg /></Icon>
                <Code sm>padding pill primary ring border</Code>
              </Col>
              <Col>
                <Text sm bold>ring + filled</Text>
                <Icon padding pill primary filled ring><TestSvg /></Icon>
                <Code sm>padding pill primary filled ring</Code>
              </Col>
              <Col>
                <Text sm bold>success ring</Text>
                <Icon padding pill success ring><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm bold>danger ring</Text>
                <Icon padding pill danger ring><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 8. CONTAINER SIZE SCALING ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>8. Container Size Scaling</SectionTitle>

          <Card>
            <Title>Padding + radius scale with size prop</Title>
            <Text sm secondary>
              Same <Code sm>padding pill primary filled</Code> recipe at every size —
              padding and SVG both scale through the shared CSS variable pipeline.
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

          {/* ═══ 9. COMPOSITIONS ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>9. Compositions</SectionTitle>

          <Card>
            <Title>Icon inside Text</Title>
            <Text sm secondary>
              Inline icons flow naturally inside paragraphs — useful for inline status
              hints or trailing decoration.
            </Text>
            <Stack noPadding>
              <Text>
                <Icon success><TestSvg /></Icon> Deployment succeeded — all checks passed.
              </Text>
              <Text>
                <Icon danger><TestSvg /></Icon> Build failed — see the logs for details.
              </Text>
              <Text>
                <Icon warning><TestSvg /></Icon> 3 dependencies have known vulnerabilities.
              </Text>
            </Stack>
          </Card>

          <Card>
            <Title>Icon alongside Button</Title>
            <Text sm secondary>
              Pair a container-mode icon with a button to draw attention to a row's
              primary action.
            </Text>
            <Row itemsCenter>
              <Icon padding pill primary filled><TestSvg /></Icon>
              <Col gap noPadding>
                <Text bold>Upgrade to Pro</Text>
                <Text sm secondary>Unlock advanced analytics and priority support.</Text>
              </Col>
              <Button filled>Upgrade</Button>
            </Row>
            <Row itemsCenter>
              <Icon padding pill success filled><TestSvg /></Icon>
              <Col gap noPadding>
                <Text bold>Account verified</Text>
                <Text sm secondary>You're ready to invite teammates.</Text>
              </Col>
              <Button success>Invite</Button>
            </Row>
            <Row itemsCenter>
              <Icon padding pill danger border><TestSvg /></Icon>
              <Col gap noPadding>
                <Text bold>Payment failed</Text>
                <Text sm secondary>Update your card to keep your subscription active.</Text>
              </Col>
              <Button danger filled>Update card</Button>
            </Row>
          </Card>

          <Card>
            <Title>Icon as Card header indicator</Title>
            <Text sm secondary>
              Container-mode icons work as status anchors inside a CardHeader.
            </Text>
            <Row mobileCol itemsStart>
              <Card className="w-72">
                <CardHeader>
                  <Icon padding pill success filled><TestSvg /></Icon>
                  <Title>All systems normal</Title>
                </CardHeader>
                <CardBody>
                  <Text sm>Last incident: 14 days ago.</Text>
                </CardBody>
              </Card>
              <Card className="w-72">
                <CardHeader>
                  <Icon padding pill warning filled><TestSvg /></Icon>
                  <Title>Degraded performance</Title>
                </CardHeader>
                <CardBody>
                  <Text sm>API latency 2x normal in EU region.</Text>
                </CardBody>
              </Card>
              <Card className="w-72">
                <CardHeader>
                  <Icon padding pill danger filled><TestSvg /></Icon>
                  <Title>Outage</Title>
                </CardHeader>
                <CardBody>
                  <Text sm>Auth provider unreachable — investigating.</Text>
                </CardBody>
              </Card>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
