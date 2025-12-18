import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        {
          'vue-router': ['useRouter', 'useRoute'],
        },
      ],
      dirs: ['./src/stores/**'],
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
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
