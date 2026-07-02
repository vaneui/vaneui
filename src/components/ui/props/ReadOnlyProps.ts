/**
 * Read-only state for form components.
 * Mutes the field and sets a default cursor; the value stays selectable and submittable.
 */

export interface ReadOnlyProps {
  /** Render the field read-only — mutes it (lighter than disabled) and sets a default cursor; the value stays selectable and submittable */
  readOnly?: boolean;
}
