import { forwardRef, useRef, useState, useEffect, useCallback, useId } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/isomorphicLayoutEffect';
import { createPortal } from 'react-dom';
import type { PopupProps } from "./PopupProps";
import { useTheme } from '../../themeContext';
import { ThemedComponent } from '../../themedComponent';
import { defaultPopupTheme } from './defaultPopupTheme';
import { pickFirstTruthyKeyByCategory } from '../../utils/componentUtils';
import { useTransition } from '../../utils/transition';
import { useStackingContext } from '../../utils/stackingContext';
import { useControllableState } from '../../utils/controllableState';
import { useMergedRef } from '../../utils/mergedRef';
import { useHydrated } from '../../utils/useHydrated';
import { pushEscapeHandler } from '../../utils/escapeStack';
import { getFocusableElements, useFocusTrap } from '../../utils/focusTrap';
import { registerOverlay, isInOverlayFamily } from '../../utils/overlayStack';

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

interface AnchorStyles {
  positionArea: string;
  justifySelf?: string;
  alignSelf?: string;
}

// -start/-end variants use `span-*` keywords so the popup area edge aligns with the anchor's edge;
// -end also sets justify-self/align-self to push the popup to the far edge of the spanned area.
function getAnchorStyles(placement: PopupPlacement): AnchorStyles {
  const map: Record<PopupPlacement, AnchorStyles> = {
    'top':    { positionArea: 'top center' },
    'bottom': { positionArea: 'bottom center' },
    'left':   { positionArea: 'center left',  justifySelf: 'end' },
    'right':  { positionArea: 'center right' },

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

function flipBlock(placement: PopupPlacement): PopupPlacement {
  if (placement.startsWith('top')) return placement.replace('top', 'bottom') as PopupPlacement;
  if (placement.startsWith('bottom')) return placement.replace('bottom', 'top') as PopupPlacement;
  return placement;
}

function flipInline(placement: PopupPlacement): PopupPlacement {
  if (placement.startsWith('left')) return placement.replace('left', 'right') as PopupPlacement;
  if (placement.startsWith('right')) return placement.replace('right', 'left') as PopupPlacement;
  return placement;
}

function calcPosition(
  anchorRect: DOMRect,
  popupRect: DOMRect,
  placement: PopupPlacement,
  offset: number
): { top: number; left: number } {
  let top = 0;
  let left = 0;

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

// Does `pos` overflow the viewport on the placement's MAIN axis only?
function overflowsMainAxis(
  pos: { top: number; left: number },
  popupRect: DOMRect,
  isBlockAxis: boolean,
): boolean {
  return isBlockAxis
    ? pos.top < 0 || pos.top + popupRect.height > window.innerHeight
    : pos.left < 0 || pos.left + popupRect.width > window.innerWidth;
}

// Strategy: flip only along the MAIN axis (and only when it overflows), then
// shift the cross axis + clamp the main axis. A pure cross-axis overflow
// (e.g. horizontal for a top/bottom popup) is fixed by shifting, never by a
// spurious flip to the opposite side.
function getJsPosition(
  anchorRect: DOMRect,
  popupRect: DOMRect,
  placement: PopupPlacement,
  offset: number
): { top: number; left: number; resolvedPlacement: PopupPlacement } {
  const isBlockAxis = placement.startsWith('top') || placement.startsWith('bottom');
  let resolved = placement;
  const pos = calcPosition(anchorRect, popupRect, placement, offset);

  if (overflowsMainAxis(pos, popupRect, isBlockAxis)) {
    const flipped = isBlockAxis ? flipBlock(placement) : flipInline(placement);
    if (flipped !== placement) {
      const flippedPos = calcPosition(anchorRect, popupRect, flipped, offset);
      if (!overflowsMainAxis(flippedPos, popupRect, isBlockAxis)) {
        resolved = flipped;
        pos.top = flippedPos.top;
        pos.left = flippedPos.left;
      }
    }
  }

  pos.left = Math.max(0, Math.min(pos.left, window.innerWidth - popupRect.width));
  pos.top = Math.max(0, Math.min(pos.top, window.innerHeight - popupRect.height));
  return { ...pos, resolvedPlacement: resolved };
}

// Derive the popup's ACTUAL placement side from its rendered geometry. On the
// CSS-anchor path the browser can silently flip via position-try-fallbacks, so
// the requested placement is stale; comparing the rendered rects recovers the
// real side — which drives the arrow direction and the public data-placement
// (B1/B4). The alignment suffix (-start/-end) is preserved from the request.
function measurePlacement(
  anchorRect: DOMRect,
  popupRect: DOMRect,
  requested: PopupPlacement,
): PopupPlacement {
  const isBlockAxis = requested.startsWith('top') || requested.startsWith('bottom');
  const anchorCenterX = anchorRect.left + anchorRect.width / 2;
  const anchorCenterY = anchorRect.top + anchorRect.height / 2;
  const popupCenterX = popupRect.left + popupRect.width / 2;
  const popupCenterY = popupRect.top + popupRect.height / 2;
  const side = isBlockAxis
    ? (popupCenterY < anchorCenterY ? 'top' : 'bottom')
    : (popupCenterX < anchorCenterX ? 'left' : 'right');
  // Re-derive the -start/-end suffix from geometry so it stays correct after an
  // inline flip (a requested -start can render -end near a viewport edge).
  let suffix = '';
  if (requested.endsWith('-start') || requested.endsWith('-end')) {
    const startD = isBlockAxis ? Math.abs(popupRect.left - anchorRect.left) : Math.abs(popupRect.top - anchorRect.top);
    const endD = isBlockAxis ? Math.abs(popupRect.right - anchorRect.right) : Math.abs(popupRect.bottom - anchorRect.bottom);
    suffix = startD <= endD ? '-start' : '-end';
  }
  return (side + suffix) as PopupPlacement;
}

// tests for span-* values (Chrome/Edge 129+), not just basic position-area (Chrome 125+)
let _supportsAnchorPositioning: boolean | null = null;
function supportsAnchorPositioning(): boolean {
  if (_supportsAnchorPositioning === null) {
    _supportsAnchorPositioning = typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('position-area', 'bottom span-right');
  }
  return _supportsAnchorPositioning;
}

// align-self / justify-self are applied as VaneUI props (see anchorSelfProps),
// not inline styles, so only the position-area + offset + width stay here.
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
    ...getOffsetStyle(placement, offset),
    ...(matchWidth ? { width: 'anchor-size(width)' } : undefined),
  } as React.CSSProperties;
}

// Map a placement's anchor-grid edge alignment to VaneUI alignSelf/justifySelf
// boolean props. Inert on the JS-fallback path (absolute top/left positioning),
// so they can be applied unconditionally.
function anchorSelfProps(placement: PopupPlacement): Record<string, boolean> {
  const anchor = getAnchorStyles(placement);
  const justifyMap: Record<string, string> = {
    start: 'justifySelfStart', end: 'justifySelfEnd', center: 'justifySelfCenter', stretch: 'justifySelfStretch',
  };
  const alignMap: Record<string, string> = {
    start: 'alignSelfStart', end: 'alignSelfEnd', center: 'alignSelfCenter', stretch: 'alignSelfStretch',
  };
  const out: Record<string, boolean> = {};
  if (anchor.justifySelf && justifyMap[anchor.justifySelf]) out[justifyMap[anchor.justifySelf]] = true;
  if (anchor.alignSelf && alignMap[anchor.alignSelf]) out[alignMap[anchor.alignSelf]] = true;
  return out;
}

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
      modal = false,
      autoFocus = false,
      onEnterComplete,
      onExitComplete,
      hideWhenDetached = false,
      children,
      ...props
    },
    ref
  ) {
    const theme = useTheme();
    const popupTheme = theme?.popup ?? defaultPopupTheme;
    const popupRef = useRef<HTMLDivElement>(null);
    const anchorName = useId().replace(/:/g, '-');
    const [resolvedPlacement, setResolvedPlacement] = useState<PopupPlacement | null>(null);
    const [positionStyles, setPositionStyles] = useState<React.CSSProperties>({});

    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
      hasExternalHandler: !!onCloseProp,
    });

    const onClose = useCallback(() => {
      onCloseProp?.();
      setOpen(false);
    }, [onCloseProp, setOpen]);

    // only the portal path lacks server markup, so only it waits for hydration
    const hydrated = useHydrated();
    const effectiveOpen = open && !disabled && (!portal || hydrated);

    const placementKey = pickFirstTruthyKeyByCategory(
      props as Record<string, unknown>,
      popupTheme.defaults as Record<string, unknown>,
      'placement'
    ) || 'placeTop';

    // strip the `place` prefix, then camelCase -> kebab: placeTopStart -> top-start
    const placement = placementKey.replace(/^place/, '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '') as PopupPlacement;

    const { mounted, state } = useTransition(effectiveOpen, transitionDuration, noAnimation, { onEnterComplete, onExitComplete });
    // Resolve the opener overlay from the anchor's DOM ancestry (not the overlay
    // registry) so nesting is known even before the parent overlay registers.
    const resolveParentOverlay = (): HTMLElement | null =>
      (anchorRef.current?.closest('.vane-overlay, .vane-popup') as HTMLElement | null) ?? null;
    const zIndex = useStackingContext(effectiveOpen, 'popup', popupRef, resolveParentOverlay);

    // stable ref to prevent effect dependency churn
    const onCloseRef = useRef(onClose);
    useIsomorphicLayoutEffect(() => {
      onCloseRef.current = onClose;
    });

    // dialog-style popups portal to document.body, which breaks sequential
    // focus order — when autoFocus is set (click-opened dialogs), move focus
    // into the popup on open so keyboard users can reach its content;
    // focus-return on close is the opener's responsibility
    useEffect(() => {
      // when modal, useFocusTrap below owns focus-in / trap / return
      if (!effectiveOpen || !autoFocus || modal) return;

      const raf = requestAnimationFrame(() => {
        const popup = popupRef.current;
        if (!popup || popup.contains(document.activeElement)) return;

        const focusable = getFocusableElements(popup);
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          popup.setAttribute('tabindex', '-1');
          popup.focus();
        }
      });

      return () => cancelAnimationFrame(raf);
    }, [effectiveOpen, autoFocus, modal]);

    // modal Popup-as-dialog: trap Tab focus, move focus in on open, return it
    // on close (mirrors Modal). A non-modal Popup keeps its lightweight autoFocus.
    useFocusTrap(popupRef, effectiveOpen && modal, { returnFocus: true });

    // dev-only: a modal dialog with no accessible name is an ARIA violation
    useEffect(() => {
      if (process.env.NODE_ENV !== 'production' && effectiveOpen && modal) {
        const p = props as Record<string, unknown>;
        if (!p['aria-label'] && !p['aria-labelledby']) {
          console.warn(
            'VaneUI: a modal Popup has no accessible name — set aria-label or aria-labelledby so screen readers can announce the dialog.'
          );
        }
      }
    }, [effectiveOpen, modal]);

    const mergedRef = useMergedRef(ref, popupRef);

    // gated on `mounted` (not `open`) so anchor-name survives the exit transition
    useIsomorphicLayoutEffect(() => {
      if (!mounted || !supportsAnchorPositioning() || !anchorRef.current) return;

      const anchor = anchorRef.current;
      anchor.style.setProperty('anchor-name', `--${anchorName}`);

      return () => {
        anchor.style.removeProperty('anchor-name');
      };
    }, [mounted, anchorRef, anchorName]);

    const updateJsPosition = useCallback(() => {
      const anchor = anchorRef.current;
      const popup = popupRef.current;
      if (!anchor || !popup) return;

      const anchorRect = anchor.getBoundingClientRect();
      const popupRect = popup.getBoundingClientRect();
      const pos = getJsPosition(anchorRect, popupRect, placement, offset);

      setPositionStyles({
        top: pos.top,
        left: pos.left,
        ...(matchWidth ? { width: anchorRect.width } : undefined),
      });
      setResolvedPlacement(pos.resolvedPlacement);
    }, [anchorRef, placement, offset, matchWidth]);

    // CSS-anchor path: read the rendered geometry to recover the side the
    // browser actually placed the popup on (it may have flipped via
    // position-try after our styles were applied).
    const measureCssPlacement = useCallback(() => {
      const anchor = anchorRef.current;
      const popup = popupRef.current;
      if (!anchor || !popup) return;
      setResolvedPlacement(
        measurePlacement(anchor.getBoundingClientRect(), popup.getBoundingClientRect(), placement)
      );
    }, [anchorRef, placement]);

    useIsomorphicLayoutEffect(() => {
      if (!effectiveOpen || !anchorRef.current) return;

      if (supportsAnchorPositioning()) {
        setPositionStyles(buildCssAnchorStyles(anchorName, placement, offset, matchWidth));
        setResolvedPlacement(placement); // optimistic; corrected post-layout by measureCssPlacement
      } else {
        updateJsPosition();
      }
    }, [effectiveOpen, anchorRef, anchorName, placementKey, offset, matchWidth, updateJsPosition]);

    // reposition on scroll/resize for JS fallback path
    useEffect(() => {
      if (!effectiveOpen || supportsAnchorPositioning()) return;

      const handleReposition = () => updateJsPosition();

      window.addEventListener('scroll', handleReposition, true);
      window.addEventListener('resize', handleReposition);

      return () => {
        window.removeEventListener('scroll', handleReposition, true);
        window.removeEventListener('resize', handleReposition);
      };
    }, [effectiveOpen, updateJsPosition]);

    // CSS-anchor path: correct data-placement (and thus the arrow) from the
    // browser's actual flip, after layout and on every reposition (B1/B4)
    useEffect(() => {
      if (!effectiveOpen || !supportsAnchorPositioning()) return;

      const raf = requestAnimationFrame(measureCssPlacement);
      window.addEventListener('scroll', measureCssPlacement, true);
      window.addEventListener('resize', measureCssPlacement);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('scroll', measureCssPlacement, true);
        window.removeEventListener('resize', measureCssPlacement);
      };
    }, [effectiveOpen, measureCssPlacement]);

    // only the topmost floating element closes on Escape
    useEffect(() => {
      if (!effectiveOpen || !closeOnEscape) return;
      return pushEscapeHandler(() => onCloseRef.current?.(), popupRef.current);
    }, [effectiveOpen, closeOnEscape]);

    // register in the shared overlay stack so nested popups know their lineage:
    // the parent is resolved from the anchor's DOM ancestry (a child popup's
    // trigger lives inside its parent's content), which — unlike the registry —
    // works even before the parent overlay registers (child effects run first).
    useEffect(() => {
      if (!effectiveOpen) return;
      const popup = popupRef.current;
      if (!popup) return;
      return registerOverlay(popup, resolveParentOverlay());
    }, [effectiveOpen, anchorRef]);

    useEffect(() => {
      if (!effectiveOpen || !closeOnClickOutside) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const popup = popupRef.current;
        const anchor = anchorRef.current;

        // "inside" includes any portaled child popup in this popup's family —
        // interacting with a submenu/nested popup must not close its parent.
        if ((popup && isInOverlayFamily(target, popup)) || anchor?.contains(target)) {
          return;
        }

        onCloseRef.current?.();
      };

      // defer attach to avoid closing on the click that opened the popup
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [effectiveOpen, closeOnClickOutside, anchorRef]);

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

    const popupId = props.id || `popup-${anchorName}`;

    const mergedProps = { ...props, id: popupId, role, ...(modal ? { 'aria-modal': true } : {}), ...anchorSelfProps(placement), ...(isDetached ? { pointerEventsNone: true } : {}) };

    // Composite-widget popups (Menu etc.) own their own focusable items, so the
    // scroll box must NOT be a tab stop (it would break the role's required
    // children). Plain-content popups make the scroll box keyboard-scrollable.
    const compositeRoles = ['menu', 'menubar', 'listbox', 'tree', 'treegrid', 'grid', 'tablist', 'radiogroup'];
    const scrollTabIndex = role && compositeRoles.includes(role) ? undefined : 0;

    const content = (
      <ThemedComponent
        ref={mergedRef}
        theme={popupTheme}
        className={isHidden ? 'hidden' : isDetached ? 'invisible' : undefined}
        data-state={isHidden ? undefined : state}
        data-placement={resolvedPlacement || undefined}
        style={{
          '--z-index': zIndex,
          ...(transitionDuration !== 200 ? { '--transition-duration': `${transitionDuration}ms` } : undefined),
          ...positionStyles,
        } as React.CSSProperties}
        aria-hidden={(isHidden || isDetached) || undefined}
        {...mergedProps}
      >
        {/* Inner scroll box so clamping never clips the arrow (on the outer, overflow-visible box); tabindex keeps it keyboard-scrollable. */}
        <div className="vane-popup-scroll" tabIndex={scrollTabIndex}>{children}</div>
        {arrow && (
          <div className="vane-popup-arrow" aria-hidden="true" />
        )}
      </ThemedComponent>
    );

    if (portal) {
      // SSR: the portal target can't exist server-side, and rendering the
      // content inline would hydrate differently than the client (which
      // portals to document.body) - render nothing; portaled content
      // appears after hydration
      // false on the server and on the hydrating render; also covers keepMounted content
      if (!hydrated) {
        return null;
      }
      return createPortal(content, document.body);
    }

    return content;
  }
);

Popup.displayName = 'Popup';
