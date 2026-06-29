import {
  registerOverlay,
  unregisterOverlay,
  getActiveOverlayPortals,
  findOverlayContaining,
  isInOverlayFamily,
  getDescendantOverlays,
  subscribeOverlayStack,
  resetOverlayStack,
} from '../utils/overlayStack';

function div(): HTMLDivElement {
  const el = document.createElement('div');
  document.body.appendChild(el);
  return el;
}

describe('overlayStack', () => {
  afterEach(() => {
    resetOverlayStack();
    document.body.innerHTML = '';
  });

  it('registers and lists active overlay portals', () => {
    const a = div();
    const b = div();
    registerOverlay(a);
    registerOverlay(b, a);
    expect(getActiveOverlayPortals()).toEqual([a, b]);
  });

  it('unregisters via the returned disposer and via unregisterOverlay', () => {
    const a = div();
    const b = div();
    const disposeA = registerOverlay(a);
    registerOverlay(b);
    disposeA();
    expect(getActiveOverlayPortals()).toEqual([b]);
    unregisterOverlay(b);
    expect(getActiveOverlayPortals()).toEqual([]);
  });

  it('notifies subscribers on register and unregister, and stops after unsubscribe', () => {
    const listener = jest.fn();
    const unsubscribe = subscribeOverlayStack(listener);

    const a = div();
    const dispose = registerOverlay(a);
    expect(listener).toHaveBeenCalledTimes(1); // register

    dispose();
    expect(listener).toHaveBeenCalledTimes(2); // unregister

    // a no-op unregister (element not in the stack) must not notify
    unregisterOverlay(a);
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    registerOverlay(div());
    expect(listener).toHaveBeenCalledTimes(2); // no longer subscribed
  });

  it('findOverlayContaining returns the innermost overlay holding a node', () => {
    const outer = div();
    const inner = document.createElement('div');
    outer.appendChild(inner);
    registerOverlay(outer);
    registerOverlay(inner, outer);

    const leaf = document.createElement('span');
    inner.appendChild(leaf);
    // both outer and inner contain leaf — innermost (inner) wins
    expect(findOverlayContaining(leaf)).toBe(inner);
    expect(findOverlayContaining(null)).toBeNull();
  });

  describe('isInOverlayFamily', () => {
    it('is true for a node inside the root overlay itself', () => {
      const root = div();
      const child = document.createElement('button');
      root.appendChild(child);
      registerOverlay(root);
      expect(isInOverlayFamily(child, root)).toBe(true);
    });

    it('is true for a node inside a portaled child overlay (parent chain)', () => {
      // parent and child are body SIBLINGS (portaled), linked only by the registry
      const parent = div();
      const child = div();
      const node = document.createElement('button');
      child.appendChild(node);
      registerOverlay(parent);
      registerOverlay(child, parent);

      expect(parent.contains(node)).toBe(false); // not DOM-nested
      expect(isInOverlayFamily(node, parent)).toBe(true); // but in the family
    });

    it('is true through a grandchild overlay', () => {
      const parent = div();
      const child = div();
      const grandchild = div();
      const node = document.createElement('a');
      grandchild.appendChild(node);
      registerOverlay(parent);
      registerOverlay(child, parent);
      registerOverlay(grandchild, child);

      expect(isInOverlayFamily(node, parent)).toBe(true);
    });

    it('is false for a node in an unrelated overlay', () => {
      const parent = div();
      const other = div();
      const node = document.createElement('button');
      other.appendChild(node);
      registerOverlay(parent);
      registerOverlay(other); // no parent link

      expect(isInOverlayFamily(node, parent)).toBe(false);
    });
  });

  it('getDescendantOverlays returns direct and transitive children', () => {
    const parent = div();
    const child = div();
    const grandchild = div();
    const unrelated = div();
    registerOverlay(parent);
    registerOverlay(child, parent);
    registerOverlay(grandchild, child);
    registerOverlay(unrelated);

    const descendants = getDescendantOverlays(parent);
    expect(descendants).toContain(child);
    expect(descendants).toContain(grandchild);
    expect(descendants).not.toContain(unrelated);
    expect(descendants).not.toContain(parent);
  });
});
