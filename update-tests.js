const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'src', 'components', 'tests');

// List of test files to update
const testFiles = [
  'badge.test.tsx',
  'button.test.tsx',
  'chip.test.tsx',
  'code.test.tsx',
  'input.test.tsx',
  'label.test.tsx',
  'text.test.tsx',
  'title.test.tsx',
  'link.test.tsx',
  'list.test.tsx',
  'card.test.tsx',
  'stack.test.tsx',
  'section.test.tsx',
  'divider.test.tsx',
  'responsive-typography.test.tsx',
  'nested-theme-providers.test.tsx',
  'nested-theme-providers-simple.test.tsx'
];

// Pattern to match CSS variable setter classes followed by consumer classes
const patterns = [
  // Font size patterns
  { regex: /\[--fs-unit:\d+\](?: max-laptop:\[--fs-unit:\d+\])?(?: max-tablet:\[--fs-unit:\d+\])?,\s*'text-\(length:--fs\)'/g, replacement: `'text-(length:--fs)'` },
  { regex: /\[--fs-unit:\d+\](?: max-laptop:\[--fs-unit:\d+\])?(?: max-tablet:\[--fs-unit:\d+\])'\s*,\s*'text-\(length:--fs\)'/g, replacement: `'text-(length:--fs)'` },
  { regex: /'text-\(length:--fs\)',\s*'text-\(length:--fs\)'/g, replacement: `'text-(length:--fs)'` },

  // Padding Y patterns
  { regex: /\[--py-unit:\d+\](?: max-laptop:\[--py-unit:\d+\])?(?: max-tablet:\[--py-unit:\d+\])?,\s*'py-\(--py\)'/g, replacement: `'py-(--py)'` },
  { regex: /\[--py-unit:\d+\](?: max-laptop:\[--py-unit:\d+\])?(?: max-tablet:\[--py-unit:\d+\])'\s*,\s*'py-\(--py\)'/g, replacement: `'py-(--py)'` },
  { regex: /'py-\(--py\)'\s+\[--py-unit:\d+\](?: max-laptop:\[--py-unit:\d+\])?(?: max-tablet:\[--py-unit:\d+\])?/g, replacement: `'py-(--py)'` },

  // Padding X patterns
  { regex: /\[--aspect-ratio:\d+(?:\.\d+)?\],?\s*'px-\(--px\)'/g, replacement: `'px-(--px)'` },
  { regex: /'px-\(--px\)'\s+\[--aspect-ratio:\d+(?:\.\d+)?\]/g, replacement: `'px-(--px)'` },

  // Border radius patterns
  { regex: /\[--br-unit:\d+\],?\s*'rounded-\(--br\)'/g, replacement: `'rounded-(--br)'` },
  { regex: /'rounded-\(--br\)'\s+\[--br-unit:\d+\]/g, replacement: `'rounded-(--br)'` },

  // Line height patterns
  { regex: /\[--lh:\d+(?:\.\d+)?\],?\s*'leading-\(--lh\)'/g, replacement: `'leading-(--lh)'` },
  { regex: /'leading-\(--lh\)'\s+\[--lh:\d+(?:\.\d+)?\]/g, replacement: `'leading-(--lh)'` },

  // Gap patterns
  { regex: /\[--gap-unit:\d+\],?\s*'gap-\(--gap\)'/g, replacement: `'gap-(--gap)'` },
  { regex: /'gap-\(--gap\)'\s+\[--gap-unit:\d+\]/g, replacement: `'gap-(--gap)'` },

  // Size patterns
  { regex: /\[--size-unit:\d+\],?\s*'size-\(--size\)'/g, replacement: `'size-(--size)'` },
  { regex: /'size-\(--size\)'\s+\[--size-unit:\d+\]/g, replacement: `'size-(--size)'` },

  // Complex patterns with multiple units on same line
  { regex: /'px-\(--px\)\s+\[--py-unit:\d+\]',\s*'py-\(--py\)\s+\[--gap-unit:\d+\]'/g, replacement: `'px-(--px)', 'py-(--py)'` },
  { regex: /'px-\(--px\)\s+\[--py-unit:\d+\]',?\s*'py-\(--py\)'/g, replacement: `'px-(--px)', 'py-(--py)'` },
];

// Process each test file
testFiles.forEach(fileName => {
  const filePath = path.join(testDir, fileName);

  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${fileName} - file not found`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Apply all patterns
  patterns.forEach(({regex, replacement}) => {
    const before = content;
    content = content.replace(regex, replacement);
    if (content !== before) {
      modified = true;
    }
  });

  // Additional manual cleanup for specific complex cases
  // Remove standalone CSS variable units
  content = content.replace(/expect\([^)]+\)\.toHaveClass\('\[--(?:fs|py|px|br|gap|lh|size|aspect-ratio)-[^']+'\);?\s*\/\/ [^\n]+\n/g, '');

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${fileName}`);
  } else {
    console.log(`- No changes needed for ${fileName}`);
  }
});

console.log('\nDone!');
