// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "/assets/css/bootstrap.min.css",
        },

        {
          rel: "stylesheet",
          href: "/assets/css/style.css",
        },

        {
          rel: "stylesheet",
          href: "/assets/font/iran/style.css",
        },

        {
          rel: "stylesheet",
          href: "/assets/css/uicons-regular-rounded.css",
        },
      ],

      script: [{ src: "/assets/js/bootstrap.bundle.min.js" }],
    },
  },

  css: ["vue-multiselect/dist/vue-multiselect.css"],

  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: ["@pinia/nuxt"],
});
