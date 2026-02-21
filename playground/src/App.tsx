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
  IconButton,
  Chip,
  List,
  ListItem
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
            Lightweight <Code>{'<span>'}</Code> wrapper for SVG icons.
            Sizes to <Code>line-height</Code> of the parent context, inherits <Code>currentColor</Code> by default.
          </Text>

          {/* ═══ BUTTON HEIGHT COMPARISON ════════════════════════════════ */}
          <Divider />
          <SectionTitle>Button Height Comparison</SectionTitle>

          <Card>
            <Title>Same Height — Text vs SVG vs Icon</Title>
            <Text sm secondary>
              All three buttons have identical height. Bare SVG uses <Code sm>--icon-size: var(--fs)</Code> (16px).
              Icon uses <Code sm>{'calc(--fs * --lh)'}</Code> = 16px × 1.3 = 20.8px, which exactly
              equals the text line-height — so no height increase.
            </Text>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
              <Row key={size} flexWrap itemsCenter>
                <Text xs secondary className="w-8">{size}</Text>
                <Button {...{[size]: true}}>Text Only</Button>
                <Button {...{[size]: true}}><SearchIcon /> With SVG</Button>
                <Button {...{[size]: true}}><Icon {...{[size]: true}}><SearchIcon /></Icon> With Icon</Button>
              </Row>
            ))}
          </Card>

          <Card>
            <Title>Icon Inside Text — vertical-align: middle</Title>
            <Text sm secondary>
              Text uses inline formatting (not flexbox). Without <Code sm>align-middle</Code>,
              an <Code sm>inline-flex</Code> icon would sit on the text baseline and push the line
              box taller. The <Code sm>align-middle</Code> class centers the icon relative to the
              x-height, keeping the line height stable.
            </Text>
            <Card noPadding className="p-4" sm>
              <Text>No icon — baseline text height for reference.</Text>
              <Text><Icon success><CheckIcon /></Icon> Icon with align-middle — line height preserved.</Text>
              <Text>Another line of text without any icon for comparison.</Text>
              <Text><Icon danger><AlertIcon /></Icon> Alert icon inline <Icon info><InfoIcon /></Icon> multiple icons in one line.</Text>
            </Card>
          </Card>

          {/* ═══ LINE-HEIGHT ADAPTIVE SIZING ════════════════════════════ */}
          <Divider />
          <SectionTitle>Line-Height Adaptive Sizing</SectionTitle>

          <Card>
            <Title>Icon Grows to Fill Parent Line-Height</Title>
            <Text sm secondary>
              Icon size is <Code sm>{'calc(--fs * --lh)'}</Code> — it inherits
              the parent's <Code sm>--lh</Code> and scales proportionally.
              Each component has a different line-height, so the same Icon adapts automatically.
            </Text>
            <Row flexWrap itemsCenter>
              <Col noGap itemsCenter>
                <Text xs secondary>Standalone</Text>
                <Text xs secondary>(--lh: 1)</Text>
                <Icon><StarIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>In Chip</Text>
                <Text xs secondary>(--lh: 1.2)</Text>
                <Chip><Icon><StarIcon /></Icon> Featured</Chip>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>In Button</Text>
                <Text xs secondary>(--lh: 1.3)</Text>
                <Button><Icon><StarIcon /></Icon> Star</Button>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>In Badge</Text>
                <Text xs secondary>(--lh: 1.6)</Text>
                <Badge success filled><Icon><StarIcon /></Icon> OK</Badge>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>In Text</Text>
                <Text xs secondary>(--lh: 1.6)</Text>
                <Text><Icon><StarIcon /></Icon> inline</Text>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Icons in Badges — All Sizes</Title>
            <Text sm secondary>
              Just match the Badge's size prop. The icon fills the text line automatically
              because Badge's <Code sm>--lh: 1.6</Code> makes the icon 60% larger than font-size.
            </Text>
            <Stack noGap noPadding>
              {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
                <Row key={size} flexWrap itemsCenter>
                  <Text xs secondary className="w-8">{size}</Text>
                  <Badge {...{[size]: true}} success filled>
                    <Icon {...{[size]: true}}><CheckIcon /></Icon> Deployed
                  </Badge>
                  <Badge {...{[size]: true}} danger filled>
                    <Icon {...{[size]: true}}><AlertIcon /></Icon> Failed
                  </Badge>
                  <Badge {...{[size]: true}} warning filled>
                    <Icon {...{[size]: true}}><AlertIcon /></Icon> Pending
                  </Badge>
                  <Badge {...{[size]: true}} info filled>
                    <Icon {...{[size]: true}}><InfoIcon /></Icon> Running
                  </Badge>
                </Row>
              ))}
            </Stack>
          </Card>

          <Card>
            <Title>Icons in Buttons — All Sizes</Title>
            <Text sm secondary>
              Button's <Code sm>--lh: 1.3</Code> makes icons 30% larger than font-size,
              similar to IconButton's 1.25x multiplier.
            </Text>
            <Stack noGap noPadding>
              {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
                <Row key={size} flexWrap itemsCenter>
                  <Text xs secondary className="w-8">{size}</Text>
                  <Button {...{[size]: true}}><Icon {...{[size]: true}}><SearchIcon /></Icon> Search</Button>
                  <Button {...{[size]: true}} success filled><Icon {...{[size]: true}}><CheckIcon /></Icon> Approve</Button>
                  <Button {...{[size]: true}} danger><Icon {...{[size]: true}}><TrashIcon /></Icon> Delete</Button>
                </Row>
              ))}
            </Stack>
          </Card>

          <Card>
            <Title>Inline with Text</Title>
            <Text sm secondary>
              Text has <Code sm>--lh: 1.6</Code>, so icons match the text's line-height
              and align naturally without extra sizing.
            </Text>
            <Stack noGap noPadding>
              <Text><Icon success><CheckIcon /></Icon> All systems operational</Text>
              <Text><Icon danger><AlertIcon /></Icon> 3 critical alerts require attention</Text>
              <Text><Icon info><InfoIcon /></Icon> New update available — see changelog</Text>
              <Text><Icon brand><StarIcon /></Icon> You earned a new achievement</Text>
            </Stack>
          </Card>

          <Card>
            <Title>Standalone Size Scale</Title>
            <Text sm secondary>
              Outside any component, root <Code sm>--lh: 1</Code> applies.
              Icons equal font-size — compact for decorative use.
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
            <Title>Icon vs IconButton</Title>
            <Text sm secondary>
              Icon is a bare <Code sm>{'<span>'}</Code> — no padding, border, or background.
              IconButton is interactive with padding and border-radius.
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

          {/* ═══ OVERRIDING ICON SIZE ════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Overriding Icon Size</SectionTitle>

          <Card>
            <Title>Override via --icon-size CSS Variable</Title>
            <Text sm secondary>
              Set <Code sm>--icon-size</Code> directly with Tailwind arbitrary values
              to use any pixel, rem, or relative value.
            </Text>
            <Row flexWrap itemsEnd>
              <Col noGap itemsCenter>
                <Text xs secondary>16px</Text>
                <Icon className="[--icon-size:16px]" primary><StarIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>24px</Text>
                <Icon className="[--icon-size:24px]" primary><StarIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>32px</Text>
                <Icon className="[--icon-size:32px]" primary><StarIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>48px</Text>
                <Icon className="[--icon-size:48px]" primary><StarIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>64px</Text>
                <Icon className="[--icon-size:64px]" primary><StarIcon /></Icon>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Override via style Prop</Title>
            <Text sm secondary>
              Use the <Code sm>style</Code> prop for dynamic or computed sizes.
            </Text>
            <Row flexWrap itemsEnd>
              <Col noGap itemsCenter>
                <Text xs secondary>1.5rem</Text>
                <Icon style={{ '--icon-size': '1.5rem' } as React.CSSProperties} brand><HeartIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>2rem</Text>
                <Icon style={{ '--icon-size': '2rem' } as React.CSSProperties} brand><HeartIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>3rem</Text>
                <Icon style={{ '--icon-size': '3rem' } as React.CSSProperties} brand><HeartIcon /></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>4rem</Text>
                <Icon style={{ '--icon-size': '4rem' } as React.CSSProperties} brand><HeartIcon /></Icon>
              </Col>
            </Row>
          </Card>

          <Card>
            <Title>Override via Tailwind Size Classes on SVG</Title>
            <Text sm secondary>
              Add a Tailwind <Code sm>size-*</Code> class directly on the SVG to bypass
              the <Code sm>--icon-size</Code> system entirely.
              The <Code sm>{':where(svg:not([class*=\'size-\']))'}</Code> selector skips
              SVGs with explicit size classes.
            </Text>
            <Row flexWrap itemsEnd>
              <Col noGap itemsCenter>
                <Text xs secondary>size-4</Text>
                <Icon danger><svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>size-8</Text>
                <Icon danger><svg className="size-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></Icon>
              </Col>
              <Col noGap itemsCenter>
                <Text xs secondary>size-12</Text>
                <Icon danger><svg className="size-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ APPEARANCE VARIANTS ═══════════════════════════════════ */}
          <Divider />
          <SectionTitle>Appearance Variants</SectionTitle>

          <Card>
            <Title>Colored Icons</Title>
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
            <Title>Filled Variant on Dark Backgrounds</Title>
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
            <Title>currentColor Inheritance</Title>
            <Text sm secondary>
              Icon has no appearance by default — it inherits the parent's text color.
            </Text>
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

          {/* ═══ REAL-WORLD USE CASES ═════════════════════════════════ */}
          <Divider />
          <SectionTitle>Real-World Use Cases</SectionTitle>

          <Card>
            <Title>Icon + Text — Inline Labels</Title>
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
            <Title>Icon in List Items</Title>
            <List>
              <ListItem><Icon success><CheckIcon /></Icon> Authentication module</ListItem>
              <ListItem><Icon success><CheckIcon /></Icon> Database migrations</ListItem>
              <ListItem><Icon warning><AlertIcon /></Icon> API rate limiting</ListItem>
              <ListItem><Icon danger><TrashIcon /></Icon> Legacy endpoints</ListItem>
            </List>
          </Card>

          <Card>
            <Title>Feature Cards with Large Icons</Title>
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
            <Title>Hero Icon with Override</Title>
            <Text sm secondary>
              Use a large custom <Code sm>--icon-size</Code> for hero sections or empty states.
            </Text>
            <Stack itemsCenter noPadding noGap>
              <Icon className="[--icon-size:80px]" secondary><MailIcon /></Icon>
              <Title textCenter>No messages yet</Title>
              <Text secondary textCenter>When you receive messages, they'll appear here.</Text>
              <Button filled className="mt-2"><MailIcon /> Compose</Button>
            </Stack>
          </Card>

          <Card>
            <Title>Icon vs IconButton</Title>
            <Text sm secondary>
              Use <Code sm>Icon</Code> for display, <Code sm>IconButton</Code> for actions.
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

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
