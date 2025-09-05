import { forwardRef } from 'react';
import { ImgProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Img = forwardRef<HTMLImageElement, ImgProps>(
  function Img(props, ref) {
    const theme = useTheme();
    
    return (
      <ThemedComponent theme={theme.img} ref={ref} {...props} />
    );
  }
);