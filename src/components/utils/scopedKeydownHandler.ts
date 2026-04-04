/**
 * Options for creating a scoped keyboard navigation handler.
 */
export interface ScopedKeydownHandlerOptions {
  /** Parent container to scope navigation within */
  parentSelector: string;
  /** Selector for navigable items within the parent */
  siblingSelector: string;
  /** Whether to loop from last to first / first to last (default: true) */
  loop?: boolean;
  /** Orientation for arrow key mapping (default: 'vertical') */
  orientation?: 'vertical' | 'horizontal';
  /** Called when Enter or Space is pressed on an item */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Creates a keyboard event handler for navigating between sibling elements
 * within a scoped parent container using arrow keys, Home, End, Enter, Space.
 *
 * This is a pure function (not a hook) — suitable for use in event handlers.
 *
 * Supports:
 * - ArrowDown/ArrowUp (vertical) or ArrowRight/ArrowLeft (horizontal) navigation
 * - Home/End jump to first/last
 * - Skips disabled items ([data-disabled])
 * - Loop wrapping (configurable)
 *
 * @example
 * ```tsx
 * <div
 *   role="menuitem"
 *   data-menu-item
 *   onKeyDown={createScopedKeydownHandler({
 *     parentSelector: '[data-menu-dropdown]',
 *     siblingSelector: '[data-menu-item]:not([data-disabled])',
 *     loop: true,
 *     orientation: 'vertical',
 *   })}
 * />
 * ```
 */
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
    }

    if (nextIndex !== null && siblings[nextIndex]) {
      siblings[nextIndex].focus();
    }
  };
}
