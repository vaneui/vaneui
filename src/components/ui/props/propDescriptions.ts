/**
 * Auto-generated prop descriptions from JSDoc comments.
 * DO NOT EDIT MANUALLY - Run 'npm run props:generate' to regenerate.
 *
 * Generated on: 2026-01-05T15:27:13.544Z
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
