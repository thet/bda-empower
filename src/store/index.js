import Context from '@/store/context';
import Login from '@/store/login';
import PortalMessage  from '@/store/portal_message';
import Types from '@/store/types';
import Users from '@/store/users';
import Vue from 'vue';
import Vuex from 'vuex';
import Workspace from '@/store/workspace';

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
