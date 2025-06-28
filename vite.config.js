import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src', // 🔹 Встановлюємо src як корінь проєкту
  base: '/goit-js-hw-12/', // 🔹 Шлях для GitHub Pages
  build: {
    outDir: '../dist', // 🔹 Куди збиратиме білд
    emptyOutDir: true,
  },
});
