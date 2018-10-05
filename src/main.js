import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import router from './routes'
import jQuery from 'jquery'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import '@/assets/css/style.css'
import VueVisible from 'vue-visible'
import CustomSelect from '@/components/pages/EditSession/CustomSelect'
import CustomNumberInput from '@/components/pages/EditSession/CustomNumberInput'

jQuery.extend(true, jQuery.fn.datetimepicker.defaults, {
  icons: {
    time: 'far fa-clock',
    date: 'far fa-calendar',
    up: 'fas fa-arrow-up',
    down: 'fas fa-arrow-down',
    previous: 'fas fa-chevron-left',
    next: 'fas fa-chevron-right',
    today: 'fas fa-calendar-check',
    clear: 'far fa-trash-alt',
    close: 'far fa-times-circle'
  }
})


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueVisible)
Vue.config.productionTip = false
Vue.use(datePicker)
Vue.component('custom-select', CustomSelect)
Vue.component('custom-number-input', CustomNumberInput)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
