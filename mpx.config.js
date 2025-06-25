const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')

// 加载构建时环境配置
const buildEnv = require('./build/env.js')

// 获取 package.json 信息
const packageInfo = require('./package.json')

module.exports = defineConfig({
  outputDir: `dist/${process.env.MPX_CURRENT_TARGET_MODE}`,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(buildEnv.IS_PROD ? 'production' : 'development'),
        'process.env.NODE_TYPE': JSON.stringify(process.env.NODE_TYPE),
        'process.env.xClientVersion': JSON.stringify('0.0.1'),
        'process.env.API_URL': JSON.stringify(buildEnv.apiUrl),
        'process.env.IM_URL': JSON.stringify(process.env.IM_URL),
        'process.env.URI_URL': JSON.stringify(process.env.URI_URL),
        'process.env.MODE': JSON.stringify(process.env.npm_config_node),
        'process.env.APPID': JSON.stringify(process.env.APPID),
        'process.env.BASE_API': JSON.stringify(process.env.BASE_API),
        'process.env.IMG_URL': JSON.stringify(process.env.IMG_URL),
        'process.env.IMG_STATICRES_URL': JSON.stringify(process.env.IMG_STATICRES_URL),
        'process.env.API_VERSION': JSON.stringify(process.env.API_VERSION),
        'process.env.APP_TYPE': JSON.stringify(process.env.APP_TYPE),
        'process.env.GRANT_TYPE': JSON.stringify(process.env.GRANT_TYPE),
        'process.env.VERSION': JSON.stringify(packageInfo.version),
      }),
      // 开发环境显示提示信息
      !buildEnv.IS_PROD ? {
        apply(compiler) {
          compiler.hooks.done.tap('customTips', () => {
            setTimeout(() => {
              console.log(`  ${chalk.bold('- 当前开发环境：')}  ${process.env.NODE_TYPE || buildEnv.env}`);
            }, 0);
          });
        },
      } : undefined,
    ].filter(Boolean),
  },
  pluginOptions: {
    mpx: {
      plugin: {
        srcMode: 'wx',
        hackResolveBuildDependencies: ({ files, resolveDependencies }) => {
          const path = require('path')
          const packageJSONPath = path.resolve('package.json')
          if (files.has(packageJSONPath)) files.delete(packageJSONPath)
          if (resolveDependencies.files.has(packageJSONPath)) {
            resolveDependencies.files.delete(packageJSONPath)
          }
        }
      },
      loader: {},
      unocss: {}
    }
  }
})
