import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of required files that must exist before publishing
const requiredFiles = [
  'dist/index.js',
  'dist/index.esm.js',
  'dist/index.d.ts',
  'dist/ui.css',
  'dist/vars.css'
];

// List of required directories that must exist and not be empty
const requiredDirs = [
  'dist/components'
];

let hasError = false;

// Get the project root directory (two levels up from the script)
const projectRoot = path.resolve(__dirname, '..');

// Check required files
console.log('Checking required files...');
for (const file of requiredFiles) {
  const filePath = path.resolve(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Required file not found: ${file}`);
    hasError = true;
  } else {
    console.log(`✅ Found required file: ${file}`);
  }
}

// Check required directories
console.log('\nChecking required directories...');
for (const dir of requiredDirs) {
  const dirPath = path.resolve(projectRoot, dir);
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Required directory not found: ${dir}`);
    hasError = true;
  } else {
    const files = fs.readdirSync(dirPath);
    if (files.length === 0) {
      console.error(`❌ Required directory is empty: ${dir}`);
      hasError = true;
    } else {
      console.log(`✅ Found required directory with files: ${dir}`);
    }
  }
}

if (hasError) {
  console.error('\n❌ Verification failed. Package is not ready for publishing.');
  process.exit(1);
} else {
  console.log('\n✅ All required files and directories are present. Package is ready for publishing.');
}
