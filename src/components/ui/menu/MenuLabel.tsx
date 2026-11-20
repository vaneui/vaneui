import { forwardRef } from 'react';
import type { MenuLabelProps } from "./MenuLabelProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { wrapTextRuns } from "../../utils/textRuns";
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
      >
        {/* text gets a span of its own, so the stylesheet can center it by the capital height */}
        {wrapTextRuns(props.children)}
      </ThemedComponent>
    );
  }
);

MenuLabel.displayName = 'MenuLabel';
