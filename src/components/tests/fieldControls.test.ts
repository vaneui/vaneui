import { resolveControl, FIELD_CONTROLS } from '../ui/field/fieldControls';

describe('resolveControl', () => {
  it('should return undefined when no control is named', () => {
    expect(resolveControl({ label: 'x' }, {})).toBeUndefined();
  });

  it('should resolve a boolean control key', () => {
    expect(resolveControl({ select: true }, {})?.key).toBe('select');
  });

  it('should resolve a native input type onto textInput', () => {
    const resolved = resolveControl({ type: 'password' }, {});
    expect(resolved?.key).toBe('textInput');
    expect(resolved?.inputType).toBe('password');
  });

  it('should resolve a control-kind type without an inputType', () => {
    const resolved = resolveControl({ type: 'select' }, {});
    expect(resolved?.key).toBe('select');
    expect(resolved?.inputType).toBeUndefined();
  });

  it('should let type win over a disagreeing boolean', () => {
    expect(resolveControl({ type: 'select', textarea: true }, {})?.key).toBe('select');
  });

  it('should map radiogroup onto the radiogroup key', () => {
    expect(resolveControl({ type: 'radiogroup' }, {})?.key).toBe('radiogroup');
  });

  it('should mark checkbox and switch as inline', () => {
    expect(FIELD_CONTROLS.checkbox.layout).toBe('inline');
    expect(FIELD_CONTROLS.switch.layout).toBe('inline');
    expect(FIELD_CONTROLS.select.layout).toBe('stacked');
  });
});
