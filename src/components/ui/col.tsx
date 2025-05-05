import { JSX } from 'react';
import { ColProps } from './props/props';
import { componentBuilder } from '../utils/componentBuilder';
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { COL_KEYS } from './props/propKeys';

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

  // Use the common component classes hook with col-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    colTheme,
    COL_KEYS
  );

  // Override the default tag to be "div" for col
  const tag = props.tag ?? "div";

  return componentBuilder(cleanProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .build();
};
