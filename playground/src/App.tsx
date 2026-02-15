import React, { useState, useRef, useCallback } from 'react';
import {
  ThemeProvider,
  defaultTheme,
  Row,
  Text,
  Col,
  Title,
  Section,
  Stack,
  Card, Checkbox, Label, Input, Button,
  Container, Divider, Code, PageTitle,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Overlay, Popup, PopupTrigger
} from '../../src';

// ═══════════════════════════════════════════════════════════════════════════════
//  MODAL QUICK DEMO (top of page)
// ═══════════════════════════════════════════════════════════════════════════════

function ModalQuickDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Title>Modal</Title>
      <Button primary onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal noPadding noGap open={open} onClose={() => setOpen(false)} closeButton>
        <ModalHeader borderB>
          <Title>Create New Project</Title>
        </ModalHeader>
        <ModalBody borderB>
          <Stack>
            <Label>Project Name</Label>
            <Input placeholder="My Awesome Project" />
          </Stack>
          <Stack>
            <Label>Description</Label>
            <Input placeholder="A brief description..." />
          </Stack>
          <Label>
            <Checkbox />
            Make this project public
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
          <Button filled onClick={() => setOpen(false)}>Create Project</Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  POPUP DEMOS
// ═══════════════════════════════════════════════════════════════════════════════

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
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>User Menu</Button>
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

// ─── NEW: Arrow Popup ────────────────────────────────────────────────────────

function ArrowPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button primary ref={anchorRef} onClick={() => setOpen(!open)}>Popup with Arrow</Button>
      <Popup danger border open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} arrow>
        <Text bold>Arrow Popup</Text>
        <Text sm>This popup has an arrow pointing toward the trigger.</Text>
      </Popup>
    </div>
  );
}

function ArrowSizesPopupDemo() {
  const [openSize, setOpenSize] = useState<string | null>(null);
  const refs = {
    xs: useRef<HTMLButtonElement>(null),
    sm: useRef<HTMLButtonElement>(null),
    lg: useRef<HTMLButtonElement>(null),
    xl: useRef<HTMLButtonElement>(null),
  };
  const sizes = ['xs', 'sm', 'lg', 'xl'] as const;
  return (
    <Row flexWrap>
      {sizes.map((size) => (
        <div key={size}>
          <Button secondary ref={refs[size]} onClick={() => setOpenSize(openSize === size ? null : size)}>
            Arrow ({size})
          </Button>
          <Popup
            open={openSize === size}
            onClose={() => setOpenSize(null)}
            anchorRef={refs[size]}
            arrow
            bottom
            {...{ [size]: true }}
          >
            <Text sm>Arrow scales with <Code sm>{size}</Code> size.</Text>
          </Popup>
        </div>
      ))}
    </Row>
  );
}

// ─── NEW: Custom Animation Duration ──────────────────────────────────────────

function SlowPopupDemo() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <Button accent ref={anchorRef} onClick={() => setOpen(!open)}>Slow Popup (500ms)</Button>
      <Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} transitionDuration={500}>
        <Text sm>This popup uses a 500ms transition instead of the default 200ms.</Text>
      </Popup>
    </div>
  );
}

// ─── NEW: Uncontrolled Popup ─────────────────────────────────────────────────

function UncontrolledPopupDemo() {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const handleOpenChange = useCallback((isOpen: boolean) => {
    console.log('Popup open state changed:', isOpen);
  }, []);
  return (
    <div>
      <Button secondary ref={anchorRef} onClick={() => {
        // For uncontrolled popup, we need to toggle via the anchorRef click
        // But Popup doesn't auto-toggle on anchor click — use PopupTrigger for that.
        // This demo shows defaultOpen with onOpenChange callback.
      }}>Anchor (see PopupTrigger for auto-toggle)</Button>
      <Popup defaultOpen anchorRef={anchorRef} onOpenChange={handleOpenChange}>
        <Text sm bold>Uncontrolled Popup</Text>
        <Text sm>This popup started open via <Code sm>defaultOpen</Code>. Close it and check the console for <Code sm>onOpenChange</Code> logs.</Text>
      </Popup>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  POPUP TRIGGER DEMOS
// ═══════════════════════════════════════════════════════════════════════════════

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

// ─── NEW: PopupTrigger with Arrow ────────────────────────────────────────────

function PopupTriggerArrowDemo() {
  return (
    <PopupTrigger
      trigger="hover"
      openDelay={100}
      popup={<Text sm>Tooltip with arrow!</Text>}
      popupProps={{ arrow: true, sm: true } as Record<string, unknown>}
    >
      <Button primary>Hover (with arrow)</Button>
    </PopupTrigger>
  );
}

// ─── NEW: ARIA Attributes Demo ───────────────────────────────────────────────

function AriaAttributesDemo() {
  return (
    <div>
      <Text sm secondary>
        PopupTrigger automatically sets <Code sm>aria-expanded</Code>, <Code sm>aria-haspopup</Code>, and <Code sm>aria-controls</Code> on the trigger element. Inspect the button in DevTools to see them.
      </Text>
      <PopupTrigger
        popup={
          <Stack sm noPadding>
            <Text sm>Inspect the trigger button to see ARIA attributes.</Text>
            <Text sm secondary>The popup also gets <Code sm>role="dialog"</Code> and a matching <Code sm>id</Code>.</Text>
          </Stack>
        }
        popupProps={{ role: 'menu' } as Record<string, unknown>}
      >
        <Button primary>Open (inspect ARIA)</Button>
      </PopupTrigger>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MODAL DEMOS
// ═══════════════════════════════════════════════════════════════════════════════

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
          <Text>This modal cannot be closed by clicking outside or pressing Escape.</Text>
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
          <Text>This modal uses the primary appearance.</Text>
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
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOpen(false)}>Cancel</Button>
          <Button filled onClick={() => setOpen(false)}>Save Changes</Button>
        </ModalFooter>
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
          <Text>This modal takes up the entire viewport.</Text>
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
      <Modal open={open} onClose={() => setOpen(false)} overlayProps={{ itemsStart: true }} closeButton>
        <ModalHeader>
          <Title>Notifications</Title>
        </ModalHeader>
        <ModalBody>
          <Text>This modal is aligned to the top instead of centered vertically.</Text>
        </ModalBody>
        <ModalFooter>
          <Button filled onClick={() => setOpen(false)}>Dismiss All</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

function NestedModalsDemo() {
  const [outer, setOuter] = useState(false);
  const [inner, setInner] = useState(false);
  return (
    <div>
      <Button primary onClick={() => setOuter(true)}>Nested Modals</Button>
      <Modal open={outer} onClose={() => setOuter(false)} closeButton>
        <ModalHeader>
          <Title>Outer Modal</Title>
        </ModalHeader>
        <ModalBody>
          <Text>Each nested modal gets a higher z-index automatically.</Text>
        </ModalBody>
        <ModalFooter>
          <Button secondary onClick={() => setOuter(false)}>Close</Button>
          <Button filled onClick={() => setInner(true)}>Open Inner Modal</Button>
        </ModalFooter>
      </Modal>
      <Modal open={inner} onClose={() => setInner(false)} sm closeButton>
        <Title>Inner Modal</Title>
        <Text>This modal stacks above the outer one.</Text>
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
        <Text>This modal stays in the DOM when closed. Type something, close, then re-open.</Text>
        <Input placeholder="Type something, close, then re-open..." />
      </Modal>
    </div>
  );
}

// ─── NEW: Custom Animation Duration ──────────────────────────────────────────

function SlowModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button accent onClick={() => setOpen(true)}>Slow Modal (500ms)</Button>
      <Modal open={open} onClose={() => setOpen(false)} transitionDuration={500} closeButton>
        <Title>Slow Animation</Title>
        <Text>This modal uses a 500ms transition duration instead of the default 200ms. Both the overlay fade and content scale animation are affected.</Text>
        <Button filled onClick={() => setOpen(false)}>Close</Button>
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
        <Text>This modal appears and disappears instantly with no transition.</Text>
      </Modal>
    </div>
  );
}

// ─── NEW: Return Focus / Initial Focus ───────────────────────────────────────

function InitialFocusModalDemo() {
  const [open, setOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Button primary onClick={() => setOpen(true)}>Modal with initialFocus</Button>
      <Modal open={open} onClose={() => setOpen(false)} initialFocus={emailRef} closeButton>
        <Title>Initial Focus Demo</Title>
        <Stack>
          <Label>Name</Label>
          <Input placeholder="Name (not focused)" />
        </Stack>
        <Stack>
          <Label>Email (focused on open)</Label>
          <Input ref={emailRef} placeholder="This input gets focus on open" />
        </Stack>
        <Button filled onClick={() => setOpen(false)}>Submit</Button>
      </Modal>
    </div>
  );
}

function NoReturnFocusModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button secondary onClick={() => setOpen(true)}>Modal (returnFocus=false)</Button>
      <Modal open={open} onClose={() => setOpen(false)} returnFocus={false} closeButton>
        <Title>No Return Focus</Title>
        <Text>When this modal closes, focus will NOT return to the trigger button. Compare with the normal modal behavior.</Text>
        <Button filled onClick={() => setOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
}

// ─── NEW: Uncontrolled Modal ─────────────────────────────────────────────────

function UncontrolledModalWithTriggerDemo() {
  // Using a ref-based approach to open the uncontrolled modal
  const [, forceRender] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button primary onClick={() => setShowModal(true)}>Open Uncontrolled Modal</Button>
      {showModal && (
        <Modal
          defaultOpen
          onOpenChange={(isOpen) => {
            console.log('Modal onOpenChange:', isOpen);
            if (!isOpen) {
              // Remove from DOM after close animation
              setTimeout(() => {
                setShowModal(false);
                forceRender(n => n + 1);
              }, 250);
            }
          }}
          closeButton
        >
          <Title>Uncontrolled Modal</Title>
          <Text>This modal manages its own open state internally. The parent only knows about changes via <Code sm>onOpenChange</Code>.</Text>
          <Text sm secondary>Check the console for onOpenChange callbacks.</Text>
        </Modal>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  OVERLAY DEMOS
// ═══════════════════════════════════════════════════════════════════════════════

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
      <Button primary onClick={() => setOpen(true)}>Overlay with Content</Button>
      <Overlay open={open} onClose={() => setOpen(false)}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Overlay Content</Text>
            <Text>Click outside the card to close.</Text>
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
      <Button primary onClick={() => setOpen(true)}>Blur Overlay</Button>
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
      <Button primary onClick={() => setOpen(true)}>Loading Overlay</Button>
      <Overlay open={open} pointerEventsNone>
        <Stack itemsCenter>
          <Text xl bold filled>Loading...</Text>
          <Button sm danger onClick={() => setOpen(false)} style={{ pointerEvents: 'auto' }}>Cancel</Button>
        </Stack>
      </Overlay>
    </div>
  );
}

// ─── NEW: Custom Animation Duration ──────────────────────────────────────────

function SlowOverlayDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button accent onClick={() => setOpen(true)}>Slow Overlay (500ms)</Button>
      <Overlay open={open} onClose={() => setOpen(false)} transitionDuration={500}>
        <Card lg onClick={(e: React.MouseEvent) => e.stopPropagation()}>
          <Stack>
            <Text bold>Slow Fade Overlay</Text>
            <Text>This overlay uses a 500ms fade transition.</Text>
            <Button filled sm onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Card>
      </Overlay>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Section className="w-full">
        <Container itemsCenter className="w-full">
          <PageTitle>VaneUI Overlay Components Playground</PageTitle>

          {/* ─── Modal Quick Demo ─────────────────────────────────────── */}
          <ModalQuickDemo />

          {/* ─── Popup ──────────────────────────────────────────────── */}
          <Card>
            <Title>Popup — Basic</Title>
            <Col>
              <BasicPopupDemo />
              <Divider />
              <Text secondary sm>Placement Options:</Text>
              <PlacementPopupDemo />
              <Divider />
              <Text secondary sm>Match Anchor Width:</Text>
              <MatchWidthPopupDemo />
              <Divider />
              <Text secondary sm>Rich Content:</Text>
              <PopupWithContentDemo />
            </Col>
          </Card>

          <Card>
            <Title>Popup — Arrow</Title>
            <Text sm secondary>Use <Code sm>arrow</Code> to show a pointer toward the anchor. Arrow size scales automatically with popup size.</Text>
            <Row flexWrap>
              <ArrowPopupDemo />
              <ArrowSizesPopupDemo />
            </Row>
          </Card>

          <Card>
            <Title>Popup — Custom Animation Duration</Title>
            <Text sm secondary>Override the default 200ms transition with <Code sm>transitionDuration</Code>.</Text>
            <SlowPopupDemo />
          </Card>

          <Card>
            <Title>Popup — Uncontrolled Mode</Title>
            <Text sm secondary>Use <Code sm>defaultOpen</Code> and <Code sm>onOpenChange</Code> instead of managing <Code sm>open</Code> state yourself.</Text>
            <UncontrolledPopupDemo />
          </Card>

          {/* ─── PopupTrigger ───────────────────────────────────────── */}
          <Card>
            <Title>PopupTrigger — Trigger Modes</Title>
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
              <Text secondary sm>Placement via popupProps:</Text>
              <PopupTriggerWithPlacementDemo />
            </Col>
          </Card>

          <Card>
            <Title>PopupTrigger — Arrow + ARIA</Title>
            <Text sm secondary>PopupTrigger automatically injects ARIA attributes on the trigger element.</Text>
            <Col>
              <PopupTriggerArrowDemo />
              <Divider />
              <AriaAttributesDemo />
            </Col>
          </Card>

          {/* ─── Modal ──────────────────────────────────────────────── */}
          <Card>
            <Title>Modal — Basic</Title>
            <Row flexWrap>
              <BasicModalDemo />
              <ModalSizesDemo />
              <FormModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Appearance & Options</Title>
            <Row flexWrap>
              <BlurModalDemo />
              <NonDismissibleModalDemo />
              <AppearanceModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Compound (Header / Body / Footer)</Title>
            <Row flexWrap>
              <CompoundModalDemo />
              <FullScreenModalDemo />
              <TopAlignedModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Advanced</Title>
            <Row flexWrap>
              <NestedModalsDemo />
              <KeepMountedModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Animation Duration</Title>
            <Text sm secondary>Control animation speed with <Code sm>transitionDuration</Code> or disable with <Code sm>noAnimation</Code>.</Text>
            <Row flexWrap>
              <SlowModalDemo />
              <NoAnimationModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Focus Management</Title>
            <Text sm secondary>
              Use <Code sm>initialFocus</Code> to focus a specific element on open.
              Use <Code sm>returnFocus=&#123;false&#125;</Code> to prevent focus from returning to the trigger on close.
            </Text>
            <Row flexWrap>
              <InitialFocusModalDemo />
              <NoReturnFocusModalDemo />
            </Row>
          </Card>

          <Card>
            <Title>Modal — Uncontrolled Mode</Title>
            <Text sm secondary>
              Use <Code sm>defaultOpen</Code> and <Code sm>onOpenChange</Code> for uncontrolled state management.
              No need to pass <Code sm>open</Code> or manage state externally.
            </Text>
            <Row flexWrap>
              <UncontrolledModalWithTriggerDemo />
            </Row>
          </Card>

          {/* ─── Overlay ────────────────────────────────────────────── */}
          <Card>
            <Title>Overlay — Basic</Title>
            <Row flexWrap>
              <BasicOverlayDemo />
              <OverlayWithContentDemo />
              <BlurOverlayDemo />
              <NonDismissibleOverlayDemo />
            </Row>
          </Card>

          <Card>
            <Title>Overlay — Custom Animation Duration</Title>
            <Text sm secondary>Override the default 200ms fade with <Code sm>transitionDuration</Code>.</Text>
            <SlowOverlayDemo />
          </Card>

        </Container>
      </Section>
    </ThemeProvider>
  );
}

export default App;
