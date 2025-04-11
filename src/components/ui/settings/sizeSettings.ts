import { SizeProps } from "../props/props";

export type SizeSettings = { [key in keyof SizeProps]: boolean; };

export class SizeSettings1 {
  // The internal active size key.
  private _active: keyof SizeProps;

  /**
   * Initializes the SizeSettings class with a default active size.
   * @param defaultSize Optional default size, defaults to "md".
   */
  constructor(defaultSize: keyof SizeProps = 'md') {
    this._active = defaultSize;
  }

  // Getter methods return true if this size is active.
  get xs(): boolean {
    return this._active === 'xs';
  }
  get sm(): boolean {
    return this._active === 'sm';
  }
  get md(): boolean {
    return this._active === 'md';
  }
  get lg(): boolean {
    return this._active === 'lg';
  }
  get xl(): boolean {
    return this._active === 'xl';
  }

  // Setter methods update the active size when a value of `true` is assigned.
  set xs(value: boolean) {
    if (value) {
      this._active = 'xs';
    }
  }
  set sm(value: boolean) {
    if (value) {
      this._active = 'sm';
    }
  }
  set md(value: boolean) {
    if (value) {
      this._active = 'md';
    }
  }
  set lg(value: boolean) {
    if (value) {
      this._active = 'lg';
    }
  }
  set xl(value: boolean) {
    if (value) {
      this._active = 'xl';
    }
  }

  /**
   * Returns an object that only contains the active property set to true.
   */
  getSettings(): Partial<SizeProps> {
    return { [this._active]: true } as Partial<SizeProps>;
  }
}