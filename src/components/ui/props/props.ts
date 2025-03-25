export interface SizeProps {
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  lg?: boolean;
  xl?: boolean;
}

export interface CommonAppearanceProps {
  default?: boolean;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  success?: boolean;
  danger?: boolean;
  warning?: boolean;
  info?: boolean;
  transparent?: boolean;
}

export interface FontFamilyProps {
  sans?: boolean;
  serif?: boolean;
  mono?: boolean;
}

export interface FontWeightProps {
  thin?: boolean;
  extralight?: boolean;
  light?: boolean;
  normal?: boolean;
  medium?: boolean;
  semibold?: boolean;
  bold?: boolean;
  extrabold?: boolean;
  black?: boolean;
}

export interface FontStyleProps {
  italic?: boolean;
  notItalic?: boolean;
}

export interface TextDecorationProps {
  underline?: boolean;
  lineThrough?: boolean;
  noUnderline?: boolean;
  overline?: boolean;
}

export interface TextTransformProps {
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  normalCase?: boolean;
}

export interface TextAlignProps {
  textLeft?: boolean;
  textCenter?: boolean;
  textRight?: boolean;
  textJustify?: boolean;
}

export interface TextAppearanceProps extends CommonAppearanceProps {
  muted?: boolean;
  link?: boolean;
}

export interface BorderAppearanceProps extends CommonAppearanceProps {
}

export interface NoBorderProps {
  noBorder?: boolean;
}

export interface BreakpointProps {
  xsCol?: boolean;
  smCol?: boolean;
  mdCol?: boolean;
  lgCol?: boolean;
  xlCol?: boolean;
}

export interface HideProps {
  xsHide?: boolean;
  smHide?: boolean;
  mdHide?: boolean;
  lgHide?: boolean;
  xlHide?: boolean;
}

export interface PositionProps {
  relative?: boolean;
  absolute?: boolean;
  fixed?: boolean;
  sticky?: boolean;
  static?: boolean;
}

export interface TagProps {
  tag?: React.ElementType | string;
}

export interface ReverseProps {
  reverse?: boolean;
}

export interface GapProps extends SizeProps {
}

export interface NoGapProps {
  noGap?: boolean;
}

export interface RoundedProps extends SizeProps {
}

export interface PillProps {
  pill?: boolean;
}

export interface SharpProps {
  sharp?: boolean;
}

export interface ButtonStyleProps {
  outline?: boolean;
  filled?: boolean;
}

export interface StackDirectionProps {
  row?: boolean;
  column?: boolean;
}

export interface ItemsProps {
  itemsStart?: boolean;
  itemsEnd?: boolean;
  itemsCenter?: boolean;
  itemsBaseline?: boolean;
  itemsStretch?: boolean;
}

export interface JustifyProps {
  justifyStart?: boolean;
  justifyEnd?: boolean;
  justifyCenter?: boolean;
  justifyBetween?: boolean;
  justifyAround?: boolean;
  justifyEvenly?: boolean;
  justifyStretch?: boolean;
  justifyBaseline?: boolean;
}

export interface WrapProps {
  flexWrap?: boolean;
  flexNoWrap?: boolean;
  flexWrapReverse?: boolean;
}

export type BaseComponentProps = TagProps & Partial<SizeProps & HideProps & PositionProps> & React.HTMLProps<HTMLElement>;

export type LayoutComponentProps = BaseComponentProps & ReverseProps & ItemsProps & CommonAppearanceProps;

export type FontProps = FontWeightProps & FontStyleProps & TextDecorationProps & TextTransformProps & FontFamilyProps & TextAppearanceProps & CommonAppearanceProps & TextAlignProps;

export type TypographyComponentProps = BaseComponentProps & FontProps;

export type ButtonProps = TypographyComponentProps & RoundedProps & PillProps & SharpProps & BorderAppearanceProps & NoBorderProps & ButtonStyleProps;

export type GridProps = BaseComponentProps & GapProps & NoGapProps & CommonAppearanceProps;

export type RowProps = BaseComponentProps & WrapProps & GapProps & NoGapProps & ReverseProps & ItemsProps & BreakpointProps & JustifyProps & CommonAppearanceProps & WrapProps;

export type ColProps = BaseComponentProps & WrapProps & GapProps & NoGapProps & ReverseProps & ItemsProps & JustifyProps & CommonAppearanceProps & WrapProps;

export type CardProps = BaseComponentProps & GapProps & NoGapProps & ItemsProps & SharpProps & CommonAppearanceProps & BorderAppearanceProps & NoBorderProps;

export type StackProps = BaseComponentProps & WrapProps & GapProps & NoGapProps & ReverseProps & ItemsProps & BreakpointProps & JustifyProps & CommonAppearanceProps & StackDirectionProps & WrapProps;
