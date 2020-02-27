import App from './App';
import router from './router';
import store from './store';
import Vue from 'vue';

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app');
