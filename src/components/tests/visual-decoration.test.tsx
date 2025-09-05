
import { render } from '@testing-library/react';
import { Row, Col, Stack, ThemeProvider } from '../..';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Visual Decoration Props', () => {
  describe('Border Props', () => {
    it('should apply border classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row border noBorder={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border');
    });

    it('should apply border classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col border noBorder={false}>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border');
    });

    it('should apply border classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack border noBorder={false}>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border');
    });

    it('should not apply border when noBorder is true (default)', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('border');
    });

    it('should apply border appearance classes with variants', () => {
      const { container } = renderWithTheme(
        <Row primary border noBorder={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border');
      expect(element.className).toContain('border-(--border-color-primary)');
    });
  });

  describe('Ring Props', () => {
    it('should apply ring classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row ring noRing={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should apply ring classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col ring noRing={false}>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should apply ring classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack ring noRing={false}>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should not apply ring when noRing is true (default)', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('ring-2');
    });

    it('should apply ring appearance classes with variants', () => {
      const { container } = renderWithTheme(
        <Row success ring noRing={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--border-color-success)');
    });
  });

  describe('Radius/Shape Props', () => {
    it('should apply rounded classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row rounded sharp={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--layout-border-radius-md)');
    });

    it('should apply rounded classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col rounded sharp={false}>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--layout-border-radius-md)');
    });

    it('should apply rounded classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack rounded sharp={false}>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--layout-border-radius-md)');
    });

    it('should apply pill classes when pill prop is true', () => {
      const { container } = renderWithTheme(
        <Row pill sharp={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-full');
    });

    it('should not apply rounded classes when sharp is true (default)', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-none');
    });

    it('should apply different radius sizes', () => {
      const { container: container1 } = renderWithTheme(
        <Row sm rounded sharp={false}>Content</Row>
      );
      const { container: container2 } = renderWithTheme(
        <Row lg rounded sharp={false}>Content</Row>
      );
      
      const element1 = container1.firstChild as HTMLElement;
      const element2 = container2.firstChild as HTMLElement;
      
      expect(element1.className).toContain('rounded');
      expect(element2.className).toContain('rounded');
    });

    it('should apply pill shape classes correctly', () => {
      const { container } = renderWithTheme(
        <Row pill>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-full');
    });

    it('should apply sharp shape classes correctly', () => {
      const { container } = renderWithTheme(
        <Row sharp>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-none');
    });

    it('should apply rounded classes with different sizes', () => {
      const { container: containerXS } = renderWithTheme(
        <Row xs rounded>Content XS</Row>
      );
      const { container: containerLG } = renderWithTheme(
        <Row lg rounded>Content LG</Row>
      );
      
      const elementXS = containerXS.firstChild as HTMLElement;
      const elementLG = containerLG.firstChild as HTMLElement;
      
      expect(elementXS.className).toContain('rounded-(--layout-border-radius-xs)');
      expect(elementLG.className).toContain('rounded-(--layout-border-radius-lg)');
    });
  });

  describe('Combined Visual Props', () => {
    it('should apply multiple visual decorations together', () => {
      const { container } = renderWithTheme(
        <Row 
          primary
          border 
          ring 
          rounded
          noBorder={false}
          noRing={false}
          sharp={false}
        >
          Content
        </Row>
      );
      const element = container.firstChild as HTMLElement;
      
      expect(element.className).toContain('border');
      expect(element.className).toContain('border-(--border-color-primary)');
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--border-color-primary)');
      expect(element.className).toContain('rounded-(--layout-border-radius-md)');
    });

    it('should handle appearance props with visual decorations', () => {
      const { container } = renderWithTheme(
        <Row 
          primary
          border 
          ring
          rounded
          noBorder={false}
          noRing={false}
          sharp={false}
        >
          Content
        </Row>
      );
      const element = container.firstChild as HTMLElement;
      
      expect(element.className).toContain('border');
      expect(element.className).toContain('border-(--border-color-primary)');
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--border-color-primary)');
      expect(element.className).toContain('rounded-(--layout-border-radius-md)');
    });
  });

  describe('Default Behavior', () => {
    it('Row should maintain original appearance by default', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      
      // Should not have border, ring, or rounded by default
      expect(element.className).not.toContain('border');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none');
    });

    it('Col should maintain original appearance by default', () => {
      const { container } = renderWithTheme(
        <Col>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      
      // Should not have border, ring, or rounded by default
      expect(element.className).not.toContain('border');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none');
    });

    it('Stack should maintain original appearance by default', () => {
      const { container } = renderWithTheme(
        <Stack>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      
      // Should not have border, ring, or rounded by default
      expect(element.className).not.toContain('border');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none');
    });
  });
});