import { OverflowKey } from "../../props";
import { BaseClassMapper } from "../common/BaseClassMapper";
import type { CategoryProps } from "../../props";

export class OverflowClassMapper extends BaseClassMapper implements Record<OverflowKey, string> {
  /** Auto overflow - adds scrollbars when content overflows */
  overflowAuto: string = 'overflow-auto';
  /** Hidden overflow - clips content that overflows */
  overflowHidden: string = 'overflow-hidden';
  /** Clip overflow - clips content without scrollbars */
  overflowClip: string = 'overflow-clip';
  /** Visible overflow - content overflows and remains visible */
  overflowVisible: string = 'overflow-visible';
  /** Scroll overflow - always shows scrollbars */
  overflowScroll: string = 'overflow-scroll';
  /** Auto horizontal overflow - adds horizontal scrollbar when needed */
  overflowXAuto: string = 'overflow-x-auto';
  /** Auto vertical overflow - adds vertical scrollbar when needed */
  overflowYAuto: string = 'overflow-y-auto';
  /** Hidden horizontal overflow - clips content horizontally */
  overflowXHidden: string = 'overflow-x-hidden';
  /** Hidden vertical overflow - clips content vertically */
  overflowYHidden: string = 'overflow-y-hidden';
  /** Clip horizontal overflow - clips content horizontally without scrollbars */
  overflowXClip: string = 'overflow-x-clip';
  /** Clip vertical overflow - clips content vertically without scrollbars */
  overflowYClip: string = 'overflow-y-clip';
  /** Visible horizontal overflow - content overflows horizontally and remains visible */
  overflowXVisible: string = 'overflow-x-visible';
  /** Visible vertical overflow - content overflows vertically and remains visible */
  overflowYVisible: string = 'overflow-y-visible';
  /** Scroll horizontal overflow - always shows horizontal scrollbar */
  overflowXScroll: string = 'overflow-x-scroll';
  /** Scroll vertical overflow - always shows vertical scrollbar */
  overflowYScroll: string = 'overflow-y-scroll';


  getClasses(extractedKeys: CategoryProps): string[] {
    return [extractedKeys?.overflow && this[extractedKeys.overflow] ? this[extractedKeys.overflow] : ''];
  }
}