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
  Icon,
} from '../../src';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>VaneUI Playground</PageTitle>
          <Text secondary>
            Living showcase for the components currently under active iteration.
          </Text>

          {/* ═══ LIST — MARKERS & FILLED ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>List — Markers & Filled</SectionTitle>

          <Card>
            <Title>Marker types</Title>
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
                <Text sm bold>decimal</Text>
                <List decimal>
                  <ListItem>First</ListItem>
                  <ListItem>Second</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>custom icon</Text>
                <List>
                  <ListItem icon={<span aria-hidden="true">✓</span>}>Ship it</ListItem>
                  <ListItem icon={<span aria-hidden="true">→</span>}>Iterate</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Filled appearance</Title>
            <Text sm secondary>
              Lists default to <Code sm>outline</Code>. Pass <Code sm>filled</Code> for a
              colored background. Padding, radius, font-size, and sibling gap all scale with size.
            </Text>
            <Row flexWrap itemsStart>
              <Col>
                <Text sm bold>primary filled</Text>
                <List primary filled>
                  <ListItem>Docs</ListItem>
                  <ListItem>Guides</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>success filled lg</Text>
                <List success filled lg>
                  <ListItem>Shipped</ListItem>
                  <ListItem>Tested</ListItem>
                </List>
              </Col>
              <Col>
                <Text sm bold>danger filled xs</Text>
                <List danger filled xs>
                  <ListItem>Breaking</ListItem>
                  <ListItem>Security</ListItem>
                </List>
              </Col>
            </Row>
          </Card>

          {/* ═══ PARENT → CHILD SIZE INHERITANCE ═══════════════════════════ */}
          <Divider />
          <SectionTitle>Parent → Child Size Inheritance</SectionTitle>

          <Card>
            <Title>Label → Input / Checkbox</Title>
            <Text sm secondary>
              <Code sm>Label</Code> propagates its size to nested <Code sm>Input</Code> and{' '}
              <Code sm>Checkbox</Code>. Set a size on the child to opt out.
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
                <Text sm bold>lg (inherited)</Text>
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
                <Text sm bold>Label xl → Input xs (override wins)</Text>
                <Label xl>
                  Big label, small field
                  <Input xs placeholder="explicit xs" />
                </Label>
              </Col>
            </Row>
          </Card>

          {/* ═══ ICON — CONTAINER MODE ═════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Icon — Container Mode</SectionTitle>

          <Card>
            <Title>Inline (unchanged default)</Title>
            <Text>Bare Icon inherits color from its parent.</Text>
            <Row>
              <Icon><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon primary><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon danger><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
            </Row>
          </Card>

          <Card>
            <Title>Filled containers (square / rounded / pill)</Title>
            <Row>
              <Icon padding sharp primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding rounded primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding pill danger filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding pill success filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
            </Row>
          </Card>

          <Card>
            <Title>Bordered containers (no fill)</Title>
            <Row>
              <Icon padding rounded primary border><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding pill primary border><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon padding pill primary border ring><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
            </Row>
          </Card>

          <Card>
            <Title>Sizes (padding scales with size prop)</Title>
            <Row>
              <Icon xs padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon sm padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon md padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon lg padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
              <Icon xl padding pill primary filled><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2z" fill="currentColor" /></svg></Icon>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
