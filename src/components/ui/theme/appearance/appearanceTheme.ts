import { BaseTheme } from "../common/baseTheme";
import { Mode } from "../../props/mode";
import { BackgroundAppearanceTheme } from "./backgroundAppearanceTheme";
import { TextAppearanceTheme } from "./textAppearanceTheme";
import { BorderAppearanceTheme } from "./borderAppearanceTheme";
import { RingAppearanceTheme } from "./ringAppearanceTheme";

/**
 * Base appearance variant class that composes atomic appearance themes
 */
export class AppearanceTheme extends BaseTheme {
  background: BackgroundAppearanceTheme;
  text: TextAppearanceTheme;
  border: BorderAppearanceTheme;
  ring: RingAppearanceTheme;

  constructor(
    background: BackgroundAppearanceTheme = new BackgroundAppearanceTheme(),
    text: TextAppearanceTheme = new TextAppearanceTheme(),
    border: BorderAppearanceTheme = new BorderAppearanceTheme(),
    ring: RingAppearanceTheme = new RingAppearanceTheme()
  ) {
    super();
    this.background = background;
    this.text = text;
    this.border = border;
    this.ring = ring;
  }

  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[] {
    return [
      ...this.background.getClasses(props, defaults),
      ...this.text.getClasses(props, defaults),
      ...this.border.getClasses(props, defaults),
      ...this.ring.getClasses(props, defaults)
    ];
  }

  /**
   * Helper function that creates an AppearanceTheme with the given appearance classes
   * @param bgBase Background base class
   * @param bgHover Background hover class
   * @param bgActive Background active class
   * @param textBase Text color base class
   * @param borderBase Border color base class
   * @param ringBase Ring color base class
   * @returns A new AppearanceTheme instance
   */
  static createAppearanceTheme(
    bgBase: string,
    bgHover: string,
    bgActive: string,
    textBase: string,
    borderBase: string,
    ringBase: string
  ): AppearanceTheme {
    return new AppearanceTheme(
      new BackgroundAppearanceTheme({base: bgBase, hover: bgHover, active: bgActive}),
      new TextAppearanceTheme({base: textBase, hover: '', active: ''}),
      new BorderAppearanceTheme({base: borderBase, hover: '', active: ''}),
      new RingAppearanceTheme({base: ringBase, hover: '', active: ''})
    );
  }
}
