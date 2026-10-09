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
  Field,
  Alert,
  Spinner,
  Tooltip,
  Button,
  IconButton,
  Icon,
  Badge,
  Chip,
  Input,
  Checkbox,
  Textarea,
  Select,
  Switch,
  Radio,
  RadioGroup,
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

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          <PageTitle>VaneUI Playground</PageTitle>
          <Text secondary>
            Icon container mode, the <Code sm>data-theme="dark"</Code> color-scheme comparison,
            and the label-sized <Code sm>Tooltip</Code>.
          </Text>

          {/* ═══ 1. ICON — CONTAINER MODE ════════════════════════════════════ */}
          <Divider />
          <SectionTitle>1. Icon — Container Mode</SectionTitle>

          <Card>
            <Title>Badge recipes</Title>
            <Text sm secondary>
              <Code sm>padding</Code> + <Code sm>filled</Code>/<Code sm>border</Code>/
              <Code sm>ring</Code> + shape + appearance produce a self-contained
              icon badge.
            </Text>
            <Row flexWrap>
              <Col>
                <Text sm fontBold>filled rounded</Text>
                <Icon padding primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>filled pill</Text>
                <Icon padding pill success filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>filled sharp</Text>
                <Icon padding sharp danger filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>border pill</Text>
                <Icon padding pill warning border><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>ring pill</Text>
                <Icon padding pill primary insetRing><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>ring + filled</Text>
                <Icon padding pill primary filled insetRing><TestSvg /></Icon>
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
                <Text sm fontBold>xs</Text>
                <Icon xs padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>sm</Text>
                <Icon sm padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>md</Text>
                <Icon padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>lg</Text>
                <Icon lg padding pill primary filled><TestSvg /></Icon>
              </Col>
              <Col>
                <Text sm fontBold>xl</Text>
                <Icon xl padding pill primary filled><TestSvg /></Icon>
              </Col>
            </Row>
          </Card>

          {/* ═══ 2. DARK MODE ════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>2. Dark Mode</SectionTitle>

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

          {/* ═══ 3. TABLE ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>3. Table</SectionTitle>

          <Card>
            <Title>Row-rule table (light and dark)</Title>
            <Text sm secondary>
              <Code sm>Table</Code> + <Code sm>Thead/Tbody/Tr/Th/Td</Code> render
              a clean, dark-mode-correct table — <Code sm>secondary</Code> cell
              borders give the 1px row rule and a muted semibold header, with
              size-scaled cell padding. Wrap in <Code sm>{'<Col overflowXAuto>'}</Code>{' '}
              for horizontal scroll.
            </Text>
            <Row itemsStretch tabletStack>
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

          {/* ═══ 4. FORM CONTROLS ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>4. Form controls</SectionTitle>

          <Card>
            <Title>Sizes</Title>
            <Text sm secondary>
              Every control shares the size ramp. <Code sm>Textarea</Code> and{' '}
              <Code sm>Select</Code> follow the <Code sm>Input</Code> scale;{' '}
              <Code sm>Switch</Code> and <Code sm>Radio</Code> follow the{' '}
              <Code sm>Checkbox</Code> scale.
            </Text>
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
              <Row key={size} itemsCenter flexWrap>
                <Text sm secondary className="w-8">{size}</Text>
                <Select {...{ [size]: true }} className="w-40">
                  <option>Cyprus</option>
                  <option>Estonia</option>
                </Select>
                <Textarea {...{ [size]: true }} className="w-48" placeholder="Notes" />
                <Switch {...{ [size]: true }} defaultChecked />
                <Radio {...{ [size]: true }} name={`size-${size}`} defaultChecked />
              </Row>
            ))}
          </Card>

          <Card>
            <Title>Appearances and states</Title>
            <Text sm secondary>
              Controls take the same appearance props as the rest of the library.{' '}
              <Code sm>invalid</Code> emits <Code sm>aria-invalid</Code> plus a danger
              border, so the error state is never colour-only.
            </Text>
            <Row flexWrap itemsCenter>
              {(['primary', 'success', 'danger', 'warning', 'info'] as const).map(a => (
                <Switch key={a} {...{ [a]: true }} defaultChecked />
              ))}
              <Switch disabled />
              <Switch defaultChecked disabled />
            </Row>
            <Row flexWrap itemsStart>
              <Textarea invalid className="w-56" placeholder="Invalid textarea" />
              <Select invalid className="w-40">
                <option>Invalid select</option>
              </Select>
              <Select disabled className="w-40">
                <option>Disabled</option>
              </Select>
            </Row>
          </Card>

          <Card>
            <Title>A real form</Title>
            <Text sm secondary>
              Controls sit inside <Code sm>Label</Code>, which stacks label above field
              and propagates its size down. Use <Code sm>{'<Label row>'}</Code> for
              inline controls.
            </Text>
            <Stack noPadding>
              <Label>
                Country
                <Select>
                  <option>Cyprus</option>
                  <option>Estonia</option>
                  <option>Portugal</option>
                </Select>
              </Label>
              <Label>
                Notes
                <Textarea placeholder="Anything we should know?" />
              </Label>
              <Label>
                Plan
                <RadioGroup name="plan" defaultValue="pro">
                  <Label row><Radio value="free" /> Free</Label>
                  <Label row><Radio value="pro" /> Pro</Label>
                  <Label row><Radio value="team" /> Team</Label>
                </RadioGroup>
              </Label>
              <Label row><Switch defaultChecked /> Email notifications</Label>
              <Label row><Checkbox /> I agree to the terms</Label>
            </Stack>
          </Card>

          {/* ═══ 5. FIELD, ALERT, SPINNER ═════════════════════════════ */}
          <Divider />
          <SectionTitle>5. Field, Alert, Spinner</SectionTitle>

          <Card>
            <Title>Field</Title>
            <Text sm secondary>
              <Code sm>Field</Code> owns the id, points the label at the control, and links
              the help and error text with <Code sm>aria-describedby</Code>. An{' '}
              <Code sm>error</Code> also marks the control invalid.
            </Text>
            <Field label="Work email" description="Used for billing receipts.">
              <Input type="email" placeholder="you@company.com" />
            </Field>
            <Field label="Display name" error="This name is already taken.">
              <Input defaultValue="evgenii" />
            </Field>
            <Field lg label="Large field" description="Field size cascades to the control.">
              <Input placeholder="lg" />
            </Field>
          </Card>

          <Card>
            <Title>Field — self-rendering</Title>
            <Text sm secondary>
              Skip the child control: pass <Code sm>type</Code> or a control boolean and{' '}
              <Code sm>Field</Code> renders it. <Code sm>checkbox</Code>/<Code sm>switch</Code>{' '}
              lay out inline with their label, and the row-to-label gap scales with size.
            </Text>
            <Field type="email" label="Work email" description="Used for billing receipts." />
            <Field select label="Region" description="Sets your default currency.">
              <option>Cyprus</option>
              <option>Estonia</option>
            </Field>
            <Row flexWrap itemsStart>
              <Field xs checkbox label="Subscribe (xs)" />
              <Field xl checkbox label="Subscribe (xl)" />
            </Row>
          </Card>

          <Card>
            <Title>Alert</Title>
            <Text sm secondary>
              A live region: <Code sm>role=&quot;alert&quot;</Code> by default,{' '}
              <Code sm>role=&quot;status&quot;</Code> with <Code sm>polite</Code>.
            </Text>
            <Alert info>Scheduled maintenance starts at 02:00 UTC.</Alert>
            <Alert success polite>Your changes were saved.</Alert>
            <Alert warning>Your trial ends in three days.</Alert>
            <Alert danger filled>Payment failed. Update your card to continue.</Alert>
          </Card>

          <Card>
            <Title>Spinner</Title>
            <Text sm secondary>
              <Code sm>Spinner</Code> scales with the size ramp and takes its colour from the
              appearance.
            </Text>
            <Row flexWrap>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Spinner key={size} {...{ [size]: true }} aria-label={`Loading ${size}`} />
              ))}
              <Spinner success aria-label="Loading success" />
              <Spinner danger aria-label="Loading danger" />
              <Button loading>Loading button</Button>
            </Row>
          </Card>

          {/* ═══ 6. TOOLTIP ══════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>6. Tooltip</SectionTitle>

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
