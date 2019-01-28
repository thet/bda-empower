import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    current_context: {},
    current_thread: {},
    tree: {},
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, { path='', url='', set_current=true, force=false }) => {

      url = url || utils.makeURL(path);

      if (!force && state.tree[url]) {
        console.log(`ALREADY LOADED: ${url}`);
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: state.tree[url] });
        }
        return;
      }

      axios
        .get(url)
        .then(response => {
          console.log(`LOADED: ${url}`);
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
          console.log(`LOADED THREAD: ${url}`);
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
      console.log('SET_CONTEXT');
      state.tree[context['@id']] = context;
      state.tree[context['@id']]._loaded = new Date();
      // assign new object, otherwise it won't be reactive.
      // TODO: change structure to list, as this isn't efficient
      state.tree = JSON.parse(JSON.stringify(state.tree));
    },

    CLEAR_TREE: (state) => {
      state.tree = {};
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      console.log('SET_CURRENT_CONTEXT');
      state.current_context = context;
    },

    SET_CURRENT_THREAD: (state, { thread }) => {
      console.log('SET_CURRENT_THREAD');
      state.current_thread = thread;
    }

  }
};
