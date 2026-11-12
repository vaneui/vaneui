import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import { Modal, ThemeProvider, defaultTheme } from '../../index';
import { resetStackCount } from '../utils/stackingContext';
import { resetOverlayStack } from '../utils/overlayStack';
import { resetEscapeStack } from '../utils/escapeStack';

const getBackdrop = () => document.body.querySelector('.vane-overlay') as HTMLElement;

describe('Modal dismissal', () => {
  beforeEach(() => {
    resetStackCount();
    resetOverlayStack();
    resetEscapeStack();
  });

  // A click's target is the nearest common ancestor of where the press started and where it
  // ended. Pressing inside the dialog and releasing over the backdrop therefore clicks the backdrop.
  describe('backdrop click after a drag', () => {
    const renderModal = (onClose: () => void, overlayProps?: Record<string, unknown>) =>
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Form" overlayProps={overlayProps}>
            <input data-testid="field" defaultValue="some text to select" />
          </Modal>
        </ThemeProvider>
      );

    it('should stay open when the press started inside the dialog and ended on the backdrop', () => {
      const onClose = jest.fn();
      const { getByTestId } = renderModal(onClose);

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.mouseUp(getBackdrop());
      fireEvent.click(getBackdrop());

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should close when the press started and ended on the backdrop', () => {
      const onClose = jest.fn();
      renderModal(onClose);

      fireEvent.mouseDown(getBackdrop());
      fireEvent.mouseUp(getBackdrop());
      fireEvent.click(getBackdrop());

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should close on a backdrop click that follows an ignored drag', () => {
      const onClose = jest.fn();
      const { getByTestId } = renderModal(onClose);

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.click(getBackdrop());
      expect(onClose).not.toHaveBeenCalled();

      // the drag is over: the next click on the backdrop is a real one, with or without a press event
      fireEvent.click(getBackdrop());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should see a press inside the dialog even when a child stops its propagation', () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open onClose={onClose} title="Form">
            <div data-testid="widget" onMouseDown={(e) => e.stopPropagation()}>custom widget</div>
          </Modal>
        </ThemeProvider>
      );

      fireEvent.mouseDown(document.body.querySelector('[data-testid="widget"]')!);
      fireEvent.click(getBackdrop());

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should still run a mouse-down handler passed through overlayProps', () => {
      const onClose = jest.fn();
      const onMouseDownCapture = jest.fn();
      const { getByTestId } = renderModal(onClose, { onMouseDownCapture });

      fireEvent.mouseDown(getByTestId('field'));
      fireEvent.click(getBackdrop());

      expect(onMouseDownCapture).toHaveBeenCalledTimes(1);
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
