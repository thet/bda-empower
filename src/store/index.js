import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Login from './login';
import Context from './context';

Vue.use(Vuex);

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_token');

axios.defaults.headers.common['Accept'] = 'application/json';

export default new Vuex.Store({

  modules: {
    login: Login,
    context: Context
  }

});
