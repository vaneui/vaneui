import type React from 'react';

type AnyRef<T> = React.Ref<T> | undefined | null;

const assignRef = <T,>(ref: AnyRef<T>, node: T | null): void => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = node;
  }
};

/**
 * Reads the ref attached to a React element across React versions without
 * triggering dev-mode deprecation warnings: React 19 carries it on
 * `element.props.ref` (and warns on `element.ref`); React 18 carries it on
 * `element.ref` (and warns on `element.props.ref`). The warning getters are
 * detectable via their `isReactWarning` marker.
 */
export function getElementRef<T>(element: React.ReactElement): AnyRef<T> {
  // React 18 dev: props.ref is a warning getter — read element.ref
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as unknown as { ref?: React.Ref<T> }).ref;
  }

  // React 19 dev: element.ref is a warning getter — read props.ref
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: React.Ref<T> }).ref;
  }

  // production: no warning getters — whichever holds the value
  return (
    (element.props as { ref?: React.Ref<T> }).ref ??
    (element as unknown as { ref?: React.Ref<T> }).ref
  );
}

/**
 * Composes multiple refs into one callback ref so cloneElement can attach an
 * internal ref WITHOUT discarding a ref the consumer already put on the
 * element. Null/undefined entries are skipped.
 */
export function composeRefs<T>(...refs: AnyRef<T>[]): React.RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      assignRef(ref, node);
    }
  };
}
