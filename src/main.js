import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import 'reset-css';
import 'font-awesome/scss/font-awesome.scss'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios=Axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
