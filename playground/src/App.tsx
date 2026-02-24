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
  PageTitle,
  SectionTitle,
  Link,
  Blockquote,
  type ThemeProps
} from '../../src';

// Custom icon for demos
const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>Link — startIcon / endIcon with Sub-Theme</PageTitle>
          <Text secondary>
            Icons use a <Code>link.icon</Code> sub-theme (like Checkbox's multi-theme pattern).
            The <Code>inline-flex</Code> and <Code>items-center</Code> classes come from boolean prop defaults,
            not hardcoded CSS.
          </Text>

          {/* ═══ BASIC ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Basic External Links</SectionTitle>

          <Card>
            <Title>Default External Link (endIcon via theme)</Title>
            <Text sm secondary>
              The <Code sm>external</Code> prop auto-sets <Code sm>endIcon</Code> from the theme factory,
              <Code sm>{'target="_blank"'}</Code>, and <Code sm>{'rel="noopener noreferrer"'}</Code>.
            </Text>
            <Stack noGap noPadding>
              <Text><Link href="https://github.com" external>GitHub</Link> — default external link</Text>
              <Text><Link href="https://react.dev" external>React Documentation</Link> — icon inline with text</Text>
              <Text>Regular: <Link href="/about">About page</Link> (no icon, same tab)</Text>
            </Stack>
          </Card>

          {/* ═══ startIcon / endIcon ═══════════════════════════════════════ */}
          <Divider />
          <SectionTitle>startIcon &amp; endIcon</SectionTitle>

          <Card>
            <Title>startIcon — Icon Before Text</Title>
            <Text sm secondary>
              <Code sm>startIcon</Code> renders before the link text inside a <Code sm>.vane-link-start-icon</Code> wrapper.
            </Text>
            <Stack noGap noPadding>
              <Text><Link href="#" startIcon={<LockIcon />}>Secure Link</Link> — lock icon before text</Text>
              <Text><Link href="#" startIcon={<ArrowRightIcon />}>Navigate Forward</Link> — arrow before text</Text>
            </Stack>
          </Card>

          <Card>
            <Title>endIcon — Icon After Text</Title>
            <Text sm secondary>
              <Code sm>endIcon</Code> renders after the link text. When <Code sm>external</Code> is set,
              <Code sm>endIcon</Code> overrides the theme's default icon.
            </Text>
            <Stack noGap noPadding>
              <Text><Link href="#" endIcon={<ArrowRightIcon />}>Continue Reading</Link> — arrow after text</Text>
              <Text>
                <Link href="https://example.com" external endIcon={<ArrowRightIcon />}>
                  Custom external icon
                </Link> — overrides theme SVG
              </Text>
              <Text>
                <Link href="https://example.com" external endIcon={null}>
                  External, no icon
                </Link> — endIcon=null suppresses icon
              </Text>
            </Stack>
          </Card>

          <Card>
            <Title>Both startIcon and endIcon</Title>
            <Stack noGap noPadding>
              <Text>
                <Link href="#" startIcon={<LockIcon />} endIcon={<ArrowRightIcon />}>
                  Secure Navigation
                </Link>
              </Text>
              <Text>
                <Link href="https://example.com" external startIcon={<LockIcon />}>
                  Secure External
                </Link> — startIcon + theme external icon
              </Text>
            </Stack>
          </Card>

          {/* ═══ SIZING ═══════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Size Scaling</SectionTitle>

          <Card>
            <Title>Icons Scale with Link Size</Title>
            <Text sm secondary>
              Icon wrapper passes size props to the sub-theme. SVG sizing inherits
              from <Code sm>{'--icon-size: var(--fs)'}</Code>.
            </Text>
            <Stack noGap noPadding>
              <Text xs><Link href="https://example.com" xs external>Extra small external link</Link></Text>
              <Text sm><Link href="https://example.com" sm external>Small external link</Link></Text>
              <Text><Link href="https://example.com" external>Medium external link (default)</Link></Text>
              <Text lg><Link href="https://example.com" lg external>Large external link</Link></Text>
              <Text xl><Link href="https://example.com" xl external>Extra large external link</Link></Text>
            </Stack>
          </Card>

          {/* ═══ APPEARANCES ══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Appearance Variants</SectionTitle>

          <Card>
            <Title>Color Inheritance</Title>
            <Text sm secondary>
              SVG uses <Code sm>stroke="currentColor"</Code> — inherits the link's text color.
            </Text>
            <Row flexWrap>
              <Link href="#" external>link (default)</Link>
              <Link href="#" external primary>primary</Link>
              <Link href="#" external brand>brand</Link>
              <Link href="#" external accent>accent</Link>
              <Link href="#" external success>success</Link>
              <Link href="#" external danger>danger</Link>
              <Link href="#" external warning>warning</Link>
              <Link href="#" external info>info</Link>
              <Link href="#" external secondary>secondary</Link>
            </Row>
          </Card>

          {/* ═══ OVERRIDE PATTERNS ════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Override Patterns</SectionTitle>

          <Card>
            <Title>Global Override (ThemeProvider)</Title>
            <Text sm secondary>
              Override <Code sm>theme.link.main.themes.externalIcon</Code> via <Code sm>themeOverride</Code>.
            </Text>
            <ThemeProvider themeOverride={(theme: ThemeProps) => {
              theme.link.main.themes.externalIcon = () => <ArrowRightIcon />;
              return theme;
            }}>
              <Stack noGap noPadding>
                <Text>
                  <Link href="https://example.com" external>All links use arrow icon</Link>
                </Text>
                <Text>
                  <Link href="https://docs.example.com" external>Documentation</Link> — same global icon
                </Text>
              </Stack>
            </ThemeProvider>
          </Card>

          {/* ═══ IN CONTEXT ═══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Real-World Context</SectionTitle>

          <Card>
            <Title>Inline in Body Text</Title>
            <Stack noGap noPadding>
              <Text>
                Check the source on <Link href="https://github.com" external>GitHub</Link> and
                read the <Link href="https://docs.example.com" external>documentation</Link> for setup.
              </Text>
              <Text>
                Built with <Link href="https://react.dev" external>React</Link>,{' '}
                <Link href="https://tailwindcss.com" external>Tailwind CSS</Link>, and{' '}
                <Link href="https://www.typescriptlang.org" external>TypeScript</Link>.
              </Text>
            </Stack>
          </Card>

          <Card>
            <Title>Inside Blockquote</Title>
            <Blockquote info>
              See the <Link href="https://example.com/api" external>API reference</Link> for
              all available endpoints and <Link href="https://example.com/auth" external>authentication docs</Link> for setup.
            </Blockquote>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
