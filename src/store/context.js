import axios from 'axios';
import config from '@/config';

export default {
  namespaced: true,

  state: {
    context: null,
    tree: {},
  },

  getters: {
    get: (state, getters) => path => {
      let ob = state.tree.get(path);
      if (!ob) {
        this.actions.LOAD_CONTEXT(path);
      }
      return ob;
    }
  },

  actions: {
    LOAD_CONTEXT: ({ commit }, { path }) => {
      axios
        .get(config.baseURI + path || '')
        .then(response => {
          commit('SET_CONTEXT', { context: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  mutations: {
    SET_CONTEXT: (state, { context }) => {
      state.context = context;
      state.tree[context['@id']] = context;
    }
  }
};
