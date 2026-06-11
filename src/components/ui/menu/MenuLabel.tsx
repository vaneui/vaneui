import { forwardRef } from 'react';
import type { MenuLabelProps } from "./MenuLabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultMenuLabelTheme } from "./defaultMenuLabelTheme";

export const MenuLabel = forwardRef<HTMLElement, MenuLabelProps>(
  function MenuLabel(props, ref) {
    const theme = useTheme();
    return (
      <ThemedComponent
        ref={ref}
        theme={theme?.menu.label ?? defaultMenuLabelTheme}
        role="presentation"
        {...props}
      />
    );
  }
);

MenuLabel.displayName = 'MenuLabel';
