const fs = require('fs');
const testContent = fs.readFileSync('src/components/tests/responsive-typography.test.tsx', 'utf8');

// Replace old patterns with new ones that use the responsive prop
let content = testContent;

// Update the test that checks for --fs-desktop to use responsive prop
content = content.replace(
  /<Title xs>Small Title<\/Title>/,
  '<Title xs responsive>Small Title</Title>'
);

content = content.replace(
  /expect\(title\)\.toHaveClass\('text-\(length:--fs-desktop\)'\);/,
  "expect(title).toHaveClass('text-(length:--fs-desktop)');"
);

// Update Section test to use responsive prop for breakpoint classes
content = content.replace(
  /<Section xl>Large Section with Responsive Padding<\/Section>/,
  '<Section xl responsive>Large Section with Responsive Padding</Section>'
);

// For the Responsive CSS Variable Switching Classes section,
// update all tests to add responsive prop
content = content.replace(
  /<Title md>Responsive Title<\/Title>/g,
  '<Title md responsive>Responsive Title</Title>'
);
content = content.replace(
  /<PageTitle md>Responsive Page Title<\/PageTitle>/g,
  '<PageTitle md responsive>Responsive Page Title</PageTitle>'
);
content = content.replace(
  /<SectionTitle md>Responsive Section Title<\/SectionTitle>/g,
  '<SectionTitle md responsive>Responsive Section Title</SectionTitle>'
);
content = content.replace(
  /<Section md>Responsive Section Padding<\/Section>/g,
  '<Section md responsive>Responsive Section Padding</Section>'
);
content = content.replace(
  /<Section md gap>Responsive Section Gap<\/Section>/g,
  '<Section md gap responsive>Responsive Section Gap</Section>'
);
content = content.replace(
  /<Section lg gap>Section with Gap<\/Section>/g,
  '<Section lg gap responsive>Section with Gap</Section>'
);

fs.writeFileSync('src/components/tests/responsive-typography.test.tsx', content);
console.log('Updated responsive-typography.test.tsx');
