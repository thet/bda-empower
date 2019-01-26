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
    LOAD_CONTEXT: ({ commit, state }, { path='', url='', expand_thread=false, force=false }) => {

      if (!expand_thread && !force && state.tree[path]) {
        return;
      }

      url = url || (path && utils.makeURL(path));
      if (expand_thread) {
        url = `${url}?expand=thread`;
      }

      axios
        .get(url)
        .then(response => {
          commit('SET_CONTEXT', { context: response.data, expand_thread: expand_thread });
        })
        .catch(error => {
          console.log(`Error while LOAD_CONTEXT for context: ${url}`);
          console.log(error);
        });
    },

    LOAD_THREAD: ({ commit, state }, { url, force=false }) => {

      if (force) {
        commit('CLEAR_TREE');
      }

      axios
        .get(url)
        .then(response => {
          commit('SET_TREE', { tree: response.data });
        })
        .catch(error => {
          console.log(`Error while LOAD_TREE at: ${url}`);
          console.log(error);
        });
    }

  },

  mutations: {
    SET_CONTEXT: (state, { context, expand_thread=false }) => {
      if (expand_thread) {
        // TODO: rename to workspace and hold the current workspace here.
        state.context = context;
      }
      state.tree[context['@id']] = context;
      state.tree[context['@id']]._loaded = new Date();
    },
    SET_TREE: (state, { tree }) => {
      for (item of tree) {
        if (!state.tree[item['@id']]) {
          state.tree[item['@id']] = item;
        }
      }
    },
    CLEAR_TREE: (state) => {
      state.tree = {};
    }
  }
};
