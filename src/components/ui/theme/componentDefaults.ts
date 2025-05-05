import {
  SizeProps,
  ButtonStyleProps,
  TextAppearanceProps,
  ShapeProps,
  FontFamilyProps,
  FontWeightProps,
  FontStyleProps,
  TextDecorationProps,
  TextTransformProps,
  TextAlignProps,
  HideProps,
  PositionProps
} from "../props/props";

// Component defaults structure - partial of component props with boolean values
export type ComponentDefaults = Partial<
  SizeProps &
  ButtonStyleProps &
  TextAppearanceProps &
  ShapeProps &
  FontFamilyProps &
  FontWeightProps &
  FontStyleProps &
  TextDecorationProps &
  TextTransformProps &
  TextAlignProps &
  HideProps &
  PositionProps & {
    noShadow?: boolean;
    noBorder?: boolean;
    noRing?: boolean;
  }
>;
