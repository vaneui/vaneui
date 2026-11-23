import { forwardRef, useCallback, type ChangeEvent } from 'react';
import type { SegmentedControlItemProps } from "./SegmentedControlItemProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { ComponentKeys, type ComponentCategoryKey } from "../props/keys";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { wrapTextRuns } from "../../utils/textRuns";
import { useSegmentedControlContext } from "./SegmentedControlContext";
import { defaultSegmentedControlItemTheme } from "./defaultSegmentedControlItemTheme";
import { SEGMENTED_CONTROL_ITEM_CATEGORIES } from "./SegmentedControlCategories";

// the boolean props the segment's theme takes; every other prop belongs to the radio input
const THEME_KEYS = new Set<string>(
  SEGMENTED_CONTROL_ITEM_CATEGORIES.flatMap(category => ComponentKeys[category] as readonly string[])
);

export const SegmentedControlItem = forwardRef<HTMLInputElement, SegmentedControlItemProps>(
  function SegmentedControlItem(props, ref) {
    const theme = useTheme();
    const itemTheme = theme?.segmentedControl?.item ?? defaultSegmentedControlItemTheme;
    const group = useSegmentedControlContext();
    const {
      value, disabled: ownDisabled, checked, defaultChecked, name, required, onChange,
      className, style, tag, children, ...other
    } = props;

    const themeProps: Record<string, unknown> = {};
    const inputProps: Record<string, unknown> = {};
    for (const key of Object.keys(other)) {
      (THEME_KEYS.has(key) ? themeProps : inputProps)[key] = (other as Record<string, unknown>)[key];
    }
    // the control's size, appearance, variant and shape, unless the segment sets its own
    if (group) {
      for (const [category, key] of Object.entries(group.itemKeys)) {
        if (!pickFirstTruthyKeyByCategory(themeProps, {}, category as ComponentCategoryKey)) {
          themeProps[key] = true;
        }
      }
    }

    const disabled = ownDisabled ?? group?.disabled;
    // the segment shows the disabled state; the radio carries the native attribute
    themeProps.disabled = disabled;
    // the segment's default pointer would outrank the disabled cursor
    if (disabled && !pickFirstTruthyKeyByCategory(themeProps, {}, 'cursor')) {
      themeProps.cursorNotAllowed = true;
    }
    themeProps.style = style;
    const groupOnChange = group?.onChange;
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      groupOnChange?.(event);
    }, [onChange, groupOnChange]);

    // a control `value` makes every segment controlled; `defaultValue` only seeds an uncontrolled one
    const resolvedChecked = checked ?? (group?.value !== undefined ? group.value === value : undefined);
    const resolvedDefaultChecked = resolvedChecked !== undefined
      ? undefined
      : defaultChecked ?? (group?.defaultValue !== undefined ? group.defaultValue === value : undefined);

    return (
      <ThemedComponent theme={itemTheme} tag={tag} className={className} {...themeProps}>
        <input
          ref={ref}
          type="radio"
          className="vane-segmented-control-input"
          name={name ?? group?.name}
          value={value}
          checked={resolvedChecked}
          defaultChecked={resolvedDefaultChecked}
          disabled={disabled}
          required={required ?? group?.required}
          onChange={onChange || groupOnChange ? handleChange : undefined}
          {...inputProps}
        />
        {wrapTextRuns(children)}
      </ThemedComponent>
    );
  }
);

SegmentedControlItem.displayName = 'SegmentedControlItem';
