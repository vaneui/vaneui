import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { Tooltip, Button, PopupTrigger, ThemeProvider, defaultTheme } from '../../index';

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
      expect(tooltip).toHaveAttribute('data-appearance', 'primary');
    });

    it('should mark the popup as a tooltip for the label-sized rules', () => {
      renderTooltip(
        <Tooltip content="Tip text" open><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-tooltip', '');
    });

    it('should let popupProps override the preset', () => {
      renderTooltip(
        <Tooltip content="Tip text" open popupProps={{ lg: true }}><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-size', 'lg');
    });
  });

  describe('Direct popup props', () => {
    it('should take size, appearance and variant directly', () => {
      renderTooltip(
        <Tooltip content="Tip text" open lg danger outline><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('data-size', 'lg');
      expect(tooltip).toHaveAttribute('data-appearance', 'danger');
      expect(tooltip).toHaveAttribute('data-variant', 'outline');
    });

    it('should take placement directly', () => {
      renderTooltip(
        <Tooltip content="Tip text" open placeBottom><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-placement', 'bottom');
    });

    it('should draw an arrow when asked', () => {
      renderTooltip(
        <Tooltip content="Tip text" open arrow><Button>Trigger</Button></Tooltip>
      );
      expect(screen.getByRole('tooltip').querySelector('.vane-popup-arrow')).toBeInTheDocument();
    });

    it('should style the tooltip, not the trigger', () => {
      renderTooltip(
        <Tooltip content="Tip text" open lg className="custom-tip" data-testid="tip"><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      const trigger = screen.getByRole('button');
      expect(tooltip).toHaveClass('custom-tip');
      expect(tooltip).toHaveAttribute('data-testid', 'tip');
      expect(trigger).not.toHaveClass('custom-tip');
      expect(trigger).toHaveAttribute('data-size', 'sm');
    });

    it('should not leak boolean props to the DOM', () => {
      renderTooltip(
        <Tooltip content="Tip text" open lg danger placeBottom arrow><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).not.toHaveAttribute('lg');
      expect(tooltip).not.toHaveAttribute('danger');
      expect(tooltip).not.toHaveAttribute('placeBottom');
      expect(tooltip).not.toHaveAttribute('arrow');
    });

    it('should combine direct props with popupProps', () => {
      renderTooltip(
        <Tooltip content="Tip text" open lg popupProps={{ danger: true }}><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('data-size', 'lg');
      expect(tooltip).toHaveAttribute('data-appearance', 'danger');
    });

    it('should keep the tooltip role and the describedby link with direct props', () => {
      renderTooltip(
        <Tooltip content="Tip text" open lg popupId="tip-id"><Button>Trigger</Button></Tooltip>
      );
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveAttribute('id', 'tip-id');
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'tip-id');
    });

    it('should let ThemeProvider defaults restyle every tooltip', () => {
      render(
        <ThemeProvider themeDefaults={{ tooltip: { secondary: true } }}>
          <Tooltip content="Tip text" open><Button>Trigger</Button></Tooltip>
        </ThemeProvider>
      );
      expect(screen.getByRole('tooltip')).toHaveAttribute('data-appearance', 'secondary');
    });
  });
});

describe('Tooltip as a trigger', () => {
  it('should forward its ref to the child, not the tooltip', () => {
    const ref = createRef<HTMLElement>();
    renderTooltip(
      <Tooltip content="Tip text" open ref={ref}><Button>Trigger</Button></Tooltip>
    );
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('should keep the child\'s own ref alongside the forwarded one', () => {
    const tooltipRef = createRef<HTMLElement>();
    const childRef = createRef<HTMLButtonElement>();
    renderTooltip(
      <Tooltip content="Tip text" ref={tooltipRef}><Button ref={childRef}>Trigger</Button></Tooltip>
    );
    expect(childRef.current).toBe(screen.getByRole('button'));
    expect(tooltipRef.current).toBe(childRef.current);
  });

  it('should pass handlers and aria attributes to the child and run the child\'s own handler too', () => {
    const own = jest.fn();
    const forwarded = jest.fn();
    renderTooltip(
      <Tooltip content="Tip text" onClick={forwarded} aria-haspopup="dialog">
        <Button onClick={own}>Trigger</Button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(own).toHaveBeenCalledTimes(1);
    expect(forwarded).toHaveBeenCalledTimes(1);
    expect(button).toHaveAttribute('aria-haspopup', 'dialog');
  });

  it('should open a PopupTrigger popup when it wraps the trigger', async () => {
    renderTooltip(
      <PopupTrigger popup={<div>Panel</div>}>
        <Tooltip content="Tip text"><Button>Open</Button></Tooltip>
      </PopupTrigger>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await act(async () => {
      fireEvent.click(button);
    });
    expect(screen.getByText('Panel')).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should keep the popup lifecycle callbacks on the tooltip', async () => {
    const onEnterComplete = jest.fn();
    renderTooltip(
      <Tooltip content="Tip text" open noAnimation onEnterComplete={onEnterComplete}><Button>Trigger</Button></Tooltip>
    );
    await act(async () => {});
    expect(screen.getByRole('button')).not.toHaveAttribute('onEnterComplete');
    expect(onEnterComplete).toHaveBeenCalled();
  });
});
