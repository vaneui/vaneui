import { createRef } from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { Menu, MenuItem } from '../ui/menu';
import { PopupTrigger } from '../ui/popup';
import { Button } from '../ui/button';

// cloneElement(trigger, { ref: anchorRef }) used to silently REPLACE a ref
// the consumer attached to their trigger element — the one prop that was
// lost while handlers were composed. Both refs must now receive the node.
describe('trigger ref composition', () => {
  it('Menu should populate a consumer ref on the trigger AND its own anchor ref', () => {
    const consumerRef = createRef<HTMLButtonElement>();

    const { getByRole } = render(
      <ThemeProvider>
        <Menu trigger={<Button ref={consumerRef}>Actions</Button>}>
          <MenuItem>Edit</MenuItem>
        </Menu>
      </ThemeProvider>
    );

    const trigger = getByRole('button', { name: 'Actions' });
    // consumer ref still works (was silently dropped before)
    expect(consumerRef.current).toBe(trigger);
    // internal anchor wiring still works (aria comes from the cloned props)
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('PopupTrigger should populate a consumer ref on the trigger AND its own anchor ref', () => {
    const consumerRef = createRef<HTMLButtonElement>();

    const { getByRole } = render(
      <ThemeProvider>
        <PopupTrigger popup={<div>Popup content</div>}>
          <Button ref={consumerRef}>Open</Button>
        </PopupTrigger>
      </ThemeProvider>
    );

    const trigger = getByRole('button', { name: 'Open' });
    expect(consumerRef.current).toBe(trigger);
    expect(trigger).toHaveAttribute('aria-haspopup');
  });

  it('Menu should support a function ref on the trigger', () => {
    let captured: HTMLElement | null = null;

    const { getByRole } = render(
      <ThemeProvider>
        <Menu trigger={<Button ref={(node) => { captured = node; }}>Actions</Button>}>
          <MenuItem>Edit</MenuItem>
        </Menu>
      </ThemeProvider>
    );

    expect(captured).toBe(getByRole('button', { name: 'Actions' }));
  });
});
