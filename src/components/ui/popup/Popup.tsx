import { forwardRef, useRef, useState, useEffect, useLayoutEffect, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import type { PopupProps } from "./PopupProps";
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { pickFirstTruthyKeyByCategory } from '../../utils/componentUtils';
import { popupDefaults } from './popupDefaults';
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
import { useControllableState } from '../../utils/controllableState';

/** Internal placement type used by positioning functions */
type PopupPlacement =
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

/** CSS Anchor Positioning styles for a given placement */
interface AnchorStyles {
  positionArea: string;
  justifySelf?: string;
  alignSelf?: string;
}

/**
 * Convert placement to CSS Anchor Positioning styles.
 *
 * The position-area property uses a 3×3 grid with the anchor in the center cell.
 * Single-cell values like `bottom left` place the popup in that cell (to the
 * bottom-left OF the anchor), NOT below with left edges aligned.
 *
 * For -start/-end alignment we use `span-*` keywords so the popup area extends
 * from the center cell outward, giving a containing block whose edge aligns with
 * the anchor's edge. For -end variants we also set justify-self/align-self so
 * the popup sits at the far edge of the spanned area.
 */
function getAnchorStyles(placement: PopupPlacement): AnchorStyles {
  const map: Record<PopupPlacement, AnchorStyles> = {
    // Center variants: single center cell on the relevant side
    'top':    { positionArea: 'top center' },
    'bottom': { positionArea: 'bottom center' },
    'left':   { positionArea: 'center left',  justifySelf: 'end' },
    'right':  { positionArea: 'center right' },

    // -start: span from center toward end so the start edge aligns with the anchor
    'top-start':    { positionArea: 'top span-right' },
    'top-end':      { positionArea: 'top span-left',    justifySelf: 'end' },
    'bottom-start': { positionArea: 'bottom span-right' },
    'bottom-end':   { positionArea: 'bottom span-left', justifySelf: 'end' },
    'left-start':   { positionArea: 'left span-bottom', justifySelf: 'end' },
    'left-end':     { positionArea: 'left span-top',    justifySelf: 'end', alignSelf: 'end' },
    'right-start':  { positionArea: 'right span-bottom' },
    'right-end':    { positionArea: 'right span-top',   alignSelf: 'end' },
  };
  return map[placement];
}

/**
 * Convert placement to offset margin styles.
 */
function getOffsetStyle(placement: PopupPlacement, offset: number): React.CSSProperties {
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
 * Flip placement on the block axis (top↔bottom) preserving alignment suffix.
 */
function flipBlock(placement: PopupPlacement): PopupPlacement {
  if (placement.startsWith('top')) return placement.replace('top', 'bottom') as PopupPlacement;
  if (placement.startsWith('bottom')) return placement.replace('bottom', 'top') as PopupPlacement;
  return placement;
}

/**
 * Flip placement on the inline axis (left↔right) preserving alignment suffix.
 */
function flipInline(placement: PopupPlacement): PopupPlacement {
  if (placement.startsWith('left')) return placement.replace('left', 'right') as PopupPlacement;
  if (placement.startsWith('right')) return placement.replace('right', 'left') as PopupPlacement;
  return placement;
}

/**
 * Calculate raw popup position for a given placement (no clamping).
 */
function calcPosition(
  anchorRect: DOMRect,
  popupRect: DOMRect,
  placement: PopupPlacement,
  offset: number
): { top: number; left: number } {
  let top = 0;
  let left = 0;

  // Vertical position
  if (placement.startsWith('top')) {
    top = anchorRect.top - popupRect.height - offset;
  } else if (placement.startsWith('bottom')) {
    top = anchorRect.bottom + offset;
  } else if (placement.startsWith('left') || placement.startsWith('right')) {
    if (placement.endsWith('-start')) {
      top = anchorRect.top;
    } else if (placement.endsWith('-end')) {
      top = anchorRect.bottom - popupRect.height;
    } else {
      top = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
    }
  }

  // Horizontal position
  if (placement.startsWith('left')) {
    left = anchorRect.left - popupRect.width - offset;
  } else if (placement.startsWith('right')) {
    left = anchorRect.right + offset;
  } else if (placement.startsWith('top') || placement.startsWith('bottom')) {
    if (placement.endsWith('-start')) {
      left = anchorRect.left;
    } else if (placement.endsWith('-end')) {
      left = anchorRect.right - popupRect.width;
    } else {
      left = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
    }
  }

  return { top, left };
}

/**
 * Check if a position overflows the viewport.
 */
function overflows(
  pos: { top: number; left: number },
  popupRect: DOMRect,
): boolean {
  return (
    pos.top < 0 ||
    pos.left < 0 ||
    pos.top + popupRect.height > window.innerHeight ||
    pos.left + popupRect.width > window.innerWidth
  );
}

/**
 * Calculate popup position with viewport collision handling.
 * Strategy: flip → shift → clamp
 * 1. Try original placement
 * 2. Try flipping the block axis (top↔bottom)
 * 3. Try flipping the inline axis (left↔right)
 * 4. Shift along the cross-axis to keep popup in viewport
 * 5. Clamp the main axis as a final fallback
 */
function getJsPosition(
  anchorRect: DOMRect,
  popupRect: DOMRect,
  placement: PopupPlacement,
  offset: number
): { top: number; left: number; resolvedPlacement: PopupPlacement } {
  // Try original placement
  const pos = calcPosition(anchorRect, popupRect, placement, offset);
  if (!overflows(pos, popupRect)) return { ...pos, resolvedPlacement: placement };

  // Try flip-block (top↔bottom)
  const flippedBlock = flipBlock(placement);
  if (flippedBlock !== placement) {
    const posBlock = calcPosition(anchorRect, popupRect, flippedBlock, offset);
    if (!overflows(posBlock, popupRect)) return { ...posBlock, resolvedPlacement: flippedBlock };
  }

  // Try flip-inline (left↔right)
  const flippedInline = flipInline(placement);
  if (flippedInline !== placement) {
    const posInline = calcPosition(anchorRect, popupRect, flippedInline, offset);
    if (!overflows(posInline, popupRect)) return { ...posInline, resolvedPlacement: flippedInline };
  }

  // None fit perfectly — use the best candidate, then shift along cross-axis
  // Prefer block-flip for top/bottom placements, inline-flip for left/right
  const bestPlacement = (flippedBlock !== placement) ? flippedBlock : placement;
  const bestPos = (flippedBlock !== placement)
    ? calcPosition(anchorRect, popupRect, flippedBlock, offset)
    : pos;

  // SHIFT: slide along cross-axis to keep popup in viewport, then clamp main axis
  if (bestPlacement.startsWith('top') || bestPlacement.startsWith('bottom')) {
    // Vertical placement → shift horizontally
    const rightOverflow = bestPos.left + popupRect.width - window.innerWidth;
    const leftOverflow = -bestPos.left;
    if (rightOverflow > 0) {
      bestPos.left = Math.max(0, bestPos.left - rightOverflow);
    } else if (leftOverflow > 0) {
      bestPos.left = 0;
    }
    // Clamp vertical (main axis) in case popup is taller than viewport
    bestPos.top = Math.max(0, Math.min(bestPos.top, window.innerHeight - popupRect.height));
  } else {
    // Horizontal placement → shift vertically
    const bottomOverflow = bestPos.top + popupRect.height - window.innerHeight;
    const topOverflow = -bestPos.top;
    if (bottomOverflow > 0) {
      bestPos.top = Math.max(0, bestPos.top - bottomOverflow);
    } else if (topOverflow > 0) {
      bestPos.top = 0;
    }
    // Clamp horizontal (main axis) in case popup is wider than viewport
    bestPos.left = Math.max(0, Math.min(bestPos.left, window.innerWidth - popupRect.width));
  }

  return { ...bestPos, resolvedPlacement: bestPlacement };
}

// Cached feature detection — tests for span-* values which require
// Chrome/Edge 129+, not just basic position-area (Chrome 125+)
let _supportsAnchorPositioning: boolean | null = null;
function supportsAnchorPositioning(): boolean {
  if (_supportsAnchorPositioning === null) {
    _supportsAnchorPositioning = typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('position-area', 'bottom span-right');
  }
  return _supportsAnchorPositioning;
}

/**
 * Build the CSS Anchor Positioning style object for the popup element.
 */
function buildCssAnchorStyles(
  anchorName: string,
  placement: PopupPlacement,
  offset: number,
  matchWidth: boolean,
): React.CSSProperties {
  const anchor = getAnchorStyles(placement);
  return {
    positionAnchor: `--${anchorName}`,
    positionArea: anchor.positionArea,
    positionTryFallbacks: 'flip-block, flip-inline',
    ...(anchor.justifySelf ? { justifySelf: anchor.justifySelf } : undefined),
    ...(anchor.alignSelf ? { alignSelf: anchor.alignSelf } : undefined),
    ...getOffsetStyle(placement, offset),
    ...(matchWidth ? { width: 'anchor-size(width)' } : undefined),
  } as React.CSSProperties;
}

/**
 * Popup component - a floating container anchored to an element.
 *
 * Uses CSS Anchor Positioning API with `position-try-fallbacks` for
 * automatic viewport collision handling when supported, with a
 * JavaScript positioning fallback for cross-browser support.
 *
 * Features:
 * - CSS Anchor Positioning with flip-block/flip-inline fallbacks
 * - JavaScript positioning fallback with flip + clamp for unsupported browsers
 * - Portal rendering (escapes parent z-index context)
 * - Click outside to close
 * - Escape key to close
 * - Match anchor width option
 * - Enter/exit animations (disable with noAnimation)
 * - Dynamic z-index stacking
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
 *   bottomStart
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
 *   top
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
      open: openProp,
      onClose: onCloseProp,
      defaultOpen = false,
      onOpenChange,
      anchorRef,
      offset = 4,
      closeOnEscape = true,
      closeOnClickOutside = true,
      portal = true,
      matchWidth = false,
      keepMounted = false,
      noAnimation = false,
      transitionDuration = 200,
      role = 'dialog',
      arrow = false,
      disabled = false,
      onEnterComplete,
      onExitComplete,
      hideWhenDetached = false,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const popupRef = useRef<HTMLDivElement>(null);
    const anchorName = useId().replace(/:/g, '-');
    const [resolvedPlacement, setResolvedPlacement] = useState<PopupPlacement | null>(null);
    const [positionStyles, setPositionStyles] = useState<React.CSSProperties>({});

    // Controllable open state — supports both controlled and uncontrolled modes
    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const onClose = useCallback(() => {
      onCloseProp?.();
      setOpen(false);
    }, [onCloseProp, setOpen]);

    const effectiveOpen = open && !disabled;

    // Extract placement from boolean props (e.g. top, bottomStart, rightEnd)
    const placementKey = pickFirstTruthyKeyByCategory(
      props as Record<string, unknown>,
      popupDefaults as Record<string, unknown>,
      'placement'
    ) || 'top';

    // Convert camelCase key to hyphenated format for internal positioning functions
    const placement = placementKey.replace(/([A-Z])/g, '-$1').toLowerCase() as PopupPlacement;

    // Transition and z-index
    const { mounted, state } = useTransition(effectiveOpen, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    const zIndex = useStackingContext(effectiveOpen, 'popup');

    // Stable ref for onClose to prevent effect dependency churn
    const onCloseRef = useRef(onClose);
    useLayoutEffect(() => {
      onCloseRef.current = onClose;
    });

    // Merge forwarded ref with internal popupRef
    const mergedRef = useCallback(
      (node: HTMLDivElement | null) => {
        popupRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Set anchor-name on the external anchor element (CSS Anchor Positioning only).
    // This is the only imperative DOM access needed — the anchor element is not
    // rendered by Popup, so we can't pass styles to it declaratively.
    useLayoutEffect(() => {
      if (!effectiveOpen || !supportsAnchorPositioning() || !anchorRef.current) return;

      const anchor = anchorRef.current;
      anchor.style.setProperty('anchor-name', `--${anchorName}`);

      return () => {
        anchor.style.removeProperty('anchor-name');
      };
    }, [effectiveOpen, anchorRef, anchorName]);

    // Compute positioning styles declaratively.
    // CSS path: builds style object from placement (no DOM measurement needed).
    // JS path: measures anchor + popup rects, computes top/left with flip/shift.
    // Both paths store the result in state; React applies it via the style prop.
    useLayoutEffect(() => {
      if (!effectiveOpen || !anchorRef.current) return;

      if (supportsAnchorPositioning()) {
        setPositionStyles(buildCssAnchorStyles(anchorName, placement, offset, matchWidth));
        setResolvedPlacement(placement);
      } else {
        const popup = popupRef.current;
        if (!popup) return;

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const pos = getJsPosition(anchorRect, popupRect, placement, offset);

        setPositionStyles({
          top: pos.top,
          left: pos.left,
          ...(matchWidth ? { width: anchorRect.width } : undefined),
        });
        setResolvedPlacement(pos.resolvedPlacement);
      }
    }, [effectiveOpen, anchorRef, anchorName, placementKey, offset, matchWidth]);

    // Escape key handler
    useEffect(() => {
      if (!effectiveOpen || !closeOnEscape) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onCloseRef.current?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [effectiveOpen, closeOnEscape]);

    // Click outside handler
    useEffect(() => {
      if (!effectiveOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const popup = popupRef.current;
        const anchor = anchorRef.current;

        // Don't close if clicking inside popup or anchor
        if (popup?.contains(target) || anchor?.contains(target)) {
          return;
        }

        onCloseRef.current?.();
      };

      // Use setTimeout to avoid closing immediately on the click that opened it
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [effectiveOpen, closeOnClickOutside, anchorRef]);

    // Hide when anchor scrolls out of view
    const [isDetached, setIsDetached] = useState(false);
    useEffect(() => {
      if (!hideWhenDetached || !effectiveOpen || typeof IntersectionObserver === 'undefined') {
        setIsDetached(false);
        return;
      }

      const anchor = anchorRef.current;
      if (!anchor) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsDetached(!entry.isIntersecting);
        },
        { threshold: 0 }
      );

      observer.observe(anchor);
      return () => observer.disconnect();
    }, [hideWhenDetached, effectiveOpen, anchorRef]);

    if (!mounted && !keepMounted) return null;

    const isHidden = !mounted && keepMounted;

    // Generate a stable id for aria-controls linkage
    const popupId = props.id || `popup-${anchorName}`;

    // Merge custom attributes into props spread to satisfy ThemedComponent types
    const mergedProps = { ...props, id: popupId, role, ...(isDetached ? { pointerEventsNone: true } : {}) };

    const content = (
      <ThemedComponent
        ref={mergedRef}
        theme={theme.popup}
        className={isHidden ? 'hidden' : isDetached ? 'invisible' : undefined}
        data-state={isHidden ? undefined : state}
        data-placement={resolvedPlacement || undefined}
        style={{
          '--z-index': zIndex,
          ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
          ...positionStyles,
        } as React.CSSProperties}
        aria-hidden={isHidden || undefined}
        {...mergedProps}
      >
        {children}
        {arrow && (
          <div className="vane-popup-arrow" aria-hidden="true" />
        )}
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
