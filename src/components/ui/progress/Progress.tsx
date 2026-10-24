import { forwardRef, type CSSProperties } from 'react';
import type { ProgressProps } from "./ProgressProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { defaultProgressTheme } from "./defaultProgressTheme";

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ value, max = 100, style, ...props }, ref) {
    const theme = useTheme();
    const range = Number.isFinite(max) && max > 0 ? max : 0;
    const current = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), range);
    const ratio = range > 0 ? current / range : 0;
    return (
      <ThemedComponent
        ref={ref}
        theme={theme?.progress ?? defaultProgressTheme}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={range}
        aria-valuenow={current}
        {...{ ...props, style: { ...style, '--progress': ratio } as CSSProperties }}
      />
    );
  }
);

Progress.displayName = 'Progress';
