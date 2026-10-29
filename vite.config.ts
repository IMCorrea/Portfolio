import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base relativa: o build funciona em qualquer caminho do GitHub Pages
// (ex.: https://imcorrea.github.io/Portfolio/) sem reconfiguração.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', '@gsap/react'],
          motion: ['motion'],
        },
      },
    },
  },
});
