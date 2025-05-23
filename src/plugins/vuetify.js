/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
   theme: {
    themes: {
      light: {
        colors: {
          // configurar se necessário
        }
      },
      dark: {
        dark: true,
        colors: {
          black: '#000000',
          red: '#C5003C',
          brown: '#880425',
          yellow: '#F3E600',
          gray: '#55EAD4',
        }
      }
    },
  },
})
