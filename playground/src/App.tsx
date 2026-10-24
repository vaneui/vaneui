import { useState } from 'react';
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
  Grid3,
  Img,
  NavLink,
  CardHeader,
  CardBody,
  Container,
  Divider,
  Code,
  PageTitle,
  SectionTitle,
  Progress,
  Tooltip,
  Button,
  IconButton,
  Badge,
  Chip,
  Input,
  Checkbox,
  Label,
  Link,
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

const UPLOAD_SIZE_MB = 6;

function UploadCard() {
  const [sent, setSent] = useState(2);
  const done = sent >= UPLOAD_SIZE_MB;
  return (
    <Card sm>
      <Row justifyBetween>
        <Text sm fontSemibold>quarterly-report.pdf</Text>
        <Text sm secondary>{sent} of {UPLOAD_SIZE_MB} MB</Text>
      </Row>
      <Progress sm success={done} value={sent} max={UPLOAD_SIZE_MB} aria-label="Uploading quarterly-report.pdf" />
      <Row justifyBetween>
        <Text xs secondary>{done ? 'Upload complete' : 'Uploading to the shared drive'}</Text>
        <Button xs secondary onClick={() => setSent(done ? 0 : sent + 1)}>{done ? 'Restart' : 'Send 1 MB'}</Button>
      </Row>
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
            The new <Code sm>Progress</Code> bar, divided grids, strong borders, NavLink indicators,
            shadow sizes, light islands inside <Code sm>data-theme="dark"</Code>, and the label-sized{' '}
            <Code sm>Tooltip</Code>.
          </Text>

          {/* ═══ 1. PROGRESS ═════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Progress</SectionTitle>

          <Card>
            <Title>Basic usage</Title>
            <Text sm secondary>
              <Code sm>value</Code> fills the bar against <Code sm>max</Code> (100 by default). It
              renders one <Code sm>role="progressbar"</Code> element, so name it with{' '}
              <Code sm>aria-label</Code>.
            </Text>
            <Progress value={40} aria-label="Default progress" />
            <Progress value={3} max={8} aria-label="Step 3 of 8" />
          </Card>

          <Card>
            <Title>Sizes</Title>
            <Text sm secondary>The bar height follows the size ramp, from a 2px hairline at xs to 16px at xl.</Text>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
              <Row key={size}>
                <Text sm secondary className="w-8">{size}</Text>
                <Progress {...{ [size]: true }} value={60} flex1 aria-label={`Progress ${size}`} />
              </Row>
            ))}
          </Card>

          <Card>
            <Title>Appearances and shapes</Title>
            <Text sm secondary>
              The fill takes the appearance color and the track stays neutral. <Code sm>pill</Code> is
              the default; <Code sm>rounded</Code> and <Code sm>sharp</Code> square the ends off.
            </Text>
            {(['primary', 'accent', 'success', 'danger', 'warning', 'info'] as const).map(a => (
              <Progress key={a} {...{ [a]: true }} value={70} aria-label={`${a} progress`} />
            ))}
            <Progress lg rounded value={45} aria-label="Rounded progress" />
            <Progress lg sharp value={45} aria-label="Sharp progress" />
          </Card>

          <Card>
            <Title>Upload card</Title>
            <Text sm secondary>A file upload in a small card. Each click sends another megabyte, and the fill eases to the new width.</Text>
            <UploadCard />
          </Card>

          {/* ═══ 2. GRIDS, BORDERS, INDICATORS ═══════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Grids, borders and indicators</SectionTitle>

          <Card>
            <Title>Divided grid</Title>
            <Text sm secondary>
              <Code sm>divided</Code> swaps the gap for 1px lines in the divider color, between and
              around the cells. Give the cells their own padding.
            </Text>
            <Grid3 divided>
              {['Boolean props', 'Theme overrides', 'Dark mode', 'Tailwind CSS v4', 'Accessible', 'Server components'].map(t => (
                <Stack key={t} sm>
                  <Title sm>{t}</Title>
                  <Text sm secondary>One cell of a divided grid.</Text>
                </Stack>
              ))}
            </Grid3>
          </Card>

          <Card>
            <Title>Strong border</Title>
            <Text sm secondary>
              <Code sm>strongBorder</Code> paints the border in the appearance's strong color, for a
              selected card or a highlighted plan.
            </Text>
            <Row itemsStretch tabletStack>
              <Card sm flex1><Title sm>Starter</Title><Text sm secondary>Soft border</Text></Card>
              <Card sm flex1 strongBorder><Title sm>Team</Title><Text sm secondary>strongBorder</Text></Card>
              <Card sm flex1 accent strongBorder><Title sm>Business</Title><Text sm secondary>accent strongBorder</Text></Card>
            </Row>
          </Card>

          <Card>
            <Title>NavLink indicators</Title>
            <Text sm secondary>
              <Code sm>indicatorStart</Code> draws a rail that turns into an accent mark on the active
              or selected link. <Code sm>indicatorBottom</Code> marks the active tab. Neither moves the text.
            </Text>
            <Row itemsStart tabletStack>
              <Col noGap className="w-48">
                <NavLink href="#install" indicatorStart ghost secondary>Installation</NavLink>
                <NavLink href="#concepts" indicatorStart ghost active>Core concepts</NavLink>
                <NavLink href="#theming" indicatorStart ghost secondary>Theming</NavLink>
              </Col>
              <Col noGap role="listbox" aria-label="Search results" className="w-48">
                <NavLink role="option" aria-selected="true" indicatorStart ghost>Button</NavLink>
                <NavLink role="option" aria-selected="false" indicatorStart ghost secondary>Badge</NavLink>
              </Col>
              <Row noGap borderB>
                <NavLink href="#docs" indicatorBottom ghost sharp active fontNormal wFit>Docs</NavLink>
                <NavLink href="#playground" indicatorBottom ghost sharp secondary fontNormal wFit>Playground</NavLink>
                <NavLink href="#changelog" indicatorBottom ghost sharp secondary fontNormal wFit>Changelog</NavLink>
              </Row>
            </Row>
          </Card>

          <Card>
            <Title>Shadow sizes</Title>
            <Text sm secondary>
              <Code sm>shadow</Code> follows the component size. <Code sm>shadowXs</Code> to{' '}
              <Code sm>shadowXl</Code> pick a size on the same ramp, whatever the component size.
            </Text>
            <Row flexWrap>
              {(['shadowXs', 'shadowSm', 'shadowMd', 'shadowLg', 'shadowXl'] as const).map(s => (
                <Card key={s} sm {...{ [s]: true }}><Text sm>{s}</Text></Card>
              ))}
            </Row>
          </Card>

          <Card>
            <Title>Pointer events, whitespace and Img noShrink</Title>
            <Text sm secondary>
              Layout components take <Code sm>pointerEventsNone</Code> and{' '}
              <Code sm>whitespaceNowrap</Code>, and <Code sm>Img noShrink</Code> keeps a logo its size in a tight row.
            </Text>
            <Row whitespaceNowrap overflowHidden className="max-w-80">
              <Img noShrink src="https://vaneui.com/favicon.ico" alt="" width={24} height={24} />
              <Text sm>A long label that stays on one line and clips at the edge of its row</Text>
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

          {/* ═══ 4. TOOLTIP ══════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Tooltip</SectionTitle>

          <Card>
            <Title>Basic usage</Title>
            <Text sm secondary>
              An ink label on hover and keyboard focus, near-white in dark mode. It describes its
              trigger with <Code sm>aria-describedby</Code> and adds no tab stop.
            </Text>
            <Row flexWrap>
              <Tooltip content="Saves without leaving the page">
                <Button>Hover me</Button>
              </Tooltip>
              <Tooltip content="Focus me with the keyboard too">
                <Button secondary>Tab to me</Button>
              </Tooltip>
            </Row>
          </Card>

          <Card>
            <Title>Sizes</Title>
            <Text sm secondary>
              Size goes straight on <Code sm>Tooltip</Code>. Its text sits one step under a Button
              of the same size, and its padding and radius follow the Button ramp, so the two line up.
            </Text>
            <Row flexWrap>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Tooltip key={size} {...{ [size]: true }} content={`Tooltip ${size}`}>
                  <Button {...{ [size]: true }}>Button {size}</Button>
                </Tooltip>
              ))}
            </Row>
          </Card>

          <Card>
            <Title>Placement, arrow and colour</Title>
            <Text sm secondary>
              Placement, <Code sm>arrow</Code> and appearance are direct props too.{' '}
              <Code sm>popupProps</Code> still works.
            </Text>
            <Row flexWrap>
              <Tooltip placeBottom content="Opens below its trigger">
                <Button secondary>placeBottom</Button>
              </Tooltip>
              <Tooltip placeRight arrow content="Points at its trigger">
                <Button secondary>placeRight arrow</Button>
              </Tooltip>
              <Tooltip danger content="Deletes the project for everyone">
                <Button danger>Delete project</Button>
              </Tooltip>
              <Tooltip secondary content="The gray tooltip from earlier releases">
                <Button secondary>secondary</Button>
              </Tooltip>
            </Row>
          </Card>

          <Card>
            <Title>Long hints and screen edges</Title>
            <Text sm secondary>
              A long hint wraps inside a width cap that grows with size. On a narrow window the
              tooltips at either end line up with their trigger instead of being cut off.
            </Text>
            <Row justifyBetween>
              <Tooltip content="Add to favourites">
                <IconButton aria-label="Add to favourites"><TestSvg /></IconButton>
              </Tooltip>
              <Tooltip content="Archiving moves the conversation out of your inbox. Replies bring it back, and nothing is deleted.">
                <Button secondary>Archive</Button>
              </Tooltip>
              <Tooltip content="Archive this conversation">
                <IconButton aria-label="Archive this conversation"><TestSvg /></IconButton>
              </Tooltip>
            </Row>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
