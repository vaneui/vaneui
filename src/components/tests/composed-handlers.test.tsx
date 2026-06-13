import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { Overlay } from '../ui/overlay';
import { Modal } from '../ui/modal';

// Consumer onClick/style must COMPOSE with internal handlers and CSS
// variables, never replace them (last-spread-wins previously killed
// click-to-close and wiped --z-index).
describe('Overlay handler/style composition', () => {
  it('should run the consumer onClick AND still close on backdrop click', () => {
    const onClose = jest.fn();
    const consumerClick = jest.fn();

    const { container } = render(
      <ThemeProvider>
        <Overlay open onClose={onClose} portal={false} onClick={consumerClick} data-testid="overlay" />
      </ThemeProvider>
    );

    const overlay = container.querySelector('[data-testid="overlay"]') as HTMLElement;
    fireEvent.click(overlay);

    expect(consumerClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should let a consumer onClick veto the close via preventDefault', () => {
    const onClose = jest.fn();

    const { container } = render(
      <ThemeProvider>
        <Overlay
          open
          onClose={onClose}
          portal={false}
          onClick={(e) => e.preventDefault()}
          data-testid="overlay"
        />
      </ThemeProvider>
    );

    fireEvent.click(container.querySelector('[data-testid="overlay"]') as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should merge a consumer style without losing the internal z-index variable', () => {
    const { container } = render(
      <ThemeProvider>
        <Overlay open portal={false} style={{ background: 'red' }} data-testid="overlay" />
      </ThemeProvider>
    );

    const overlay = container.querySelector('[data-testid="overlay"]') as HTMLElement;
    expect(overlay.style.getPropertyValue('--z-index')).not.toBe('');
    expect(overlay.style.background).toBe('red');
  });
});

describe('Modal handler/style composition', () => {
  it('should run overlayProps.onClick AND still close on overlay click', () => {
    const onClose = jest.fn();
    const consumerClick = jest.fn();

    const { container } = render(
      <ThemeProvider>
        <Modal
          open
          onClose={onClose}
          portal={false}
          overlayProps={{ onClick: consumerClick, 'data-testid': 'modal-overlay' } as never}
        >
          Body
        </Modal>
      </ThemeProvider>
    );

    const overlay = container.querySelector('[data-testid="modal-overlay"]') as HTMLElement;
    fireEvent.click(overlay);

    expect(consumerClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should merge overlayProps.style without losing the internal z-index variable', () => {
    const { container } = render(
      <ThemeProvider>
        <Modal
          open
          portal={false}
          overlayProps={{ style: { background: 'red' }, 'data-testid': 'modal-overlay' } as never}
        >
          Body
        </Modal>
      </ThemeProvider>
    );

    const overlay = container.querySelector('[data-testid="modal-overlay"]') as HTMLElement;
    expect(overlay.style.getPropertyValue('--z-index')).not.toBe('');
    expect(overlay.style.background).toBe('red');
  });

  it('should run a consumer onClick on the content while keeping clicks inside from closing', () => {
    const onClose = jest.fn();
    const consumerClick = jest.fn();

    const { getByRole } = render(
      <ThemeProvider>
        <Modal open onClose={onClose} portal={false} onClick={consumerClick}>
          Body
        </Modal>
      </ThemeProvider>
    );

    fireEvent.click(getByRole('dialog'));

    expect(consumerClick).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });
});
