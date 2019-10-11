import axios from 'axios';
import utils from '@/utils';
import Vue from 'vue';


function get_default_state() {
  return {
    users: []
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  getters: {
    user_by_id: state => id => {
      const users = state.users.filter(it => it.value === id);
      return users.length ? users[0] : null;
    }
  },

  actions: {

    async LOAD_USERS({ commit, state }, { force=false }) {
      if (!force && state.users.length) {
        utils.logger.debug('LOAD_USERS - use cache');
        return state.users;
      }
      const url = '/@vocabularies/plone.app.vocabularies.Users';
      try {
        utils.logger.debug(`LOAD_USERS: ${url}`);
        const response = await axios.get(url);
        const items = utils.items_from_vocab(response.data);
        commit('ADD_USERS', { users: items });
        return items;
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
        return utils.items_from_vocab(response.data);
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
