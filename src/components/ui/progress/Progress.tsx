import { forwardRef, type CSSProperties } from 'react';
import type { ProgressProps } from "./ProgressProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { defaultProgressTheme } from "./defaultProgressTheme";
import { defaultProgressFillTheme } from "./defaultProgressFillTheme";
import { progressDefaults } from "./progressDefaults";

// the fill follows the track's appearance, shape and transition; it is passed only what differs from the library default,
// so a progress.fill theme default still applies
const FILL_CATEGORIES = ['appearance', 'shape', 'transition'] as const;

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function Progress({ value, max = 100, style, ...props }, ref) {
    const theme = useTheme();
    const trackTheme = theme?.progress.main ?? defaultProgressTheme;
    const fillTheme = theme?.progress.fill ?? defaultProgressFillTheme;

    const range = Number.isFinite(max) && max > 0 ? max : 0;
    const current = Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), range);
    const ratio = range > 0 ? current / range : 0;

    const raw = props as unknown as Record<string, unknown>;
    const fillProps: Record<string, boolean> = {};
    for (const category of FILL_CATEGORIES) {
      const key = pickFirstTruthyKeyByCategory(raw, trackTheme.defaults as unknown as Record<string, unknown>, category);
      const explicit = pickFirstTruthyKeyByCategory(raw, {}, category);
      const libraryKey = pickFirstTruthyKeyByCategory({}, progressDefaults as unknown as Record<string, unknown>, category);
      if (key && (explicit || key !== libraryKey)) fillProps[key] = true;
    }

    return (
      <ThemedComponent
        ref={ref}
        theme={trackTheme}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={range}
        aria-valuenow={current}
        {...{ ...props, style: { ...style, '--progress': ratio } as CSSProperties }}
      >
        <ThemedComponent theme={fillTheme} aria-hidden="true" {...fillProps} />
      </ThemedComponent>
    );
  }
);

Progress.displayName = 'Progress';
