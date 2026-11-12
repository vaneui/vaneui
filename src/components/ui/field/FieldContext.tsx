import { createContext, useContext, type AriaAttributes } from 'react';

/** Ids and validity a Field publishes to whichever control it wraps. */
export interface FieldControlContextValue {
  id: string;
  labelId: string;
  describedBy?: string;
  invalid: boolean;
  /** Control state passed to a child control (children mode); the child's own prop wins. */
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
}

export const FieldControlContext = createContext<FieldControlContextValue | null>(null);

/** Field wiring that is the same for every control: the id and the control state. */
type FieldWiringProps = {
  id?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  'aria-describedby'?: string;
};

type ThemedFieldControlProps = FieldWiringProps & {
  invalid?: boolean;
};

/**
 * What a `Field` hands to the control inside it, as attributes any form control accepts.
 * Returned by `useFieldControlProps`.
 */
export type FieldControlProps = FieldWiringProps & {
  'aria-invalid'?: AriaAttributes['aria-invalid'];
};

function join(a: string | undefined, b: string | undefined): string | undefined {
  return [a, b].filter(Boolean).join(' ') || undefined;
}

function withFieldWiring<P extends FieldWiringProps>(props: P, field: FieldControlContextValue): P {
  const describedBy = join(props['aria-describedby'], field.describedBy);
  return {
    ...props,
    id: props.id ?? field.id,
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
    ...(field.disabled && props.disabled === undefined ? { disabled: true } : {}),
    ...(field.required && props.required === undefined ? { required: true } : {}),
    ...(field.readOnly && props.readOnly === undefined ? { readOnly: true } : {}),
  };
}

/**
 * For the library's own controls: merges the enclosing Field's wiring into a labelable control;
 * explicit props win. Validity travels as the `invalid` theme prop, which the theme turns into
 * the error styling and `aria-invalid`, so the result is not for a plain element.
 */
export function useThemedFieldControlProps<P extends ThemedFieldControlProps>(props: P): P {
  const field = useContext(FieldControlContext);
  if (!field) return props;

  return {
    ...withFieldWiring(props, field),
    ...(field.invalid && props.invalid === undefined ? { invalid: true } : {}),
  };
}

/**
 * Connects a control that VaneUI does not ship (a plain `<input>`, a masked input, a date
 * picker) to the `Field` around it. `Field` wires its own controls by itself; any other control
 * spreads the result of this hook to get the same wiring:
 *
 * - `id`: the id the Field's label points at
 * - `aria-describedby`: the ids of the Field's help text and error text, when it has them
 * - `aria-invalid`: `true` when the Field has an `error` or is `invalid`
 * - `required`, `disabled`, `readOnly`: when set on the Field
 *
 * Pass the control's own props to merge them: a prop the control sets itself wins, and its own
 * `aria-describedby` is kept in front of the Field's. Outside a Field the props come back
 * unchanged, so the control also works on its own.
 *
 * The label reaches the control through `for`, which only labels native form controls. A
 * control built from other elements (a `div` with a role) needs its own `aria-labelledby`.
 *
 * @example
 * function DateInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
 *   return <input type="date" {...useFieldControlProps(props)} />;
 * }
 *
 * <Field label="Start date" description="Any weekday" error={errors.start}>
 *   <DateInput name="start" />
 * </Field>
 */
export function useFieldControlProps<P extends FieldControlProps = FieldControlProps>(props: P = {} as P): P {
  const field = useContext(FieldControlContext);
  if (!field) return props;

  return {
    ...withFieldWiring(props, field),
    ...(field.invalid && props['aria-invalid'] === undefined ? { 'aria-invalid': true } : {}),
  };
}

type FieldGroupProps = {
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

/** A group (radiogroup) is not labelable, so it takes the label by reference instead of htmlFor. */
export function useFieldGroupProps<P extends FieldGroupProps>(props: P): P {
  const field = useContext(FieldControlContext);
  if (!field) return props;

  const labelledBy = join(props['aria-labelledby'], field.labelId);
  const describedBy = join(props['aria-describedby'], field.describedBy);
  return {
    ...props,
    ...(labelledBy ? { 'aria-labelledby': labelledBy } : {}),
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
  };
}
