// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: { port: 3030 },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  modules: [
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/supabase',
    '@prisma/nuxt'
  ],
  supabase: {
    redirect: false
  },
  prisma: {
    installCLI: false,
    installClient: false,
    installStudio: false
  }
})