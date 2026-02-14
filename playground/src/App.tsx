import React, { useState, useRef } from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Stack,
  Card, Checkbox, Label, Link, Input, Button,
  Container, Badge, Divider, Chip, Code, PageTitle, Grid2,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Overlay, Popup, PopupTrigger
} from '../../src';
import { ColorTable } from './ColorTable';

// ─── Popup Demos (same as vaneui-web docs) ─────────────────────────────────

function BasicPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Popup</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <Text bold>Popup Content</Text>
        <Text sm>This popup appears above the button.</Text>
      </Popup>
    </div>
  );
}

function PlacementPopupDemo() {
  const [openPlacement, setOpenPlacement] = useState<string | null>(null);
  const refs = {
    top: useRef<HTMLButtonElement>(null),
    topStart: useRef<HTMLButtonElement>(null),
    topEnd: useRef<HTMLButtonElement>(null),
    bottom: useRef<HTMLButtonElement>(null),
    bottomStart: useRef<HTMLButtonElement>(null),
    bottomEnd: useRef<HTMLButtonElement>(null),
    left: useRef<HTMLButtonElement>(null),
    leftStart: useRef<HTMLButtonElement>(null),
    leftEnd: useRef<HTMLButtonElement>(null),
    right: useRef<HTMLButtonElement>(null),
    rightStart: useRef<HTMLButtonElement>(null),
    rightEnd: useRef<HTMLButtonElement>(null),
  };

  const groups = [
    { label: 'Top', placements: ['top', 'topStart', 'topEnd'] as const },
    { label: 'Bottom', placements: ['bottom', 'bottomStart', 'bottomEnd'] as const },
    { label: 'Left', placements: ['left', 'leftStart', 'leftEnd'] as const },
    { label: 'Right', placements: ['right', 'rightStart', 'rightEnd'] as const },
  ];

  return (
    <Row flexWrap justifyCenter>
      {groups.map(({ label, placements }) => (
        <Card key={label} sm>
          <Text sm bold>{label}</Text>
          <Row>
            {placements.map((key) => (
              <div key={key}>
                <Button
                  ref={refs[key]}
                  xs
                  onClick={() => setOpenPlacement(openPlacement === key ? null : key)}
                >
                  {key}
                </Button>
                <Popup
                  open={openPlacement === key}
                  onClose={() => setOpenPlacement(null)}
                  anchorRef={refs[key]}
                  {...{[key]: true}}
                >
                  <Text sm>{key}</Text>
                </Popup>
              </div>
            ))}
          </Row>
        </Card>
      ))}
    </Row>
  );
}

function MatchWidthPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)} style={{ width: 250 }}>
        Select an option
      </Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} matchWidth noGap>
        <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 1</Button>
        <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 2</Button>
        <Button sm secondary noShadow noRing justifyStart onClick={() => setOpen(false)}>Option 3</Button>
      </Popup>
    </div>
  );
}

function PopupWithContentDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => {
        console.log("CLICK")
        setOpen(!open)}
      }>User Menu</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <Text bold>John Doe</Text>
        <Text sm secondary>john@example.com</Text>
        <Row sm>
          <Button sm>Profile</Button>
          <Button sm>Settings</Button>
          <Button sm danger onClick={() => setOpen(false)}>Sign Out</Button>
        </Row>
      </Popup>
    </div>
  );
}

// ─── Modal Demos (same as vaneui-web docs) ──────────────────────────────────

function BasicModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack lg>
          <Text bold lg>Confirm Action</Text>
          <Text>Are you sure you want to proceed? This action cannot be undone.</Text>
          <Row justifyEnd>
            <Button sm onClick={() => setOpen(false)}>Cancel</Button>
            <Button sm primary filled onClick={() => setOpen(false)}>Confirm</Button>
          </Row>
        </Stack>
      </Modal>
    </div>
  );
}

function ModalSizesDemo() {
  const [openSm, setOpenSm] = useState(false);
  const [openLg, setOpenLg] = useState(false);
  return (
    <Row>
      <Button primary onClick={() => setOpenSm(true)}>Small Modal</Button>
      <Button primary onClick={() => setOpenLg(true)}>Large Modal</Button>
      <Modal open={openSm} onClose={() => setOpenSm(false)} sm>
        <Stack>
          <Text bold>Small Modal</Text>
          <Text>Compact content area.</Text>
          <Button sm onClick={() => setOpenSm(false)}>Close</Button>
        </Stack>
      </Modal>
      <Modal open={openLg} onClose={() => setOpenLg(false)} lg>
        <Stack>
          <Text bold>Large Modal</Text>
          <Text>A wider content area for more complex content.</Text>
          <Button sm onClick={() => setOpenLg(false)}>Close</Button>
        </Stack>
      </Modal>
    </Row>
  );
}

function FormModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Open Form Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack lg>
          <Text bold lg>Create Account</Text>
          <Stack>
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </Stack>
          <Stack>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </Stack>
          <Checkbox>I agree to the terms and conditions</Checkbox>
          <Row justifyEnd>
            <Button sm onClick={() => setOpen(false)}>Cancel</Button>
            <Button sm primary filled onClick={() => setOpen(false)}>Create</Button>
          </Row>
        </Stack>
      </Modal>
    </div>
  );
}

function BlurModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Modal with Blur</Button>
      <Modal open={open} onClose={() => setOpen(false)} overlayProps={{ blur: true }}>
        <Stack lg>
          <Text bold lg>Blurred Background</Text>
          <Text>The overlay behind this modal uses a blur effect.</Text>
          <Button sm primary filled onClick={() => setOpen(false)}>Close</Button>
        </Stack>
      </Modal>
    </div>
  );
}

function NonDismissibleModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Non-dismissible Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeOnOverlayClick={false} closeOnEscape={false}>
        <Stack lg>
          <Text bold lg>Important Notice</Text>
          <Text>This modal cannot be closed by clicking outside or pressing Escape. You must use the button below.</Text>
          <Button sm primary filled onClick={() => setOpen(false)}>I Understand</Button>
        </Stack>
      </Modal>
    </div>
  );
}

function AppearanceModalDemo() {
  const [openPrimary, setOpenPrimary] = useState(false);
  const [openDanger, setOpenDanger] = useState(false);
  return (
    <Row>
      <Button primary onClick={() => setOpenPrimary(true)}>Primary Modal</Button>
      <Button danger onClick={() => setOpenDanger(true)}>Danger Modal</Button>
      <Modal primary open={openPrimary} onClose={() => setOpenPrimary(false)}>
        <Stack lg>
          <Text bold lg>Primary Modal</Text>
          <Text>This modal uses the primary appearance with filled variant.</Text>
          <Button sm onClick={() => setOpenPrimary(false)}>Close</Button>
        </Stack>
      </Modal>
      <Modal danger open={openDanger} onClose={() => setOpenDanger(false)}>
        <Stack lg>
          <Text bold lg>Danger Modal</Text>
          <Text>This modal uses the danger appearance for destructive actions.</Text>
          <Button sm onClick={() => setOpenDanger(false)}>Close</Button>
        </Stack>
      </Modal>
    </Row>
  );
}

// ─── Overlay Demos (same as vaneui-web docs) ────────────────────────────────

function BasicOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Text xl bold filled>Click anywhere to close</Text>
      </Overlay>
    </div>
  );
}

function OverlayWithContentDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Overlay with Content</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Overlay Content</Text>
            <Text>This card is centered inside the overlay. Click outside the card to close.</Text>
            <Button primary sm onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

function BlurOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Blur Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)} blur>
        <Text xl bold filled>Blurred Background</Text>
      </Overlay>
    </div>
  );
}

function NonDismissibleOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Show Loading Overlay</Button>
      <Overlay open={open} pointerEventsNone>
        <Stack itemsCenter>
          <Text xl bold filled>Loading...</Text>
          <Button sm danger onClick={() => setOpen(false)} style={{ pointerEvents: 'auto' }}>Cancel</Button>
        </Stack>
      </Overlay>
    </div>
  );
}

// ─── NEW: Compound Modal Demos ───────────────────────────────────────────────

function CompoundModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Compound Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeButton>
        <ModalHeader>
          <Title>Edit Profile</Title>
        </ModalHeader>
        <ModalBody>
          <Stack>
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
          </Stack>
          <Stack>
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
          </Stack>
          <Stack>
            <Label>Bio</Label>
            <Input placeholder="Tell us about yourself" />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
          <Button filled onClick={() => setOpen(false)}>Save Changes</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function CloseButtonModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Modal with Close Button</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeButton>
        <Title>Notice</Title>
        <Text>This modal has a close button in the top-right corner. Click it or press Escape to dismiss.</Text>
      </Modal>
    </div>
  );
}

function FullScreenModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Full-Screen Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} fullScreen closeButton>
        <ModalHeader>
          <Title>Full-Screen Editor</Title>
        </ModalHeader>
        <ModalBody>
          <Text>This modal takes up the entire viewport. Useful for immersive editors, media viewers, or complex workflows.</Text>
          <Card secondary>
            <Text mono sm>// Your full-screen content goes here</Text>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOpen(false)}>Close</Button>
          <Button filled onClick={() => setOpen(false)}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function TopAlignedModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Top-Aligned Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} centered={false} closeButton>
        <ModalHeader>
          <Title>Notifications</Title>
        </ModalHeader>
        <ModalBody>
          <Text>This modal is aligned to the top of the viewport instead of being centered vertically. Useful for notification panels or search dialogs.</Text>
        </ModalBody>
        <ModalFooter>
          <Button filled onClick={() => setOpen(false)}>Dismiss All</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function NoAnimationModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>No Animation Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} noAnimation closeButton>
        <Title>Instant Open</Title>
        <Text>This modal appears and disappears instantly with no enter/exit animation. Set <Code sm>noAnimation</Code> to disable transitions.</Text>
      </Modal>
    </div>
  );
}

function AnimatedModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Animated Modal (200ms)</Button>
      <Modal open={open} onClose={() => setOpen(false)} closeButton>
        <ModalHeader>
          <Title>Smooth Animation</Title>
        </ModalHeader>
        <ModalBody>
          <Text>This modal uses the default 200ms scale + fade animation. The overlay fades in while the content scales up from 95%.</Text>
          <Text sm secondary>Open and close this modal to see the enter/exit transitions.</Text>
        </ModalBody>
        <ModalFooter>
          <Button filled onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function AnimatedPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button secondary ref={anchorRef} onClick={() => setOpen(!open)}>Animated Popup</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
        <Text bold>Popup Animation</Text>
        <Text sm>Popups use the same 200ms scale + fade transition.</Text>
      </Popup>
    </div>
  );
}

function AnimatedOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button accent onClick={() => setOpen(true)}>Animated Overlay</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Overlay Animation</Text>
            <Text>The overlay backdrop uses a 200ms fade transition.</Text>
            <Button filled sm onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

function NestedModalsDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOuter(true)}>Nested Modals (Z-Index)</Button>
      <Modal open={outer} onClose={() => setOuter(false)} closeButton>
        <ModalHeader>
          <Title>Outer Modal</Title>
        </ModalHeader>
        <ModalBody>
          <Text>This demonstrates z-index stacking. Each new modal gets a higher z-index automatically.</Text>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOuter(false)}>Close</Button>
          <Button filled onClick={() => setInner(true)}>Open Inner Modal</Button>
        </ModalFooter>
      </Modal>
      <Modal open={inner} onClose={() => setInner(false)} sm closeButton>
        <Title>Inner Modal</Title>
        <Text>This modal stacks above the outer one with a higher z-index.</Text>
        <Button filled onClick={() => setInner(false)}>Close Inner</Button>
      </Modal>
    </div>
  );
}

function KeepMountedModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOpen(!open)}>{open ? 'Close' : 'Open'} keepMounted Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted closeButton>
        <Title>Preserved State</Title>
        <Text>This modal stays in the DOM when closed (hidden with display:none). Useful when you want to preserve form state or avoid re-mounting expensive content.</Text>
        <Input placeholder="Type something, close, then re-open..." />
      </Modal>
    </div>
  );
}

// ─── NEW: PopupTrigger Demos ─────────────────────────────────────────────────

function ClickTriggerDemo() {
  return (
    <PopupTrigger popup={
      <Stack sm noPadding>
        <Text bold sm>Dropdown Menu</Text>
        <Button sm secondary noShadow noRing justifyStart>Profile</Button>
        <Button sm secondary noShadow noRing justifyStart>Settings</Button>
        <Button sm danger noShadow noRing justifyStart>Sign Out</Button>
      </Stack>
    }>
      <Button primary>Click Menu</Button>
    </PopupTrigger>
  );
}

function HoverTriggerDemo() {
  return (
    <PopupTrigger
      trigger="hover"
      openDelay={200}
      popup={<Text sm>This is a tooltip that appears on hover with a 200ms delay.</Text>}
      popupProps={{ sm: true }}
    >
      <Button secondary>Hover for Tooltip</Button>
    </PopupTrigger>
  );
}

function FocusTriggerDemo() {
  return (
    <PopupTrigger
      trigger="focus"
      popup={
        <Stack sm noPadding>
          <Text sm bold>Suggestions</Text>
          <Text sm>React</Text>
          <Text sm>Vue</Text>
          <Text sm>Angular</Text>
          <Text sm>Svelte</Text>
        </Stack>
      }
    >
      <Input placeholder="Focus me for suggestions..." />
    </PopupTrigger>
  );
}

function PopupTriggerWithPlacementDemo() {
  return (
    <Row flexWrap>
      <PopupTrigger
        popup={<Text sm>I appear on the right!</Text>}
        popupProps={{ right: true } as Record<string, unknown>}
      >
        <Button secondary sm>Right popup</Button>
      </PopupTrigger>
      <PopupTrigger
        popup={<Text sm>I appear on top!</Text>}
        popupProps={{ top: true } as Record<string, unknown>}
      >
        <Button secondary sm>Top popup</Button>
      </PopupTrigger>
      <PopupTrigger
        popup={<Text sm>I appear on the left!</Text>}
        popupProps={{ left: true } as Record<string, unknown>}
      >
        <Button secondary sm>Left popup</Button>
      </PopupTrigger>
    </Row>
  );
}

// ─── Main App ───────────────────────────────────────────────────────────────

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>VaneUI Component Library Examples</PageTitle>

          {/* Grid with Border Example */}
          <Card>
            <Title>Grid with Border</Title>
            <Grid2 border rounded primary gap>
              <Card sm secondary>Grid Item 1</Card>
              <Card sm secondary>Grid Item 2</Card>
              <Card sm secondary>Grid Item 3</Card>
              <Card sm secondary>Grid Item 4</Card>
            </Grid2>
          </Card>
          <Row flexWrap>
            <Label sm htmlFor="appearance-primary" primary>
              <Checkbox sm defaultChecked id="appearance-primary" primary />
              Enable primary style
            </Label>
            <Label brand htmlFor="appearance-brand">
              <Checkbox brand defaultChecked id="appearance-brand" />
              Enable brand style
            </Label>
            <Label accent htmlFor="appearance-accent">
              <Checkbox accent defaultChecked id="appearance-accent" />
              Enable accent style
            </Label>
            <Label htmlFor="appearance-secondary" secondary>
              <Checkbox defaultChecked id="appearance-secondary" secondary />
              Enable secondary style
            </Label>
            <Label htmlFor="appearance-tertiary" tertiary>
              <Checkbox defaultChecked id="appearance-tertiary" tertiary />
              Enable tertiary style
            </Label>
            <Label htmlFor="appearance-success" success>
              <Checkbox defaultChecked id="appearance-success" success />
              Enable success style
            </Label>
            <Label danger htmlFor="appearance-danger">
              <Checkbox danger defaultChecked id="appearance-danger" />
              Enable danger style
            </Label>
            <Label htmlFor="appearance-warning" warning>
              <Checkbox defaultChecked id="appearance-warning" warning />
              Enable warning style
            </Label>
            <Label xl htmlFor="appearance-info" info>
              <Checkbox xl defaultChecked id="appearance-info" info />
              Enable info style
            </Label>
          </Row>
          <ColorTable />
          <Text xs className="max-w-sm">
            Every component adapts to screen size automatically.
            Use responsive props like <Code xs primary>xs</Code>, <Code xs primary>sm</Code>,
            <Code xs primary>md</Code>, <Code xs primary>lg</Code>, <Code xs primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text sm className="max-w-sm">
            Every component adapts to screen size automatically.
            Use responsive props like <Code sm primary>xs</Code>, <Code sm primary>sm</Code>,
            <Code sm primary>md</Code>, <Code sm primary>lg</Code>, <Code sm primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text className="max-w-[216px]">
            Every component adapts to screen size automatically.
            Use responsive props like <Code secondary>xs</Code>, <Code primary>sm</Code>,
            <Code primary>xs</Code>, <Code primary>sm</Code>, <Code primary>xs</Code>, <Code>sm</Code>, <Code>xs</Code>, <Code secondary>sm</Code>,
            <Code secondary>xs</Code>, <Code>sm</Code>,
            <Code primary>md</Code>, <Code primary>lg</Code>, <Code primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>
          <Text lg className="max-w-lg">
            Every component adapts to screen size automatically.
            Use responsive props like <Code lg primary>xs</Code>, <Code lg primary>sm</Code>, <Code lg primary>md</Code>, <Code lg primary>lg</Code>, <Code lg primary>xl</Code> to fine-tune layouts for any device.
          </Text>
          <Text xl className="max-w-xl">
            Every component adapts to screen size automatically.
            Use responsive props like <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>xs</Code>, <Code xl primary>sm</Code>, <Code xl primary>xs</Code>, <Code xl primary>sm</Code>,
            <Code xl primary>md</Code>, <Code xl primary>lg</Code>, <Code xl primary>xl</Code> to fine-tune layouts for any
            device.
          </Text>

          {/* Button Examples */}
          <Card>
            <Title>Button</Title>
            <Row flexWrap>
              <Button primary xs>Button XS</Button>
              <Button success sm>Button SM</Button>
              <Button>Button MD</Button>
              <Button danger lg>Button LG</Button>
              <Button warning xl>Button XL</Button>
            </Row>
            <Row flexWrap>
              <Button filled  primary xs>Button XS</Button>
              <Button filled  success sm>Button SM</Button>
              <Button filled>Button MD</Button>
              <Button filled  danger lg>Button LG</Button>
              <Button filled  warning xl>Button XL</Button>
            </Row>
          </Card>

          {/* Badge Examples */}
          <Card>
            <Title>Badge</Title>
            <Row flexWrap>
              <Badge xs>Badge XS</Badge>
              <Badge sm>Badge SM</Badge>
              <Badge>Badge MD</Badge>
              <Badge lg>Badge LG</Badge>
              <Badge xl>Badge XL</Badge>
            </Row>
          </Card>

          {/* Chip Examples */}
          <Card>
            <Title>Chip</Title>
            <Row flexWrap>
              <Chip xs>Chip XS</Chip>
              <Chip sm>Chip SM</Chip>
              <Chip>Chip MD</Chip>
              <Chip lg>Chip LG</Chip>
              <Chip xl>Chip XL</Chip>
            </Row>
          </Card>

          {/* Code Examples */}
          <Card>
            <Title>Code</Title>
            <Row flexWrap>
              <Code xs>const x = 1;</Code>
              <Code sm>const x = 1;</Code>
              <Code>const x = 1;</Code>
              <Code lg>const x = 1;</Code>
              <Code xl>const x = 1;</Code>
            </Row>
          </Card>

          {/* Input Examples */}
          <Card>
            <Title>Input</Title>
            <Row flexWrap>
              <Input xs placeholder="Input XS"/>
              <Input sm placeholder="Input SM"/>
              <Input placeholder="Input MD"/>
              <Input lg placeholder="Input LG"/>
              <Input xl placeholder="Input XL"/>
            </Row>
          </Card>

          {/* Label Examples */}
          <Card>
            <Title>Label</Title>
            <Col>
              <Label xs>Label XS</Label>
              <Label sm>Label SM</Label>
              <Label>Label MD</Label>
              <Label lg>Label LG</Label>
              <Label xl>Label XL</Label>
            </Col>
          </Card>

          {/* Checkbox Examples */}
          <Card>
            <Title>Checkbox</Title>
            <Col>
              <Label xs><Checkbox outline xs/> Checkbox XS</Label>
              <Label sm><Checkbox sm/> Checkbox SM</Label>
              <Label><Checkbox md filled/> Checkbox MD</Label>
              <Label lg><Checkbox lg outline/> Checkbox LG</Label>
              <Label xl><Checkbox xl/> Checkbox XL</Label>
            </Col>
          </Card>

          {/* Text Examples */}
          <Card>
            <Title>Text</Title>
            <Col>
              <Text xs>Text XS - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text sm>Text SM - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text>Text MD - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua</Text>
              <Text lg>Text LG - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
              <Text xl>Text XL - Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua</Text>
            </Col>
          </Card>

          {/* Title Examples */}
          <Card>
            <Title>Title</Title>
            <Col>
              <Title xs>Title XS</Title>
              <Title sm>Title SM</Title>
              <Title>Title MD</Title>
              <Title lg>Title LG</Title>
              <Title xl>Title XL</Title>
            </Col>
          </Card>

          {/* Link Examples */}
          <Card>
            <Title>Link</Title>
            <Col>
              <Link xs href="#">Link XS</Link>
              <Link sm href="#">Link SM</Link>
              <Link href="#">Link MD</Link>
              <Link lg href="#">Link LG</Link>
              <Link xl href="#">Link XL</Link>
            </Col>
          </Card>

          {/* Divider Examples */}
          <Card>
            <Title>Divider</Title>
            <Col>
              <Text>Divider XS:</Text>
              <Divider xs/>
              <Text>Divider SM:</Text>
              <Divider sm/>
              <Text>Divider MD:</Text>
              <Divider/>
              <Text>Divider LG:</Text>
              <Divider lg/>
              <Text>Divider XL:</Text>
              <Divider xl/>
            </Col>
          </Card>

          {/* Card Examples */}
          <Card>
            <Title>Card</Title>
            <Row flexWrap>
              <Card xs>
                <Text xs>Card XS</Text>
              </Card>
              <Card sm>
                <Text sm>Card SM</Text>
              </Card>
              <Card>
                <Text>Card MD</Text>
              </Card>
              <Card lg>
                <Text lg>Card LG</Text>
              </Card>
              <Card xl>
                <Text xl>Card XL</Text>
              </Card>
            </Row>
          </Card>

          {/* ─── Overlay Examples ────────────────────────────────────────── */}
          <Card>
            <Title>Overlay</Title>
            <Row flexWrap>
              <BasicOverlayDemo />
              <OverlayWithContentDemo />
              <BlurOverlayDemo />
              <NonDismissibleOverlayDemo />
            </Row>
          </Card>

          {/* ─── Modal Examples ──────────────────────────────────────────── */}
          <Card>
            <Title>Modal</Title>
            <Row flexWrap>
              <BasicModalDemo />
              <ModalSizesDemo />
              <FormModalDemo />
              <BlurModalDemo />
              <NonDismissibleModalDemo />
              <AppearanceModalDemo />
            </Row>
          </Card>

          {/* ─── Popup Examples ──────────────────────────────────────────── */}
          <Card>
            <Title>Popup</Title>
            <Col>
              <Text secondary sm>Basic Popup:</Text>
              <BasicPopupDemo />
              <Divider />
              <Text secondary sm>Placement Options:</Text>
              <PlacementPopupDemo />
              <Divider />
              <Text secondary sm>Match Anchor Width:</Text>
              <MatchWidthPopupDemo />
              <Divider />
              <Text secondary sm>Rich Content Popup:</Text>
              <PopupWithContentDemo />
            </Col>
          </Card>

          {/* ─── NEW: Compound Modal Examples ─────────────────────────────── */}
          <Card>
            <Title>Compound Modal (ModalHeader / ModalBody / ModalFooter)</Title>
            <Row flexWrap>
              <CompoundModalDemo />
              <CloseButtonModalDemo />
            </Row>
          </Card>

          {/* ─── Animations ──────────────────────────────────────────────── */}
          <Card>
            <Title>Animations</Title>
            <Row flexWrap>
              <AnimatedModalDemo />
              <AnimatedPopupDemo />
              <AnimatedOverlayDemo />
              <NoAnimationModalDemo />
            </Row>
          </Card>

          {/* ─── NEW: Modal Layout Variants ───────────────────────────────── */}
          <Card>
            <Title>Modal Layout Variants</Title>
            <Row flexWrap>
              <FullScreenModalDemo />
              <TopAlignedModalDemo />
            </Row>
          </Card>

          {/* ─── NEW: Modal Advanced Features ─────────────────────────────── */}
          <Card>
            <Title>Modal Advanced Features</Title>
            <Row flexWrap>
              <NestedModalsDemo />
              <KeepMountedModalDemo />
            </Row>
          </Card>

          {/* ─── NEW: PopupTrigger Examples ───────────────────────────────── */}
          <Card>
            <Title>PopupTrigger</Title>
            <Col>
              <Text secondary sm>Click Trigger (default):</Text>
              <ClickTriggerDemo />
              <Divider />
              <Text secondary sm>Hover Trigger (tooltip-like):</Text>
              <HoverTriggerDemo />
              <Divider />
              <Text secondary sm>Focus Trigger (autocomplete-like):</Text>
              <FocusTriggerDemo />
              <Divider />
              <Text secondary sm>PopupTrigger with Placement:</Text>
              <PopupTriggerWithPlacementDemo />
            </Col>
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
