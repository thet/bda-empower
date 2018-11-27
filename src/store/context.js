import axios from 'axios';
import config from '@/config';

export default {

  namespaced: true,

  state: {
    context: null,
  },

  actions: {

    LOAD_CONTEXT: ({ commit }, { path }) => {
      axios
        .get(config.baseURI + path || '')
        .then(response => {
          commit('SET_CONTEXT', { context: response.data });
        })
        .catch(error => console.log(error));
    },

  },

  mutations: {

    SET_CONTEXT: (state, { context }) => {
      state.context = context;
    }

  }

};
