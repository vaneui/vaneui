import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Title,
  Section,
  Stack,
  Card,
  Container,
  Divider,
  Code,
  Button,
  Badge,
  PageTitle,
  SectionTitle,
  Chip,
  Kbd,
  Mark,
  Link,
} from '../../src';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          {/* ═══════════════════════════════════════════════════════════════
              VARIANT & APPEARANCE INHERITANCE
              ═══════════════════════════════════════════════════════════════ */}
          <PageTitle>Variant & Appearance Inheritance</PageTitle>
          <Text secondary>
            Components inherit colors from their nearest ancestor via CSS custom
            properties. Explicit props always override inherited values.
          </Text>

          {/* ═══ BASIC ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Default Components Inherit</SectionTitle>

          <Card>
            <Title>Children inherit from filled parent</Title>
            <Text sm secondary>
              <Code sm>Button</Code>, <Code sm>Text</Code>, and <Code sm>Badge</Code> inside
              a <Code sm>{'<Card filled primary>'}</Code> automatically get the filled palette.
            </Text>
            <Card filled primary>
              <Text>White text (inherited)</Text>
              <Row>
                <Button>Inherited button</Button>
                <Button primary>Inherited button</Button>
                <Button secondary>Inherited button</Button>
                <Badge primary filled>Inherited badge</Badge>
                <Badge primary outline>Inherited badge</Badge>
                <Code>inherited code</Code>
              </Row>
            </Card>
          </Card>

          {/* ═══ EXPLICIT OVERRIDE ════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Explicit Props Override</SectionTitle>

          <Card>
            <Title>Explicit appearance wins over inherited</Title>
            <Text sm secondary>
              Setting an appearance or variant prop on a child makes it use its own
              CSS rule instead of inheriting.
            </Text>
            <Card filled primary>
              <Text>Inherited (white)</Text>
              <Text danger>Explicit danger (red)</Text>
              <Text success>Explicit success (green)</Text>
              <Row>
                <Button>Inherited</Button>
                <Button danger>Danger override</Button>
                <Button success filled>Success filled override</Button>
              </Row>
            </Card>
          </Card>

          {/* ═══ NEAREST ANCESTOR ═════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Nearest Ancestor Wins</SectionTitle>

          <Card>
            <Title>Nested layouts: child inherits from closest parent</Title>
            <Text sm secondary>
              <Code sm>Text</Code> inside a nested <Code sm>Stack</Code> inherits from the
              Stack, not from the outer Card.
            </Text>
            <Card filled primary>
              <Text>White text (from Card)</Text>
              <Stack outline primary>
                <Text>Dark text (from outline Stack, not from Card)</Text>
              </Stack>
              <Stack filled danger>
                <Text>Light text (from danger Stack, not from Card)</Text>
              </Stack>
            </Card>
          </Card>

          {/* ═══ SUBTLE: Button vs Button primary ═════════════════════════ */}
          <Divider />
          <SectionTitle>Subtle: Default vs Explicit Primary</SectionTitle>

          <Card>
            <Title>{'<Button>'} vs {'<Button primary>'} inside filled Card</Title>
            <Text sm secondary>
              Both look identical standalone. Inside a filled Card, the default
              inherits while the explicit one overrides. Writing <Code sm>primary</Code> (the
              default value) changes behavior because the framework detects the
              user explicitly provided a prop.
            </Text>
            <Card filled primary>
              <Row>
                <Button>{'<Button>'} — inherits</Button>
                <Button primary>{'<Button primary>'} — overrides</Button>
              </Row>
            </Card>
          </Card>

          {/* ═══ SUBTLE: Row filled does nothing ══════════════════════════ */}
          <Divider />
          <SectionTitle>Subtle: Variant Without Appearance</SectionTitle>

          <Card>
            <Title>{'<Row filled>'} has no effect</Title>
            <Text sm secondary>
              <Code sm>filled</Code> needs an appearance to pair with. Row has no appearance
              default, so there is no CSS rule to fire. Compare with Card which
              defaults to <Code sm>primary</Code>.
            </Text>
            <Row mobileCol>
              <Card>
                <Text sm bold>Row filled (no appearance)</Text>
                <Row filled>
                  <Text>Still dark — filled was ignored</Text>
                </Row>
              </Card>
              <Card>
                <Text sm bold>Row primary filled (works)</Text>
                <Row primary filled>
                  <Text>White text — both variant and appearance set</Text>
                </Row>
              </Card>
              <Card>
                <Text sm bold>Card filled (works — Card defaults to primary)</Text>
                <Card filled>
                  <Text>White text — Card has primary in defaults</Text>
                </Card>
              </Card>
            </Row>
          </Card>

          {/* ═══ SUBTLE: Badge vs Chip ════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Subtle: Badge Inherits, Chip Doesn't</SectionTitle>

          <Card>
            <Title>Identity components keep their own colors</Title>
            <Text sm secondary>
              <Code sm>Badge</Code> defaults to <Code sm>primary</Code> (= baseline) so it
              inherits. <Code sm>Chip</Code> defaults to <Code sm>secondary</Code> (non-baseline)
              so it keeps its own palette. Same for <Code sm>Mark</Code> (warning)
              and <Code sm>Link</Code> (blue).
            </Text>
            <Card filled primary>
              <Row flexWrap itemsCenter>
                <Badge>Badge (inherits)</Badge>
                <Chip>Chip (keeps secondary)</Chip>
                <Code>Code (inherits)</Code>
                <Kbd>Kbd (inherits)</Kbd>
                <Mark>Mark (keeps warning)</Mark>
                <Link href="#">Link (keeps blue)</Link>
              </Row>
            </Card>
          </Card>

          {/* ═══ SUBTLE: Default Card context ═════════════════════════════ */}
          <Divider />
          <SectionTitle>Subtle: Default Card is Transparent</SectionTitle>

          <Card>
            <Title>Default Card doesn't establish a color context</Title>
            <Text sm secondary>
              A plain <Code sm>{'<Card>'}</Code> resolves to <Code sm>primary + outline</Code> which
              matches the <Code sm>:root</Code> baseline — so it emits no data attributes and
              children just read from <Code sm>:root</Code>. Only <Code sm>{'<Card filled>'}</Code> or
              <Code sm>{'<Card danger>'}</Code> etc. shift the palette and affect children.
            </Text>
            <Row mobileCol>
              <Card>
                <Text sm bold>Default Card</Text>
                <Text>Text reads from :root (dark)</Text>
                <Button>Button reads from :root</Button>
              </Card>
              <Card danger>
                <Text sm bold>Danger Card (explicit)</Text>
                <Text>Text inherits danger</Text>
                <Button>Button inherits danger</Button>
              </Card>
              <Card filled>
                <Text sm bold>Filled Card</Text>
                <Text>Text inherits filled</Text>
                <Button>Button inherits filled</Button>
              </Card>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
