import '@testing-library/jest-dom';
import { type ReactElement } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Tooltip, Button, ThemeProvider, defaultTheme } from '../../index';

const renderTooltip = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

describe('Tooltip Component Tests', () => {
  describe('Trigger behaviour', () => {
    it('should stay closed until the trigger is hovered', () => {
      renderTooltip(
        <Tooltip content="Tip text"><Button>Hover</Button></Tooltip>
      );
      expect(screen.queryByText('Tip text')).not.toBeInTheDocument();
    });

    it('should open on hover after its delay', async () => {
      renderTooltip(
        <Tooltip content="Tip text" openDelay={0}><Button>Hover</Button></Tooltip>
      );
      expect(screen.queryByText('Tip text')).not.toBeInTheDocument();
      await act(async () => {
        fireEvent.mouseEnter(screen.getByRole('button'));
      });
      expect(screen.getByText('Tip text')).toBeInTheDocument();
    });

    it('should open on keyboard focus', async () => {
      renderTooltip(
        <Tooltip content="Tip text" openDelay={0}><Button>Focus</Button></Tooltip>
      );
      await act(async () => {
        fireEvent.focus(screen.getByRole('button'));
      });
      expect(screen.getByText('Tip text')).toBeInTheDocument();
    });

    it('should not open when disabled', async () => {
      renderTooltip(
        <Tooltip content="Tip text" openDelay={0} disabled><Button>Hover</Button></Tooltip>
      );
      await act(async () => {
        fireEvent.mouseEnter(screen.getByRole('button'));
      });
      expect(screen.queryByText('Tip text')).not.toBeInTheDocument();
    });

    it('should respect a controlled open state', () => {
      renderTooltip(
        <Tooltip content="Tip text" open><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByText('Tip text')).toBeInTheDocument();
    });
  });

  describe('Tooltip semantics', () => {
    it('should describe the trigger rather than advertise a popup', () => {
      renderTooltip(
        <Tooltip content="Tip text" open><Button>Trigger</Button></Tooltip>
      );
      const trigger = screen.getByRole('button');
      const tooltip = screen.getByRole('tooltip');
      expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
      expect(trigger).not.toHaveAttribute('aria-haspopup');
      expect(trigger).not.toHaveAttribute('aria-expanded');
    });

    it('should not leave a dangling describedby while closed', () => {
      renderTooltip(
        <Tooltip content="Tip text"><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('Theming', () => {
    it('should take its visual defaults from the tooltip theme', () => {
      renderTooltip(
        <Tooltip content="Tip text" open><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('data-size', 'sm');
      expect(tooltip).toHaveAttribute('data-variant', 'filled');
      expect(tooltip).toHaveAttribute('data-appearance', 'secondary');
    });

    it('should let popupProps override the preset', () => {
      renderTooltip(
        <Tooltip content="Tip text" open popupProps={{ lg: true }}><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-size', 'lg');
    });
  });
});
