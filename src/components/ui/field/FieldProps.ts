import type React from 'react';
import type { ColProps } from "../col/ColProps";
import type { BaseProps, ControlProps, AspectProps, AutosizeProps, ResizeProps } from "../props";
import type { CleanHTMLProps } from "../props/baseProps";

/** Which control a Field renders: a control kind, or a native input type. */
export type FieldControlType =
  | 'select' | 'textarea' | 'checkbox' | 'switch' | 'radiogroup'
  | 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url'
  | 'date' | 'time' | 'datetime-local' | 'month' | 'week'
  | 'file' | 'range' | 'color';

// `size` is dropped: a numeric native size beside the xs-xl scale is a trap
type ControlAttributes =
  Omit<React.InputHTMLAttributes<HTMLInputElement>,
    'className' | 'children' | 'type' | 'size' | 'onChange' | 'onBlur' | 'onFocus'>
  & Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows' | 'cols'>
  & Pick<React.SelectHTMLAttributes<HTMLSelectElement>, 'multiple'>;

type ControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// ColProps also brings onChange/onBlur/onFocus + children/className; handle both like `type` above.
// Its aspect-ratio props are left out: a Field sizes to its label, control and messages.
type CleanedColProps = Omit<CleanHTMLProps<ColProps, 'type' | 'onChange' | 'onBlur' | 'onFocus'>, keyof AspectProps>;

/** Field component props */
export type FieldProps = BaseProps & CleanedColProps & ControlProps & ControlAttributes & AutosizeProps & ResizeProps & {
  /** Label text, associated with the control via htmlFor */
  label?: React.ReactNode;
  /** Help text below the control, linked with aria-describedby. An empty string renders nothing */
  description?: React.ReactNode;
  /** Error text below the control; its presence also marks the control invalid. `true` marks it invalid with no text; an empty string is no error */
  error?: React.ReactNode;
  /** Marks the control invalid without showing error text (cross-field checks, server errors shown elsewhere) */
  invalid?: boolean;
  /** Which control to render; omit to pass the control as a child */
  type?: FieldControlType;
  /** Change handler for the rendered control */
  onChange?: React.ChangeEventHandler<ControlElement>;
  /** Blur handler for the rendered control */
  onBlur?: React.FocusEventHandler<ControlElement>;
  /** Focus handler for the rendered control */
  onFocus?: React.FocusEventHandler<ControlElement>;
  /** Start-edge content of the rendered Input or Select (an icon, a prefix) */
  startSection?: React.ReactNode;
  /** End-edge content of the rendered Input (an icon, a unit, a small button) */
  endSection?: React.ReactNode;
};
