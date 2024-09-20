import { defineNuxtConfig } from 'nuxt/config'

import dotenv from 'dotenv'

import { version } from './package.json'
import svgLoader from 'vite-svg-loader'

import i18nPages from './src/lang/i18n.pages'

const currentEnv = process.env.NUXT_ENV_ENVIRONMENT || process.env.NODE_ENV

// Load proper environment variables.
dotenv.config({ path: `.env.${currentEnv}` })

console.info('=> Starting build with ENV', currentEnv)
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      title: 'CM.Molins Family Office Web',
      htmlAttrs: {
        lang: 'es',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, interactive-widget=resizes-visual' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { hid: 'og-image', property: 'og:image', content: `${process.env.BASE_APP_URL}/logos/dogfy-logo-512.png` },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'mask-icon', href: '/favicon.ico', color: '#FFFFFF' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'apple-touch-icon', sizes: '192x192', href: '/logos/dogfy-logo-192.png' },
        { rel: 'apple-touch-icon', sizes: '512x512', href: '/logos/dogfy-logo-512.png' },
      ],
    },
  },

  srcDir: 'src/',
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/scss/partials/_tokens.scss";
            @import "@/assets/scss/partials/_mixins.scss";
            @import "@/assets/scss/partials/functions";
            @import "@/assets/scss/partials/_helpers.scss";
          `,
        },
      },
    },
    plugins: [
      svgLoader()
    ],
  },
  css: [
    '@/assets/scss/app.scss'
  ],
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
  ],
  runtimeConfig: {
    version,
  },
  content: {
    documentDriven: false,
    markdown: {
      anchorLinks: false,
    },
  },
  i18n: {
  baseUrl: currentEnv === 'development' ? '' : process.env.BASE_APP_URL,
  locales: [
    { code: 'es', language: 'es-ES', customCode: 'ESP' },
    { code: 'ca', language: 'ca-CA', customCode: 'CAT' },
    { code: 'en', language: 'en-EN', customCode: 'ENG' },
  ],
  defaultLocale: 'es',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'locale',
    alwaysRedirect: false,
    redirectOn: 'root',
  },
  strategy: 'prefix_except_default',
  customRoutes: 'config',
    pages: i18nPages,
  vueI18n: './src/lang/i18n.config.js',
},

  compatibilityDate: '2024-09-20',
})
