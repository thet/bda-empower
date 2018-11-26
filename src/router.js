import Vue from 'vue';
import Router from 'vue-router';
import ViewFactory from './views/ViewFactory';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'view-factory',
      component: ViewFactory
    }
  ]
});
