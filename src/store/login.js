import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  state: {
    auth_status: '',
    auth_token: sessionStorage.getItem('auth_token') || undefined,
    user: {},
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

              // Get current user details
              axios
                .get(`${config.baseURI}/@userinfo`)
                .then(response => {
                  commit('SET_CURRENT_USER', response.data);
                  resolve(response);
                })
                .catch(error => {
                  commit('AUTH_ERROR');
                  reject(error);
                });
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
    },

  }
};
