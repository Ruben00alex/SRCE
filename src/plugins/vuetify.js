/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { aliases, fa } from 'vuetify/iconsets/fa'
import { mdi } from 'vuetify/iconsets/mdi'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  blueprint: md3,
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#215605',
          secondary : '#355D22',
          tertiary: '#143405',
          quaternary: '#318609',
          quinary: '#629C47',
          senary: '#97DA04',
          septenary: '#B8E986',

          accent: '#fcfffc',
          accent2: '#f8fff4',
          black: '#050B01',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
        },
      },
    },
  },
  components: {
    ...components,
    VDataTable,
  }
})
