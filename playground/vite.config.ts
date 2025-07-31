import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      '@vaneui/ui': path.resolve(__dirname, '../src/index.ts')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});