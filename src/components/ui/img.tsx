import { JSX } from 'react';
import { ImgProps } from './props';
import { useTheme } from "../themeContext";
import { ThemedComponent } from "../themedComponent";

export const Img = (props: ImgProps): JSX.Element => {
  const theme = useTheme();
  
  return (
    <ThemedComponent theme={theme.img} {...props} />
  );
};