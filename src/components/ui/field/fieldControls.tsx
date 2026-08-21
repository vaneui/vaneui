import type React from 'react';
import { ComponentKeys } from "../props";
import { pickFirstTruthyKeyByCategory } from "../../utils/componentUtils";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";
import { Select } from "../select/Select";
import { Checkbox } from "../checkbox/Checkbox";
import { Switch } from "../switch/Switch";
import { RadioGroup } from "../radio/RadioGroup";

export type ControlKey = typeof ComponentKeys.control[number];

export type FieldControlDescriptor = {
  Component: React.ElementType;
  layout: 'stacked' | 'inline';
  inputType?: string;
};

export const FIELD_CONTROLS: Record<ControlKey, FieldControlDescriptor> = {
  textInput: { Component: Input, layout: 'stacked', inputType: 'text' },
  textarea: { Component: Textarea, layout: 'stacked' },
  select: { Component: Select, layout: 'stacked' },
  radiogroup: { Component: RadioGroup, layout: 'stacked' },
  checkbox: { Component: Checkbox, layout: 'inline' },
  switch: { Component: Switch, layout: 'inline' },
};

// control kinds spelled as the string prop takes them; everything else is a native input type
const TYPE_TO_KEY: Record<string, ControlKey> = {
  select: 'select',
  textarea: 'textarea',
  checkbox: 'checkbox',
  switch: 'switch',
  radiogroup: 'radiogroup',
};

export function resolveControl(
  props: Record<string, unknown>,
  defaults: Record<string, unknown>
): { key: ControlKey; descriptor: FieldControlDescriptor; inputType?: string } | undefined {
  const type = props.type as string | undefined;
  if (type) {
    const key = TYPE_TO_KEY[type] ?? 'textInput';
    const descriptor = FIELD_CONTROLS[key];
    return { key, descriptor, inputType: key === 'textInput' ? type : undefined };
  }

  const key = pickFirstTruthyKeyByCategory(props, defaults, 'control');
  if (!key) return undefined;
  const descriptor = FIELD_CONTROLS[key];
  return { key, descriptor, inputType: descriptor.inputType };
}
