import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

const base_uri = 'http://localhost:8080/Plone';

export default new Vuex.Store({
  state: {
    contentTree: {},
    context: null,
  },

  getters: {},

  actions: {

    LOAD_CONTEXT: function ({ commit }, { path }) {
      axios.get(
        base_uri + path || '',
        { headers: { 'Accept': 'application/json'}}
      )
      .then(response => {
        commit('SET_CONTEXT', { context: response.data });
      })
      .catch(error => console.log(error));
    },

  },

  mutations: {

    SET_CONTEXT: (state, { context }) => {
      state.context = context;
    },

  },

});
