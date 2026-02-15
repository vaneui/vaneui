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

/**
 * Convert placement to CSS position-area value
 */
function getPositionArea(placement: PopupPlacement): string {
  const map: Record<PopupPlacement, string> = {
    'top': 'block-start center',
    'top-start': 'block-start inline-start',
    'top-end': 'block-start inline-end',
    'bottom': 'block-end center',
    'bottom-start': 'block-end inline-start',
    'bottom-end': 'block-end inline-end',
    'left': 'center inline-start',
    'left-start': 'block-start inline-start',
    'left-end': 'block-end inline-start',
    'right': 'center inline-end',
    'right-start': 'block-start inline-end',
    'right-end': 'block-end inline-end',
  };
  return map[placement];
}

/**
 * Convert placement to margin property for offset (CSS Anchor Positioning path)
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
 * Mirrors CSS Anchor Positioning's flip-block, flip-inline fallback strategy:
 * 1. Try original placement
 * 2. Try flipping the block axis (top↔bottom)
 * 3. Try flipping the inline axis (left↔right)
 * 4. Fall back to original and clamp to viewport edges
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

  // None fit perfectly — use the best candidate and clamp to viewport
  // Prefer block-flip for top/bottom placements, inline-flip for left/right
  const bestPlacement = (flippedBlock !== placement) ? flippedBlock : placement;
  const bestPos = (flippedBlock !== placement)
    ? calcPosition(anchorRect, popupRect, flippedBlock, offset)
    : pos;

  return {
    top: Math.max(0, Math.min(bestPos.top, window.innerHeight - popupRect.height)),
    left: Math.max(0, Math.min(bestPos.left, window.innerWidth - popupRect.width)),
    resolvedPlacement: bestPlacement,
  };
}

// Cached feature detection
let _supportsAnchorPositioning: boolean | null = null;
function supportsAnchorPositioning(): boolean {
  if (_supportsAnchorPositioning === null) {
    _supportsAnchorPositioning = typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('position-area', 'top');
  }
  return _supportsAnchorPositioning;
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
    const zIndex = useStackingContext(effectiveOpen);

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

    // Combined positioning effect — useLayoutEffect prevents FOUC
    // Uses CSS Anchor Positioning with flip fallbacks when supported, JS fallback otherwise
    useLayoutEffect(() => {
      if (!effectiveOpen || !popupRef.current || !anchorRef.current) return;

      const popup = popupRef.current;
      const anchor = anchorRef.current;

      if (supportsAnchorPositioning()) {
        // CSS Anchor Positioning path with viewport collision handling
        anchor.style.setProperty('anchor-name', `--${anchorName}`);
        popup.style.setProperty('position-anchor', `--${anchorName}`);
        popup.style.setProperty('position-area', getPositionArea(placement));
        popup.style.setProperty('position-try-fallbacks', 'flip-block, flip-inline');

        // Offset margins
        const offsetStyles = getOffsetStyle(placement, offset);
        Object.entries(offsetStyles).forEach(([key, value]) => {
          popup.style.setProperty(
            key.replace(/([A-Z])/g, '-$1').toLowerCase(),
            typeof value === 'number' ? `${value}px` : value
          );
        });

        if (matchWidth) {
          popup.style.setProperty('width', 'anchor-size(width)');
        }

        // For CSS path, use the requested placement (browser handles flipping)
        setResolvedPlacement(placement);
      } else {
        // JavaScript positioning fallback with flip + clamp
        const anchorRect = anchor.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();
        const pos = getJsPosition(anchorRect, popupRect, placement, offset);
        popup.style.top = `${pos.top}px`;
        popup.style.left = `${pos.left}px`;

        if (matchWidth) {
          popup.style.width = `${anchorRect.width}px`;
        }

        setResolvedPlacement(pos.resolvedPlacement);
      }

      return () => {
        anchor.style.removeProperty('anchor-name');
        popup.style.removeProperty('position-anchor');
        popup.style.removeProperty('position-area');
        popup.style.removeProperty('position-try-fallbacks');
        popup.style.removeProperty('top');
        popup.style.removeProperty('left');
        popup.style.removeProperty('width');
        popup.style.removeProperty('margin-top');
        popup.style.removeProperty('margin-bottom');
        popup.style.removeProperty('margin-left');
        popup.style.removeProperty('margin-right');
      };
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
        data-state={isHidden ? undefined : state}
        data-placement={resolvedPlacement || undefined}
        style={{
          zIndex,
          ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } as React.CSSProperties : undefined),
          ...(isHidden ? { display: 'none' } : undefined),
          ...(isDetached ? { visibility: 'hidden' as const } : undefined),
        }}
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
