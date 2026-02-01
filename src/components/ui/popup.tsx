import React, { forwardRef, useRef, useEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import type {
  BaseProps,
  SizeProps,
  HideProps,
  ItemsProps,
  JustifyProps,
  DisplayProps,
  OverflowProps,
  WrapProps,
  GapProps,
  FlexDirectionProps,
  AppearanceProps,
  ShadowProps,
  ShapeProps,
  PaddingProps,
  VariantProps,
  TransparentProps,
  ResponsiveProps,
  BorderProps,
  RingProps,
  WidthProps,
} from './props';
import { useTheme } from '../themeContext';
import { ThemedComponent } from '../themedComponent';

/** Popup placement relative to anchor */
export type PopupPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/**
 * Popup component props
 */
export type PopupProps = BaseProps &
  SizeProps &
  HideProps &
  ItemsProps &
  JustifyProps &
  DisplayProps &
  OverflowProps &
  WrapProps &
  GapProps &
  FlexDirectionProps &
  AppearanceProps &
  ShadowProps &
  ShapeProps &
  PaddingProps &
  VariantProps &
  TransparentProps &
  ResponsiveProps &
  BorderProps &
  RingProps &
  WidthProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
    /** Whether popup is open */
    open: boolean;
    /** Called when popup should close (Escape key, click outside) */
    onClose?: () => void;
    /** Reference to anchor element */
    anchorRef: React.RefObject<HTMLElement | null>;
    /** Placement relative to anchor (default: 'bottom-start') */
    placement?: PopupPlacement;
    /** Offset from anchor in pixels (default: 4) */
    offset?: number;
    /** Close when pressing Escape (default: true) */
    closeOnEscape?: boolean;
    /** Close when clicking outside (default: true) */
    closeOnClickOutside?: boolean;
    /** Render inside portal (default: true) */
    portal?: boolean;
    /** Match anchor width (default: false) */
    matchWidth?: boolean;
    /** Custom HTML tag to render as */
    tag?: React.ElementType;
  };

/**
 * Convert placement to CSS position-area value
 */
function getPositionArea(placement: PopupPlacement): string {
  const map: Record<PopupPlacement, string> = {
    'top': 'block-start center',
    'top-start': 'block-start start',
    'top-end': 'block-start end',
    'bottom': 'block-end center',
    'bottom-start': 'block-end start',
    'bottom-end': 'block-end end',
    'left': 'center inline-start',
    'left-start': 'start inline-start',
    'left-end': 'end inline-start',
    'right': 'center inline-end',
    'right-start': 'start inline-end',
    'right-end': 'end inline-end',
  };
  return map[placement];
}

/**
 * Convert placement to margin property for offset
 */
function getOffsetStyle(placement: PopupPlacement, offset: number): Record<string, string | number> {
  if (placement.startsWith('top')) {
    return { marginBottom: offset };
  }
  if (placement.startsWith('bottom')) {
    return { marginTop: offset };
  }
  if (placement.startsWith('left')) {
    return { marginRight: offset };
  }
  if (placement.startsWith('right')) {
    return { marginLeft: offset };
  }
  return {};
}

/**
 * Popup component - a floating container anchored to an element.
 *
 * Uses CSS Anchor Positioning API for modern, performant positioning.
 * Ideal base for dropdowns, menus, comboboxes, and tooltips.
 *
 * Browser Support: Chrome 125+, Edge 125+. Other browsers will need
 * a polyfill or fallback positioning strategy.
 *
 * Features:
 * - CSS-based positioning (no JavaScript positioning calculations)
 * - Portal rendering (escapes parent z-index context)
 * - Click outside to close
 * - Escape key to close
 * - Match anchor width option
 * - Themeable via ThemeProvider
 *
 * @example
 * ```tsx
 * // Basic dropdown
 * const anchorRef = useRef<HTMLButtonElement>(null);
 * const [open, setOpen] = useState(false);
 *
 * <Button ref={anchorRef} onClick={() => setOpen(!open)}>
 *   Open Menu
 * </Button>
 * <Popup
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   anchorRef={anchorRef}
 * >
 *   <Stack noPadding>
 *     <Button ghost>Option 1</Button>
 *     <Button ghost>Option 2</Button>
 *   </Stack>
 * </Popup>
 * ```
 *
 * @example
 * ```tsx
 * // Select-style dropdown (matches anchor width)
 * <Popup
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   anchorRef={inputRef}
 *   matchWidth
 *   placement="bottom-start"
 * >
 *   <List>
 *     <ListItem>Option A</ListItem>
 *     <ListItem>Option B</ListItem>
 *   </List>
 * </Popup>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip-style (positioned above)
 * <Popup
 *   open={isHovered}
 *   anchorRef={targetRef}
 *   placement="top"
 *   closeOnClickOutside={false}
 *   sm
 * >
 *   <Text>Helpful tooltip text</Text>
 * </Popup>
 * ```
 */
export const Popup = forwardRef<HTMLDivElement, PopupProps>(
  function Popup(
    {
      open,
      onClose,
      anchorRef,
      placement = 'bottom-start',
      offset = 4,
      closeOnEscape = true,
      closeOnClickOutside = true,
      portal = true,
      matchWidth = false,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const popupRef = useRef<HTMLDivElement>(null);
    const anchorName = useId().replace(/:/g, '-');

    // Merge forwarded ref with internal popupRef
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        (popupRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    // Set anchor-name on anchor element using setProperty for CSS Anchor Positioning
    useEffect(() => {
      if (!open || !anchorRef.current) return;

      const anchor = anchorRef.current;
      const originalAnchorName = anchor.style.getPropertyValue('anchor-name');

      // Set anchor-name CSS property
      anchor.style.setProperty('anchor-name', `--${anchorName}`);

      return () => {
        if (originalAnchorName) {
          anchor.style.setProperty('anchor-name', originalAnchorName);
        } else {
          anchor.style.removeProperty('anchor-name');
        }
      };
    }, [open, anchorRef, anchorName]);

    // Apply positioning styles to popup element
    useEffect(() => {
      if (!open || !popupRef.current) return;

      const popup = popupRef.current;

      // Set CSS Anchor Positioning properties
      popup.style.setProperty('position', 'fixed');
      popup.style.setProperty('position-anchor', `--${anchorName}`);
      popup.style.setProperty('position-area', getPositionArea(placement));

      // Set offset margins
      const offsetStyles = getOffsetStyle(placement, offset);
      Object.entries(offsetStyles).forEach(([key, value]) => {
        popup.style.setProperty(
          key.replace(/([A-Z])/g, '-$1').toLowerCase(),
          typeof value === 'number' ? `${value}px` : value
        );
      });

      // Match anchor width if requested
      if (matchWidth) {
        popup.style.setProperty('width', 'anchor-size(width)');
      }

      return () => {
        popup.style.removeProperty('position');
        popup.style.removeProperty('position-anchor');
        popup.style.removeProperty('position-area');
        popup.style.removeProperty('width');
        Object.keys(offsetStyles).forEach((key) => {
          popup.style.removeProperty(key.replace(/([A-Z])/g, '-$1').toLowerCase());
        });
      };
    }, [open, anchorName, placement, offset, matchWidth]);

    // Escape key handler
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Click outside handler
    useEffect(() => {
      if (!open || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const popup = popupRef.current;
        const anchor = anchorRef.current;

        // Don't close if clicking inside popup or anchor
        if (popup?.contains(target) || anchor?.contains(target)) {
          return;
        }

        onClose?.();
      };

      // Use setTimeout to avoid closing immediately on the click that opened it
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [open, closeOnClickOutside, onClose, anchorRef]);

    if (!open) return null;

    const content = (
      <ThemedComponent
        ref={mergedRef}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        theme={theme.popup as any}
        {...props}
      >
        {children}
      </ThemedComponent>
    );

    // Portal to body or render in place
    if (portal && typeof document !== 'undefined') {
      return createPortal(content, document.body);
    }

    return content;
  }
);

Popup.displayName = 'Popup';
