import type React from 'react';
import type { CSSProperties } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/isomorphicLayoutEffect';

// Inline style that sizes the control or places it in its parent's layout. Like the width props,
// it belongs on the wrapper: on the field a width narrowed the field inside the full-width
// wrapper, and an overlaid chevron or section stayed at the wrapper's far edge. The rest of the
// style stays on the field. Shared by Select (always wrapped) and Input (wrapped as a box only
// while it has a section).
const WRAPPER_STYLE_KEYS = new Set<string>([
  'width', 'minWidth', 'maxWidth', 'inlineSize', 'minInlineSize', 'maxInlineSize',
  'flex', 'flexBasis', 'flexGrow', 'flexShrink', 'alignSelf', 'justifySelf', 'order',
  'gridArea', 'gridColumn', 'gridColumnStart', 'gridColumnEnd', 'gridRow', 'gridRowStart', 'gridRowEnd',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginInline', 'marginInlineStart', 'marginInlineEnd', 'marginBlock', 'marginBlockStart', 'marginBlockEnd',
]);

export function splitStyle(style: CSSProperties | undefined): { wrapperStyle?: CSSProperties; fieldStyle?: CSSProperties } {
  if (!style) return {};
  const wrapperStyle: Record<string, unknown> = {};
  const fieldStyle: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(style)) {
    (WRAPPER_STYLE_KEYS.has(key) ? wrapperStyle : fieldStyle)[key] = value;
  }
  return {
    wrapperStyle: Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined,
    fieldStyle: Object.keys(fieldStyle).length > 0 ? fieldStyle : undefined,
  };
}

/** Props that size and place the whole control, so they go on the wrapper (not the field) */
export const WRAPPER_PROP_KEYS = [
  'className',
  'wFull', 'wFit', 'wAuto', 'wScreen',
  'mobileWFull', 'tabletWFull', 'desktopWFull',
  'mobileHide', 'tabletHide', 'desktopHide',
  'mobileShow', 'tabletShow', 'desktopShow',
  'noShrink',
] as const;

/**
 * Splits a field's props into the wrapper's (width, visibility, className, the sizing part of
 * `style`, flex shrink, and `disabled` for the dimming) and the field's. `disabled` stays on the
 * field too, so the native attribute is still emitted.
 */
export function splitWrapperProps<P extends Record<string, unknown>>(props: P): {
  wrapperProps: Record<string, unknown>;
  fieldProps: Record<string, unknown>;
} {
  const wrapperProps: Record<string, unknown> = {};
  const fieldProps: Record<string, unknown> = { ...props };
  for (const key of WRAPPER_PROP_KEYS) {
    if (key in fieldProps) {
      wrapperProps[key] = fieldProps[key];
      delete fieldProps[key];
    }
  }
  const { wrapperStyle, fieldStyle } = splitStyle(props.style as CSSProperties | undefined);
  wrapperProps.style = wrapperStyle;
  fieldProps.style = fieldStyle;
  wrapperProps.disabled = props.disabled;
  return { wrapperProps, fieldProps };
}

/** A section slot is present when it holds something React renders */
export function hasSection(node: React.ReactNode): boolean {
  return node !== undefined && node !== null && node !== false && node !== true && node !== '';
}

/** The custom properties the field's padding reads (the unlayered block in rules.css) */
const START_VAR = '--field-start-section';
const END_VAR = '--field-end-section';

/**
 * Publishes each section's width on the wrapper, so the field reserves exactly that much
 * room for it: a prefix like "https://" is wider than an icon. Measured before paint and
 * again whenever a section resizes. Without a measurement (server markup, no
 * ResizeObserver) the stylesheet reserves one icon's width.
 */
export function useSectionWidths(
  wrapperRef: React.RefObject<HTMLElement | null>,
  startRef: React.RefObject<HTMLElement | null>,
  endRef: React.RefObject<HTMLElement | null>,
  hasStart: boolean,
  hasEnd: boolean,
): void {
  useIsomorphicLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const slots: Array<[React.RefObject<HTMLElement | null>, string, boolean]> = [
      [startRef, START_VAR, hasStart],
      [endRef, END_VAR, hasEnd],
    ];
    const measure = () => {
      for (const [ref, name, present] of slots) {
        const el = ref.current;
        if (present && el) wrapper.style.setProperty(name, `${el.offsetWidth}px`);
        else wrapper.style.removeProperty(name);
      }
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    for (const [ref, , present] of slots) {
      if (present && ref.current) observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [wrapperRef, startRef, endRef, hasStart, hasEnd]);
}
