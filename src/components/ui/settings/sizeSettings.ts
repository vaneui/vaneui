import { SizeProps } from "../props/props";

export class SizeSettings {
  private _active: keyof SizeProps;

  constructor(defaultSize: keyof SizeProps = 'md') {
    this._active = defaultSize;
  }

  setSize(size: keyof SizeProps) {
    this._active = size;
  }

  getSettings(): Partial<SizeProps> {
    return { [this._active]: true } as Partial<SizeProps>;
  }
}