import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import {
  Img,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Img Component Tests', () => {

  describe('Img Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img src="test.jpg" alt="Test image" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('object-cover'); // base class
      expect(img).toHaveClass('rounded-(--layout-border-radius-md)'); // rounded default
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'Test image');
    });

    // Size functionality removed from Img component - using default layout size

    it('should support shape variants', () => {
      const shapes = [
        { prop: 'pill', class: 'rounded-full' },
        { prop: 'sharp', class: 'rounded-none' },
        { prop: 'rounded', class: 'rounded-(--layout-border-radius-md)' }
      ] as const;

      shapes.forEach(({prop, class: expectedClass}) => {
        const {container} = render(
          <ThemeProvider theme={defaultTheme}>
            <Img {...{[prop]: true}} src="test.jpg" alt="Test" />
          </ThemeProvider>
        );

        const img = container.querySelector('img');
        expect(img).toHaveClass(expectedClass);
      });
    });

    // Background appearance removed from Img component

    it('should support border variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img border primary src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('border');
      expect(img).toHaveClass('border-(--border-color-primary)');
    });

    it('should support shadow prop', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img shadow src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      // Shadow should be applied when shadow prop is true (static, no hover)
      expect(img).toHaveClass('shadow-sm');
      expect(img).not.toHaveClass('hover:shadow-md');
    });

    it('should support ring variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img ring secondary src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('ring-(--border-color-secondary)');
    });

    it('should support custom className', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img className="custom-img-class" src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toHaveClass('object-cover'); // theme classes
      expect(img).toHaveClass('custom-img-class'); // custom class
    });

    it('should handle all img attributes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img 
            src="test.jpg" 
            alt="Test image"
            width="300"
            height="200"
            loading="lazy"
            crossOrigin="anonymous"
            sizes="(max-width: 768px) 100vw, 50vw"
            srcSet="test-300.jpg 300w, test-600.jpg 600w"
            decoding="async"
          />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('src', 'test.jpg');
      expect(img).toHaveAttribute('alt', 'Test image');
      expect(img).toHaveAttribute('width', '300');
      expect(img).toHaveAttribute('height', '200');
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('crossorigin', 'anonymous');
      expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
      expect(img).toHaveAttribute('srcset', 'test-300.jpg 300w, test-600.jpg 600w');
      expect(img).toHaveAttribute('decoding', 'async');
    });

    it('should support onLoad and onError handlers', () => {
      const handleLoad = jest.fn();
      const handleError = jest.fn();
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img 
            src="test.jpg" 
            alt="Test"
            onLoad={handleLoad}
            onError={handleError}
          />
        </ThemeProvider>
      );

      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toBeInTheDocument();
      
      // Simulate load event
      const loadEvent = new Event('load');
      img.dispatchEvent(loadEvent);
      expect(handleLoad).toHaveBeenCalled();

      // Simulate error event  
      const errorEvent = new Event('error');
      img.dispatchEvent(errorEvent);
      expect(handleError).toHaveBeenCalled();
    });

    // Transparent appearance removed from Img component

    it('should support custom tag override', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img tag="div" src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const element = container.querySelector('div');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('object-cover');
      expect(element).toHaveAttribute('src', 'test.jpg');
    });

    it('should combine multiple appearance variants', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img primary border shadow ring src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('border-(--border-color-primary)');
      expect(img).toHaveClass('shadow-sm');
      expect(img).not.toHaveClass('hover:shadow-md');
      expect(img).toHaveClass('ring-(--border-color-primary)');
    });

    it('should have no visual shadow/border/ring classes by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Img src="test.jpg" alt="Test" />
        </ThemeProvider>
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      
      // Should not have visual classes since noBorder/noRing/noShadow are true by default
      expect(img!.className).not.toMatch(/\bborder\b(?!-)/); // No actual border class
      expect(img!.className).not.toMatch(/\bring\b(?!-)/); // No actual ring class  
      expect(img!.className).not.toMatch(/shadow-/); // No shadow classes
    });
  });
});