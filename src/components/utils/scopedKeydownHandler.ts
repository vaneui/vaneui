export interface ScopedKeydownHandlerOptions {
  parentSelector: string;
  siblingSelector: string;
  loop?: boolean;
  orientation?: 'vertical' | 'horizontal';
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
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
    }

    if (nextIndex !== null && siblings[nextIndex]) {
      siblings[nextIndex].focus();
    }
  };
}
