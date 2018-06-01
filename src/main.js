// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './state'
import Vuelidate from 'vuelidate'
import VueResource from 'vue-resource';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
var VueCookie = require('vue-cookie');

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.use(Vuelidate);
Vue.http.options.credentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
})
