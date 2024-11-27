import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import fs from 'fs';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite 配置
    define: {
      TOKEN: JSON.stringify(env.TOKEN),
      REFRESH_TOKE: JSON.stringify(env.REFRESH_TOKE),
      CSRF: JSON.stringify(env.CSRF),
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n'],
        dts: 'src/auto-imports.js',
      }),
      Components({
        // 從 `./src/components/` 路徑查找
        extensions: ['vue'],
        include: [/\.vue$/, /\.vue\?vue/],
        dts: 'src/auto-components.js',
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: '[dir]/[name]',
      }),
      Pages(),
      Layouts(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      proxy: {
        '/user/API': {
          target: env.VITE_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/user\/API/, ''),
        },
        '/user/register': {
          target: env.VITE_REGISTER_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/user\/register/, ''),
        },
      },
    },
  };
});
