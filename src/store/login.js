import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  state: {
    auth_status: '',
    auth_token: localStorage.getItem('auth_token') || undefined
  },

  getters: {
    isLoggedIn: state => !!state.auth_token
  },

  actions: {
    LOGIN: ({ commit }, { username, password }) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios
          .post(config.baseURI + '/@login', {
            login: username,
            password: password
          })
          .then(response => {
            const token = response.data.token;
            if (token) {
              localStorage.setItem('auth_token', token);
              commit('AUTH_SUCCESS', token);
            } else {
              commit('AUTH_ERROR');
            }
            resolve(response);
          })
          .catch(error => {
            localStorage.removeItem('auth_token');
            commit('AUTH_ERROR');
            reject(error);
          });
      });
    },

    LOGOUT: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.removeItem('auth_token');
          commit('AUTH_LOGOUT');
          resolve();
        } catch {
          reject();
        }
      });
    }
  },

  mutations: {
    AUTH_REQUEST: state => {
      state.auth_status = 'loading';
    },

    AUTH_SUCCESS: (state, token) => {
      state.auth_status = 'success';
      state.auth_token = token;
    },

    AUTH_ERROR: state => {
      state.auth_status = 'error';
    },

    AUTH_LOGOUT: state => {
      state.auth_status = '';
      state.auth_token = undefined;
    }
  }
};
