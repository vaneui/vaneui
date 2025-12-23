import { Title, Card } from '../../src';
import { colorMappings, getTailwindColor } from './colorMappings';

const appearances = [
  'default',
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'success',
  'danger',
  'warning',
  'info',
  'link',
] as const;

type Appearance = typeof appearances[number];

interface ColorSwatchProps {
  cssVar: string;
  label?: string;
}

function ColorSwatch({ cssVar, label }: ColorSwatchProps) {
  const tailwindColor = getTailwindColor(cssVar, colorMappings);

  return (
    <div className="flex flex-col">
      <div
        className="h-10 flex items-center justify-center"
        style={{ backgroundColor: `var(${cssVar})` }}
        title={`${cssVar}${label ? ` (${label})` : ''}`}
      />
      <div className="text-[10px] text-gray-600 text-center truncate px-1" title={tailwindColor}>
        {tailwindColor}
      </div>
    </div>
  );
}

interface ColorRowProps {
  appearance: Appearance;
  variant: 'outline' | 'filled';
}

function ColorRow({ appearance, variant }: ColorRowProps) {
  const prefix = variant === 'filled' ? '-filled' : '';

  return (
    <>
      <div className="flex items-center text-sm font-medium capitalize">
        {appearance}
      </div>
      <ColorSwatch cssVar={`--color-bg${prefix}-${appearance}`} label="base" />
      <ColorSwatch cssVar={`--color-bg${prefix}-hover-${appearance}`} label="hover" />
      <ColorSwatch cssVar={`--color-bg${prefix}-active-${appearance}`} label="active" />
      <ColorSwatch cssVar={`--color-border${prefix}-${appearance}`} label="border" />
      <ColorSwatch cssVar={`--color-text${prefix}-${appearance}`} label="text" />
    </>
  );
}

interface ColorGridProps {
  title: string;
  variant: 'outline' | 'filled';
}

function ColorGrid({ title, variant }: ColorGridProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">
        {title}
      </h3>
      <div className="grid grid-cols-6 gap-1">
        {/* Header */}
        <div className="text-xs text-gray-500">Appearance</div>
        <div className="text-xs text-gray-500">Base BG</div>
        <div className="text-xs text-gray-500">Hover BG</div>
        <div className="text-xs text-gray-500">Active BG</div>
        <div className="text-xs text-gray-500">Border</div>
        <div className="text-xs text-gray-500">Text</div>

        {/* Rows */}
        {appearances.map((appearance) => (
          <ColorRow key={appearance} appearance={appearance} variant={variant} />
        ))}
      </div>
    </div>
  );
}

export function ColorTable() {
  return (
    <Card className="overflow-x-auto w-full">
      <Title>Color System</Title>
      <ColorGrid title="Outline / Light Variants" variant="outline" />
      <ColorGrid title="Filled / Dark Variants" variant="filled" />
    </Card>
  );
}
