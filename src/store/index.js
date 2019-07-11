import Vue from 'vue';
import Vuex from 'vuex';
import Login from './login';
import Context from './context';
import PortalMessage  from './portal_message';
import Types from './types';
import Users from './users';
import Workspace from './workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: Login,
    context: Context,
    portal_message: PortalMessage,
    types: Types,
    users: Users,
    workspace: Workspace
  }
});
