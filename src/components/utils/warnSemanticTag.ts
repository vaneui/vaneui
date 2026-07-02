// Dev-only guard: warn when a `tag` override replaces a component's semantic
// element with a non-semantic one (e.g. <List tag="div">, <Blockquote tag="div">,
// <Label tag="div">). Such overrides silently produce invalid / meaningless
// markup — a <li> outside a <ul>/<ol>, a quote with no <blockquote>, a label
// with no <label> association. Only fires for string tags outside the allowed
// semantic set; component tags (e.g. a router Link) are left alone.
export function warnSemanticTagOverride(
  componentName: string,
  tag: unknown,
  allowed: readonly string[],
): void {
  if (process.env.NODE_ENV === 'production') return;
  if (typeof tag !== 'string' || allowed.includes(tag)) return;
  console.warn(
    `VaneUI: <${componentName} tag="${tag}"> drops the component's semantic element ` +
    `(expected ${allowed.map((t) => `<${t}>`).join(' / ')}). The rendered markup loses its ` +
    `${componentName} semantics — keep the default tag or use a semantic equivalent.`
  );
}
