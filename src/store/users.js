import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    users: {
      '@id': '',
      'items': []
    },
    allowed_users: {
      '@id': '',
      'items': []
    }
  },

  getters: {
    users: state => {
      return state.users.items.map(it => { return { 'text': it.title, 'value': it.token }; });
    },
    allowed_users: state => {
      return state.allowed_users.items.map(it => { return { 'text': it.title, 'value': it.token }; });
    }
  },

  actions: {

    async LOAD_USERS({ commit, state }, { force=false }) {
      if (!force && state.users.items.length) {
        utils.logger.debug('LOAD_USERS - use cache');
        return;
      }
      let url = `${config.baseURI}/@vocabularies/plone.app.vocabularies.Users`;
      try {
        utils.logger.debug(`LOAD_USERS: ${url}`);
        const response = await axios.get(url);
        commit('ADD_USERS', { users: response.data });
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
        commit('ADD_ALLOWED_USERS', { allowed_users: response.data });
      } catch (error) {
        utils.logger.error('Error while LOAD_ALLOWED_USERS');
        utils.logger.error(error);
      }
    },

 },

  mutations: {

    ADD_USERS: (state, { users }) => {
      state.users = users;
      utils.logger.debug('ADD_USERS');
    },

    ADD_ALLOWED_USERS: (state, { allowed_users }) => {
      state.allowed_users = allowed_users;
      utils.logger.debug(`ADD_ALLOWED_USERS ${allowed_users}`);
    }

  }
};
