import { twMerge } from "tailwind-merge";

/**
 * Index of the colon that closes a class's variants (the one after `max-tablet`), or -1 for a
 * class with none. A colon inside `[...]` or `(...)` belongs to the value, as in
 * `text-(length:--fs)`.
 */
function variantEnd(cls: string): number {
  let depth = 0;
  let end = -1;
  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];
    if (char === '[' || char === '(') {
      depth++;
    } else if (char === ']' || char === ')') {
      depth--;
    } else if (char === ':' && depth === 0) {
      end = i;
    }
  }
  return end;
}

const NONE: ReadonlySet<string> = new Set();

/*
 * className → the responsive classes it overrides, kept per `responsive` set. A theme owns one
 * set and never changes it, so the set stands for the theme.
 * Capped: a component that keeps getting new class names starts over instead of growing.
 */
const overriddenCache = new WeakMap<ReadonlySet<string>, Map<string, ReadonlySet<string>>>();
const MAX_CACHED_CLASS_NAMES = 200;

function findOverridden(responsive: ReadonlySet<string>, className: string): ReadonlySet<string> {
  // only a user class with no variant speaks for every width
  const plain = className.split(/\s+/).filter(cls => cls && variantEnd(cls) === -1).join(' ');
  if (!plain) {
    return NONE;
  }
  const plainMerged = twMerge(plain);
  const overridden = new Set<string>();
  for (const cls of responsive) {
    // overridden when the class, without its variant, adds nothing in front of the user's classes
    if (twMerge(`${cls.slice(variantEnd(cls) + 1)} ${plain}`) === plainMerged) {
      overridden.add(cls);
    }
  }
  return overridden.size > 0 ? overridden : NONE;
}

/**
 * Returns the theme's classes without the below-breakpoint classes that `className` overrides.
 *
 * A responsive component sets one value with three classes, for example
 * `py-(--py-desktop) max-tablet:py-(--py-tablet) max-mobile:py-(--py-mobile)`. twMerge only
 * lets a vertical padding class in `className` replace the first: classes with different
 * variants never conflict. So each class in `responsive` (all such classes of the theme,
 * emitted or not) is tested without its variant against the user's classes that have no
 * variant, the ones meant for every width, and is left out when they override it. A user class
 * with its own variant is not looked at here: twMerge already resolves it against the theme
 * class of the same variant.
 */
export function dropOverriddenResponsiveClasses(
  themeClasses: readonly string[],
  responsive: ReadonlySet<string>,
  className: string,
): readonly string[] {
  if (responsive.size === 0) {
    return themeClasses;
  }
  let byClassName = overriddenCache.get(responsive);
  if (byClassName === undefined) {
    byClassName = new Map();
    overriddenCache.set(responsive, byClassName);
  }
  let overridden = byClassName.get(className);
  if (overridden === undefined) {
    overridden = findOverridden(responsive, className);
    if (byClassName.size >= MAX_CACHED_CLASS_NAMES) {
      byClassName.clear();
    }
    byClassName.set(className, overridden);
  }
  if (overridden === NONE) {
    return themeClasses;
  }

  const kept: string[] = [];
  for (const entry of themeClasses) {
    if (!entry.includes(' ')) {
      if (!overridden.has(entry)) kept.push(entry);
      continue;
    }
    // a mapper may return several classes in one string
    for (const cls of entry.split(/\s+/)) {
      if (cls && !overridden.has(cls)) kept.push(cls);
    }
  }
  return kept;
}
