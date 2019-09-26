import axios from 'axios';
import config from '@/config';
import utils from '@/utils';


function get_default_state() {
  return {
    auth_status: '',
    auth_token: undefined, // sessionStorage.getItem('auth_token') || undefined,
    user: {},
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  getters: {
    isLoggedIn: state => !!state.auth_token
  },

  actions: {
    async LOGIN({ commit }, { username, password }) {
      commit('AUTH_REQUEST');
      try {
        utils.logger.debug(`LOGIN ${username}`);
        const response = await axios.post(
          config.baseURI + '/@login',
          {
            login: username,
            password: password
          }
        );
        const token = response.data.token;
        if (! token) {
          throw 'Could not log in.';
        }

        commit('AUTH_SUCCESS', token);

        // Get current user details
        const response2 = await axios.get(`${config.baseURI}/@userinfo`);
        commit('SET_CURRENT_USER', response2.data);
      } catch (error) {
        commit('AUTH_ERROR');
      }
    },

    async LOGIN_RENEW({ commit }) {
      commit('AUTH_REQUEST');
      try {
        utils.logger.debug('LOGIN_RENEW');
        const response = await axios.post(config.baseURI + '/@login-renew');
        const token = response.data.token;
        if (! token) {
          throw 'Could not renew log in.';
        }
        commit('AUTH_SUCCESS', token);
      } catch (error) {
        commit('AUTH_ERROR');
      }
    },

    async LOGOUT({ dispatch, commit, state }) {
      utils.logger.debug(`LOGOUT ${state?.user?.username}`);
      commit('RESET_STATE');
      await dispatch('context/RESET_STATE', {}, { root: true });
      await dispatch('portal_message/RESET_STATE', {}, { root: true });
      await dispatch('users/RESET_STATE', {}, { root: true });
      await dispatch('app/RESET_STATE', {}, { root: true });
    },

    async RESET_STATE({ commit }) {
      commit('RESET_STATE');
    },

  },

  mutations: {

    RESET_STATE(state) {
      utils.logger.debug('RESET_STATE');
      Object.assign(state, get_default_state());
    },

    AUTH_REQUEST: state => {
      state.auth_status = 'loading';
    },

    AUTH_SUCCESS: (state, token) => {
      state.auth_status = 'success';
      state.auth_token = token;
      sessionStorage.setItem('auth_token', token);
    },

    AUTH_ERROR: state => {
      state.auth_status = 'error';
      state.auth_token = undefined;
      sessionStorage.removeItem('auth_token');
    },

    AUTH_LOGOUT: state => {
      state.auth_status = '';
      state.auth_token = undefined;
      state.user = {};
      sessionStorage.removeItem('auth_token');
    },

    SET_CURRENT_USER: (state, user) => {
      state.user = user;
    }

  }

};
