import path from 'path';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';

import { fileURLToPath } from 'url';

const __filenameNew = fileURLToPath(import.meta.url);

const __dirnameNew = path.dirname(__filenameNew);
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirnameNew, 'src'),
    },
  },
  plugins: [
    vue(),
    visualizer({
      title: 'Vite Rollup Visualizer',
      emitFile: true,
    }),
  ],
});
