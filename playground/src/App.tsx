import { useState } from 'react';
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
  Menu,
  MenuItem,
  MenuLabel,
  NavLink,
} from '../../src';

// Icons for demos
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
       width="16" height="16" aria-hidden="true">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

function App() {
  const [lastAction, setLastAction] = useState('(none)');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">

          {/* ═══════════════════════════════════════════════════════════════
              MENU COMPONENT
              ═══════════════════════════════════════════════════════════════ */}
          <PageTitle>Menu Component</PageTitle>
          <Text secondary>
            Dropdown menu built on top of <Code>Popup</Code> with keyboard navigation,
            ARIA roles, and focus management. Single-component API via <Code>trigger</Code> prop.
          </Text>

          {/* ═══ BASIC ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Basic Usage</SectionTitle>

          <Card>
            <Title>Default Menu</Title>
            <Text sm secondary>
              Click the trigger to open. Items close the menu on click.
              Arrow keys navigate, Escape closes. Uses <Code sm>Divider</Code> between sections.
            </Text>
            <Row>
              <Menu className="min-w-[180px]" bottomStart trigger={<Button>Actions <ChevronDownIcon /></Button>}>
                <MenuItem onClick={() => setLastAction('Edit')}>
                  <EditIcon /> Edit
                </MenuItem>
                <MenuItem onClick={() => setLastAction('Duplicate')}>
                  Duplicate
                </MenuItem>
                <Divider />
                <MenuItem danger onClick={() => setLastAction('Delete')}>
                  <TrashIcon /> Delete
                </MenuItem>
              </Menu>
              <Text sm secondary>Last action: <Code sm>{lastAction}</Code></Text>
            </Row>
          </Card>

          <Card>
            <Title>Disabled Items</Title>
            <Text sm secondary>
              Disabled items are skipped by keyboard navigation and show reduced opacity.
            </Text>
            <Menu trigger={<Button secondary>Options</Button>}>
              <MenuItem>Available action</MenuItem>
              <MenuItem disabled>Locked action</MenuItem>
              <MenuItem disabled>Another locked</MenuItem>
              <MenuItem>Available action 2</MenuItem>
            </Menu>
          </Card>

          {/* ═══ SIZES ═════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Size Variants</SectionTitle>

          <Card>
            <Title>MenuItem Sizes</Title>
            <Text sm secondary>
              Menu items support all 5 size variants via boolean props.
            </Text>
            <Row flexWrap>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Menu key={size} trigger={<Button {...{ [size]: true }}>{size}</Button>}>
                  <MenuItem {...{ [size]: true }}>First item</MenuItem>
                  <MenuItem {...{ [size]: true }}>Second item</MenuItem>
                  <MenuItem {...{ [size]: true }}>Third item</MenuItem>
                </Menu>
              ))}
            </Row>
          </Card>

          {/* ═══ APPEARANCES ══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Appearance Variants</SectionTitle>

          <Card>
            <Title>Mixed Appearances</Title>
            <Text sm secondary>
              Individual items can have different appearance props, useful for
              highlighting destructive or informational actions.
            </Text>
            <Menu trigger={<Button>File</Button>}>
              <MenuItem>New File</MenuItem>
              <MenuItem>Open</MenuItem>
              <MenuItem info>Save As...</MenuItem>
              <Divider />
              <MenuItem warning>Export</MenuItem>
              <MenuItem danger>Delete Project</MenuItem>
            </Menu>
          </Card>

          {/* ═══ LABELED MENUS ══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Labeled Sections</SectionTitle>

          <Card>
            <Title>MenuLabel Sections</Title>
            <Text sm secondary>
              Use <Code sm>MenuLabel</Code> to label groups of items.
              <Code sm>Divider</Code> divides sections visually.
            </Text>
            <Menu trigger={<Button>Account <ChevronDownIcon /></Button>}>
              <MenuLabel>Actions</MenuLabel>
              <MenuItem onClick={() => setLastAction('Edit Profile')}>
                <EditIcon /> Edit Profile
              </MenuItem>
              <MenuItem onClick={() => setLastAction('Settings')}>
                Settings
              </MenuItem>
              <Divider />
              <MenuLabel>Danger Zone</MenuLabel>
              <MenuItem danger onClick={() => setLastAction('Delete Account')}>
                <TrashIcon /> Delete Account
              </MenuItem>
            </Menu>
          </Card>

          {/* ═══ ICON SIZING ═══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Icon Sizing</SectionTitle>

          <Card>
            <Title>MenuItem Icons Scale with Size</Title>
            <Text sm secondary>
              SVG icons inside <Code sm>MenuItem</Code> automatically scale with the size prop
              via the <Code sm>--icon-size</Code> CSS variable. No wrapper needed.
            </Text>
            <Menu className="min-w-[220px]" bottomStart trigger={<Button>Icon Sizes <ChevronDownIcon /></Button>}>
              <MenuLabel xs><SettingsIcon /> Extra Small Label</MenuLabel>
              <MenuItem xs><EditIcon /> Extra Small (xs)</MenuItem>
              <Divider />
              <MenuLabel sm><SettingsIcon /> Small Label</MenuLabel>
              <MenuItem sm><EditIcon /> Small (sm)</MenuItem>
              <Divider />
              <MenuLabel md><SettingsIcon /> Medium Label</MenuLabel>
              <MenuItem md><EditIcon /> Medium (md)</MenuItem>
              <Divider />
              <MenuLabel lg><SettingsIcon /> Large Label</MenuLabel>
              <MenuItem lg><EditIcon /> Large (lg)</MenuItem>
              <Divider />
              <MenuLabel xl><SettingsIcon /> Extra Large Label</MenuLabel>
              <MenuItem xl><EditIcon /> Extra Large (xl)</MenuItem>
            </Menu>
          </Card>

          {/* ═══ REAL-WORLD ════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Real-World Context</SectionTitle>

          <Card>
            <Title>Card Actions Dropdown</Title>
            <Text sm secondary>
              Menu inside a card header — a common pattern for entity actions.
            </Text>
            <Card>
              <Row justifyBetween>
                <Stack noPadding noGap>
                  <Title>Project Alpha</Title>
                  <Row>
                    <Badge success filled>Active</Badge>
                    <Text sm secondary>3 members</Text>
                  </Row>
                </Stack>
                <Menu trigger={
                  <Button secondary sm>
                    Manage <ChevronDownIcon />
                  </Button>
                }>
                  <MenuItem onClick={() => setLastAction('Edit Project')}>
                    <EditIcon /> Edit Project
                  </MenuItem>
                  <MenuItem onClick={() => setLastAction('Archive')}>
                    Archive
                  </MenuItem>
                  <Divider />
                  <MenuItem danger onClick={() => setLastAction('Delete Project')}>
                    <TrashIcon /> Delete Project
                  </MenuItem>
                </Menu>
              </Row>
            </Card>
          </Card>

          {/* ═══════════════════════════════════════════════════════════════
              NAVLINK COMPONENT
              ═══════════════════════════════════════════════════════════════ */}
          <Divider xl />
          <PageTitle>NavLink Component</PageTitle>
          <Text secondary>
            Navigation link for sidebars, nav menus, and headers.
            Renders as <Code>{'<a>'}</Code> with <Code>href</Code>,
            or <Code>{'<button>'}</Code> without. Supports <Code>active</Code> state
            for current-page indication.
          </Text>

          {/* ═══ BASIC ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Basic Usage</SectionTitle>

          <Card>
            <Title>Sidebar Navigation</Title>
            <Text sm secondary>
              Basic nav links with icons. The <Code sm>active</Code> prop highlights the current page
              and sets <Code sm>aria-current="page"</Code>.
            </Text>
            <Stack noPadding noGap className="w-64">
              <NavLink href="/dashboard" active><HomeIcon /> Dashboard</NavLink>
              <NavLink href="/analytics"><ChartIcon /> Analytics</NavLink>
              <NavLink href="/users"><UserIcon /> Users</NavLink>
              <NavLink href="/settings"><SettingsIcon /> Settings with a really really really really really really really long name</NavLink>
            </Stack>
          </Card>

          <Card>
            <Title>Disabled Links</Title>
            <Text sm secondary>
              Disabled nav links show reduced opacity and are not interactive.
            </Text>
            <Stack noPadding noGap className="w-64">
              <NavLink href="/available">Available</NavLink>
              <NavLink href="/locked" disabled>Locked Section</NavLink>
              <NavLink href="/premium" disabled>Premium Only</NavLink>
              <NavLink href="/open">Open Section</NavLink>
            </Stack>
          </Card>

          {/* ═══ SIZES ═════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Size Variants</SectionTitle>

          <Card>
            <Title>All Sizes</Title>
            <Text sm secondary>
              NavLink supports all 5 size variants. Default is <Code sm>sm</Code>.
            </Text>
            <Stack noPadding noGap className="w-72">
              <NavLink href="#" xs><HomeIcon /> Extra Small (xs)</NavLink>
              <NavLink href="#" sm><HomeIcon /> Small (sm, default)</NavLink>
              <NavLink href="#" md><HomeIcon /> Medium (md)</NavLink>
              <NavLink href="#" lg><HomeIcon /> Large (lg)</NavLink>
              <NavLink href="#" xl><HomeIcon /> Extra Large (xl)</NavLink>
            </Stack>
          </Card>

          {/* ═══ ICON SIZING ═══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Icon Sizing</SectionTitle>

          <Card>
            <Title>Icons Scale with Size</Title>
            <Text sm secondary>
              SVG icons inside <Code sm>NavLink</Code> automatically scale with the size prop
              via the <Code sm>--icon-size</Code> CSS variable. Compare icon sizes across variants.
            </Text>
            <Stack noPadding noGap className="w-72">
              <NavLink href="#" xs><HomeIcon /> Extra Small (xs)</NavLink>
              <NavLink href="#" sm><HomeIcon /> Small (sm)</NavLink>
              <NavLink href="#" md><HomeIcon /> Medium (md)</NavLink>
              <NavLink href="#" lg><HomeIcon /> Large (lg)</NavLink>
              <NavLink href="#" xl><HomeIcon /> Extra Large (xl)</NavLink>
            </Stack>
          </Card>

          {/* ═══ APPEARANCES ══════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Appearance Variants</SectionTitle>

          <Card>
            <Title>Colored Nav Links</Title>
            <Text sm secondary>
              Appearance props control text and hover background colors.
            </Text>
            <Stack noPadding noGap className="w-64">
              <NavLink href="#" primary active><HomeIcon /> Primary (active)</NavLink>
              <NavLink href="#" secondary><ChartIcon /> Secondary</NavLink>
              <NavLink href="#" success><ShieldIcon /> Success</NavLink>
              <NavLink href="#" danger><UserIcon /> Danger</NavLink>
              <NavLink href="#" warning><SettingsIcon /> Warning</NavLink>
              <NavLink href="#" info><ChartIcon /> Info</NavLink>
            </Stack>
          </Card>

          <Card filled>
            <Title>Filled Variant</Title>
            <Text sm secondary>
              <Code sm>filled</Code> gives nav links a solid background color.
              Combined with <Code sm>active</Code> for emphasis.
            </Text>
            <Row>
              <Stack noPadding noGap className="w-56">
                <NavLink href="#" filled active><HomeIcon /> Active</NavLink>
                <NavLink href="#" filled><ChartIcon /> Analytics</NavLink>
                <NavLink href="#" filled><UserIcon /> Users</NavLink>
              </Stack>
              <Stack noPadding noGap className="w-56">
                <NavLink href="#" success filled active><ShieldIcon /> Active</NavLink>
                <NavLink href="#" success filled><ChartIcon /> Reports</NavLink>
                <NavLink href="#" success filled><UserIcon /> Team</NavLink>
              </Stack>
            </Row>
          </Card>

          {/* ═══ REAL-WORLD ════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Real-World Context</SectionTitle>

          <Card>
            <Title>App Sidebar</Title>
            <Text sm secondary>
              A realistic sidebar layout combining NavLink with badges and nested groups.
            </Text>
            <Card className="w-64" noPadding>
              <Stack noGap>
                <Text sm bold className="px-3 pt-3 pb-1 opacity-50">Main</Text>
                <NavLink href="/dashboard" active><HomeIcon /> Dashboard</NavLink>
                <NavLink href="/analytics">
                  <ChartIcon /> Analytics
                  <Badge sm success filled className="ml-auto">New</Badge>
                </NavLink>
                <NavLink href="/users"><UserIcon /> Users</NavLink>

                <Divider />

                <Text sm bold className="px-3 pb-1 opacity-50">System</Text>
                <NavLink href="/settings"><SettingsIcon /> Settings</NavLink>
                <NavLink href="/security"><ShieldIcon /> Security</NavLink>
                <NavLink href="/audit" disabled>Audit Log</NavLink>
              </Stack>
            </Card>
          </Card>

          <Card>
            <Title>Nested Navigation</Title>
            <Text sm secondary>
              Compose nesting with <Code sm>Stack</Code> and left padding.
              No built-in nesting — users have full control.
            </Text>
            <Stack noPadding noGap className="w-64">
              <NavLink href="/docs" active><HomeIcon /> Documentation</NavLink>
              <Stack noPadding noGap className="pl-4">
                <NavLink href="/docs/getting-started">Getting Started</NavLink>
                <NavLink href="/docs/components">Components</NavLink>
                <NavLink href="/docs/theming">Theming</NavLink>
              </Stack>
              <NavLink href="/api"><ChartIcon /> API Reference</NavLink>
              <Stack noPadding noGap className="pl-4">
                <NavLink href="/api/hooks">Hooks</NavLink>
                <NavLink href="/api/utils">Utilities</NavLink>
              </Stack>
            </Stack>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
