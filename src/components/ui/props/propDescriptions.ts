/**
 * Auto-generated prop descriptions from JSDoc comments.
 * DO NOT EDIT MANUALLY - Run 'npm run props:generate' to regenerate.
 */

export interface PropDescription {
  description: string;
}

export interface CategoryDescription {
  name: string;
  description: string;
  props: Record<string, PropDescription>;
}

export const PropDescriptions: Record<string, CategoryDescription> = {
  "disabled": {
    "name": "Disabled",
    "description": "Disabled state for interactive components.\nApplies reduced opacity, not-allowed cursor, and disables pointer events.",
    "props": {
      "disabled": {
        "description": "Disable the component — reduces opacity, changes cursor to not-allowed, and prevents interaction"
      }
    }
  },
  "readOnly": {
    "name": "Read Only",
    "description": "Read-only state for form components.\nMutes the field and sets a default cursor; the value stays selectable and submittable.",
    "props": {
      "readOnly": {
        "description": "Render the field read-only — mutes it (lighter than disabled) and sets a default cursor; the value stays selectable and submittable"
      }
    }
  },
  "alignSelf": {
    "name": "Align Self",
    "description": "AlignSelf props for overriding a single flex/grid item's cross-axis\nalignment (align-self), independent of the parent's align-items.",
    "props": {
      "alignSelfAuto": {
        "description": "Use the parent's align-items value (align-self: auto)"
      },
      "alignSelfStart": {
        "description": "Align this item to the start of the cross axis (align-self: flex-start)"
      },
      "alignSelfEnd": {
        "description": "Align this item to the end of the cross axis (align-self: flex-end)"
      },
      "alignSelfCenter": {
        "description": "Center this item on the cross axis (align-self: center)"
      },
      "alignSelfStretch": {
        "description": "Stretch this item to fill the cross axis (align-self: stretch)"
      },
      "alignSelfBaseline": {
        "description": "Align this item to its baseline (align-self: baseline)"
      }
    }
  },
  "appearance": {
    "name": "Appearance",
    "description": "Appearance props for controlling component colors",
    "props": {
      "primary": {
        "description": "Primary color appearance (gray)"
      },
      "secondary": {
        "description": "Secondary color appearance (gray)"
      },
      "tertiary": {
        "description": "Tertiary color appearance"
      },
      "accent": {
        "description": "Accent color appearance (rose)"
      },
      "success": {
        "description": "Success color appearance (green)"
      },
      "danger": {
        "description": "Danger color appearance (red)"
      },
      "warning": {
        "description": "Warning color appearance (amber)"
      },
      "info": {
        "description": "Info color appearance (cyan)"
      },
      "inheritAppearance": {
        "description": "Inherit appearance from parent — suppresses own data-appearance/data-variant, uses parent's CSS variables"
      }
    }
  },
  "blur": {
    "name": "Blur",
    "description": "Blur props for controlling backdrop blur effect",
    "props": {
      "backdropBlur": {
        "description": "Enable backdrop blur effect — emits backdrop-blur"
      },
      "noBackdropBlur": {
        "description": "Disable backdrop blur effect"
      }
    }
  },
  "border": {
    "name": "Border",
    "description": "Border props for controlling component borders. Side toggles compose\n(borderT+borderL apply both); noBorder resets all.",
    "props": {
      "border": {
        "description": "Enable border on all sides"
      },
      "borderT": {
        "description": "Enable border on top"
      },
      "borderB": {
        "description": "Enable border on bottom"
      },
      "borderL": {
        "description": "Enable border on left"
      },
      "borderR": {
        "description": "Enable border on right"
      },
      "borderX": {
        "description": "Enable border on left and right"
      },
      "borderY": {
        "description": "Enable border on top and bottom"
      },
      "borderStart": {
        "description": "Enable border on the inline-start side (left in LTR, right in RTL)"
      },
      "borderEnd": {
        "description": "Enable border on the inline-end side (right in LTR, left in RTL)"
      },
      "noBorder": {
        "description": "Disable all borders"
      }
    }
  },
  "breakpoint": {
    "name": "Breakpoint",
    "description": "Breakpoint props for responsive layout changes",
    "props": {
      "mobileStack": {
        "description": "Stack into a column at mobile width and below (max-mobile: 48rem)"
      },
      "tabletStack": {
        "description": "Stack into a column at tablet width and below (max-tablet: 64rem)"
      },
      "desktopStack": {
        "description": "Stack into a column at desktop width and below (max-desktop: 80rem)"
      }
    }
  },
  "control": {
    "name": "Control",
    "description": "Which form control a Field renders itself; omit all of them to pass the control as a child.",
    "props": {
      "textInput": {
        "description": "Render a text input (the default control kind); pair with `type` for a specific input type"
      },
      "textarea": {
        "description": "Render a multi-line textarea"
      },
      "select": {
        "description": "Render a select; pass the options as children"
      },
      "checkbox": {
        "description": "Render a checkbox, laid out inline with its label"
      },
      "switch": {
        "description": "Render a switch, laid out inline with its label"
      },
      "radiogroup": {
        "description": "Render a radio group; pass the radios as children"
      }
    }
  },
  "cursor": {
    "name": "Cursor",
    "description": "Cursor props for controlling cursor appearance",
    "props": {
      "cursorPointer": {
        "description": "Pointer cursor - indicates clickable element"
      },
      "cursorDefault": {
        "description": "Default cursor - standard arrow"
      },
      "cursorNotAllowed": {
        "description": "Not-allowed cursor - indicates disabled state"
      },
      "cursorNone": {
        "description": "No cursor - hides the cursor"
      },
      "cursorText": {
        "description": "Text cursor - indicates selectable text"
      },
      "cursorMove": {
        "description": "Move cursor - indicates draggable element"
      },
      "cursorWait": {
        "description": "Wait cursor - indicates loading/processing"
      }
    }
  },
  "display": {
    "name": "Display",
    "description": "Display props for controlling CSS display property",
    "props": {
      "inline": {
        "description": "Inline display - flows with text"
      },
      "block": {
        "description": "Block display - takes full width, new line"
      },
      "inlineBlock": {
        "description": "Inline-block display - inline but with block properties"
      },
      "flex": {
        "description": "Flex display - flexbox container"
      },
      "inlineFlex": {
        "description": "Inline-flex display - inline flexbox container"
      },
      "grid": {
        "description": "Grid display - CSS grid container"
      },
      "inlineGrid": {
        "description": "Inline-grid display - inline grid container"
      },
      "contents": {
        "description": "Contents display - element's box is removed, children display as if parent didn't exist"
      },
      "table": {
        "description": "Table display - behaves like table element"
      },
      "tableCell": {
        "description": "Table-cell display - behaves like td element"
      },
      "hidden": {
        "description": "Hidden display - element is not visible"
      }
    }
  },
  "flexDirection": {
    "name": "Flex Direction",
    "description": "Flex direction props for controlling flex layout direction",
    "props": {
      "row": {
        "description": "Flex direction row (horizontal)"
      },
      "column": {
        "description": "Flex direction column (vertical)"
      },
      "rowReverse": {
        "description": "Flex direction row-reverse"
      },
      "columnReverse": {
        "description": "Flex direction column-reverse"
      }
    }
  },
  "flex": {
    "name": "Flex",
    "description": "Flex-grow/shrink shorthand props for controlling how a flex item\ndistributes free space along its parent's main axis.\nThese map to Tailwind's `flex` shorthand utilities and are mutually\nexclusive — only one value is active at a time.",
    "props": {
      "flex1": {
        "description": "Take up remaining space (= `flex-1`, i.e. `flex: 1 1 0%`)"
      },
      "flexAuto": {
        "description": "Grow but respect intrinsic size (= `flex-auto`, i.e. `flex: 1 1 auto`)"
      },
      "flexNone": {
        "description": "Don't grow and don't shrink (= `flex-none`, i.e. `flex: none`)"
      }
    }
  },
  "focusVisible": {
    "name": "Focus Visible",
    "description": "Focus visible props for controlling focus-visible outlines",
    "props": {
      "focusVisible": {
        "description": "Enable focus-visible outline"
      },
      "noFocusVisible": {
        "description": "Disable focus-visible outline"
      }
    }
  },
  "fontFamily": {
    "name": "Font Family",
    "description": "Font family props for controlling text font",
    "props": {
      "fontSans": {
        "description": "Sans-serif font family (default) — emits font-sans"
      },
      "fontSerif": {
        "description": "Serif font family — emits font-serif"
      },
      "fontMono": {
        "description": "Monospace font family — emits font-mono"
      },
      "fontHeading": {
        "description": "Heading font family (defaults to sans, customizable via --font-heading) — emits font-heading"
      }
    }
  },
  "fontStyle": {
    "name": "Font Style",
    "description": "Font style props for controlling text style",
    "props": {
      "italic": {
        "description": "Italic font style"
      },
      "notItalic": {
        "description": "Not italic (normal) font style"
      }
    }
  },
  "fontWeight": {
    "name": "Font Weight",
    "description": "Font weight props for controlling text weight",
    "props": {
      "fontThin": {
        "description": "Thin font weight (100) — emits font-thin"
      },
      "fontExtralight": {
        "description": "Extra light font weight (200) — emits font-extralight"
      },
      "fontLight": {
        "description": "Light font weight (300) — emits font-light"
      },
      "fontNormal": {
        "description": "Normal font weight (400) — emits font-normal"
      },
      "fontMedium": {
        "description": "Medium font weight (500) — emits font-medium"
      },
      "fontSemibold": {
        "description": "Semibold font weight (600) — emits font-semibold"
      },
      "fontBold": {
        "description": "Bold font weight (700) — emits font-bold"
      },
      "fontExtrabold": {
        "description": "Extra bold font weight (800) — emits font-extrabold"
      },
      "fontBlack": {
        "description": "Black font weight (900) — emits font-black"
      }
    }
  },
  "gap": {
    "name": "Gap",
    "description": "Gap props for controlling spacing between children",
    "props": {
      "gap": {
        "description": "Enable gap spacing between children"
      },
      "noGap": {
        "description": "Disable gap spacing"
      }
    }
  },
  "height": {
    "name": "Height",
    "description": "Height props for controlling component height",
    "props": {
      "hFit": {
        "description": "Set height to fit-content"
      },
      "hFull": {
        "description": "Set height to 100%"
      },
      "hAuto": {
        "description": "Set height to auto"
      },
      "hScreen": {
        "description": "Set height to 100vh (viewport height), removes max-height constraint"
      }
    }
  },
  "hide": {
    "name": "Hide",
    "description": "Hide props for responsive element visibility",
    "props": {
      "mobileHide": {
        "description": "Hide element on mobile devices and below (max-mobile: 48rem)"
      },
      "tabletHide": {
        "description": "Hide element on tablet devices and below (max-tablet: 64rem)"
      },
      "desktopHide": {
        "description": "Hide element on desktop devices and below (max-desktop: 80rem)"
      }
    }
  },
  "inheritBg": {
    "name": "Inherit Bg",
    "description": "Inherit background props for controlling background color inheritance\nfrom a parent typography ancestor via CSS variable cascade.",
    "props": {
      "inheritBg": {
        "description": "Inherit background color from parent via CSS variable cascade"
      },
      "noInheritBg": {
        "description": "Keep own background; do not inherit from parent"
      }
    }
  },
  "inheritBorder": {
    "name": "Inherit Border",
    "description": "Inherit border props for controlling border color inheritance\nfrom a parent typography ancestor via CSS variable cascade.",
    "props": {
      "inheritBorder": {
        "description": "Inherit border color from parent via CSS variable cascade"
      },
      "noInheritBorder": {
        "description": "Keep own border color; do not inherit from parent"
      }
    }
  },
  "inheritColor": {
    "name": "Inherit Color",
    "description": "Inherit color props for controlling text color inheritance\nfrom a parent typography ancestor via CSS variable cascade.",
    "props": {
      "inheritColor": {
        "description": "Inherit text color from parent via CSS variable cascade (suppresses data-appearance emission)"
      },
      "noInheritColor": {
        "description": "Keep own text color; do not inherit from parent"
      }
    }
  },
  "inheritSize": {
    "name": "Inherit Size",
    "description": "Inherit size props for controlling font-size and line-height inheritance\nfrom a parent typography ancestor.",
    "props": {
      "inheritSize": {
        "description": "Inherit font-size and line-height from the nearest parent typography element"
      },
      "noInheritSize": {
        "description": "Keep own font-size; do not inherit from parent"
      }
    }
  },
  "items": {
    "name": "Items",
    "description": "Items props for controlling flex item alignment (align-items)",
    "props": {
      "itemsStart": {
        "description": "Align items to start (top/left)"
      },
      "itemsEnd": {
        "description": "Align items to end (bottom/right)"
      },
      "itemsCenter": {
        "description": "Align items to center"
      },
      "itemsBaseline": {
        "description": "Align items to baseline"
      },
      "itemsStretch": {
        "description": "Stretch items to fill container"
      }
    }
  },
  "justify": {
    "name": "Justify",
    "description": "Justify props for controlling flex content alignment (justify-content)",
    "props": {
      "justifyStart": {
        "description": "Pack items toward the start of the main axis"
      },
      "justifyEnd": {
        "description": "Pack items toward the end of the main axis"
      },
      "justifyCenter": {
        "description": "Center items along the main axis"
      },
      "justifyBetween": {
        "description": "Distribute items with space between them"
      },
      "justifyAround": {
        "description": "Distribute items with space around them"
      },
      "justifyEvenly": {
        "description": "Distribute items with equal space around them"
      },
      "justifyStretch": {
        "description": "Stretch items to fill the main axis"
      },
      "justifyBaseline": {
        "description": "Align items along their baseline on main axis"
      }
    }
  },
  "justifySelf": {
    "name": "Justify Self",
    "description": "JustifySelf props for overriding a single grid item's inline-axis alignment\nwithin its grid area (justify-self). Useful with CSS anchor positioning.",
    "props": {
      "justifySelfAuto": {
        "description": "Use the parent's justify-items value (justify-self: auto)"
      },
      "justifySelfStart": {
        "description": "Align this item to the start of the inline axis (justify-self: start)"
      },
      "justifySelfEnd": {
        "description": "Align this item to the end of the inline axis (justify-self: end)"
      },
      "justifySelfCenter": {
        "description": "Center this item on the inline axis (justify-self: center)"
      },
      "justifySelfStretch": {
        "description": "Stretch this item to fill the inline axis (justify-self: stretch)"
      }
    }
  },
  "letterSpacing": {
    "name": "Letter Spacing",
    "description": "Letter spacing props for controlling text tracking",
    "props": {
      "trackingTighter": {
        "description": "Tighter letter spacing (-0.05em)"
      },
      "trackingTight": {
        "description": "Tight letter spacing (-0.025em)"
      },
      "trackingNormal": {
        "description": "Normal letter spacing (0)"
      },
      "trackingWide": {
        "description": "Wide letter spacing (0.025em)"
      },
      "trackingWider": {
        "description": "Wider letter spacing (0.05em)"
      },
      "trackingWidest": {
        "description": "Widest letter spacing (0.1em)"
      }
    }
  },
  "listPosition": {
    "name": "List Position",
    "description": "List position props for controlling list-style-position.\n`listInside` places markers inline with content (compact, wraps with text).\n`listOutside` hangs markers outside the content box (traditional, aligns\nmulti-line text under the first character). Mutually exclusive.",
    "props": {
      "listInside": {
        "description": "Place list markers inside the content area — emits list-inside"
      },
      "listOutside": {
        "description": "Hang list markers outside the content area — emits list-outside"
      }
    }
  },
  "listStyle": {
    "name": "List Style",
    "description": "List style props for choosing the marker type on <List>.\nAll six are mutually exclusive. When more than one is set to true,\ntuple order in ComponentKeys.listStyle determines which wins\n(listDisc → listDecimal → listCircle → listSquare → listLowerAlpha → listLowerRoman).",
    "props": {
      "listDisc": {
        "description": "Filled bullet — default for unordered lists — emits list-disc"
      },
      "listDecimal": {
        "description": "Arabic numerals — default for ordered lists — emits list-decimal"
      },
      "listCircle": {
        "description": "Hollow circle — typically 2nd-depth unordered marker — emits list-[circle]"
      },
      "listSquare": {
        "description": "Filled square — typically 3rd-depth unordered marker — emits list-[square]"
      },
      "listLowerAlpha": {
        "description": "Lowercase letters a, b, c — typically 2nd-depth ordered marker — emits list-[lower-alpha]"
      },
      "listLowerRoman": {
        "description": "Lowercase roman i, ii, iii — typically 3rd-depth ordered marker — emits list-[lower-roman]"
      }
    }
  },
  "margin": {
    "name": "Margin",
    "description": "Margin props for controlling external spacing.\nThe value is size-driven (scales with the component's size prop, like gap).",
    "props": {
      "margin": {
        "description": "Enable margin on all sides"
      },
      "marginX": {
        "description": "Enable only horizontal (inline) margin"
      },
      "marginY": {
        "description": "Enable only vertical (block) margin"
      },
      "marginT": {
        "description": "Enable only top margin"
      },
      "marginB": {
        "description": "Enable only bottom margin"
      },
      "noMargin": {
        "description": "Disable margin (reset to 0)"
      }
    }
  },
  "clampHeight": {
    "name": "Clamp Height",
    "description": "Clamp-height props for components.\nWhen enabled, applies a size-dependent maximum height via --max-height CSS variable.",
    "props": {
      "clampHeight": {
        "description": "Clamp to a size-dependent maximum height (uses --max-height CSS variable)"
      }
    }
  },
  "constrainWidth": {
    "name": "Constrain Width",
    "description": "Constrain-width props for popup/floating components.\nWhen enabled, applies a size-dependent minimum width via --popup-min-w CSS variable.",
    "props": {
      "constrainWidth": {
        "description": "Constrain to a size-dependent minimum width (uses --popup-min-w CSS variable)"
      }
    }
  },
  "objectFit": {
    "name": "Object Fit",
    "description": "Object fit props for controlling image/video sizing within container",
    "props": {
      "objectCover": {
        "description": "Cover - image covers container, may be cropped"
      },
      "objectContain": {
        "description": "Contain - image fits inside container, may have letterboxing"
      },
      "objectFill": {
        "description": "Fill - image stretches to fill container"
      },
      "objectNone": {
        "description": "None - image displays at natural size"
      },
      "objectScaleDown": {
        "description": "Scale down - like contain, but never scales up"
      }
    }
  },
  "orientation": {
    "name": "Orientation",
    "description": "Orientation props for horizontal/vertical layout\nUsed by components like Divider that can be oriented in different directions.",
    "props": {
      "horizontal": {
        "description": "Display as a horizontal line (default)"
      },
      "vertical": {
        "description": "Display as a vertical line instead of horizontal"
      }
    }
  },
  "overflow": {
    "name": "Overflow",
    "description": "Overflow props for controlling content overflow behavior",
    "props": {
      "overflowAuto": {
        "description": "Auto overflow - show scrollbars if needed"
      },
      "overflowHidden": {
        "description": "Hidden overflow - clip content without scrollbars"
      },
      "overflowClip": {
        "description": "Clip overflow - hard clip without scrollbars"
      },
      "overflowVisible": {
        "description": "Visible overflow - content extends beyond bounds"
      },
      "overflowScroll": {
        "description": "Scroll overflow - always show scrollbars"
      },
      "overflowXAuto": {
        "description": "Auto overflow on X-axis only"
      },
      "overflowYAuto": {
        "description": "Auto overflow on Y-axis only"
      },
      "overflowXHidden": {
        "description": "Hidden overflow on X-axis only"
      },
      "overflowYHidden": {
        "description": "Hidden overflow on Y-axis only"
      },
      "overflowXClip": {
        "description": "Clip overflow on X-axis only"
      },
      "overflowYClip": {
        "description": "Clip overflow on Y-axis only"
      },
      "overflowXVisible": {
        "description": "Visible overflow on X-axis only"
      },
      "overflowYVisible": {
        "description": "Visible overflow on Y-axis only"
      },
      "overflowXScroll": {
        "description": "Scroll overflow on X-axis only"
      },
      "overflowYScroll": {
        "description": "Scroll overflow on Y-axis only"
      }
    }
  },
  "padding": {
    "name": "Padding",
    "description": "Padding props for controlling internal spacing",
    "props": {
      "padding": {
        "description": "Enable internal padding"
      },
      "paddingX": {
        "description": "Enable only horizontal padding"
      },
      "paddingY": {
        "description": "Enable only vertical padding"
      },
      "noPadding": {
        "description": "Disable internal padding"
      }
    }
  },
  "placement": {
    "name": "Placement",
    "description": "Placement props for positioning floating elements relative to their anchor",
    "props": {
      "placeTop": {
        "description": "Position above anchor, centered horizontally (default)"
      },
      "placeTopStart": {
        "description": "Position above anchor, aligned to start (left)"
      },
      "placeTopEnd": {
        "description": "Position above anchor, aligned to end (right)"
      },
      "placeBottom": {
        "description": "Position below anchor, centered horizontally"
      },
      "placeBottomStart": {
        "description": "Position below anchor, aligned to start (left)"
      },
      "placeBottomEnd": {
        "description": "Position below anchor, aligned to end (right)"
      },
      "placeLeft": {
        "description": "Position to the left of anchor, centered vertically"
      },
      "placeLeftStart": {
        "description": "Position to the left of anchor, aligned to top"
      },
      "placeLeftEnd": {
        "description": "Position to the left of anchor, aligned to bottom"
      },
      "placeRight": {
        "description": "Position to the right of anchor, centered vertically"
      },
      "placeRightStart": {
        "description": "Position to the right of anchor, aligned to top"
      },
      "placeRightEnd": {
        "description": "Position to the right of anchor, aligned to bottom"
      }
    }
  },
  "pointerEvents": {
    "name": "Pointer Events",
    "description": "Pointer events props for controlling element interactivity",
    "props": {
      "pointerEventsNone": {
        "description": "Disable pointer events - clicks pass through the element"
      },
      "pointerEventsAuto": {
        "description": "Enable pointer events (default browser behavior)"
      }
    }
  },
  "position": {
    "name": "Position",
    "description": "Position props for controlling CSS position property",
    "props": {
      "relative": {
        "description": "Relative positioning"
      },
      "absolute": {
        "description": "Absolute positioning"
      },
      "fixed": {
        "description": "Fixed positioning"
      },
      "sticky": {
        "description": "Sticky positioning"
      },
      "static": {
        "description": "Static positioning"
      }
    }
  },
  "responsiveSizing": {
    "name": "Responsive Sizing",
    "description": "Responsive prop for enabling breakpoint-specific sizing",
    "props": {
      "responsiveSizing": {
        "description": "Enable responsive sizing - uses breakpoint-specific classes for font size, padding, and gap"
      }
    }
  },
  "ring": {
    "name": "Ring",
    "description": "Ring props for the always-on inset ring (emits ring-inset). Not the focus\nindicator — that is focusVisible.",
    "props": {
      "insetRing": {
        "description": "Enable the inset ring — emits ring-inset"
      },
      "noInsetRing": {
        "description": "Disable the inset ring"
      }
    }
  },
  "shadow": {
    "name": "Shadow",
    "description": "Shadow props for controlling drop shadows",
    "props": {
      "shadow": {
        "description": "Enable drop shadow"
      },
      "noShadow": {
        "description": "Disable drop shadow"
      }
    }
  },
  "shape": {
    "name": "Shape",
    "description": "Shape props for controlling component border radius",
    "props": {
      "rounded": {
        "description": "Medium rounded corners (default)"
      },
      "pill": {
        "description": "Fully rounded corners (circular)"
      },
      "sharp": {
        "description": "No rounded corners (square)"
      }
    }
  },
  "shrink": {
    "name": "Shrink",
    "description": "Flex-shrink override prop. Independent toggle (not part of the `flex`\nshorthand) so it can be combined with `flex1`/`flexAuto`/explicit grow.",
    "props": {
      "noShrink": {
        "description": "Prevent the flex item from shrinking below its content size (= `shrink-0`)"
      }
    }
  },
  "size": {
    "name": "Size",
    "description": "Size props for controlling component dimensions",
    "props": {
      "xs": {
        "description": "Extra small size"
      },
      "sm": {
        "description": "Small size"
      },
      "md": {
        "description": "Medium size (default)"
      },
      "lg": {
        "description": "Large size"
      },
      "xl": {
        "description": "Extra large size"
      }
    }
  },
  "validity": {
    "name": "Validity",
    "description": "Validity props for form validation state\nNote: For success/warning validation states, use the appearance props\n(success, warning) which provide similar visual feedback.",
    "props": {
      "invalid": {
        "description": "Mark the field invalid (red border/ring), layered over any appearance"
      }
    }
  },
  "textAlign": {
    "name": "Text Align",
    "description": "Text alignment props for controlling text position",
    "props": {
      "textLeft": {
        "description": "Align text to left (physical side, does not flip under RTL)"
      },
      "textCenter": {
        "description": "Align text to center"
      },
      "textRight": {
        "description": "Align text to right (physical side, does not flip under RTL)"
      },
      "textJustify": {
        "description": "Justify text"
      },
      "textStart": {
        "description": "Align text to the reading-direction start (left in LTR, right in RTL)"
      },
      "textEnd": {
        "description": "Align text to the reading-direction end (right in LTR, left in RTL)"
      }
    }
  },
  "textDecoration": {
    "name": "Text Decoration",
    "description": "Text decoration props for controlling text underline/strikethrough",
    "props": {
      "underline": {
        "description": "Add underline decoration below text"
      },
      "lineThrough": {
        "description": "Add strikethrough/line-through decoration across text"
      },
      "noUnderline": {
        "description": "Remove ALL text-decoration — underline, line-through, and overline (text-decoration: none)"
      },
      "overline": {
        "description": "Add overline decoration above text"
      }
    }
  },
  "textTransform": {
    "name": "Text Transform",
    "description": "Text transform props for controlling text case",
    "props": {
      "uppercase": {
        "description": "Transform text to uppercase"
      },
      "lowercase": {
        "description": "Transform text to lowercase"
      },
      "capitalize": {
        "description": "Capitalize first letter of each word"
      },
      "normalCase": {
        "description": "Normal text case (no transformation)"
      }
    }
  },
  "transition": {
    "name": "Transition",
    "description": "Transition props for controlling animation effects",
    "props": {
      "transition": {
        "description": "Enable smooth transitions between states"
      },
      "noTransition": {
        "description": "Disable transitions for instant state changes"
      }
    }
  },
  "transparent": {
    "name": "Transparent",
    "description": "Transparent prop for disabling background color",
    "props": {
      "transparent": {
        "description": "Disable background color - makes component background transparent"
      }
    }
  },
  "truncate": {
    "name": "Truncate",
    "description": "Truncate props for controlling text overflow with ellipsis",
    "props": {
      "truncate": {
        "description": "Single line truncation with ellipsis"
      },
      "lineClamp2": {
        "description": "Truncate at 2 lines with ellipsis"
      },
      "lineClamp3": {
        "description": "Truncate at 3 lines with ellipsis"
      },
      "lineClamp4": {
        "description": "Truncate at 4 lines with ellipsis"
      },
      "lineClamp5": {
        "description": "Truncate at 5 lines with ellipsis"
      },
      "noTruncate": {
        "description": "Remove truncation"
      }
    }
  },
  "variant": {
    "name": "Variant",
    "description": "Variant props for controlling component style variations",
    "props": {
      "filled": {
        "description": "Filled variant - solid background with contrasting text color"
      },
      "outline": {
        "description": "Outline variant - transparent background with border and colored text (default)"
      },
      "ghost": {
        "description": "Ghost variant - transparent background, no border, appearance-colored text, tinted hover background"
      }
    }
  },
  "whitespace": {
    "name": "Whitespace",
    "description": "Whitespace props for controlling text wrapping behavior",
    "props": {
      "whitespaceNowrap": {
        "description": "No wrap - text stays on single line"
      },
      "whitespaceNormal": {
        "description": "Normal wrapping - default browser behavior"
      },
      "whitespacePre": {
        "description": "Preserve whitespace and line breaks"
      },
      "whitespacePreWrap": {
        "description": "Preserve whitespace, wrap text"
      },
      "whitespacePreLine": {
        "description": "Preserve line breaks, collapse spaces, wrap text"
      },
      "whitespaceBreakSpaces": {
        "description": "Preserve whitespace incl. trailing spaces, wrap text (white-space: break-spaces)"
      }
    }
  },
  "width": {
    "name": "Width",
    "description": "Width props for controlling component width",
    "props": {
      "wFull": {
        "description": "Set width to 100%"
      },
      "wFit": {
        "description": "Set width to fit-content"
      },
      "wAuto": {
        "description": "Set width to auto"
      },
      "wScreen": {
        "description": "Set width to 100vw (viewport width), removes max-width constraint"
      }
    }
  },
  "wordBreak": {
    "name": "Word Break",
    "description": "Word break props for controlling how text breaks to prevent overflow",
    "props": {
      "breakNormal": {
        "description": "Reset breaking - overflow-wrap and word-break normal"
      },
      "breakWords": {
        "description": "Break long words to prevent overflow - overflow-wrap: break-word"
      },
      "breakAll": {
        "description": "Break between any two characters - word-break: break-all"
      },
      "breakKeep": {
        "description": "Do not break CJK text - word-break: keep-all"
      }
    }
  },
  "wrap": {
    "name": "Wrap",
    "description": "Wrap props for controlling flex wrapping behavior",
    "props": {
      "flexWrap": {
        "description": "Allow flex items to wrap to new lines when container is too narrow"
      },
      "flexNoWrap": {
        "description": "Force flex items to stay on single line (may overflow)"
      },
      "flexWrapReverse": {
        "description": "Wrap flex items in reverse order (last items wrap first)"
      }
    }
  }
};

/**
 * Get description for a specific prop within a category
 */
export function getPropDescription(category: string, prop: string): string | undefined {
  return PropDescriptions[category]?.props[prop]?.description;
}

/**
 * Get description for a category
 */
export function getCategoryDescription(category: string): string | undefined {
  return PropDescriptions[category]?.description;
}

/**
 * Get display name for a category
 */
export function getCategoryName(category: string): string | undefined {
  return PropDescriptions[category]?.name;
}
