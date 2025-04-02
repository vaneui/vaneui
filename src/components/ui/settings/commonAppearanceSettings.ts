import { CommonAppearanceProps } from "../props/props";

export type CommonAppearanceSettings = { [key in keyof CommonAppearanceProps]: boolean; };