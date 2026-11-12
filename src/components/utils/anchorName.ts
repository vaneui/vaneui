// CSS `anchor-name` bookkeeping for an element that anchors more than one popup.
//
// `anchor-name` takes a comma-separated list, and one element often anchors several popups at the
// same time (a Tooltip and a Menu on the same button). Each popup adds its own name to that list and
// later removes only that name, so one popup closing never detaches another. Names already on the
// element (set by the page itself) are kept.

const PROPERTY = 'anchor-name';

function readAnchorNames(el: HTMLElement): string[] {
  return el.style
    .getPropertyValue(PROPERTY)
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '' && name !== 'none');
}

function writeAnchorNames(el: HTMLElement, names: string[]): void {
  if (names.length > 0) {
    el.style.setProperty(PROPERTY, names.join(', '));
  } else {
    el.style.removeProperty(PROPERTY);
  }
}

/**
 * Add `name` (a dashed ident such as `--popup-1`) to the element's inline `anchor-name` list.
 * Returns a function that removes that one name again and leaves the rest of the list alone.
 */
export function addAnchorName(el: HTMLElement, name: string): () => void {
  const names = readAnchorNames(el);
  if (!names.includes(name)) {
    writeAnchorNames(el, [...names, name]);
  }
  return () => {
    writeAnchorNames(el, readAnchorNames(el).filter((existing) => existing !== name));
  };
}
