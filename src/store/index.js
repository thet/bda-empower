import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Login from './login';
import Context from './context';
import Types from './types';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: Login,
    context: Context,
    types: Types
  }
});

// AXIOS Config
axios.defaults.headers.common['Accept'] = 'application/json';

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    const auth_token = localStorage.getItem('auth_token');
    if (auth_token) {
      config.headers['Authorization'] = `Bearer ${auth_token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
