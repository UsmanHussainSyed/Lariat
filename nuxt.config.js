export default {
  target: 'server',
  // server: {
  //   port: process.env.PORT, // default: 3000
  //   host: '127.0.0.1', // default: localhost,
  //   timing: false,
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head
  debug: true,
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simplify, streamline, and accelerate your marketing life.',
      },
      {
        name: 'apple-itunes-app',
        content:
          'app-id=1578089778, app-argument=' + process.env.MOBILE_APP_DOMAIN,
      },
      {
        name: 'google-site-verification',
        content: 'brHmzz9jjF4OBrykOmSpLM5ooI14C9kUzr7R2XB1SBw',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      },
      {
        //  Adobe Acumin Font
        rel: 'stylesheet',
        href: 'https://use.typekit.net/oep8bma.css',
      },
    ],
    script: [
      {
        // Google Places Api
        src: `https://maps.googleapis.com/maps/api/js?key=${process.env.G_PLACES_API_KEY}&libraries=places`,
      },
      { src: 'https://apis.google.com/js/api.js', async: true, defer: true },
      { src: '/js/jquery.min.js' },
      { src: '/js/bootstrap.min.js' },
      { src: '/js/plugin.js' },
      { src: '/js/required.js' },
      { src: '/js/dev.vendor.js' },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js',
      },
      {
        src: 'https://cdn.jsdelivr.net/bootstrap.tagsinput/0.8.0/bootstrap-tagsinput.min.js',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/bootstrap.min.css',
    '~/assets/css/utilities.css',
    '~/assets/css/plugin.css',
    '~/assets/css/vendor.css',
    // '~/assets/css/vuedropzone.css',
    '~/assets/css/dev.vendor.css',
    '~/assets/css/v-tooltip.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuelidate.js' },
    { src: '~/plugins/helper.js' },
    { src: '~/plugins/axios.js', ssr: true },
    // { src: '~/plugins/vue-dropzone.js' },
    { src: '~/plugins/infinity-loading.js' },
    { src: '~/plugins/vue-tooltip.js' },
    { src: '~/plugins/vue-clipboard.js' },
    { src: '~/plugins/vue-async-computed.js' },
    { src: '~/plugins/vue-infinite-scroll.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue2-editor.js', mode: 'client', ssr: false },
    { src: '~/plugins/bus' },
    { src: '~/plugins/overlay-loader.js' },
    { src: '~/plugins/h-chart.js', ssr: false },
    { src: '~/plugins/vue-tour.js', ssr: false },
  ],
  watchers: {
    webpack: {
      ignored: ['**/node_modules', './build'],
    },
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components/svg/'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/auth-next',
    '@nuxtjs/moment',
    [
      '@pranavraut033/laravel-echo',
      {
        broadcaster: 'pusher',
        key: process.env.PUSHER_KEY,
        cluster: process.env.PUSHER_CLUSTER,

        authModule: true,
        connectOnLogin: true,
        disconnectOnLogout: true,
        authEndpoint: process.env.PUSHER_AUTH_ENDPOINT,

        // wsHost: process.env.WEBSOCKET_HOST,
        // wsPort: process.env.WEBSOCKET_PORT,
        // encrypted: true,
        // disableStats: true,

        // Laravel websocket settings
        /* wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true, */
      },
    ],
    'vue-browser-detect-plugin/nuxt',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'nuxt-client-init-module',
    'portal-vue/nuxt',
    'nuxt-socket-io',
    // 'primevue/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL,
    https: process.env.HTTPS === 'true',
  },
  // socket io configuration ( requires in lead management speech to text client-server communication )
  io: {
    // module options
    sockets: [
      {
        name: 'speech',
        // url: 'http://localhost:3000',
      },
    ],
  },
  // toast configuration
  toast: {
    position: 'top-center',
    theme: 'toasted-primary', // toasted-primary, outline, bubble
    duration: '5000',
    iconPack: 'fontawesome',
    /* action: [
      {
        text: 'close',
        onClick: (e, toastObject) => {
          toastObject.goAway(0);
        }
      }
    ], */
    register: [
      {
        name: 'success',
        message: (message) => message,
        options: {
          type: 'success',
          icon: 'check',
        },
      },
      {
        name: 'error',
        message: (message) => message,
        options: {
          type: 'error',
          icon: 'exclamation-circle',
        },
      },
      {
        name: 'info',
        message: (message) => message,
        options: {
          type: 'info',
          icon: 'exclamation',
        },
      },
    ],
  },
  router: {
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
  },
  // Auth module configuration
  auth: {
    redirect: {
      login: '/',
      logout: '/',
      /* callback: '/login', */
      /* home: false, */
    },
    strategies: {
      local: {
        // scheme: '~/schemes/customScheme',
        token: {
          property: 'data.access_token',
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data.user',
          // autoFetch: true
        },
        endpoints: {
          login: {
            url:
              process.env.IS_SUPPORT_PLATFORM === 'true'
                ? 'support-login'
                : 'login',
            method: 'post',
          },
          user: {
            url: 'user',
            method: 'get',
          },
          logout: {
            url:
              process.env.IS_SUPPORT_PLATFORM === 'true'
                ? 'terminate-token'
                : 'logout',
            method: 'post',
          },
        },
      },
    },
    cookie: {
      options: {
        path: '/',
        expires: 365,
        secure: process.env.SECURE_AUTH_COOKIE === 'true',
      },
    },
  },
  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
    { path: '/driveapi', handler: '~/api/drive-api.js' },
    { path: '/s3', handler: '~/api/s3.js' },
    { path: '/box', handler: '~/api/box.js' },
    { path: '/zip', handler: '~/api/zip-viewer.js' },
    { path: '/convert', handler: '~/api/media-converter' },
    {
      path: '/apple-app-site-association',
      handler: '~/api/universal-link.js',
    },
    { path: '/stripe', handler: '~/api/payments.js' },
    { path: '/phone-number', handler: '~/api/phone-number.js' },
    { path: '/generate-image', handler: '~/api/generate-image.js' },
  ],
  publicRuntimeConfig: {
    appName: process.env.APP_NAME,
    baseUrl: process.env.BASE_URL,
    apiBaseUrl: process.env.API_BASE_URL,
    backendUrl: process.env.BACKEND_URL || process.env.BACKAND_URL,
    damBaseUrl: process.env.DAM_FRONTEND_URL,
    userPlaceHolderImg: process.env.USER_PLACEHOLDER_IMG,
    googleAuthUrl: process.env.GOOGLE_AUTH_URL,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    DAM_FRONTEND_URL: process.env.DAM_FRONTEND_URL,
    GOOGLE_DRIVE_CLIENT_ID: process.env.GOOGLE_DRIVE_CLIENT_ID,
    GOOLGE_DRIVE_CLIENT_SECRET: process.env.GOOLGE_DRIVE_CLIENT_SECRET,
    REDIRECT_URI: process.env.REDIRECT_URI,
    DROPBOX_OAUTH_URI: process.env.DROPBOX_OAUTH_URI,
    DROPBOX_AUTH_VERIFICATION_URI: process.env.DROPBOX_AUTH_VERIFICATION_URI,
    DROPBOX_APP_ID: process.env.DROPBOX_APP_ID,
    DROPBOX_APP_SECRET: process.env.DROPBOX_APP_SECRET,
    DROPBOX_AUTH_REDIRECT: process.env.DROPBOX_AUTH_REDIRECT,
    MOBILE_APP_DOMAIN: process.env.MOBILE_APP_DOMAIN,
    FLUENTFFMPEG_COV: 0,
    DAM_UPLOAD_AUTOTAG_ENABLED: process.env.DAM_UPLOAD_AUTOTAG_ENABLED,
    SUPPORT_BASE_URL: process.env.SUPPORT_BASE_URL,
    IS_SUPPORT_PLATFORM: process.env.IS_SUPPORT_PLATFORM === 'true',
    BACKAND_URL: process.env.BACKAND_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_CHECKOUT_MODE: process.env.STRIPE_CHECKOUT_MODE || 'prebuilt',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_WEBHOOK_ENDPOINT: process.env.STRIPE_WEBHOOK_ENDPOINT,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, _) {
      config.node = {
        fs: 'empty',
      }
    },
    postcss: null,
    transpile: ['defu'],
  },
}
