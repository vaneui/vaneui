import type React from 'react';
import type { ColProps } from "../col/ColProps";
import type { ControlProps } from "../props";

/** Field component props */
export type FieldProps = ColProps & ControlProps & {
  /** Label text, associated with the control via htmlFor */
  label?: React.ReactNode;
  /** Help text below the control, linked with aria-describedby */
  description?: React.ReactNode;
  /** Error text below the control; its presence also marks the control invalid */
  error?: React.ReactNode;
};
