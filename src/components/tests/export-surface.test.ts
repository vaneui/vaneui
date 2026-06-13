import * as VaneUI from '../../index';

// Locks the package's runtime export surface. Adding, removing, or renaming
// a root export is a deliberate API change and must update this list in the
// same commit — accidental surface changes (a forgotten barrel line, an
// over-eager re-export) fail here instead of shipping silently. The exports
// MAP targets are validated separately by publint/attw in the publish gate.
const EXPECTED_RUNTIME_EXPORTS = [
  'Badge', 'Blockquote', 'Button', 'COMPONENT', 'Card', 'CardBody', 'CardFooter', 'CardHeader',
  'Checkbox', 'Chip', 'Code', 'Col', 'ComponentCategories', 'ComponentKeys', 'Container',
  'Divider', 'Grid2', 'Grid3', 'Grid4', 'Grid5', 'Grid6', 'Icon', 'IconButton', 'Img', 'Input',
  'Kbd', 'Label', 'Link', 'List', 'ListItem', 'Mark', 'Menu', 'MenuItem', 'MenuLabel', 'Modal',
  'ModalBody', 'ModalCloseButton', 'ModalFooter', 'ModalHeader', 'NavLink', 'Overlay',
  'PageTitle', 'Popup', 'PopupTrigger', 'Row', 'Section', 'SectionTitle', 'Stack', 'Text',
  'ThemeProvider', 'Title', 'defaultTheme', 'themeDefaults', 'useTheme',
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
