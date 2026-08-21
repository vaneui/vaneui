import { forwardRef, isValidElement, useId, useMemo } from 'react';
import type { FieldProps } from "./FieldProps";
import { ThemedComponent } from "../../themedComponent";
import { useTheme } from "../../themeContext";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { LabelSizeContext } from "../label/LabelSizeContext";
import { FieldControlContext } from "./FieldContext";
import { defaultFieldTheme } from "./defaultFieldTheme";
import { defaultFieldLabelTheme } from "./defaultFieldLabelTheme";
import { defaultFieldDescriptionTheme } from "./defaultFieldDescriptionTheme";
import { defaultFieldErrorTheme } from "./defaultFieldErrorTheme";

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  function Field({ label, description, error, children, type: _type, ...rest }, ref) {
    const theme = useTheme();
    const fieldTheme = theme?.field.main ?? defaultFieldTheme;
    const labelTheme = theme?.field.label ?? defaultFieldLabelTheme;
    const descriptionTheme = theme?.field.description ?? defaultFieldDescriptionTheme;
    const errorTheme = theme?.field.error ?? defaultFieldErrorTheme;

    // useId embeds colons, which are not valid in a CSS selector fragment
    const uid = useId().replace(/:/g, '-');
    // a control's own id wins in useFieldControlProps, so adopt it here too or htmlFor points nowhere
    const childId = isValidElement(children)
      ? (children.props as { id?: string }).id
      : undefined;
    const controlId = childId ?? `field-${uid}`;
    const labelId = `${controlId}-label`;
    const descriptionId = `${controlId}-description`;
    const errorId = `${controlId}-error`;

    const hasLabel = label !== undefined && label !== null && label !== false;
    const hasDescription = description !== undefined && description !== null && description !== false;
    const hasError = error !== undefined && error !== null && error !== false;

    const control = useMemo(() => ({
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
    const onFill = pickFirstTruthyKeyByCategory(
      rest as Record<string, unknown>,
      fieldTheme.defaults as Record<string, unknown>,
      'variant'
    ) === 'filled';
    const surfaceText = onFill ? { inheritAppearance: true } : {};

    return (
      <ThemedComponent ref={ref} theme={fieldTheme} {...rest}>
        {hasLabel && (
          <ThemedComponent theme={labelTheme} {...{ id: labelId, htmlFor: controlId }}>{label}</ThemedComponent>
        )}
        <LabelSizeContext.Provider value={resolvedSize}>
          <FieldControlContext.Provider value={control}>
            {children}
          </FieldControlContext.Provider>
        </LabelSizeContext.Provider>
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
