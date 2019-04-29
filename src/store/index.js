import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Context from './context';
import Types from './types';
import Users from './users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: Login,
    context: Context,
    types: Types,
    users: Users
  }
});
