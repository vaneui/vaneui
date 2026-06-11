import { forwardRef } from 'react';
import type { ImgProps } from "./ImgProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { defaultImgTheme } from "./defaultImgTheme";

export const Img = forwardRef<HTMLImageElement, ImgProps>(
  function Img(props, ref) {
    const theme = useTheme();

    return (
      <ThemedComponent theme={theme?.img ?? defaultImgTheme} ref={ref} {...props} />
    );
  }
);

Img.displayName = 'Img';
