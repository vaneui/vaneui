
import { render } from '@testing-library/react';
import { Row, Col, Stack, ThemeProvider } from '../..';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Visual Decoration Props', () => {
  describe('Border Props', () => {
    it('should apply border classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row border>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-[length:var(--bw)]');
    });

    it('should apply border classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col border>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-[length:var(--bw)]');
    });

    it('should apply border classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack border>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-[length:var(--bw)]');
    });

    it('should not apply border when noBorder is true', () => {
      const { container } = renderWithTheme(
        <Row noBorder>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('border-[length:var(--bw)]');
    });

    it('should not apply border by default (when no border props are set)', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('border-[length:var(--bw)]');
    });

    it('should apply border appearance classes with variants', () => {
      const { container } = renderWithTheme(
        <Row primary border>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-[length:var(--bw)]');
      expect(element.className).toContain('border-(--border-color)');
    });
  });

  describe('Border Side Props', () => {
    it('should apply border-t (top border) classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row borderT>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-t');
    });

    it('should apply border-b (bottom border) classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col borderB>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-b');
    });

    it('should apply border-l (left border) classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack borderL>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-l');
    });

    it('should apply border-r (right border) classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row borderR>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-r');
    });

    it('should apply border-x (horizontal borders) classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col borderX>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-x');
    });

    it('should apply border-y (vertical borders) classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack borderY>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-y');
    });

    it('should respect noBorder when set explicitly', () => {
      const { container } = renderWithTheme(
        <Row noBorder>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('border-[length:var(--bw)]');
      expect(element.className).not.toContain('border-t');
    });

    it('should not apply appearance colors when only noBorder is set', () => {
      const { container } = renderWithTheme(
        <Col primary noBorder>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('border-(--border-color)');
    });

    it('should apply border side appearance classes with variants', () => {
      const { container } = renderWithTheme(
        <Row primary borderT>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('border-t');
      expect(element.className).toContain('border-(--border-color)');
    });

    it('should handle multiple border sides together (only first one applies)', () => {
      const { container } = renderWithTheme(
        <Row borderT borderB borderL>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      // With the new border structure, only the first border prop in the order is applied
      // Order in BORDER_VALUES: border, borderT, borderB, borderL, borderR, borderX, borderY
      // Since borderT is first among the specified props, only borderT should be applied
      expect(element.className).toContain('border-t');
      expect(element.className).not.toContain('border-b');
      expect(element.className).not.toContain('border-l');
    });

    it('should handle border sides with general border (only first one applies)', () => {
      const { container } = renderWithTheme(
        <Row border borderT>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      // With the new border structure, only the first border prop in BORDER_VALUES order is applied
      // Order in BORDER_VALUES: border, borderT, borderB, borderL, borderR, borderX, borderY
      // Since 'border-[length:var(--bw)]' comes first, only 'border-[length:var(--bw)]' should be applied
      expect(element.className).toContain('border-[length:var(--bw)]');
      expect(element.className).not.toContain('border-t');
    });
  });

  describe('Ring Props', () => {
    it('should apply ring classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row ring>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should apply ring classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col ring>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should apply ring classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack ring>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
    });

    it('should not apply ring when noRing is true', () => {
      const { container } = renderWithTheme(
        <Row noRing>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('ring');
    });

    it('should not apply ring by default (when no ring props are set)', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).not.toContain('ring');
    });

    it('should apply ring appearance classes with variants', () => {
      const { container } = renderWithTheme(
        <Row success ring>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--ring-color)');
    });
  });

  describe('Radius/Shape Props', () => {
    it('should apply rounded classes to Row component', () => {
      const { container } = renderWithTheme(
        <Row rounded sharp={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--br)');
    });

    it('should apply rounded classes to Col component', () => {
      const { container } = renderWithTheme(
        <Col rounded sharp={false}>Content</Col>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--br)');
    });

    it('should apply rounded classes to Stack component', () => {
      const { container } = renderWithTheme(
        <Stack rounded sharp={false}>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-(--br)');
    });

    it('should apply pill classes when pill prop is true', () => {
      const { container } = renderWithTheme(
        <Row pill sharp={false}>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-full');
    });

    it('should apply sharp shape by default', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain('rounded-none'); // sharp is default
      expect(element.className).not.toContain('rounded-full');
      expect(element.className).not.toContain('rounded-(--br)');
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
      
      expect(elementXS.className).toContain('rounded-(--br)');
      expect(elementLG.className).toContain('rounded-(--br)');
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
        >
          Content
        </Row>
      );
      const element = container.firstChild as HTMLElement;
      
      expect(element.className).toContain('border-[length:var(--bw)]');
      expect(element.className).toContain('border-(--border-color)');
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--ring-color)');
      expect(element.className).toContain('rounded-(--br)');
    });

    it('should handle appearance props with visual decorations', () => {
      const { container } = renderWithTheme(
        <Row 
          primary
          border 
          ring
          rounded
        >
          Content
        </Row>
      );
      const element = container.firstChild as HTMLElement;
      
      expect(element.className).toContain('border-[length:var(--bw)]');
      expect(element.className).toContain('border-(--border-color)');
      expect(element.className).toContain('ring');
      expect(element.className).toContain('ring-(--ring-color)');
      expect(element.className).toContain('rounded-(--br)');
    });
  });

  describe('Default Behavior', () => {
    it('Row should have sharp shape by default', () => {
      const { container } = renderWithTheme(
        <Row>Content</Row>
      );
      const element = container.firstChild as HTMLElement;

      // Should not have border or ring by default, but should have sharp shape
      expect(element.className).not.toContain('border-[length:var(--bw)]');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none'); // sharp is default
      expect(element.className).not.toContain('rounded-full');
      expect(element.className).not.toContain('rounded-(--br)');
    });

    it('Col should have sharp shape by default', () => {
      const { container } = renderWithTheme(
        <Col>Content</Col>
      );
      const element = container.firstChild as HTMLElement;

      // Should not have border or ring by default, but should have sharp shape
      expect(element.className).not.toContain('border-[length:var(--bw)]');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none'); // sharp is default
      expect(element.className).not.toContain('rounded-full');
      expect(element.className).not.toContain('rounded-(--br)');
    });

    it('Stack should have sharp shape by default', () => {
      const { container } = renderWithTheme(
        <Stack>Content</Stack>
      );
      const element = container.firstChild as HTMLElement;

      // Should not have border or ring by default, but should have sharp shape
      expect(element.className).not.toContain('border-[length:var(--bw)]');
      expect(element.className).not.toContain('ring-2');
      expect(element.className).toContain('rounded-none'); // sharp is default
      expect(element.className).not.toContain('rounded-full');
      expect(element.className).not.toContain('rounded-(--br)');
    });
  });
});