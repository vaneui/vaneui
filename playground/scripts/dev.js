#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createInterface } from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const viteProcess = spawn('npx', ['vite'], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
  shell: true
});

// Handle various termination signals
const cleanup = (signal) => {
  console.log(`\nReceived ${signal}, cleaning up...`);
  
  if (viteProcess && !viteProcess.killed) {
    viteProcess.kill('SIGTERM');
  }
  
  setTimeout(() => {
    process.exit(0);
  }, 1000);
};

process.on('SIGINT', () => cleanup('SIGINT'));
process.on('SIGTERM', () => cleanup('SIGTERM'));
process.on('exit', () => cleanup('exit'));

// Handle Windows-specific termination
if (process.platform === 'win32') {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  process.exit(code);
});