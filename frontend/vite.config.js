import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': resolve(__dirname, 'src/lib/react-router-dom.jsx')
    }
  },
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
});
