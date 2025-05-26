export interface BaseTheme {
  getClasses(props: Record<string, any>, defaults: Record<string, any>): string[];
}
