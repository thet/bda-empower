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

    LOAD_USERS: ({ commit, state }, { force=false }) => {
      return new Promise((resolve, reject) => {
        if (!force && state.users.items.length) {
          utils.logger.debug('LOAD_USERS - use cache');
          return;
        }

        let url = `${config.baseURI}/@vocabularies/plone.app.vocabularies.Users`;
        axios
          .get(url)
          .then(response => {
            utils.logger.debug(`LOAD_USERS: ${url}`);
            commit('ADD_USERS', { users: response.data });
            resolve(response);
          })
          .catch(error => {
            utils.logger.error('Error while LOAD_USERS');
            utils.logger.error(error);
            reject(error);
          });
      });
    },

    LOAD_ALLOWED_USERS: async ({ commit, state }, { url }) => {
      return new Promise((resolve, reject) => {
        url = `${url}/@vocabularies/empower.allowed_users`;
        axios
          .get(url)
          .then(response => {
            utils.logger.debug(`LOAD_ALLOWED_USERS: ${url}`);
            commit('ADD_ALLOWED_USERS', { allowed_users: response.data });
            resolve(response);
          })
          .catch(error => {
            utils.logger.error('Error while LOAD_ALLOWED_USERS');
            utils.logger.error(error);
            reject(error);
          });
      });
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
