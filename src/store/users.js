import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  state: {
    users: {
      '@id': '',
      'items': []
    },
    parent_allowed: {
      '@id': '',
      'items': []
    }
  },

  getters: {
    users: state => {
      return state.users.items.map(it => { return { 'text': it.title, 'value': it.token }; });
    },
    parent_allowed: state => {
      return state.parent_allowed.items.map(it => { return { 'text': it.title, 'value': it.token }; });
    }
  },

  actions: {

    LOAD_USERS: ({ commit, state }, { force=false }) => {
      return new Promise((resolve, reject) => {
        if (!force && state.users.items.length) {
          console.log('LOAD_USERS - use cache');
          return;
        }

        let url = `${config.baseURI}/@vocabularies/plone.app.vocabularies.Users`;
        axios
          .get(url)
          .then(response => {
            console.log(`LOAD_USERS: ${url}`);
            commit('ADD_USERS', { users: response.data });
            resolve(response);
          })
          .catch(error => {
            console.log('Error while LOAD_USERS');
            console.log(error);
            reject(error);
          });
      });
    },

    LOAD_PARENT_ALLOWED: async ({ commit, state }, { url }) => {
      return new Promise((resolve, reject) => {
        url = `${url}/@vocabularies/empower.parent_allowed_users`;
        axios
          .get(url)
          .then(response => {
            console.log(`LOAD_PARENT_ALLOWED: ${url}`);
            commit('ADD_PARENT_ALLOWED', { parent_allowed: response.data });
            resolve(response);
          })
          .catch(error => {
            console.log('Error while PARENT_ALLOWED');
            console.log(error);
            reject(error);
          });
      });
    },

 },

  mutations: {

    ADD_USERS: (state, { users }) => {
      state.users = users;
      console.log('ADD_USERS');
    },

    ADD_PARENT_ALLOWED: (state, { parent_allowed }) => {
      state.parent_allowed = parent_allowed;
      console.log('ADD_PARENT_ALLOWED');
    }

  }
};

