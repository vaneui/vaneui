import { createElement } from 'react';
import type { ReactNode } from 'react';

/** Class of the span a component renders around each run of its own text. */
export const TEXT_RUN_CLASS = 'vane-text-run';

type Kind = 'text' | 'empty' | 'other' | 'mixed';

// White space a flex container drops: text made only of these characters produces no flex item,
// so a span around it would add an item (and a gap) that is not there today.
const BLANK = /^[ \t\n\r\f]*$/;

function kindOf(node: ReactNode): Kind {
  if (typeof node === 'string') return node === '' ? 'empty' : 'text';
  if (typeof node === 'number' || typeof node === 'bigint') return 'text';
  if (node == null || typeof node === 'boolean') return 'empty';
  if (Array.isArray(node)) {
    let text = false;
    let other = false;
    for (const child of node as ReactNode[]) {
      const kind = kindOf(child);
      if (kind === 'mixed') return 'mixed';
      if (kind === 'text') text = true;
      else if (kind === 'other') other = true;
    }
    if (text && other) return 'mixed';
    if (text) return 'text';
    return other ? 'other' : 'empty';
  }
  return 'other';
}

function textOf(node: ReactNode): string {
  if (Array.isArray(node)) return (node as ReactNode[]).map(textOf).join('');
  return typeof node === 'string' || typeof node === 'number' || typeof node === 'bigint' ? String(node) : '';
}

/**
 * Wraps each run of text among `children` in a `<span class="vane-text-run">`.
 *
 * A flex container puts bare text in an anonymous box that no selector reaches. The browser
 * centers that box by the font's line box, which is rarely symmetric around the letters, so
 * the text of a Button or Badge sits a little high or low. The span gives the text a box the
 * stylesheet can trim to the capital height (see the `.vane-text-run` rule in rules.css).
 *
 * The layout of the children does not change:
 * - text nodes that touch (`{count} items`) share one span, as they share one flex item today;
 * - white space on its own stays bare, because a flex container renders nothing for it;
 * - elements are returned untouched and at the same index, so their state and keys hold;
 * - text that sits in a nested array next to elements is left as it is.
 */
export function wrapTextRuns(children: ReactNode): ReactNode {
  if (!Array.isArray(children)) {
    return kindOf(children) === 'text' && !BLANK.test(textOf(children))
      ? createElement('span', { className: TEXT_RUN_CLASS }, children)
      : children;
  }

  const items = children as ReactNode[];
  const kinds = items.map(kindOf);
  if (kinds.includes('mixed') || !kinds.includes('text')) return children;

  const result = items.slice();
  let wrapped = false;
  let start = -1;
  const closeRun = (end: number) => {
    if (start < 0) return;
    const run = items.slice(start, end);
    if (!BLANK.test(textOf(run))) {
      // the span takes the place of the run's first node and the rest of the run becomes null,
      // so every other child keeps its index
      result[start] = createElement('span', { key: `vane-text-run-${start}`, className: TEXT_RUN_CLASS }, ...run);
      for (let i = start + 1; i < end; i++) result[i] = null;
      wrapped = true;
    }
    start = -1;
  };

  kinds.forEach((kind, index) => {
    if (kind === 'text') {
      if (start < 0) start = index;
    } else if (kind === 'other') {
      closeRun(index);
    }
    // an empty child (null, false, '') renders nothing, so it neither starts nor ends a run
  });
  closeRun(items.length);

  return wrapped ? result : children;
}
