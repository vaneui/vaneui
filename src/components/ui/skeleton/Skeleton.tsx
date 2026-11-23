import { forwardRef } from 'react';
import type { SkeletonProps } from "./SkeletonProps";
import { useTheme } from "../../themeContext";
import { ThemedComponent } from "../../themedComponent";
import { defaultSkeletonTheme } from "./defaultSkeletonTheme";

/**
 * A placeholder box for an area that is still loading: a chart, a map, a custom block.
 * For a VaneUI component, pass `skeleton` to the component itself instead. The box is
 * decorative, so it is hidden from assistive technology unless an `aria-hidden` says otherwise.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const theme = useTheme();

    return (
      <ThemedComponent theme={theme?.skeleton ?? defaultSkeletonTheme} ref={ref} aria-hidden="true" {...props} />
    );
  }
);

Skeleton.displayName = 'Skeleton';
