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
  Label,
  Input,
  Checkbox,
} from '../../src';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>Variant & Appearance Inheritance</PageTitle>
          <Text secondary>
            Only text components (<Code sm>Text</Code>, <Code sm>Title</Code>, <Code sm>Label</Code>, <Code sm>Divider</Code>)
            inherit colors from ancestors. Everything else (Button, Badge, Card, etc.) uses its own CSS rule
            and is visually self-contained.
          </Text>

          {/* ═══ 1. TEXT INHERITS FROM FILLED PARENT ══════════════════════ */}
          <Divider />
          <SectionTitle>1. Text Components Inherit</SectionTitle>

          <Card>
            <Title>Text, Title, Label, and Divider pick up the parent's palette</Title>
            <Text sm secondary>
              These components default to <Code sm>inherit</Code> — they emit no data attributes
              and read CSS variables from the nearest ancestor that sets them.
            </Text>
            <Row mobileCol>
              <Card filled primary>
                <Title>Filled Primary</Title>
                <Text>Text inherits white</Text>
                <Label>Label inherits white</Label>
                <Divider />
                <Text sm>Divider inherits too</Text>
              </Card>
              <Card filled danger>
                <Title>Filled Danger</Title>
                <Text>Text inherits light</Text>
                <Label>Label inherits light</Label>
                <Divider />
                <Text sm>Everything adapts</Text>
              </Card>
              <Card filled success>
                <Title>Filled Success</Title>
                <Text>Text inherits light</Text>
                <Divider />
                <Text sm>Consistent palette</Text>
              </Card>
            </Row>
          </Card>

          {/* ═══ 2. INTERACTIVE COMPONENTS ARE SELF-CONTAINED ═════════════ */}
          <Divider />
          <SectionTitle>2. Interactive Components Are Self-Contained</SectionTitle>

          <Card>
            <Title>Button, Badge, Code, Kbd use their own CSS rule</Title>
            <Text sm secondary>
              These components emit <Code sm>data-appearance</Code> and <Code sm>data-variant</Code> by
              default, so their own CSS rule fires. They do NOT inherit from the
              parent — they're visually distinct on a filled surface.
            </Text>
            <Card filled primary>
              <Text>Text inherits (white)</Text>
              <Row flexWrap>
                <Button>Button (own rule)</Button>
                <Badge>Badge (own rule)</Badge>
                <Code>Code (own rule)</Code>
                <Kbd>Kbd (own rule)</Kbd>
              </Row>
            </Card>
          </Card>

          {/* ═══ 3. IDENTITY COMPONENTS KEEP THEIR PALETTE ═══════════════ */}
          <Divider />
          <SectionTitle>3. Identity Components Keep Their Palette</SectionTitle>

          <Card>
            <Title>Mark, Chip, Link have non-baseline defaults</Title>
            <Text sm secondary>
              <Code sm>Mark</Code> defaults to <Code sm>warning</Code>,
              <Code sm>Chip</Code> to <Code sm>secondary</Code>,
              <Code sm>Link</Code> to <Code sm>link</Code>. Their defaults deviate
              from <Code sm>primary + outline</Code>, so they always render in their
              own palette — regardless of parent context.
            </Text>
            <Card filled primary>
              <Row flexWrap itemsCenter>
                <Mark>Mark (warning)</Mark>
                <Chip>Chip (secondary)</Chip>
                <Link href="#">Link (blue)</Link>
                <Badge>Badge (primary)</Badge>
              </Row>
            </Card>
          </Card>

          {/* ═══ 4. EXPLICIT PROPS SET A SPECIFIC PALETTE ════════════════ */}
          <Divider />
          <SectionTitle>4. Explicit Props Set a Specific Palette</SectionTitle>

          <Card>
            <Title>Any component can be given an explicit appearance</Title>
            <Text sm secondary>
              When you set an appearance prop, the component uses that palette — both
              standalone and inside a filled parent. This applies to text components too.
            </Text>
            <Card filled primary>
              <Text>Inherited text (white)</Text>
              <Text danger>Explicit danger text (red)</Text>
              <Text success>Explicit success text (green)</Text>
              <Row>
                <Button danger>Danger button</Button>
                <Button success filled>Success filled button</Button>
                <Badge warning>Warning badge</Badge>
              </Row>
            </Card>
          </Card>

          {/* ═══ 5. NEAREST ANCESTOR WINS (TEXT ONLY) ════════════════════ */}
          <Divider />
          <SectionTitle>5. Nearest Ancestor Wins (Text Only)</SectionTitle>

          <Card>
            <Title>Text inherits from the closest layout that sets colors</Title>
            <Text sm secondary>
              When layouts are nested, text components read from the nearest ancestor
              with data attributes — not from the outermost one.
            </Text>
            <Card filled primary>
              <Text>White (from Card)</Text>
              <Stack outline danger>
                <Text>Red (from danger Stack, not from Card)</Text>
              </Stack>
              <Stack filled success>
                <Text>Light green (from success Stack)</Text>
              </Stack>
            </Card>
          </Card>

          {/* ═══ 6. Button SAME REGARDLESS OF CONTEXT ════════════════════ */}
          <Divider />
          <SectionTitle>6. Non-Inherit Components Look the Same Everywhere</SectionTitle>

          <Card>
            <Title>{'<Button>'} renders identically standalone vs inside filled Card</Title>
            <Text sm secondary>
              Since Button emits its own data attributes, its appearance is independent
              of the parent context. No surprises.
            </Text>
            <Row mobileCol>
              <Card>
                <Text sm bold>Standalone</Text>
                <Button>Button</Button>
                <Badge>Badge</Badge>
              </Card>
              <Card filled primary>
                <Text sm bold>Inside filled Card</Text>
                <Button>Button (same look)</Button>
                <Badge>Badge (same look)</Badge>
              </Card>
              <Card filled danger>
                <Text sm bold>Inside danger Card</Text>
                <Button>Button (still same)</Button>
                <Badge>Badge (still same)</Badge>
              </Card>
            </Row>
          </Card>

          {/* ═══ 7. TO MATCH PARENT, USE filled EXPLICITLY ═══════════════ */}
          <Divider />
          <SectionTitle>7. To Match a Filled Parent, Use filled Explicitly</SectionTitle>

          <Card>
            <Title>{'<Button filled>'} matches the parent's filled surface</Title>
            <Text sm secondary>
              If you want a button to blend into a filled Card, set <Code sm>filled</Code> on
              the button itself. Without it, the button uses its own outline palette.
            </Text>
            <Card filled primary>
              <Row>
                <Button>Default (distinct)</Button>
                <Button filled>Filled (matches Card)</Button>
              </Row>
            </Card>
            <Card filled danger>
              <Row>
                <Button>Default (distinct)</Button>
                <Button danger filled>Danger filled (matches Card)</Button>
              </Row>
            </Card>
          </Card>

          {/* ═══ 8. VARIANT WITHOUT APPEARANCE DOES NOTHING ══════════════ */}
          <Divider />
          <SectionTitle>8. Variant Without Appearance Does Nothing</SectionTitle>

          <Card>
            <Title>{'<Row filled>'} has no effect — variant needs an appearance</Title>
            <Text sm secondary>
              <Code sm>filled</Code> modifies an appearance palette. Row has no appearance
              default, so there is no palette to modify. Card works because it defaults
              to <Code sm>primary</Code>.
            </Text>
            <Row mobileCol>
              <Card>
                <Text sm bold>Row filled (ignored)</Text>
                <Row filled>
                  <Text>Still dark text</Text>
                </Row>
              </Card>
              <Card>
                <Text sm bold>Row primary filled (works)</Text>
                <Row primary filled>
                  <Text>White text</Text>
                </Row>
              </Card>
              <Card>
                <Text sm bold>Card filled (works)</Text>
                <Card filled>
                  <Text>White text</Text>
                </Card>
              </Card>
            </Row>
          </Card>

          {/* ═══ 9. FORM ELEMENTS ON FILLED SURFACES ═════════════════════ */}
          <Divider />
          <SectionTitle>9. Form Elements on Filled Surfaces</SectionTitle>

          <Card>
            <Title>Input, Checkbox, Label on filled backgrounds</Title>
            <Text sm secondary>
              <Code sm>Input</Code> and <Code sm>Checkbox</Code> use their own rules (self-contained).
              <Code sm>Label</Code> inherits from parent (text component).
            </Text>
            <Card filled primary>
              <Label>Label inherits white text</Label>
              <Input placeholder="Input uses own rule" />
              <Label>
                <Checkbox />
                Checkbox uses own rule, Label inherits
              </Label>
            </Card>
          </Card>

          {/* ═══ 10. DIVIDER ADAPTS TO CONTEXT ═══════════════════════════ */}
          <Divider />
          <SectionTitle>10. Divider Adapts to Context</SectionTitle>

          <Card>
            <Title>Divider inherits divider-color from parent</Title>
            <Text sm secondary>
              <Code sm>Divider</Code> defaults to <Code sm>inherit</Code>, so it reads
              <Code sm>--divider-color</Code> from the nearest ancestor. Filled parents
              set this to a semi-transparent white for visibility on dark surfaces.
            </Text>
            <Row mobileCol>
              <Card brand>
                <Text>Brand card</Text>
                <Divider />
                <Text>After divider</Text>
              </Card>
              <Card filled danger>
                <Text>Danger filled</Text>
                <Divider />
                <Text>Light divider on dark</Text>
              </Card>
              <Card filled success>
                <Text>Success filled</Text>
                <Divider />
                <Text>Adapts to context</Text>
              </Card>
            </Row>
          </Card>

          {/* ═══════════════════════════════════════════════════════════════
              GHOST VARIANT
              ═══════════════════════════════════════════════════════════════ */}
          <Divider xl />
          <PageTitle>Ghost Variant</PageTitle>
          <Text secondary>
            Ghost = transparent background, no border, appearance-colored text, tinted hover.
            Ideal for toolbars, inline actions, and minimal-chrome contexts.
          </Text>

          {/* ═══ GHOST BUTTONS ════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Ghost Buttons</SectionTitle>

          <Card>
            <Title>Ghost across appearances</Title>
            <Text sm secondary>
              Each appearance produces its own text color with no background or border.
              Hover reveals a light tint.
            </Text>
            <Row flexWrap>
              <Button ghost>Primary</Button>
              <Button ghost brand>Brand</Button>
              <Button ghost secondary>Secondary</Button>
              <Button ghost success>Success</Button>
              <Button ghost danger>Danger</Button>
              <Button ghost warning>Warning</Button>
              <Button ghost info>Info</Button>
            </Row>
          </Card>

          {/* ═══ GHOST VS OUTLINE VS FILLED ═══════════════════════════════ */}
          <Divider />
          <SectionTitle>Ghost vs Outline vs Filled</SectionTitle>

          <Card>
            <Title>Three variants compared</Title>
            <Text sm secondary>
              <Code sm>outline</Code> has border + bg, <Code sm>ghost</Code> has
              neither, <Code sm>filled</Code> has solid bg.
            </Text>
            <Row flexWrap>
              <Button>Outline (default)</Button>
              <Button ghost>Ghost</Button>
              <Button filled>Filled</Button>
            </Row>
            <Row flexWrap>
              <Button danger>Outline danger</Button>
              <Button ghost danger>Ghost danger</Button>
              <Button danger filled>Filled danger</Button>
            </Row>
            <Row flexWrap>
              <Badge>Outline badge</Badge>
              <Badge ghost>Ghost badge</Badge>
              <Badge filled>Filled badge</Badge>
            </Row>
          </Card>

          {/* ═══ GHOST CARD ═══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Ghost Card</SectionTitle>

          <Card>
            <Title>Ghost Card = borderless transparent container</Title>
            <Text sm secondary>
              A <Code sm>{'<Card ghost>'}</Code> has no background, no border — just layout
              (padding, gap, rounded corners). Text inside inherits the Card's text color.
            </Text>
            <Row mobileCol>
              <Card>
                <Text sm bold>Outline Card</Text>
                <Text>Has border and bg</Text>
              </Card>
              <Card ghost>
                <Text sm bold>Ghost Card</Text>
                <Text>No border, no bg</Text>
              </Card>
              <Card filled>
                <Text sm bold>Filled Card</Text>
                <Text>Dark bg, light text</Text>
              </Card>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
