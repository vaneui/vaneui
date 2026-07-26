import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Code } from '../ui/code';
import { Text } from '../../index';

describe('wordBreak category', () => {
  const cases = [
    ['breakNormal', 'break-normal'],
    ['breakWords', 'break-words'],
    ['breakAll', 'break-all'],
    ['breakKeep', 'break-keep'],
  ] as const;

  describe('on Code (interactive)', () => {
    cases.forEach(([prop, cls]) => {
      it(`\`${prop}\` emits \`${cls}\``, () => {
        const { container } = render(<Code {...{ [prop]: true }}>x</Code>);
        expect(container.querySelector('code')).toHaveClass(cls);
      });
    });

    it('default Code has no break-* class', () => {
      const { container } = render(<Code>x</Code>);
      const el = container.querySelector('code')!;
      expect(el).not.toHaveClass('break-words', 'break-all', 'break-keep', 'break-normal');
    });

    it('does not leak the boolean prop to the DOM', () => {
      const { container } = render(<Code breakWords>x</Code>);
      expect(container.querySelector('code')).not.toHaveAttribute('breakwords');
    });
  });

  describe('on Text (typography)', () => {
    cases.forEach(([prop, cls]) => {
      it(`\`${prop}\` emits \`${cls}\``, () => {
        const { container } = render(<Text {...{ [prop]: true }}>x</Text>);
        expect(container.querySelector('p')).toHaveClass(cls);
      });
    });
  });
});

describe('whitespace now reaches typography', () => {
  it('`<Text whitespaceNowrap>` emits `whitespace-nowrap`', () => {
    const { container } = render(<Text whitespaceNowrap>x</Text>);
    expect(container.querySelector('p')).toHaveClass('whitespace-nowrap');
  });

  it('default Text has no whitespace-* class', () => {
    const { container } = render(<Text>x</Text>);
    expect(container.querySelector('p')).not.toHaveClass('whitespace-nowrap', 'whitespace-pre');
  });
});
