import { createContext, useContext } from 'react';

/** Ids and validity a Field publishes to whichever control it wraps. */
export interface FieldControlContextValue {
  id: string;
  labelId: string;
  describedBy?: string;
  invalid: boolean;
}

export const FieldControlContext = createContext<FieldControlContextValue | null>(null);

type FieldControlProps = {
  id?: string;
  invalid?: boolean;
  'aria-describedby'?: string;
};

function join(a: string | undefined, b: string | undefined): string | undefined {
  return [a, b].filter(Boolean).join(' ') || undefined;
}

/** Merges the enclosing Field's wiring into a labelable control; explicit props win. */
export function useFieldControlProps<P extends FieldControlProps>(props: P): P {
  const field = useContext(FieldControlContext);
  if (!field) return props;

  const describedBy = join(props['aria-describedby'], field.describedBy);
  return {
    ...props,
    id: props.id ?? field.id,
    ...(describedBy ? { 'aria-describedby': describedBy } : {}),
    ...(field.invalid && props.invalid === undefined ? { invalid: true } : {}),
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
