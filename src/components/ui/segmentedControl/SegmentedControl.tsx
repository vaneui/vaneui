import { forwardRef, useContext, useId, useMemo } from 'react';
import type { SegmentedControlProps } from "./SegmentedControlProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { FieldControlContext, useFieldGroupProps } from "../field/FieldContext";
import { SegmentedControlContext } from "./SegmentedControlContext";
import { defaultSegmentedControlTheme } from "./defaultSegmentedControlTheme";
import { segmentedControlDefaults } from "./segmentedControlDefaults";

// the categories the segments follow. A segment takes what is set on the control, or what the
// control's theme defaults change from the library's, so a segmentedControl.item default still applies
const ITEM_CATEGORIES = ['size', 'appearance', 'variant', 'shape'] as const;

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(rawProps, ref) {
    // inside a Field the label and the help text name and describe the group
    const props = useFieldGroupProps(rawProps);
    const field = useContext(FieldControlContext);
    const theme = useTheme();
    const mainTheme = theme?.segmentedControl?.main ?? defaultSegmentedControlTheme;
    const { name, value, defaultValue, onChange, disabled: ownDisabled, required: ownRequired, ...rest } = props;
    const disabled = ownDisabled ?? field?.disabled;
    const required = ownRequired ?? field?.required;
    // radios are only mutually exclusive when they share a name
    const generatedName = useId();

    const raw = rest as unknown as Record<string, unknown>;
    const themeDefaults = mainTheme.defaults as unknown as Record<string, unknown>;
    const libraryDefaults = segmentedControlDefaults as unknown as Record<string, unknown>;
    const itemKeyList: string[] = [];
    for (const category of ITEM_CATEGORIES) {
      const key = pickFirstTruthyKeyByCategory(raw, themeDefaults, category);
      const explicit = pickFirstTruthyKeyByCategory(raw, {}, category);
      if (key && (explicit || key !== pickFirstTruthyKeyByCategory({}, libraryDefaults, category))) {
        itemKeyList.push(`${category}:${key}`);
      }
    }
    const itemKeySignature = itemKeyList.join(' ');

    const group = useMemo(() => ({
      name: name ?? generatedName,
      value,
      defaultValue,
      onChange,
      disabled,
      required,
      itemKeys: Object.fromEntries(
        itemKeySignature ? itemKeySignature.split(' ').map(entry => entry.split(':')) : []
      ) as Record<string, string>,
    }), [name, generatedName, value, defaultValue, onChange, disabled, required, itemKeySignature]);

    return (
      <SegmentedControlContext.Provider value={group}>
        <FieldControlContext.Provider value={null}>
          <ThemedComponent
            ref={ref}
            theme={mainTheme}
            role="radiogroup"
            aria-disabled={disabled || undefined}
            aria-required={required || undefined}
            {...rest}
          />
        </FieldControlContext.Provider>
      </SegmentedControlContext.Provider>
    );
  }
);

SegmentedControl.displayName = 'SegmentedControl';
