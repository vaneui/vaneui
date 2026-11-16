import * as fs from 'fs';
import * as path from 'path';
import * as VaneUI from '../../index';

// Locks the package's runtime export surface. Adding, removing, or renaming
// a root export is a deliberate API change and must update this list in the
// same commit — accidental surface changes (a forgotten barrel line, an
// over-eager re-export) fail here instead of shipping silently. The exports
// MAP targets are validated separately by publint/attw in the publish gate.
const EXPECTED_RUNTIME_EXPORTS = [
  'Alert', 'Badge', 'Blockquote', 'Button', 'COMPONENT', 'Caption', 'Card', 'CardBody', 'CardFooter', 'CardHeader',
  'Checkbox', 'Chip', 'Code', 'Col', 'ComponentCategories', 'ComponentKeys', 'Container',
  'Divider', 'Grid2', 'Grid3', 'Grid4', 'Grid5', 'Grid6', 'Icon', 'IconButton', 'Img', 'Input',
  'Field', 'Kbd', 'Label', 'Link', 'List', 'ListItem', 'Mark', 'Menu', 'MenuItem', 'MenuLabel', 'Modal',
  'ModalBody', 'ModalCloseButton', 'ModalFooter', 'ModalHeader', 'NavLink', 'Overlay',
  'PageTitle', 'Popup', 'PopupTrigger', 'Progress', 'Radio', 'RadioGroup', 'Row', 'Section', 'SectionTitle',
  'Select', 'Spinner', 'Stack', 'Switch',
  'Table', 'Tbody', 'Td', 'Text', 'Textarea', 'Tfoot', 'Th', 'Thead',
  'ThemeProvider', 'Title', 'Tooltip', 'Tr', 'defaultTheme', 'themeDefaults', 'useFieldControlProps',
  'useOverlayRegistration', 'useTheme',
];

describe('public export surface', () => {
  it('should expose exactly the locked runtime exports from the root barrel', () => {
    const actual = Object.keys(VaneUI).sort();
    const expected = [...EXPECTED_RUNTIME_EXPORTS].sort();

    const missing = expected.filter(name => !actual.includes(name));
    const unexpected = actual.filter(name => !expected.includes(name));

    expect({ missing, unexpected }).toEqual({ missing: [], unexpected: [] });
  });
});

// The exports map is written by hand while the build takes its entries from a glob, so a new
// component directory is built and typed but has no import path until it is listed here too.
describe('package exports map', () => {
  const root = path.join(__dirname, '../../..');
  const exportsMap: Record<string, unknown> = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).exports;
  const uiDir = path.join(root, 'src/components/ui');

  const entryFor = (modulePath: string) => ({
    import: { types: `./dist/types/${modulePath}.d.mts`, default: `./dist/esm/${modulePath}.mjs` },
    require: { types: `./dist/types/${modulePath}.d.cts`, default: `./dist/cjs/${modulePath}.cjs` },
  });

  const directoriesWithIndex = (dir: string) => fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && fs.existsSync(path.join(dir, entry.name, 'index.ts')))
    .map(entry => entry.name);

  // built as an entry but not an import path of its own: `./theme` is the theme context
  const INTERNAL_DIRECTORIES = ['theme'];

  it('gives every component directory an import path', () => {
    const components = directoriesWithIndex(uiDir).filter(name => !INTERNAL_DIRECTORIES.includes(name));
    expect(components).toEqual(expect.arrayContaining(['alert', 'button', 'field', 'table', 'tooltip']));
    for (const name of components) {
      expect({ [name]: exportsMap[`./${name}`] }).toEqual({ [name]: entryFor(`components/ui/${name}/index`) });
    }
  });

  it('gives every typography component an import path', () => {
    // common/ is shared machinery, not a component
    const components = directoriesWithIndex(path.join(uiDir, 'typography')).filter(name => name !== 'common');
    expect(components).toEqual(expect.arrayContaining(['text', 'title', 'link']));
    for (const name of components) {
      expect({ [name]: exportsMap[`./${name}`] }).toEqual({ [name]: entryFor(`components/ui/typography/${name}/index`) });
    }
  });

  it('points every JS import path at a source module, with matching ESM, CJS and type targets', () => {
    for (const [subpath, target] of Object.entries(exportsMap)) {
      const esm = (target as { import?: { default?: string } })?.import?.default;
      if (typeof esm !== 'string' || !esm.endsWith('.mjs')) continue; // stylesheets and package.json
      const modulePath = esm.replace(/^\.\/dist\/esm\//, '').replace(/\.mjs$/, '');
      expect({ [subpath]: target }).toEqual({ [subpath]: entryFor(modulePath) });
      const source = path.join(root, 'src', modulePath);
      expect({ [subpath]: fs.existsSync(`${source}.ts`) || fs.existsSync(`${source}.tsx`) }).toEqual({ [subpath]: true });
    }
  });
});
