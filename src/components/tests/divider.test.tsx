import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import {
  Divider,
  ThemeProvider,
  defaultTheme
} from '../../index';

describe('Divider Component Tests', () => {

  describe('Divider Component', () => {
    it('should render with default theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('h-px', 'w-full');
      expect(divider).toHaveClass('bg-(--border-color-default)');
    });
  });

  describe('Divider Padding', () => {
    it('should apply padding when padding prop is true', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider padding/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('py-6'); // md size padding
    });

    it('should apply no padding by default', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).not.toHaveClass('py-2', 'py-4', 'py-6', 'py-8', 'py-10'); // no padding classes applied
    });
  });

  describe('Divider Appearance Variants', () => {
    it('should apply primary appearance variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider primary/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-(--border-color-primary)');
    });

    it('should apply secondary appearance variant', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider secondary/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toHaveClass('bg-(--border-color-secondary)');
    });

  });

  describe('Custom className override', () => {
    it('should merge custom className with theme classes', () => {
      const {container} = render(
        <ThemeProvider theme={defaultTheme}>
          <Divider className="custom-divider-class"/>
        </ThemeProvider>
      );

      const divider = container.querySelector('div');
      expect(divider).toBeInTheDocument();
      expect(divider).toHaveClass('h-px', 'w-full'); // theme classes
      expect(divider).toHaveClass('custom-divider-class'); // custom class
    });
  });
});