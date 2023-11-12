/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/dist/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});
