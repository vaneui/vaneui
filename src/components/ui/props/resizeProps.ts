/**
 * Resize props for the Textarea handle
 */

export interface ResizeProps {
  /** Resize handle drags vertically (the default) */
  resizeY?: boolean;
  /** Resize handle drags horizontally */
  resizeX?: boolean;
  /** Resize handle drags in both directions */
  resize?: boolean;
  /** No resize handle */
  resizeNone?: boolean;
}
