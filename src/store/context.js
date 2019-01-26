import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    current_context: null,
    current_thread: null,
    tree: {},
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, { path='', url='', set_current=true, force=false }) => {

      path = path || utils.makePath(url);
      url = url || utils.makeURL(path);

      if (!force && state.tree[path]) {
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: state.tree[path] });
        }
        return;
      }

      axios
        .get(url)
        .then(response => {
          commit('SET_CONTEXT', { context: response.data });
          if (set_current) {
            commit('SET_CURRENT_CONTEXT', { context: response.data });
          }
        })
        .catch(error => {
          console.log(`Error while LOAD_CONTEXT for context: ${url}`);
          console.log(error);
        });
    },

    LOAD_THREAD: ({ commit, state }, { url }) => {
      axios
        .get(url)
        .then(response => {
          commit('SET_CURRENT_THREAD', { thread: response.data });
        })
        .catch(error => {
          console.log(`Error while LOAD_THREAD at: ${url}`);
          console.log(error);
        });
    }

  },

  mutations: {

    SET_CONTEXT: (state, { context }) => {
      state.tree[context['@id']] = context;
      state.tree[context['@id']]._loaded = new Date();
    },

    CLEAR_TREE: (state) => {
      state.tree = {};
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      state.current_context = context;
    },

    SET_CURRENT_THREAD: (state, { thread }) => {
      state.current_thread = thread;
    }

  }
};
