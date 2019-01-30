import Vue from 'vue';
import Router from 'vue-router';
import LoginView from '@/views/LoginView';
import ViewFactory from '@/views/ViewFactory';
import WorkspaceView from '@/views/WorkspaceView';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '**/+ws/:id',
      name: 'view-factory',
      component: WorkspaceView
    },
    {
      path: '**',
      name: 'view-factory',
      component: ViewFactory
    }
  ]
});
