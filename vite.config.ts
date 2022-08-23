import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import Inspect from "vite-plugin-inspect";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

const pathSrc = path.resolve(__dirname, 'src')
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3010,
    hmr: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src/"),
      "@/*": path.resolve(__dirname, "/src/*"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/comstyle.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        // ElementPlusResolver({ importStyle: false }),
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: "Icon",
        }),
      ],

      dts: path.resolve(path.resolve(__dirname, 'src'), 'auto-imports.d.ts'),
    }),
    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver({
          importStyle: "sass",
          // directives: true,
        }),
      ],
      // 自定义的组件也会自动添加到这个文件中，也会自动引入
      dts: path.resolve(path.resolve(__dirname, 'src'), 'components.d.ts'),
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
});
