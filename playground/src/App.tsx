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
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuLabel,
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

function App() {
  const [lastAction, setLastAction] = useState('(none)');

  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>Menu Component</PageTitle>
          <Text secondary>
            Dropdown menu built on top of <Code>Popup</Code> with keyboard navigation,
            ARIA roles, and focus management.
          </Text>

          {/* ═══ BASIC ════════════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Basic Usage</SectionTitle>

          <Card>
            <Title>Default Menu</Title>
            <Text sm secondary>
              Click the trigger to open. Items close the menu on click.
              Arrow keys navigate, Escape closes. Uses <Code sm>MenuSeparator</Code> instead of Divider.
            </Text>
            <Row>
              <Menu>
                <MenuTrigger>
                  <Button>Actions <ChevronDownIcon /></Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem onClick={() => setLastAction('Edit')}>
                    <EditIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={() => setLastAction('Duplicate')}>
                    Duplicate
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem danger onClick={() => setLastAction('Delete')}>
                    <TrashIcon /> Delete
                  </MenuItem>
                </MenuContent>
              </Menu>
              <Text sm secondary>Last action: <Code sm>{lastAction}</Code></Text>
            </Row>
          </Card>

          <Card>
            <Title>Disabled Items</Title>
            <Text sm secondary>
              Disabled items are skipped by keyboard navigation and show reduced opacity.
            </Text>
            <Menu>
              <MenuTrigger>
                <Button secondary>Options</Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem>Available action</MenuItem>
                <MenuItem disabled>Locked action</MenuItem>
                <MenuItem disabled>Another locked</MenuItem>
                <MenuItem>Available action 2</MenuItem>
              </MenuContent>
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
                <Menu key={size}>
                  <MenuTrigger>
                    <Button {...{ [size]: true }}>{size}</Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem {...{ [size]: true }}>First item</MenuItem>
                    <MenuItem {...{ [size]: true }}>Second item</MenuItem>
                    <MenuItem {...{ [size]: true }}>Third item</MenuItem>
                  </MenuContent>
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
            <Menu>
              <MenuTrigger>
                <Button>File</Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem>New File</MenuItem>
                <MenuItem>Open</MenuItem>
                <MenuItem info>Save As...</MenuItem>
                <MenuSeparator />
                <MenuItem warning>Export</MenuItem>
                <MenuItem danger>Delete Project</MenuItem>
              </MenuContent>
            </Menu>
          </Card>

          {/* ═══ GROUPED MENUS ═════════════════════════════════════════════ */}
          <Divider />
          <SectionTitle>Grouped Menus</SectionTitle>

          <Card>
            <Title>MenuGroup + MenuLabel</Title>
            <Text sm secondary>
              Use <Code sm>MenuGroup</Code> to cluster related items with an
              optional <Code sm>label</Code> prop. <Code sm>MenuSeparator</Code> divides sections.
            </Text>
            <Menu>
              <MenuTrigger>
                <Button>Account <ChevronDownIcon /></Button>
              </MenuTrigger>
              <MenuContent>
                <MenuGroup label="Actions">
                  <MenuItem onClick={() => setLastAction('Edit Profile')}>
                    <EditIcon /> Edit Profile
                  </MenuItem>
                  <MenuItem onClick={() => setLastAction('Settings')}>
                    Settings
                  </MenuItem>
                </MenuGroup>
                <MenuSeparator />
                <MenuGroup label="Danger Zone">
                  <MenuItem danger onClick={() => setLastAction('Delete Account')}>
                    <TrashIcon /> Delete Account
                  </MenuItem>
                </MenuGroup>
              </MenuContent>
            </Menu>
          </Card>

          <Card>
            <Title>Standalone MenuLabel</Title>
            <Text sm secondary>
              <Code sm>MenuLabel</Code> can also be used directly without <Code sm>MenuGroup</Code>.
            </Text>
            <Menu>
              <MenuTrigger>
                <Button secondary>View <ChevronDownIcon /></Button>
              </MenuTrigger>
              <MenuContent>
                <MenuLabel>Layout</MenuLabel>
                <MenuItem>Grid</MenuItem>
                <MenuItem>List</MenuItem>
                <MenuSeparator />
                <MenuLabel>Sort By</MenuLabel>
                <MenuItem>Name</MenuItem>
                <MenuItem>Date</MenuItem>
                <MenuItem>Size</MenuItem>
              </MenuContent>
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
                <Menu>
                  <MenuTrigger>
                    <Button secondary sm>
                      Manage <ChevronDownIcon />
                    </Button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem onClick={() => setLastAction('Edit Project')}>
                      <EditIcon /> Edit Project
                    </MenuItem>
                    <MenuItem onClick={() => setLastAction('Archive')}>
                      Archive
                    </MenuItem>
                    <MenuItem onClick={() => setLastAction('Settings')}>
                      Settings
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem danger onClick={() => setLastAction('Delete Project')}>
                      <TrashIcon /> Delete Project
                    </MenuItem>
                  </MenuContent>
                </Menu>
              </Row>
            </Card>
          </Card>

          <Card>
            <Title>closeOnItemClick={'{false}'}</Title>
            <Text sm secondary>
              Menu stays open after clicking items. Useful for multi-select or filter menus.
            </Text>
            <Menu closeOnItemClick={false}>
              <MenuTrigger>
                <Button>Filters</Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem onClick={() => setLastAction('Toggle: Active')}>Active</MenuItem>
                <MenuItem onClick={() => setLastAction('Toggle: Archived')}>Archived</MenuItem>
                <MenuItem onClick={() => setLastAction('Toggle: Draft')}>Draft</MenuItem>
              </MenuContent>
            </Menu>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
