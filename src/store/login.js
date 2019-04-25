import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  state: {
    auth_status: '',
    auth_token: localStorage.getItem('auth_token') || undefined,
    user_fullname: localStorage.getItem('user_fullname') || undefined,
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
              commit('AUTH_SUCCESS', token);
              console.log(`LOGIN ${username}`);
              resolve(response);
            } else {
              commit('AUTH_ERROR');
              reject(error);
            }
          })
          .catch(error => {
            commit('AUTH_ERROR');
            reject(error);
          });
      });
    },

    LOGIN_RENEW: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios
          .post(config.baseURI + '/@login-renew')
          .then(response => {
            const token = response.data.token;
            if (token) {
              commit('AUTH_SUCCESS', token);
              console.log('LOGIN_RENEW');
              resolve(response);
            } else {
              commit('AUTH_ERROR');
              reject(error);
            }
          })
          .catch(error => {
            commit('AUTH_ERROR');
            reject(error);
          });
      });
    },

    LOGOUT: ({ commit }) => {
      return new Promise((resolve, reject) => {
        try {
          commit('AUTH_LOGOUT');
          console.log(`LOGOUT ${username}`);
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
      localStorage.setItem('auth_token', token);
    },

    AUTH_ERROR: state => {
      state.auth_status = 'error';
      state.auth_token = undefined;
      localStorage.removeItem('auth_token');
    },

    AUTH_LOGOUT: state => {
      state.auth_status = '';
      state.auth_token = undefined;
      localStorage.removeItem('auth_token');
    }
  }
};
