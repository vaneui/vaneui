import { render } from '@testing-library/react';
import { ThemeProvider } from '../themeContext';
import { Button } from '../ui/button';

// Categories are mutually exclusive but the boolean-props API cannot express
// that in types — dev builds must warn when 2+ props of one category are
// explicitly true, naming the canonical-order winner.
describe('conflicting category props dev warning', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should warn when two size props are explicitly true and name the canonical winner', () => {
    const { container } = render(
      <ThemeProvider>
        {/* lg before xs in JSX — canonical order still makes xs win */}
        <Button lg xs>Save</Button>
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('conflicting size props on <button>: xs, lg — "xs" wins')
    );
    expect(container.querySelector('button')).toHaveAttribute('data-size', 'xs');
  });

  it('should warn for conflicting appearance props', () => {
    render(
      <ThemeProvider>
        <Button primary danger>Save</Button>
      </ThemeProvider>
    );

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('conflicting appearance props')
    );
  });

  it('should not warn when a single prop per category is set', () => {
    render(
      <ThemeProvider>
        <Button lg danger filled>Save</Button>
      </ThemeProvider>
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('should not warn when an explicit false masks a default', () => {
    render(
      <ThemeProvider>
        {/* sm is Button's default; explicitly disabling it is not a conflict */}
        <Button sm={false} lg>Save</Button>
      </ThemeProvider>
    );

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
