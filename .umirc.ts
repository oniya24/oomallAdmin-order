import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://47.114.166.8:8082',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  devServer: {
    port: 8003,
  },
  qiankun: {
    slave: {},
  },
  fastRefresh: {},
});
