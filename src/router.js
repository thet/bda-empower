import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/Login';
import ViewFactory from '@/views/ViewFactory';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '**',
      name: 'view-factory',
      component: ViewFactory
    }
  ]
});
