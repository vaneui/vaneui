import { forwardRef, isValidElement, useId, useMemo, Children } from 'react';
import type { FieldProps } from "./FieldProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory, collectTruthyKeysByCategory, MULTI_VALUE_CATEGORIES, resetConflictKey } from "../../utils/componentUtils";
import { ComponentKeys } from "../props";
import { LabelSizeContext } from "../label/LabelSizeContext";
import { FieldControlContext } from "./FieldContext";
import { FIELD_CATEGORIES } from "./FieldCategories";
import { resolveControl, FIELD_CONTROLS } from "./fieldControls";
import { defaultFieldTheme } from "./defaultFieldTheme";
import { defaultFieldLabelTheme } from "./defaultFieldLabelTheme";
import { defaultFieldControlRowTheme } from "./defaultFieldControlRowTheme";
import { defaultFieldDescriptionTheme } from "./defaultFieldDescriptionTheme";
import { defaultFieldErrorTheme } from "./defaultFieldErrorTheme";

// Surface props forward to a self-rendered control instead of painting the wrapper.
const SURFACE_CATEGORIES = ['appearance', 'variant', 'shape', 'border', 'ring', 'shadow', 'transparent'] as const;
const SURFACE_KEYS = new Set<string>(SURFACE_CATEGORIES.flatMap(c => ComponentKeys[c]));
const CONTROL_KEYS = new Set<string>(ComponentKeys.control);
const LAYOUT_KEYS = new Set<string>(
  FIELD_CATEGORIES.flatMap(c => ComponentKeys[c] as readonly string[])
    .filter(k => !SURFACE_KEYS.has(k) && !CONTROL_KEYS.has(k))
);
const CONTROL_COMPONENTS = new Set<unknown>(Object.values(FIELD_CONTROLS).map(d => d.Component));

type FieldElement = HTMLDivElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Partitions incoming props into the self-rendered control's props and the wrapper's props.
function splitFieldProps(
  rest: Record<string, unknown>,
  control: ReturnType<typeof resolveControl>
): { controlProps: Record<string, unknown>; wrapperProps: Record<string, unknown> } {
  if (!control) return { controlProps: {}, wrapperProps: rest };

  const controlProps: Record<string, unknown> = {};
  const wrapperProps: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(rest)) {
    if (SURFACE_KEYS.has(key) || CONTROL_KEYS.has(key)) continue;
    if (LAYOUT_KEYS.has(key) || key === 'className' || key === 'tag') { wrapperProps[key] = value; continue; }
    controlProps[key] = value;
  }
  if (control.inputType) { controlProps.type = control.inputType; }

  // empty defaults: the wrapper's own sharp/noBorder/noInsetRing must not reach the control
  for (const category of SURFACE_CATEGORIES) {
    if (category === 'border') {
      for (const key of collectTruthyKeysByCategory(rest, {}, 'border')) {
        controlProps[key] = true;
      }
      continue;
    }
    const key = pickFirstTruthyKeyByCategory(rest, {}, category);
    if (key) { controlProps[key] = true; }
  }

  return { controlProps, wrapperProps };
}

export const Field = forwardRef<FieldElement, FieldProps>(
  function Field({ label, description, error, children, type, ...rest }, ref) {
    const theme = useTheme();
    const fieldTheme = theme?.field.main ?? defaultFieldTheme;
    const labelTheme = theme?.field.label ?? defaultFieldLabelTheme;
    const controlRowTheme = theme?.field.controlRow ?? defaultFieldControlRowTheme;
    const descriptionTheme = theme?.field.description ?? defaultFieldDescriptionTheme;
    const errorTheme = theme?.field.error ?? defaultFieldErrorTheme;

    const control = resolveControl(
      { ...rest, type } as Record<string, unknown>,
      fieldTheme.defaults as Record<string, unknown>
    );

    if (process.env.NODE_ENV !== 'production' && control) {
      const booleanKey = pickFirstTruthyKeyByCategory(rest as Record<string, unknown>, {}, 'control');
      if (type && booleanKey && booleanKey !== control.key) {
        console.warn(`VaneUI: Field has both type="${type}" and ${booleanKey} — type="${type}" wins.`);
      }
      // the split loop hides these categories from the engine's own conflict check, so Field re-runs it
      for (const category of ['control', ...SURFACE_CATEGORIES] as const) {
        const truthyKeys = ComponentKeys[category].filter(k => (rest as Record<string, unknown>)[k] === true);
        if (MULTI_VALUE_CATEGORIES.has(category)) {
          const reset = resetConflictKey(truthyKeys);
          if (reset) {
            console.warn(
              `VaneUI: conflicting ${category} props on <Field>: ${truthyKeys.join(', ')} — "${reset}" resets and wins over the side toggles. Pass either side toggles or a reset, not both.`
            );
          }
          continue;
        }
        if (truthyKeys.length > 1) {
          console.warn(
            `VaneUI: conflicting ${category} props on <Field>: ${truthyKeys.join(', ')} — "${truthyKeys[0]}" wins (canonical key order, not JSX order). Pass only one prop per category.`
          );
        }
      }
      const childrenArray = Children.toArray(children);
      const conflictChild = childrenArray.find(c => isValidElement(c) && CONTROL_COMPONENTS.has(c.type));
      if (conflictChild && isValidElement(conflictChild)) {
        const childType = conflictChild.type as { displayName?: string; name?: string };
        const childName = childType.displayName || childType.name || 'control';
        console.warn(`VaneUI: Field renders its own ${control.key}, so the <${childName}/> child is ignored.`);
      }
    }

    // useId embeds colons, which are not valid in a CSS selector fragment
    const uid = useId().replace(/:/g, '-');
    // in self-rendering mode children are the control's own content, not the control
    const childId = !control && isValidElement(children)
      ? (children.props as { id?: string }).id
      : undefined;
    // an explicit id in self-rendering mode must reach the control, or `for` dangles
    const explicitId = control ? (rest as { id?: string }).id : undefined;
    const controlId = childId ?? explicitId ?? `field-${uid}`;
    const labelId = `${controlId}-label`;
    const descriptionId = `${controlId}-description`;
    const errorId = `${controlId}-error`;

    const hasLabel = label !== undefined && label !== null && label !== false;
    const hasDescription = description !== undefined && description !== null && description !== false;
    const hasError = error !== undefined && error !== null && error !== false;

    const fieldControlValue = useMemo(() => ({
      id: controlId,
      labelId,
      describedBy: [hasDescription ? descriptionId : null, hasError ? errorId : null]
        .filter(Boolean).join(' ') || undefined,
      invalid: hasError,
    }), [controlId, labelId, descriptionId, errorId, hasDescription, hasError]);

    // Field's own size becomes the control's default, reusing Label's channel so
    // controls already wired for <Label> need no second lookup.
    const resolvedSize = pickFirstTruthyKeyByCategory(
      rest as Record<string, unknown>,
      fieldTheme.defaults as Record<string, unknown>,
      'size'
    ) ?? 'md';

    // a fill swallows the pinned help/error colors (--color-text-secondary IS --color-bg-filled-secondary)
    // self-rendering mode forwards `filled` to the control, so the wrapper never paints it
    const onFill = !control && pickFirstTruthyKeyByCategory(
      rest as Record<string, unknown>,
      fieldTheme.defaults as Record<string, unknown>,
      'variant'
    ) === 'filled';
    const surfaceText = onFill ? { inheritAppearance: true } : {};

    const { controlProps, wrapperProps } = splitFieldProps(rest as Record<string, unknown>, control);

    const Control = control?.descriptor.Component;

    // an explicit direction means the author wants the plain layout, so the row is dropped
    const authorDirection = pickFirstTruthyKeyByCategory(rest as Record<string, unknown>, {}, 'flexDirection');
    const inline = control?.descriptor.layout === 'inline' && !authorDirection;

    // a radiogroup (self-rendered or child) never claims controlId; aria-labelledby covers it
    const isRadioGroup = control
      ? control.key === 'radiogroup'
      : Children.toArray(children).some(c => isValidElement(c) && c.type === FIELD_CONTROLS.radiogroup.Component);
    const labelElement = hasLabel && (
      <ThemedComponent
        theme={labelTheme}
        {...{ id: labelId, ...(isRadioGroup ? {} : { htmlFor: controlId }) }}
      >{label}</ThemedComponent>
    );
    const controlElement = (
      <LabelSizeContext.Provider value={resolvedSize}>
        <FieldControlContext.Provider value={fieldControlValue}>
          {Control
            ? <Control ref={ref} {...controlProps}>{children}</Control>
            : children}
        </FieldControlContext.Provider>
      </LabelSizeContext.Provider>
    );

    return (
      <ThemedComponent ref={control ? undefined : ref} theme={fieldTheme} {...wrapperProps}>
        {inline ? (
          <ThemedComponent theme={controlRowTheme} {...{ [resolvedSize]: true }}>
            {controlElement}
            {labelElement}
          </ThemedComponent>
        ) : (
          <>
            {labelElement}
            {controlElement}
          </>
        )}
        {hasDescription && (
          <ThemedComponent theme={descriptionTheme} {...surfaceText} {...{ id: descriptionId }}>{description}</ThemedComponent>
        )}
        {hasError && (
          <ThemedComponent theme={errorTheme} {...surfaceText} {...{ id: errorId }}>{error}</ThemedComponent>
        )}
      </ThemedComponent>
    );
  }
);

Field.displayName = 'Field';
