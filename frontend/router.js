import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: 'main',
      path: '/',
      component: () => import('./pages/Main.vue')
    }
  ]
});
