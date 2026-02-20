/**
 * Auto-generated prop descriptions from JSDoc comments.
 * DO NOT EDIT MANUALLY - Run 'npm run props:generate' to regenerate.
 *
 * Generated on: 2026-02-20T17:30:19.909Z
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
  "appearance": {
    "name": "Appearance",
    "description": "Appearance props for controlling component colors",
    "props": {
      "primary": {
        "description": "Primary color appearance (gray)"
      },
      "brand": {
        "description": "Brand color appearance (blue)"
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
      "link": {
        "description": "Link color appearance (blue, for hyperlinks)"
      },
      "inherit": {
        "description": "Inherit appearance from parent — suppresses own data-appearance/data-variant, uses parent's CSS variables"
      }
    }
  },
  "blur": {
    "name": "Blur",
    "description": "Blur props for controlling backdrop blur effect",
    "props": {
      "blur": {
        "description": "Enable backdrop blur effect"
      },
      "noBlur": {
        "description": "Disable backdrop blur effect"
      }
    }
  },
  "border": {
    "name": "Border",
    "description": "Border props for controlling component borders",
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
      "noBorder": {
        "description": "Disable all borders"
      }
    }
  },
  "breakpoint": {
    "name": "Breakpoint",
    "description": "Breakpoint props for responsive layout changes",
    "props": {
      "mobileCol": {
        "description": "Switch to column layout on mobile and below (max-mobile: 48rem)"
      },
      "tabletCol": {
        "description": "Switch to column layout on tablet and below (max-tablet: 64rem)"
      },
      "desktopCol": {
        "description": "Switch to column layout on desktop and below (max-desktop: 80rem)"
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
  "disabled": {
    "name": "Disabled",
    "description": "Disabled state for interactive components.\nApplies reduced opacity, not-allowed cursor, and disables pointer events.",
    "props": {
      "disabled": {
        "description": "Disable the component — reduces opacity, changes cursor to not-allowed, and prevents interaction"
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
      "sans": {
        "description": "Sans-serif font family (default)"
      },
      "serif": {
        "description": "Serif font family"
      },
      "mono": {
        "description": "Monospace font family"
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
      "thin": {
        "description": "Thin font weight (100)"
      },
      "extralight": {
        "description": "Extra light font weight (200)"
      },
      "light": {
        "description": "Light font weight (300)"
      },
      "normal": {
        "description": "Normal font weight (400)"
      },
      "medium": {
        "description": "Medium font weight (500)"
      },
      "semibold": {
        "description": "Semibold font weight (600)"
      },
      "bold": {
        "description": "Bold font weight (700)"
      },
      "extrabold": {
        "description": "Extra bold font weight (800)"
      },
      "black": {
        "description": "Black font weight (900)"
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
  "listStyle": {
    "name": "List Style",
    "description": "List style props for controlling list markers",
    "props": {
      "disc": {
        "description": "Bullet point list style"
      },
      "decimal": {
        "description": "Numbered list style"
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
      "noPadding": {
        "description": "Disable internal padding"
      }
    }
  },
  "placement": {
    "name": "Placement",
    "description": "Placement props for positioning floating elements relative to their anchor",
    "props": {
      "top": {
        "description": "Position above anchor, centered horizontally (default)"
      },
      "topStart": {
        "description": "Position above anchor, aligned to start (left)"
      },
      "topEnd": {
        "description": "Position above anchor, aligned to end (right)"
      },
      "bottom": {
        "description": "Position below anchor, centered horizontally"
      },
      "bottomStart": {
        "description": "Position below anchor, aligned to start (left)"
      },
      "bottomEnd": {
        "description": "Position below anchor, aligned to end (right)"
      },
      "left": {
        "description": "Position to the left of anchor, centered vertically"
      },
      "leftStart": {
        "description": "Position to the left of anchor, aligned to top"
      },
      "leftEnd": {
        "description": "Position to the left of anchor, aligned to bottom"
      },
      "right": {
        "description": "Position to the right of anchor, centered vertically"
      },
      "rightStart": {
        "description": "Position to the right of anchor, aligned to top"
      },
      "rightEnd": {
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
  "responsive": {
    "name": "Responsive",
    "description": "Responsive prop for enabling breakpoint-specific sizing",
    "props": {
      "responsive": {
        "description": "Enable responsive sizing - uses breakpoint-specific classes for font size, padding, and gap"
      }
    }
  },
  "reverse": {
    "name": "Reverse",
    "description": "Reverse props for reversing child order",
    "props": {
      "reverse": {
        "description": "Reverse the order of children"
      }
    }
  },
  "ring": {
    "name": "Ring",
    "description": "Ring props for controlling focus rings",
    "props": {
      "ring": {
        "description": "Enable focus ring"
      },
      "noRing": {
        "description": "Disable focus ring"
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
  "status": {
    "name": "Status",
    "description": "Status props for form validation state\nNote: For success/warning validation states, use the appearance props\n(success, warning) which provide similar visual feedback.",
    "props": {
      "error": {
        "description": "Show error state (red border/ring) for form validation"
      }
    }
  },
  "textAlign": {
    "name": "Text Align",
    "description": "Text alignment props for controlling text position",
    "props": {
      "textLeft": {
        "description": "Align text to left"
      },
      "textCenter": {
        "description": "Align text to center"
      },
      "textRight": {
        "description": "Align text to right"
      },
      "textJustify": {
        "description": "Justify text"
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
        "description": "Remove text decoration (no underline, strikethrough, etc.)"
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
        "description": "Break words to prevent overflow"
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
