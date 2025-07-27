import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Container,
  Section,
  Row,
  Col,
  Stack,
  Grid3,
  Grid4,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Layout Components Tests', () => {

  describe('Container Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container>Container content</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toBeInTheDocument();
      expect(containerEl).toHaveClass('mx-auto', 'w-full', 'max-w-5xl');
    });

    it('should apply transparent background correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container transparent>Transparent Container</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('bg-transparent');
    });
  });

  describe('Section Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Section>Section content</Section>
        </ThemeProvider>
      );

      const section = container.querySelector('div');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('w-full', 'flex', 'flex-col', 'items-start');
      expect(section).toHaveClass('bg-(--layout-background-default)');
    });
  });

  describe('Row Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Row>Row content</Row>
        </ThemeProvider>
      );

      const row = container.querySelector('div');
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass('flex', 'flex-row', 'items-center');
      expect(row).toHaveClass('bg-transparent');
    });
  });

  describe('Col Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Col>Col content</Col>
        </ThemeProvider>
      );

      const col = container.querySelector('div');
      expect(col).toBeInTheDocument();
      expect(col).toHaveClass('flex', 'flex-col');
      expect(col).toHaveClass('bg-transparent');
    });
  });

  describe('Stack Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack>Stack content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass('flex', 'flex-wrap', 'flex-col');
      expect(stack).toHaveClass('bg-transparent');
    });

    it('should apply row direction when row prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack row>Stack row content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-row');
      expect(stack).not.toHaveClass('flex-col');
    });

    it('should apply reverse direction correctly', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Stack column reverse>Stack column reverse content</Stack>
        </ThemeProvider>
      );

      const stack = container.querySelector('div');
      expect(stack).toHaveClass('flex-col-reverse');
    });
  });

  describe('Grid3 Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3>Grid content</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3');
    });
  });

  describe('Grid4 Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid4>Grid content</Grid4>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4');
    });
  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes for Container', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Container className="custom-container-class">Custom Container</Container>
        </ThemeProvider>
      );

      const containerEl = container.querySelector('div');
      expect(containerEl).toHaveClass('mx-auto', 'w-full'); // theme classes
      expect(containerEl).toHaveClass('custom-container-class'); // custom class
    });

    it('should merge custom className with theme classes for Grid', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Grid3 className="custom-grid-class">Custom Grid</Grid3>
        </ThemeProvider>
      );

      const grid = container.querySelector('div');
      expect(grid).toHaveClass('grid', 'grid-cols-1'); // theme classes
      expect(grid).toHaveClass('custom-grid-class'); // custom class
    });
  });
});