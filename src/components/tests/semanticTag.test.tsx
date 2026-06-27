import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import { List, Blockquote, Label, ThemeProvider, defaultTheme } from '../../index';

describe('Semantic tag-override warning (R6)', () => {
  let warnSpy: jest.SpyInstance;
  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    warnSpy.mockRestore();
  });

  const renderIn = (ui: React.ReactNode) =>
    render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

  it('warns when List drops <ul>/<ol> via tag="div"', () => {
    renderIn(<List tag="div"><span>x</span></List>);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('<List tag="div">'));
  });

  it('warns when Blockquote drops <blockquote> via tag="div"', () => {
    renderIn(<Blockquote tag="div">x</Blockquote>);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('<Blockquote tag="div">'));
  });

  it('warns when Label drops <label> via tag="div"', () => {
    renderIn(<Label tag="div">x</Label>);
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('<Label tag="div">'));
  });

  it('does not warn for the default semantic tags', () => {
    renderIn(
      <>
        <List><span>x</span></List>
        <Blockquote>x</Blockquote>
        <Label>x</Label>
      </>
    );
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('does not warn for a semantic alternative (List tag="ol")', () => {
    renderIn(<List tag="ol"><span>x</span></List>);
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
