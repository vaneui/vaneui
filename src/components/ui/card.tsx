import { JSX } from 'react';
import { CardProps } from "./props/props";
import { componentBuilder } from "../utils/componentBuilder";
import { useTheme } from '../theme';
import { useComponentClasses } from './hooks/useComponentClasses';
import { CARD_KEYS } from './props/propKeys';
import { directionClasses, rowToColumnBreakpointClasses } from "./classes/layoutClasses";

export const Card = (props: CardProps): JSX.Element => {
  const theme = useTheme();
  const cardTheme = theme.card;

  // Use the common component classes hook with card-specific defaults
  const { cleanProps, tag: defaultTag, baseClasses, modeClasses } = useComponentClasses(
    props,
    cardTheme,
    CARD_KEYS
  );

  // Set default direction if none is specified
  const defaultDirection = !props.row && !props.column ? {column: true} : {};
  const directionProps = {...defaultDirection, ...cleanProps};

  // Override the default tag to be "div" for cards
  const tag = props.tag ?? "div";

  return componentBuilder(directionProps, tag)
    .withExtraClasses([...baseClasses, ...modeClasses])
    .withClasses(rowToColumnBreakpointClasses)
    .withClasses(directionClasses, {column: true})
    .build();
};
