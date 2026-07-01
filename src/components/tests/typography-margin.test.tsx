import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { Text, Title, PageTitle, Blockquote, Link, ThemeProvider, defaultTheme } from '../../index';

const renderIn = (node: React.ReactNode) =>
  render(<ThemeProvider theme={defaultTheme}>{node}</ThemeProvider>);

describe('Typography margin props', () => {
  it('block typography defaults to no margin (preserves the former m-0 reset)', () => {
    expect(renderIn(<Text>hi</Text>).container.querySelector('p')).toHaveClass('m-0');
    expect(renderIn(<Blockquote>hi</Blockquote>).container.querySelector('blockquote')).toHaveClass('m-0');
  });

  it('opts into size-driven margins (all / Y / T / B) on block typography', () => {
    expect(renderIn(<PageTitle margin>h</PageTitle>).container.querySelector('h1')).toHaveClass('m-(--margin)');
    expect(renderIn(<Title marginY>h</Title>).container.querySelector('h3')).toHaveClass('my-(--margin)');
    expect(renderIn(<Title marginT>h</Title>).container.querySelector('h3')).toHaveClass('mt-(--margin)');
    expect(renderIn(<Title marginB>h</Title>).container.querySelector('h3')).toHaveClass('mb-(--margin)');
  });

  it('an explicit margin prop wins over the noMargin default on Text', () => {
    const el = renderIn(<Text marginY>hi</Text>).container.querySelector('p');
    expect(el).toHaveClass('my-(--margin)');
    expect(el).not.toHaveClass('m-0');
  });

  it('marginX applies on inline Link (horizontal margin is valid on inline)', () => {
    expect(renderIn(<Link href="#" marginX>l</Link>).container.querySelector('a')).toHaveClass('mx-(--margin)');
  });

  it('does not leak margin props to the DOM', () => {
    const el = renderIn(<Title marginT>h</Title>).container.querySelector('h3')!;
    expect(el).not.toHaveAttribute('marginT');
    expect(el).not.toHaveAttribute('margint');
    expect(el).not.toHaveAttribute('marginY');
  });
});
