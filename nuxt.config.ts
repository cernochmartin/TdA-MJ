export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // runtimeConfig: {
  //   MYSQL_HOST: process.env.MYSQL_HOST,
  //   MYSQL_USER: process.env.MYSQL_USER,
  //   MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  //   MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  // },
})
