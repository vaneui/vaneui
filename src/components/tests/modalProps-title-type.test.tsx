import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { Modal } from '../ui/modal';
import { Title } from '../ui/typography';
import type { ModalProps } from '../ui/modal';

// Pins the CleanHTMLProps fix: the native HTML `title` attribute (string)
// must not intersect with the custom `title?: ReactNode` prop — before the
// fix, ModalProps['title'] collapsed to string and any non-string node was
// a compile error while runtime supported it.
describe('ModalProps title type', () => {
  it('should accept a ReactNode title at the type level and render it', () => {
    // type-level assertion: a ReactElement is assignable to ModalProps['title'].
    // This line fails to COMPILE if the native title attr collapses the type.
    const reactNodeTitle: ModalProps['title'] = <Title>Custom node title</Title>;

    const { getByText } = render(
      <ThemeProvider>
        <Modal open title={reactNodeTitle} portal={false}>
          Body content
        </Modal>
      </ThemeProvider>
    );

    expect(getByText('Custom node title')).toBeInTheDocument();
  });

  it('should still accept a plain string title', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Modal open title="String title" portal={false}>
          Body content
        </Modal>
      </ThemeProvider>
    );

    expect(getByText('String title')).toBeInTheDocument();
  });
});
