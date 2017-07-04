// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router, /* vue-router에 대한 의존성을 주입합니다 */
  store, /* vuex에 대한 의존성을 주입합니다 */

  el: '#app',
})
