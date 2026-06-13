export interface ScopedKeydownHandlerOptions {
  parentSelector: string;
  siblingSelector: string;
  loop?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

// Typeahead state is module-scoped (shared by every handler instance) because
// focus moves between siblings as keys are pressed — each keydown lands on a
// different element's handler, so a per-handler buffer could never accumulate.
// Only one roving-focus group holds keyboard focus at a time; the parent check
// resets the buffer when focus moves to a different group.
const TYPEAHEAD_RESET_MS = 500;
let typeaheadBuffer = '';
let typeaheadExpiresAt = 0;
let typeaheadParent: Element | null = null;

function isTypeaheadKey(event: React.KeyboardEvent<HTMLElement>): boolean {
  // single printable character; Space activates items, modifiers are shortcuts
  return (
    event.key.length === 1 &&
    event.key !== ' ' &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey
  );
}

function getTypeaheadIndex(
  siblings: HTMLElement[],
  currentIndex: number,
  parent: Element,
  key: string
): number | null {
  const now = Date.now();
  if (now > typeaheadExpiresAt || parent !== typeaheadParent) {
    typeaheadBuffer = '';
  }
  typeaheadParent = parent;
  typeaheadExpiresAt = now + TYPEAHEAD_RESET_MS;
  typeaheadBuffer += key.toLowerCase();

  // repeated presses of the same character cycle through matches instead of
  // accumulating into an unmatchable prefix ("dd")
  const chars = typeaheadBuffer.split('');
  const isRepeat = chars.every((ch) => ch === chars[0]);
  const query = isRepeat ? chars[0] : typeaheadBuffer;

  // search wraps, starting AFTER the focused item; the focused item itself is
  // checked last so a longer prefix that still matches it keeps focus in place
  for (let i = 1; i <= siblings.length; i++) {
    const candidateIndex = (currentIndex + i) % siblings.length;
    const text = (siblings[candidateIndex].textContent || '').trim().toLowerCase();
    if (text.startsWith(query)) {
      return candidateIndex;
    }
  }
  return null;
}

export function createScopedKeydownHandler(
  options: ScopedKeydownHandlerOptions
): (event: React.KeyboardEvent<HTMLElement>) => void {
  const {
    parentSelector,
    siblingSelector,
    loop = true,
    orientation = 'vertical',
    onKeyDown,
  } = options;

  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
  const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

  return (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);

    const target = event.currentTarget;
    const parent = target.closest(parentSelector);
    if (!parent) return;

    const siblings = Array.from(
      parent.querySelectorAll<HTMLElement>(siblingSelector)
    );

    const currentIndex = siblings.indexOf(target);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (event.key) {
      case nextKey: {
        event.preventDefault();
        if (currentIndex < siblings.length - 1) {
          nextIndex = currentIndex + 1;
        } else if (loop) {
          nextIndex = 0;
        }
        break;
      }
      case prevKey: {
        event.preventDefault();
        if (currentIndex > 0) {
          nextIndex = currentIndex - 1;
        } else if (loop) {
          nextIndex = siblings.length - 1;
        }
        break;
      }
      case 'Home': {
        event.preventDefault();
        nextIndex = 0;
        break;
      }
      case 'End': {
        event.preventDefault();
        nextIndex = siblings.length - 1;
        break;
      }
      default: {
        if (isTypeaheadKey(event)) {
          const matchIndex = getTypeaheadIndex(siblings, currentIndex, parent, event.key);
          if (matchIndex !== null) {
            event.preventDefault();
            nextIndex = matchIndex;
          }
        }
        break;
      }
    }

    if (nextIndex !== null && siblings[nextIndex]) {
      siblings[nextIndex].focus();
    }
  };
}
