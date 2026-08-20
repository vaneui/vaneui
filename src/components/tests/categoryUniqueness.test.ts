import { ComponentCategories } from '../../index';

// Category arrays are composed from overlapping builders, and several builders already
// fold SHAPE in. Spreading it again is invisible at runtime and to the type system —
// the `as const` union is identical either way — but every consumer that iterates the
// array sees the category twice. That rendered the shape props twice in the generated
// docs table and gave React duplicate keys on Modal, Popup and Tooltip.

describe('Component categories', () => {
  it('should list every component', () => {
    expect(Object.keys(ComponentCategories).length).toBeGreaterThan(40);
  });

  it('should name each category at most once per component', () => {
    const offenders: string[] = [];

    for (const [key, cats] of Object.entries(ComponentCategories)) {
      const seen = new Set<string>();
      const duplicated = new Set<string>();
      for (const category of cats as readonly string[]) {
        if (seen.has(category)) duplicated.add(category);
        seen.add(category);
      }
      if (duplicated.size) offenders.push(`${key}: ${[...duplicated].sort().join(', ')}`);
    }

    expect(offenders).toEqual([]);
  });
});
