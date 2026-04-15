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
} from '../../src';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>Variants: Filled, Outline, Ghost & Transparent</PageTitle>
          <Text secondary>
            Exploring how <Code sm>filled</Code>, <Code sm>outline</Code>,
            <Code sm>ghost</Code>, and the <Code sm>transparent</Code> modifier interact.
          </Text>

          {/* ═══ 1. THREE VARIANTS SIDE BY SIDE ═════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Three Variants Side by Side</SectionTitle>

          <Card>
            <Title>Outline (default) vs Filled vs Ghost</Title>
            <Text sm secondary>
              Currently these are mutually exclusive. Ghost = transparent bg + no border.
            </Text>
            <Row flexWrap>
              <Button>Outline</Button>
              <Button filled>Filled</Button>
              <Button ghost>Ghost</Button>
            </Row>
            <Row flexWrap>
              <Button danger>Outline</Button>
              <Button danger filled>Filled</Button>
              <Button danger ghost>Ghost</Button>
            </Row>
            <Row flexWrap>
              <Button success>Outline</Button>
              <Button success filled>Filled</Button>
              <Button success ghost>Ghost</Button>
            </Row>
            <Row flexWrap>
              <Badge>Outline</Badge>
              <Badge filled>Filled</Badge>
              <Badge ghost>Ghost</Badge>
            </Row>
            <Row flexWrap>
              <Chip>Outline</Chip>
              <Chip filled>Filled</Chip>
              <Chip ghost>Ghost</Chip>
            </Row>
          </Card>

          {/* ═══ 2. THE PROBLEM: GHOST ON FILLED SURFACES ═══════════════════ */}
          <Divider />
          <SectionTitle>2. The Problem: Ghost on Filled Surfaces</SectionTitle>

          <Card>
            <Title>Ghost buttons inside filled cards</Title>
            <Text sm secondary>
              Ghost text color is appearance-colored (dark blue on primary). On a filled
              primary card (dark blue bg), this creates poor contrast.
            </Text>
            <Row mobileCol>
              <Card filled primary>
                <Text sm bold>Filled Primary Card</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button ghost danger>Ghost Danger</Button>
                  <Button ghost success>Ghost Success</Button>
                </Row>
              </Card>
              <Card filled danger>
                <Text sm bold>Filled Danger Card</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button ghost danger>Ghost Danger</Button>
                </Row>
              </Card>
              <Card filled brand>
                <Text sm bold>Filled Brand Card</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button ghost brand>Ghost Brand</Button>
                </Row>
              </Card>
            </Row>
          </Card>

          {/* ═══ 3. TRANSPARENT MODIFIER ON FILLED ══════════════════════════ */}
          <Divider />
          <SectionTitle>3. Transparent Modifier on Filled</SectionTitle>

          <Card>
            <Title>{'<Button filled transparent>'} — filled palette, no background</Title>
            <Text sm secondary>
              The <Code sm>transparent</Code> prop suppresses the background.
              Combined with <Code sm>filled</Code>, it keeps the filled text color
              (white/contrast) but removes the solid background. Compare with ghost.
            </Text>
            <Row mobileCol>
              <Card filled primary>
                <Text sm bold>Inside Filled Primary</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button filled transparent>Filled Transparent</Button>
                  <Button filled>Filled</Button>
                </Row>
              </Card>
              <Card filled danger>
                <Text sm bold>Inside Filled Danger</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button filled transparent>Filled Transparent</Button>
                  <Button danger filled>Danger Filled</Button>
                </Row>
              </Card>
              <Card filled success>
                <Text sm bold>Inside Filled Success</Text>
                <Row flexWrap>
                  <Button ghost>Ghost</Button>
                  <Button filled transparent>Filled Transparent</Button>
                  <Button success filled>Success Filled</Button>
                </Row>
              </Card>
            </Row>
          </Card>

          <Card>
            <Title>Filled transparent vs ghost — standalone (no filled parent)</Title>
            <Text sm secondary>
              On a neutral background, how do they compare?
            </Text>
            <Row flexWrap>
              <Button ghost>Ghost</Button>
              <Button filled transparent>Filled Transparent</Button>
              <Button>Outline (default)</Button>
            </Row>
            <Row flexWrap>
              <Button ghost danger>Ghost Danger</Button>
              <Button danger filled transparent>Filled Transparent Danger</Button>
              <Button danger>Outline Danger</Button>
            </Row>
          </Card>

          {/* ═══ 4. TRANSPARENT ON OUTLINE ══════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Transparent Modifier on Outline</SectionTitle>

          <Card>
            <Title>{'<Button transparent>'} — outline palette, no background</Title>
            <Text sm secondary>
              Without <Code sm>filled</Code>, <Code sm>transparent</Code> applies to the
              default outline variant. Compare: outline keeps the bg + border,
              ghost removes both, outline+transparent removes bg only.
            </Text>
            <Row flexWrap>
              <Button>Outline</Button>
              <Button transparent>Outline Transparent</Button>
              <Button ghost>Ghost</Button>
            </Row>
            <Row flexWrap>
              <Button danger>Outline Danger</Button>
              <Button danger transparent>Outline Transparent Danger</Button>
              <Button danger ghost>Ghost Danger</Button>
            </Row>
          </Card>

          {/* ═══ 5. BADGES & CHIPS WITH TRANSPARENT ═════════════════════════ */}
          <Divider />
          <SectionTitle>5. Badges & Chips with Transparent</SectionTitle>

          <Card>
            <Title>Badge: filled transparent vs ghost vs outline</Title>
            <Row flexWrap>
              <Badge>Outline</Badge>
              <Badge transparent>Outline Transparent</Badge>
              <Badge ghost>Ghost</Badge>
              <Badge filled>Filled</Badge>
              <Badge filled transparent>Filled Transparent</Badge>
            </Row>
            <Row flexWrap>
              <Badge danger>Outline</Badge>
              <Badge danger transparent>Outline Transparent</Badge>
              <Badge danger ghost>Ghost</Badge>
              <Badge danger filled>Filled</Badge>
              <Badge danger filled transparent>Filled Transparent</Badge>
            </Row>
          </Card>

          <Card>
            <Title>Badges on filled surfaces</Title>
            <Row mobileCol>
              <Card filled primary>
                <Text sm bold>Filled Primary</Text>
                <Row flexWrap>
                  <Badge ghost>Ghost</Badge>
                  <Badge filled transparent>Filled Transparent</Badge>
                  <Badge filled>Filled</Badge>
                </Row>
              </Card>
              <Card filled danger>
                <Text sm bold>Filled Danger</Text>
                <Row flexWrap>
                  <Badge ghost>Ghost</Badge>
                  <Badge filled transparent>Filled Transparent</Badge>
                  <Badge filled>Filled</Badge>
                </Row>
              </Card>
            </Row>
          </Card>

          <Card>
            <Title>Chip: filled transparent vs ghost vs outline</Title>
            <Row flexWrap>
              <Chip>Outline</Chip>
              <Chip transparent>Outline Transparent</Chip>
              <Chip ghost>Ghost</Chip>
              <Chip filled>Filled</Chip>
              <Chip filled transparent>Filled Transparent</Chip>
            </Row>
          </Card>

          {/* ═══ 6. TOOLBAR ON FILLED SURFACE ═══════════════════════════════ */}
          <Divider />
          <SectionTitle>6. Real-World: Toolbar on Filled Surface</SectionTitle>

          <Card>
            <Title>Toolbar buttons inside a filled header</Title>
            <Text sm secondary>
              This is the use case: action buttons on a colored toolbar. Which approach
              gives the best visual result?
            </Text>
            <Card filled primary noPadding>
              <Row className="px-4 py-2">
                <Text bold>Toolbar</Text>
                <Row className="ml-auto">
                  <Button sm ghost>Ghost</Button>
                  <Button sm filled transparent>Transparent</Button>
                  <Button sm filled>Filled</Button>
                </Row>
              </Row>
            </Card>
            <Card filled brand noPadding>
              <Row className="px-4 py-2">
                <Text bold>Toolbar</Text>
                <Row className="ml-auto">
                  <Button sm ghost>Ghost</Button>
                  <Button sm filled transparent>Transparent</Button>
                  <Button sm filled>Filled</Button>
                </Row>
              </Row>
            </Card>
            <Card filled danger noPadding>
              <Row className="px-4 py-2">
                <Text bold>Toolbar</Text>
                <Row className="ml-auto">
                  <Button sm ghost>Ghost</Button>
                  <Button sm filled transparent>Transparent</Button>
                  <Button sm filled>Filled</Button>
                </Row>
              </Row>
            </Card>
          </Card>

          {/* ═══ 7. ALL APPEARANCES — FILLED TRANSPARENT ════════════════════ */}
          <Divider />
          <SectionTitle>7. All Appearances — Filled Transparent</SectionTitle>

          <Card>
            <Title>Every appearance with filled transparent</Title>
            <Row flexWrap>
              <Button filled transparent>Primary</Button>
              <Button filled transparent brand>Brand</Button>
              <Button filled transparent accent>Accent</Button>
              <Button filled transparent secondary>Secondary</Button>
              <Button filled transparent tertiary>Tertiary</Button>
              <Button filled transparent success>Success</Button>
              <Button filled transparent danger>Danger</Button>
              <Button filled transparent warning>Warning</Button>
              <Button filled transparent info>Info</Button>
            </Row>
            <Title>Same, ghost for comparison</Title>
            <Row flexWrap>
              <Button ghost>Primary</Button>
              <Button ghost brand>Brand</Button>
              <Button ghost accent>Accent</Button>
              <Button ghost secondary>Secondary</Button>
              <Button ghost tertiary>Tertiary</Button>
              <Button ghost success>Success</Button>
              <Button ghost danger>Danger</Button>
              <Button ghost warning>Warning</Button>
              <Button ghost info>Info</Button>
            </Row>
          </Card>

          {/* ═══ 8. SIZE VARIANTS WITH TRANSPARENT ══════════════════════════ */}
          <Divider />
          <SectionTitle>8. Size Variants with Transparent</SectionTitle>

          <Card>
            <Title>Filled transparent at different sizes</Title>
            <Row flexWrap itemsCenter>
              <Button xs filled transparent>xs</Button>
              <Button sm filled transparent>sm</Button>
              <Button filled transparent>md</Button>
              <Button lg filled transparent>lg</Button>
              <Button xl filled transparent>xl</Button>
            </Row>
            <Title>Ghost at different sizes</Title>
            <Row flexWrap itemsCenter>
              <Button xs ghost>xs</Button>
              <Button sm ghost>sm</Button>
              <Button ghost>md</Button>
              <Button lg ghost>lg</Button>
              <Button xl ghost>xl</Button>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
