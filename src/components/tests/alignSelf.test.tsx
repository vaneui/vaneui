import { AlignSelfClassMapper, JustifySelfClassMapper } from '../ui/theme/layout';
import type { CategoryProps } from '../ui/props';

describe('AlignSelfClassMapper', () => {
  const mapper = new AlignSelfClassMapper();

  const cases: Array<[NonNullable<CategoryProps['alignSelf']>, string]> = [
    ['selfAuto', 'self-auto'],
    ['selfStart', 'self-start'],
    ['selfEnd', 'self-end'],
    ['selfCenter', 'self-center'],
    ['selfStretch', 'self-stretch'],
    ['selfBaseline', 'self-baseline'],
  ];

  it.each(cases)('maps %s to %s', (key, cls) => {
    expect(mapper.getClasses({ alignSelf: key })).toEqual([cls]);
  });

  it('emits nothing when alignSelf is not set', () => {
    expect(mapper.getClasses({} as CategoryProps)).toEqual(['']);
  });
});

describe('JustifySelfClassMapper', () => {
  const mapper = new JustifySelfClassMapper();

  const cases: Array<[NonNullable<CategoryProps['justifySelf']>, string]> = [
    ['justifySelfAuto', 'justify-self-auto'],
    ['justifySelfStart', 'justify-self-start'],
    ['justifySelfEnd', 'justify-self-end'],
    ['justifySelfCenter', 'justify-self-center'],
    ['justifySelfStretch', 'justify-self-stretch'],
  ];

  it.each(cases)('maps %s to %s', (key, cls) => {
    expect(mapper.getClasses({ justifySelf: key })).toEqual([cls]);
  });

  it('emits nothing when justifySelf is not set', () => {
    expect(mapper.getClasses({} as CategoryProps)).toEqual(['']);
  });
});
