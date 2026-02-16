import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ThemeProvider,
  defaultTheme,
} from '../../index';

describe('Modal Enhancements', () => {
  describe('portal prop', () => {
    it('should render in portal (document.body) by default', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="parent">
            <Modal open>Content</Modal>
          </div>
        </ThemeProvider>
      );

      // Modal content should be in document.body, not inside #parent
      const parent = baseElement.querySelector('#parent');
      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
      expect(parent!.contains(dialog)).toBe(false);
    });

    it('should render in place when portal={false}', () => {
      const { container } = render(
        <ThemeProvider theme={defaultTheme}>
          <div id="parent">
            <Modal open portal={false}>Content</Modal>
          </div>
        </ThemeProvider>
      );

      // Modal should be inside the container (not portaled)
      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
    });

    it('should not leak portal prop to DOM', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>Content</Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).not.toHaveAttribute('portal');
    });
  });

  describe('ARIA auto-connection', () => {
    it('should set aria-labelledby when ModalHeader is present', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalHeader>Title</ModalHeader>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      const header = dialog!.querySelector('[id]');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog!.getAttribute('aria-labelledby')).toBe(header!.id);
    });

    it('should set aria-describedby when ModalBody is present', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalBody>Body content</ModalBody>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-describedby');
      // Find the body element by its id
      const bodyId = dialog!.getAttribute('aria-describedby')!;
      const body = baseElement.querySelector(`#${CSS.escape(bodyId)}`);
      expect(body).toBeInTheDocument();
    });

    it('should set both aria-labelledby and aria-describedby when both are present', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalHeader>Title</ModalHeader>
            <ModalBody>Body</ModalBody>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');

      const titleId = dialog!.getAttribute('aria-labelledby')!;
      const bodyId = dialog!.getAttribute('aria-describedby')!;
      expect(titleId).not.toBe(bodyId);
      expect(baseElement.querySelector(`#${CSS.escape(titleId)}`)).toBeInTheDocument();
      expect(baseElement.querySelector(`#${CSS.escape(bodyId)}`)).toBeInTheDocument();
    });

    it('should not set aria-labelledby when ModalHeader is absent', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalBody>Body only</ModalBody>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('should not set aria-describedby when ModalBody is absent', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalHeader>Title only</ModalHeader>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-labelledby');
      expect(dialog).not.toHaveAttribute('aria-describedby');
    });

    it('should set aria-describedby (bare children auto-wrapped in ModalBody) but not aria-labelledby', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <div>Plain content</div>
          </Modal>
        </ThemeProvider>
      );

      const dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
      expect(dialog).toHaveAttribute('aria-describedby');
    });

    it('should allow custom id on ModalHeader', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalHeader id="custom-title">Title</ModalHeader>
          </Modal>
        </ThemeProvider>
      );

      const header = baseElement.querySelector('#custom-title');
      expect(header).toBeInTheDocument();
    });

    it('should allow custom id on ModalBody', () => {
      const { baseElement } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalBody id="custom-body">Body</ModalBody>
          </Modal>
        </ThemeProvider>
      );

      const body = baseElement.querySelector('#custom-body');
      expect(body).toBeInTheDocument();
    });

    it('should remove aria-labelledby when ModalHeader unmounts', () => {
      const { baseElement, rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <ModalHeader>Title</ModalHeader>
          </Modal>
        </ThemeProvider>
      );

      let dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).toHaveAttribute('aria-labelledby');

      // Re-render without ModalHeader
      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false}>
            <div>No header</div>
          </Modal>
        </ThemeProvider>
      );

      dialog = baseElement.querySelector('[role="dialog"]');
      expect(dialog).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('transition lifecycle callbacks', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should call onEnterComplete after open transition', () => {
      const onEnterComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={false} portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      expect(onEnterComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false} onEnterComplete={onEnterComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onEnterComplete).toHaveBeenCalledTimes(1);
    });

    it('should call onExitComplete after close transition', () => {
      const onExitComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false} onExitComplete={onExitComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      expect(onExitComplete).not.toHaveBeenCalled();

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={false} portal={false} onExitComplete={onExitComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(200);
      });

      expect(onExitComplete).toHaveBeenCalledTimes(1);
    });

    it('should not call callbacks on initial mount', () => {
      const onEnterComplete = jest.fn();
      const onExitComplete = jest.fn();

      render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false} onEnterComplete={onEnterComplete} onExitComplete={onExitComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(onEnterComplete).not.toHaveBeenCalled();
      expect(onExitComplete).not.toHaveBeenCalled();
    });

    it('should call callbacks immediately with noAnimation', () => {
      const onEnterComplete = jest.fn();

      const { rerender } = render(
        <ThemeProvider theme={defaultTheme}>
          <Modal open={false} portal={false} noAnimation onEnterComplete={onEnterComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      rerender(
        <ThemeProvider theme={defaultTheme}>
          <Modal open portal={false} noAnimation onEnterComplete={onEnterComplete}>
            Content
          </Modal>
        </ThemeProvider>
      );

      // With noAnimation, callback fires synchronously
      expect(onEnterComplete).toHaveBeenCalledTimes(1);
    });
  });
});
