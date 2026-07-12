import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['node:util'],
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    exclude: ['node:util']
  }
});