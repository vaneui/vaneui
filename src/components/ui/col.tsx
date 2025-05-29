import { JSX } from 'react';
import { ColProps } from './props/props';
import { buildComponent } from '../utils/buildComponent';
import { useTheme } from '../theme';
import { COL_KEYS } from './props/keys';

/**
 * Column component for vertical layouts.
 * Supports flex-wrap properties for controlling how items wrap.
 * @param props.wrap - Allows items to wrap (flex-wrap)
 * @param props.nowrap - Prevents items from wrapping (flex-nowrap)
 * @param props.wrapReverse - Wraps items onto multiple lines in reverse (flex-wrap-reverse)
 */
export const Col = (props: ColProps): JSX.Element => {
  const theme = useTheme();
  const colTheme = theme.col;

  // Override the default tag to be "div" for col
  const propsWithDefaultTag = { ...props, tag: props.tag ?? "div" };

  return buildComponent(propsWithDefaultTag, colTheme, COL_KEYS);
};
