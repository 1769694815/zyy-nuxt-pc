const pkg = require('./package')
const appConfig = require('./config/app.config')
// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '',
    titleTemplate: `%s${appConfig.meta.title}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'x-ua-compatible', content: 'IE=edge' },
      { hid: 'keywords', name: 'keywords', content: appConfig.meta.keywords },
      { hid: 'description', name: 'description', content: appConfig.meta.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', href: '/aliplayer/aliplayer-min.css' },
      // { rel: 'stylesheet', href: '/aliplayer/share.min.css' }
    ],
    script: [
      // { src: '/aliplayer/aliplayer-min.js', type: 'text/javascript'},
      // { src: 'https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-flash-min.js', type: 'text/javascript'}
      // { src: '/aliplayer/social-share.min.js', type: 'text/javascript'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/reset.css',
    '@/assets/css/common.css',
    '@/assets/css/htmlContent.css',
    '@/assets/css/quill.snow.css',
    '@/static/font/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/echarts',
    '@/plugins/axios',
    '@/plugins/router',
    { src: '@/static/font/iconfont.js', ssr: false },
    { src: '@/plugins/vue-lazyload.js', ssr: false },
    { src: '@/plugins/distpicker.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  router: {
    middleware: 'userAuth'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: '/api/',
    proxy: true,
    credentials: true
  },

  proxy: {
    '/api/': {
      target: 'http://114.67.78.120:8080',
      // target: 'http://192.168.2.199:9999',
      // target: 'http://192.168.2.129:9999',
      // target: 'http://api.zyyzx.com.cn',
      pathRewrite: { '^/api/': '/', changeOrigin: true }
    }
  },

  server: {
    prot: 3000,
    host: '127.0.0.1'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
