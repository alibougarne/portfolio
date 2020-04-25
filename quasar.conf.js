/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = function(ctx) {
  // console.log(ctx);
  return {
    // Quasar looks for *.js files by default
    supportTS: true,
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/store/index.ts'
    },
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: ['i18n', 'axios'],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      // iconSet: 'ionicons-v4', // Quasar icon set
      // lang: 'de', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: 'false',

      components: [
        'QBtn',
        'QIcon',
        'QPage',
        'QPageContainer',
        'QLayout',
        'QSeparator',
        'QItemLabel',
        'QItemLabel',
        'QItem',
        'QItemSection',
        'QToolbar',
        'QHeader',
        'QFooter',
        'QToolbarTitle',
        'QDrawer',
        'QInput',
        'QAvatar',
        'QTooltip',
        'QIcon',
        'QBadge',
        'QScrollArea',
        'QList',
        'QSpace',
        'QParallax',
        'QImg',
        'QCard',
        'QCardSection',
        'QCardActions',
        'QForm',
        'QToggle',
        'QUploader',
        'QFile',
        'QChip',
        'QColor',
        'QPopupProxy',
        'QEditor',
        'QSpinnerFacebook',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QDialog',
        'QRating',
        'QSpinner',
        'QSelect',
        'QUploaderAddTrigger',
        'QDate',
      ],
      directives: ['Ripple','ClosePopup'],

      // Quasar plugins
      plugins: ['Loading', 'Notify'],
      config: {
        loading: {
          /* Loading defaults */
        }
      }
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: true,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueCompiler: true,
      vueRouterMode: 'hash',
      // showProgress: false,
      gzip: false,
      // analyze: true,
      // preloadChunks: false,
      // extractCSS: false,
      uglifyOptions: {
        compress: { drop_console: true }
      },
      env: ctx.dev
        ? {
          // so on dev we'll have
          API: JSON.stringify('http://localhost:3001')
        }
        : {
          // and on build (production):
          API: JSON.stringify('https://portfolio-nest-api.herokuapp.com')
        },
      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish')
          }
        });
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add your own alias like this
          '@': path.resolve(__dirname, './src'),
          vue$: 'vue/dist/vue.esm.js'
        };
        // cfg.mode = 'production';
        // console.log('cfg.resolve.alias ===> ', cfg);
      }
    },

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // proxy: {
      //   // proxy all requests starting with /api to jsonplaceholder
      //   '/api': {
      //     target: 'https://portfolio-nest-api.herokuapp.com',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/api': ''
      //     }
      //   }
      // },
      // https: true,
      port: 8085,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [
      //'all',
      'fadeIn',
      'fadeOut',
      // 'slideInRight',
      // 'slideInLeft',
      // 'bounceInLeft',
      // 'bounceOutRight'
    ],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      extendWebpack (cfg) {
        // directly change props of cfg;
        // no need to return anything
      },
  
      // -- @quasar/app v1.5+ --
      // optional; EQUIVALENT to extendWebpack() but uses webpack-chain;
      // the Webserver part ONLY (/src-ssr/)
      // which is invoked for production (NOT for dev)
      chainWebpack (chain) {
        // chain is a webpack-chain instance
        // of the Webpack configuration
      }
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'One for All Portfolio',
        // short_name: 'One for All Portfolio',
        // description: 'Ali Bougarne Portfolio',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'statics/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'statics/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // id: 'org.cordova.quasar.app',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'portfolio'
      }
    }
  };
};
