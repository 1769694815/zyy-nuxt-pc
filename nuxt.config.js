const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '中医药在线' || pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js', type: 'text/javascript'}
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
    'video.js/dist/video-js.css',
    '@/assets/css/reset.css',
    '@/assets/css/common.css',
    '@/assets/css/htmlContent.css',
    '@/static/font/iconfont.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/echarts',
    '@/plugins/axios',
    { src: '@/plugins/video-player', ssr: false },
    { src: '@/static/font/iconfont.js', ssr: false },
    { src: '@/plugins/vue-lazyload.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  router: {
    // middleware: 'accessAuth'
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
      target: 'http://212.64.79.36:8080',
      // target: 'http://192.168.2.199:9999',
      pathRewrite: { '^/api/': '/', changeOrigin: true }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
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
