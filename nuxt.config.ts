// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module"],
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      defaults: {
        VRow: {
          class: 'ma-0',
        }
      },
      theme: {
        defaultTheme: "myCustomThemes",
        themes: {
          myCustomThemes: {
            dark: true,
            colors: {
              black: '#000000',
              red: '#C5003C',
              brown: '#880425',
              yellow: '#F3E600',
              blue: '#55EAD4',
            },
          },
        },
      },
    },
  },
});
