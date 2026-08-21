import { forwardRef, isValidElement, useId, useMemo, Children } from 'react';
import type { FieldProps } from "./FieldProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory, collectTruthyKeysByCategory } from "../../utils/componentUtils";
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

    let controlProps: Record<string, unknown> = {};
    let wrapperProps: Record<string, unknown> = rest as Record<string, unknown>;

    if (control) {
      const cProps: Record<string, unknown> = {};
      const wProps: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (SURFACE_KEYS.has(key) || CONTROL_KEYS.has(key)) continue;
        if (LAYOUT_KEYS.has(key) || key === 'className') { wProps[key] = value; continue; }
        cProps[key] = value;
      }
      if (control.inputType) { cProps.type = control.inputType; }

      // empty defaults: the wrapper's own sharp/noBorder/noInsetRing must not reach the control
      for (const category of SURFACE_CATEGORIES) {
        if (category === 'border') {
          for (const key of collectTruthyKeysByCategory(rest as Record<string, unknown>, {}, 'border')) {
            cProps[key] = true;
          }
          continue;
        }
        const key = pickFirstTruthyKeyByCategory(rest as Record<string, unknown>, {}, category);
        if (key) { cProps[key] = true; }
      }

      controlProps = cProps;
      wrapperProps = wProps;
    }

    const Control = control?.descriptor.Component;

    // an explicit direction means the author wants the plain layout, so the row is dropped
    const authorDirection = pickFirstTruthyKeyByCategory(rest as Record<string, unknown>, {}, 'flexDirection');
    const inline = control?.descriptor.layout === 'inline' && !authorDirection;

    const labelElement = hasLabel && (
      <ThemedComponent theme={labelTheme} {...{ id: labelId, htmlFor: controlId }}>{label}</ThemedComponent>
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
