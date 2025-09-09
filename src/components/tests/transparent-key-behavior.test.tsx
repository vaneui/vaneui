import { render } from '@testing-library/react';
import { Text, Title, Button, Card, Stack } from '../../';

describe('Transparent Key Behavior', () => {
  describe('Typography Components - transparent affects text only', () => {
    it('should make text transparent but keep appearance-based background for Text', () => {
      const { container } = render(
        <Text transparent primary data-testid="text">
          Test text
        </Text>
      );
      const element = container.firstChild as HTMLElement;
      
      // Text should be transparent
      expect(element).toHaveClass('text-transparent');
      
      // Should not have primary text color
      expect(element).not.toHaveClass('text-(--text-color-primary)');
    });

    it('should make text transparent but keep appearance-based background for Title', () => {
      const { container } = render(
        <Title transparent primary data-testid="title">
          Test title
        </Title>
      );
      const element = container.firstChild as HTMLElement;
      
      // Text should be transparent
      expect(element).toHaveClass('text-transparent');
      
      // Should not have primary text color
      expect(element).not.toHaveClass('text-(--text-color-primary)');
    });

    it('should use appearance-based text color when transparent is false for Text', () => {
      const { container } = render(
        <Text transparent={false} primary data-testid="text">
          Test text
        </Text>
      );
      const element = container.firstChild as HTMLElement;
      
      // Text should use primary color
      expect(element).toHaveClass('text-(--text-color-primary)');
      
      // Should not have transparent text
      expect(element).not.toHaveClass('text-transparent');
    });
  });

  describe('Layout/UI Components - transparent affects background only', () => {
    it('should make background transparent but keep appearance-based text for Button', () => {
      const { container } = render(
        <Button transparent primary data-testid="button">
          Test button
        </Button>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should be transparent
      expect(element).toHaveClass('bg-transparent');
      
      // Text should still use appearance-based color (not transparent)
      expect(element).toHaveClass('text-(--text-color-primary)');
      expect(element).not.toHaveClass('text-transparent');
    });

    it('should make background transparent but keep appearance-based text for Card', () => {
      const { container } = render(
        <Card transparent primary data-testid="card">
          Test card
        </Card>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should be transparent
      expect(element).toHaveClass('bg-transparent');
      
      // Text should still use appearance-based color (not transparent)
      expect(element).toHaveClass('text-(--text-color-primary)');
      expect(element).not.toHaveClass('text-transparent');
    });

    it('should make background transparent but keep appearance-based text for Stack', () => {
      const { container } = render(
        <Stack transparent primary data-testid="stack">
          Test stack
        </Stack>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should be transparent
      expect(element).toHaveClass('bg-transparent');
      
      // Text should still use appearance-based color (not transparent)
      expect(element).toHaveClass('text-(--text-color-primary)');
      expect(element).not.toHaveClass('text-transparent');
    });

    it('should use appearance-based background when transparent is false for Button', () => {
      const { container } = render(
        <Button transparent={false} primary data-testid="button">
          Test button
        </Button>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should use primary color
      expect(element).toHaveClass('bg-(--background-color-primary)');
      
      // Should not have transparent background
      expect(element).not.toHaveClass('bg-transparent');
    });
  });

  describe('Border behavior with transparent for layout/UI components', () => {
    it('should maintain appearance-based borders for layout/UI components even with transparent', () => {
      const { container } = render(
        <Button transparent primary border data-testid="button">
          Test button with border
        </Button>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should be transparent
      expect(element).toHaveClass('bg-transparent');
      
      // Border should still use appearance-based color (not transparent)
      expect(element).toHaveClass('border-(--border-color-primary)');
      expect(element).not.toHaveClass('border-transparent');
    });
  });

  describe('Filled variant behavior with transparent', () => {
    it('should use filled transparent text for typography components', () => {
      const { container } = render(
        <Text transparent primary filled data-testid="text">
          Test filled text
        </Text>
      );
      const element = container.firstChild as HTMLElement;
      
      // Text should be transparent (filled variant)
      expect(element).toHaveClass('text-transparent');
      
      // Should not have filled text color
      expect(element).not.toHaveClass('text-(--filled-text-color-primary)');
    });

    it('should use filled transparent background for layout/UI components', () => {
      const { container } = render(
        <Button transparent primary filled data-testid="button">
          Test filled button
        </Button>
      );
      const element = container.firstChild as HTMLElement;
      
      // Background should be transparent
      expect(element).toHaveClass('bg-transparent');
      
      // Text should still use filled appearance-based color
      expect(element).toHaveClass('text-(--filled-text-color-primary)');
      expect(element).not.toHaveClass('text-transparent');
    });
  });
});