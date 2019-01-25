import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    context: null,
    tree: {},
  },

  getters: {
    get: (state, getters) => path => {
      let ob = state.tree[path];
      if (!ob) {

        this.actions.LOAD_CONTEXT(path);
      }
      return ob;
    }
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, { path, force=false }) => {

      if (!force && state[path]) {
        return;
      }

      let url = utils.makeURL(path);

      axios
        .get(url)
        .then(response => {
          commit('SET_CONTEXT', { context: response.data });
        })
        .catch(error => {
          console.log(`Error while LOAD_CONTEXT for context: ${url}`);
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