import { forwardRef } from 'react';
import type { TbodyProps } from "./TbodyProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultTbodyTheme } from "./defaultTbodyTheme";

export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  function Tbody(props, ref) {
    const theme = useTheme();
    return <ThemedComponent theme={theme?.table.tbody ?? defaultTbodyTheme} ref={ref} {...props} />;
  }
);

Tbody.displayName = 'Tbody';
