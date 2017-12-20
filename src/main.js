// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'
import Utils from './libs/util'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(router);
Vue.use(iView);
Vue.use(VueResource);
Vue.prototype.$utils = Utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
