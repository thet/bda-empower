import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import config from '@/config';

Vue.use(Vuex);

axios.defaults.headers.common['Accept'] = 'application/json';

export default new Vuex.Store({
  state: {
    contentTree: {},
    context: null,
    auth_status: '',
    auth_token: localStorage.getItem('auth_token') || '',
    user: {}
  },

  getters : {
    isLoggedIn: state => !!state.auth_token,
    authStatus: state => state.auth_status
  },

  actions: {

    LOAD_CONTEXT({ commit }, { path }) {
      axios
        .get(config.baseURI + path || '')
        .then(response => {
          commit('SET_CONTEXT', { context: response.data });
        })
        .catch(error => console.log(error));
    },

    LOGIN({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        axios
          .post(
            config.baseURI + '/@login',
            {
              login: username,
              password: password,
            }
          )
          .then(response => {
            const token = response.data.token;
            localStorage.setItem('auth_token', token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            commit('AUTH_SUCCESS', token);
            resolve(response);
          })
          .catch(error => {
            commit('AUTH_ERROR');
            localStorage.removeItem('auth_token');
            reject(error);
          });
        });
    },

    LOGOUT({ commit }) {
      return new Promise((resolve, reject) => {
        commit('AUTH_LOGOUT');
        localStorage.removeItem('auth_token');
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }

  },

  mutations: {

    SET_CONTEXT: (state, { context }) => {
      state.context = context;
    },

    AUTH_REQUEST(state) {
      state.auth_status = 'loading';
    },

    AUTH_SUCCESS(state, token) {
      state.auth_status = 'success';
      state.auth_token = token;
    },

    AUTH_ERROR(state) {
      state.auth_status = 'error';
    },

    AUTH_LOGOUT(state) {
      state.auth_status = '';
      state.auth_token = '';
    }

  }

});
