import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'Ant Design',
    locale: true
  },
  hash: true,
  history: {
    type: 'hash'
  }
});
