/**
 * Control props selecting which form control a Field renders itself.
 * Omit all of them to pass the control as a child instead.
 */

export interface ControlProps {
  /** Render a text input (the default control kind); pair with `type` for a specific input type */
  textInput?: boolean;
  /** Render a multi-line textarea */
  textarea?: boolean;
  /** Render a select; pass the options as children */
  select?: boolean;
  /** Render a checkbox, laid out inline with its label */
  checkbox?: boolean;
  /** Render a switch, laid out inline with its label */
  switch?: boolean;
  /** Render a radio group; pass the radios as children */
  radioGroup?: boolean;
}
