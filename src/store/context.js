import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    items: [],
    current_context: {},
    current_thread: {}
  },

  getters: {
    contextmap: state => {
      let tree = {};
      for (item of state.items) {
        tree[item['@id']] = item;
      }
      return tree;
    }
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, { path='', url='', set_current=true, force=false }) => {

      url = url || utils.makeURL(path);

      if (!force && state.items[url]) {
        console.log(`ALREADY LOADED: ${url}`);
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: state.items[url] });
        }
        return;
      }

      axios
        .get(url)
        .then(response => {
          console.log(`LOADED: ${url}`);
          commit('ADD_CONTEXT', { context: response.data });
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

    ADD_CONTEXT: (state, { context }) => {
      console.log('ADD_CONTEXT');
      context._loaded = new Date();
      state.items.push(context);
    },

    CLEAR_TREE: (state) => {
      state.items = {};
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
