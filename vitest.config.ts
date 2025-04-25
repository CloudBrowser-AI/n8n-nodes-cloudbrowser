import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'test/**',
        '**/*.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      'n8n-workflow': resolve(__dirname, 'node_modules/n8n-workflow/dist/index.js'),
      'n8n-core': resolve(__dirname, 'node_modules/n8n-core/dist/index.js'),
    },
  },
}); 