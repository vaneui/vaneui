import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      '@vaneui/ui': path.resolve(__dirname, '../../src/index.ts'),
    },
  },
  // Multi-page build: both HTML entry points are emitted so `vite preview`
  // can serve them statically. Switching from dev to preview avoids the
  // per-request transform cost that hits hard on cold CI starts.
  build: {
    rollupOptions: {
      input: {
        test: path.resolve(__dirname, 'test.html'),
        'test-tailwind': path.resolve(__dirname, 'test-tailwind.html'),
      },
    },
    // Skip minification — the harness only runs in tests; saves build time.
    minify: false,
    sourcemap: false,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
