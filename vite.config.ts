import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  base: '/azalea-portfolio/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['./src/stores/**', './src/composables/**'],
      dts: true,
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
      dtsMode: 'overwrite',
    }),
    Components({
      dirs: ['src'],
      extensions: ['vue'],
      deep: true,
      dts: true,
      syncMode: 'overwrite',
    }),
    visualizer({
      open: process.env.OPEN_STATS === 'true',
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
