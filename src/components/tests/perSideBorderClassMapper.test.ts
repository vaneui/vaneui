import { PerSideBorderClassMapper } from '../ui/theme/layout/perSideBorderClassMapper';

describe('PerSideBorderClassMapper', () => {
  const mapper = new PerSideBorderClassMapper();

  it('emits all four sides reading per-side variables for `border`', () => {
    const classes = mapper.getClasses({ border: 'border' } as never).join(' ');
    expect(classes).toContain('border-t-[length:var(--bw-t)]');
    expect(classes).toContain('border-r-[length:var(--bw-r)]');
    expect(classes).toContain('border-b-[length:var(--bw-b)]');
    expect(classes).toContain('border-l-[length:var(--bw-l)]');
  });

  it('emits the logical start side reading --bw-s for `borderS`', () => {
    const classes = mapper.getClasses({ border: 'borderS' } as never);
    expect(classes).toEqual(['border-s-[length:var(--bw-s)]']);
  });

  it('emits the logical end side reading --bw-e for `borderE`', () => {
    const classes = mapper.getClasses({ border: 'borderE' } as never);
    expect(classes).toEqual(['border-e-[length:var(--bw-e)]']);
  });

  it('emits nothing for noBorder (keeps the prop toggleable)', () => {
    expect(mapper.getClasses({ border: 'noBorder' } as never)).toEqual([]);
  });

  it('emits nothing when no border key is set', () => {
    expect(mapper.getClasses({} as never)).toEqual([]);
  });
});
