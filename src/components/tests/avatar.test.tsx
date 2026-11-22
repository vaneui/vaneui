import '@testing-library/jest-dom';
import { createRef, type ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Avatar, AvatarGroup, ThemeProvider, defaultTheme } from '../../index';
import { getInitials } from '../ui/avatar/avatarInitials';

const renderUi = (ui: ReactElement) =>
  render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);

const avatars = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.vane-avatar')) as HTMLElement[];

describe('Avatar', () => {
  describe('content', () => {
    it('should render the image with the name as its text alternative', () => {
      const { container } = renderUi(<Avatar src="/ada.png" name="Ada Lovelace" />);
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toHaveAttribute('src', '/ada.png');
      expect(img).toHaveAttribute('alt', 'Ada Lovelace');
      expect(img).toHaveClass('vane-avatar-image');
      // the image carries the name, so the box is not a second image of it
      expect(avatars(container)[0]).not.toHaveAttribute('role');
    });

    it('should prefer alt over name for the image', () => {
      const { container } = renderUi(<Avatar src="/ada.png" name="Ada Lovelace" alt="Ada, profile photo" />);
      expect(container.querySelector('img')).toHaveAttribute('alt', 'Ada, profile photo');
    });

    it('should give a decorative image an empty alt when there is no name', () => {
      const { container } = renderUi(<Avatar src="/ada.png" />);
      expect(container.querySelector('img')).toHaveAttribute('alt', '');
    });

    it('should fall back to the initials when the image fails, and try a new src again', () => {
      const { container, rerender } = renderUi(<Avatar src="/broken.png" name="Ada Lovelace" />);
      fireEvent.error(container.querySelector('img') as HTMLImageElement);
      expect(container.querySelector('img')).toBeNull();
      expect(avatars(container)[0]).toHaveTextContent('AL');

      rerender(<ThemeProvider theme={defaultTheme}><Avatar src="/other.png" name="Ada Lovelace" /></ThemeProvider>);
      expect(container.querySelector('img')).toHaveAttribute('src', '/other.png');
    });

    it('should still call an onError handler passed in imgProps', () => {
      const onError = jest.fn();
      const { container } = renderUi(<Avatar src="/broken.png" name="Ada" imgProps={{ onError, loading: 'lazy' }} />);
      const img = container.querySelector('img') as HTMLImageElement;
      expect(img).toHaveAttribute('loading', 'lazy');
      fireEvent.error(img);
      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('should show the initials of the name as one image of that name', () => {
      const { container } = renderUi(<Avatar name="Grace Brewster Hopper" />);
      const avatar = avatars(container)[0];
      expect(avatar).toHaveTextContent('GH');
      expect(avatar).toHaveAttribute('role', 'img');
      expect(avatar).toHaveAttribute('aria-label', 'Grace Brewster Hopper');
    });

    it('should show its children before the initials', () => {
      const { container } = renderUi(<Avatar name="Design team"><svg data-testid="icon" /></Avatar>);
      expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument();
      expect(avatars(container)[0]).not.toHaveTextContent('DT');
      expect(avatars(container)[0]).toHaveAttribute('aria-label', 'Design team');
    });

    it('should show the person icon, hidden from assistive tech, with no image, name or children', () => {
      const { container } = renderUi(<Avatar />);
      const avatar = avatars(container)[0];
      const svg = avatar.querySelector('svg') as SVGElement;
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(avatar).not.toHaveAttribute('role');
    });

    it('should let a role passed in win over the picture role', () => {
      const { container } = renderUi(<Avatar name="Ada" role="presentation" />);
      expect(avatars(container)[0]).toHaveAttribute('role', 'presentation');
    });
  });

  describe('initials', () => {
    it.each([
      ['Ada Lovelace', 'AL'],
      ['ada', 'A'],
      ['  ada   lovelace  ', 'AL'],
      ['Grace Brewster Hopper', 'GH'],
      ['élodie durand', 'ÉD'],
      ['𝒜lice Bob', '𝒜B'],
      ['   ', ''],
    ])('%j -> %j', (name, expected) => {
      expect(getInitials(name)).toBe(expected);
    });
  });

  describe('styling', () => {
    it('should render a neutral circle at md by default', () => {
      const { container } = renderUi(<Avatar name="Ada" />);
      const avatar = avatars(container)[0];
      expect(avatar.tagName).toBe('SPAN');
      expect(avatar).toHaveAttribute('data-size', 'md');
      expect(avatar).toHaveAttribute('data-appearance', 'secondary');
      expect(avatar).toHaveAttribute('data-variant', 'outline');
      expect(avatar).toHaveClass('vane-avatar', 'size-(--size)', 'rounded-full', 'inline-flex', 'items-center', 'justify-center', 'overflow-hidden', 'shrink-0', 'font-medium');
    });

    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('should take the %s size', (size) => {
      const { container } = renderUi(<Avatar name="Ada" {...{ [size]: true }} />);
      expect(avatars(container)[0]).toHaveAttribute('data-size', size);
    });

    it('should take the shape, appearance and variant props', () => {
      const { container } = renderUi(<Avatar name="Ada" rounded primary filled />);
      const avatar = avatars(container)[0];
      expect(avatar).toHaveClass('rounded-(--br)');
      expect(avatar).toHaveAttribute('data-appearance', 'primary');
      expect(avatar).toHaveAttribute('data-variant', 'filled');
    });

    it('should not leak boolean props or its own props to the DOM', () => {
      const { container } = renderUi(<Avatar name="Ada" lg primary filled sharp imgProps={{ loading: 'lazy' }} />);
      const avatar = avatars(container)[0];
      for (const attr of ['lg', 'primary', 'filled', 'sharp', 'name', 'imgprops', 'src', 'alt']) {
        expect(avatar).not.toHaveAttribute(attr);
      }
    });

    it('should merge className and forward the ref', () => {
      const ref = createRef<HTMLSpanElement>();
      const { container } = renderUi(<Avatar ref={ref} name="Ada" className="custom-avatar" />);
      expect(avatars(container)[0]).toHaveClass('custom-avatar', 'vane-avatar');
      expect(ref.current).toBe(avatars(container)[0]);
    });

    it('should take another tag', () => {
      const { container } = renderUi(<Avatar tag="div" name="Ada" />);
      expect(avatars(container)[0].tagName).toBe('DIV');
    });
  });
});

describe('AvatarGroup', () => {
  it('should render a group row of avatars', () => {
    const { container } = renderUi(
      <AvatarGroup aria-label="Editors">
        <Avatar name="Ada Lovelace" />
        <Avatar name="Alan Turing" />
      </AvatarGroup>
    );
    const group = container.querySelector('.vane-avatar-group') as HTMLElement;
    expect(group.tagName).toBe('DIV');
    expect(group).toHaveAttribute('role', 'group');
    expect(group).toHaveAttribute('aria-label', 'Editors');
    expect(group).toHaveClass('flex', 'flex-row', 'items-center');
    expect(avatars(container)).toHaveLength(2);
  });

  it('should give its size to the avatars, and let an avatar keep its own', () => {
    const { container } = renderUi(
      <AvatarGroup lg>
        <Avatar name="Ada" />
        <Avatar name="Alan" xs />
      </AvatarGroup>
    );
    const [first, second] = avatars(container);
    expect(first).toHaveAttribute('data-size', 'lg');
    expect(second).toHaveAttribute('data-size', 'xs');
  });

  it('should show at most `max` avatars and count the rest in one "+N" avatar', () => {
    const { container } = renderUi(
      <AvatarGroup max={2}>
        <Avatar name="A" />
        <Avatar name="B" />
        <Avatar name="C" />
        <Avatar name="D" />
      </AvatarGroup>
    );
    const shown = avatars(container);
    expect(shown).toHaveLength(3);
    expect(shown[2]).toHaveTextContent('+2');
    expect(shown[2]).toHaveAttribute('data-size', 'md');
  });

  it('should count against `total` when the children are only the first few', () => {
    const { container } = renderUi(
      <AvatarGroup total={120}>
        <Avatar name="A" />
        <Avatar name="B" />
      </AvatarGroup>
    );
    const shown = avatars(container);
    expect(shown).toHaveLength(3);
    expect(shown[2]).toHaveTextContent('+118');
  });

  it('should add no "+N" avatar when everything shows, and ignore empty children', () => {
    const { container } = renderUi(
      <AvatarGroup max={5}>
        <Avatar name="A" />
        {null}
        {false}
        <Avatar name="B" />
      </AvatarGroup>
    );
    expect(avatars(container)).toHaveLength(2);
  });

  it('should not leak its props to the DOM, and forward the ref', () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = renderUi(<AvatarGroup ref={ref} sm max={1} total={3}><Avatar name="A" /></AvatarGroup>);
    const group = container.querySelector('.vane-avatar-group') as HTMLElement;
    expect(ref.current).toBe(group);
    for (const attr of ['sm', 'max', 'total']) {
      expect(group).not.toHaveAttribute(attr);
    }
  });
});
