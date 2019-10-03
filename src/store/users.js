import axios from 'axios';
import utils from '@/utils';
import Vue from 'vue';


function get_default_state() {
  return {
    users: {
      '@id': '',
      'items': []
    }
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  actions: {

    async LOAD_USERS({ commit, state }, { force=false }) {
      if (!force && state.users.items.length) {
        utils.logger.debug('LOAD_USERS - use cache');
        return;
      }
      let url = '/@vocabularies/plone.app.vocabularies.Users';
      try {
        utils.logger.debug(`LOAD_USERS: ${url}`);
        const response = await axios.get(url);
        commit('ADD_USERS', { users: response.data });
        return response.data;
      } catch(error) {
        utils.logger.error('Error while LOAD_USERS');
        utils.logger.error(error);
      }
    },

    async LOAD_ALLOWED_USERS({ commit, state }, { url }) {
      url = `${url}/@vocabularies/empower.allowed_users`;
      try {
        utils.logger.debug(`LOAD_ALLOWED_USERS: ${url}`);
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        utils.logger.error('Error while LOAD_ALLOWED_USERS');
        utils.logger.error(error);
      }
    },

    async RESET_STATE({ commit }) {
      commit('RESET_STATE');
    },

  },

  mutations: {

    RESET_STATE(state) {
      Object.assign(state, get_default_state());
    },

    ADD_USERS: (state, { users }) => {
      Vue.set(state, 'users', users);
      utils.logger.debug('ADD_USERS');
    }

  }

};
