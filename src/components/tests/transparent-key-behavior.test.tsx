import { render } from '@testing-library/react';
import { Text, Title, Button, Card, Stack } from '../../';

/**
 * All components now use the CSS-based approach for transparent:
 * - Components output CSS consumer classes (text-(--text-color), [background:var(--bg-color)], etc.)
 * - The data-transparent="true" attribute is set when transparent prop is true
 * - CSS rules set the appropriate CSS variables based on data-transparent:
 *   - For typography components: --text-color: transparent
 *   - For other components: --bg-color: transparent
 */
describe('Transparent Key Behavior', () => {
  describe('Typography Components - CSS-based transparent', () => {
    it('should use CSS-based approach with data-transparent for Text', () => {
      const { container } = render(
        <Text transparent primary data-testid="text">
          Test text
        </Text>
      );
      const element = container.firstChild as HTMLElement;

      // CSS-based approach: consumer class + data attributes
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });

    it('should use CSS-based approach with data-transparent for Title', () => {
      const { container } = render(
        <Title transparent primary data-testid="title">
          Test title
        </Title>
      );
      const element = container.firstChild as HTMLElement;

      // CSS-based approach: consumer class + data attributes
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });

    it('should use appearance-based text color when transparent is false for Text', () => {
      const { container } = render(
        <Text transparent={false} primary data-testid="text">
          Test text
        </Text>
      );
      const element = container.firstChild as HTMLElement;

      // CSS consumer class with appearance, no data-transparent
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).toHaveAttribute('data-appearance', 'primary');
      expect(element).not.toHaveAttribute('data-transparent');
    });
  });

  describe('UI Components - CSS-based transparent', () => {
    it('should apply CSS consumer classes for Button with transparent', () => {
      const { container } = render(
        <Button transparent primary data-testid="button">
          Test button
        </Button>
      );
      const element = container.firstChild as HTMLElement;

      // Button uses CSS-based approach - consumer classes reference CSS variables
      expect(element).toHaveClass('[background:var(--bg-color)]');
      expect(element).toHaveClass('text-(--text-color)');

      // data-transparent should be set, and data-appearance should be the base appearance
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });

    it('should apply CSS consumer classes for Button without transparent', () => {
      const { container } = render(
        <Button transparent={false} primary data-testid="button">
          Test button
        </Button>
      );
      const element = container.firstChild as HTMLElement;

      // Same consumer classes, but no data-transparent attribute
      expect(element).toHaveClass('[background:var(--bg-color)]');
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).toHaveAttribute('data-appearance', 'primary');
      expect(element).not.toHaveAttribute('data-transparent');
    });
  });

  describe('Layout Components - CSS-based transparent', () => {
    it('should use CSS-based approach for Card with transparent', () => {
      const { container } = render(
        <Card transparent primary data-testid="card">
          Test card
        </Card>
      );
      const element = container.firstChild as HTMLElement;

      // Card now uses CSS-based approach
      expect(element).toHaveClass('[background:var(--bg-color)]');
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });

    it('should use appearance-based background for Card without transparent', () => {
      const { container } = render(
        <Card transparent={false} primary data-testid="card">
          Test card
        </Card>
      );
      const element = container.firstChild as HTMLElement;

      // CSS consumer class with appearance, no data-transparent
      expect(element).toHaveClass('[background:var(--bg-color)]');
      expect(element).toHaveAttribute('data-appearance', 'primary');
      expect(element).not.toHaveAttribute('data-transparent');
    });

    it('should use CSS-based approach for Stack with transparent', () => {
      const { container } = render(
        <Stack transparent primary data-testid="stack">
          Test stack
        </Stack>
      );
      const element = container.firstChild as HTMLElement;

      // Stack now uses CSS-based approach
      expect(element).toHaveClass('[background:var(--bg-color)]');
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });
  });

  describe('Border behavior with transparent for UI components', () => {
    it('should maintain CSS-based borders even with transparent for Button', () => {
      const { container } = render(
        <Button transparent primary border data-testid="button">
          Test button with border
        </Button>
      );
      const element = container.firstChild as HTMLElement;

      // Background uses CSS consumer class
      expect(element).toHaveClass('[background:var(--bg-color)]');

      // Border uses CSS consumer class (not transparent)
      expect(element).toHaveClass('border-(--border-color)');
      expect(element).not.toHaveClass('border-transparent');

      // Data attributes for CSS targeting
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
    });
  });

  describe('Filled variant behavior with transparent', () => {
    it('should use CSS-based approach for filled Text with transparent', () => {
      const { container } = render(
        <Text transparent primary filled data-testid="text">
          Test filled text
        </Text>
      );
      const element = container.firstChild as HTMLElement;

      // CSS consumer class with both variant and transparent data attributes
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-appearance', 'primary');
      expect(element).toHaveAttribute('data-variant', 'filled');
    });

    it('should use CSS consumer classes for filled Button with transparent', () => {
      const { container } = render(
        <Button transparent primary filled data-testid="button">
          Test filled button
        </Button>
      );
      const element = container.firstChild as HTMLElement;

      // Background uses CSS consumer class
      expect(element).toHaveClass('[background:var(--bg-color)]');

      // Text still uses CSS consumer class
      expect(element).toHaveClass('text-(--text-color)');
      expect(element).not.toHaveClass('text-transparent');

      // data-transparent should be true, data-variant should be filled
      expect(element).toHaveAttribute('data-transparent', 'true');
      expect(element).toHaveAttribute('data-variant', 'filled');
    });
  });
});
