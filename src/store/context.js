import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    items: [],
    current_context: {
      '@components': {},
      '@id': '',
      '@type': '',
      'UID': '',
      '_loaded': null,
      'allow_discussion': false,
      'contributors': [],
      'created': null,
      'creators': [],
      'experts_assigned': '',
      'id': '',
      'is_folderish': true,
      'items': '',
      'items_total': 0,
      'layout': '',
      'modified': null,
      'parent': '',
      'review_state': '',
      'rights': '',
      'text': '',
      'title': '',
      'version': '',
      'workspace': ''
    },
    current_thread: {
      '@id': '',
      'items': [],
      'start_path': ''
    }
  },

  getters: {
    contexttree: state => {
      let tree = {};
      for (let item of state.items) {
        tree[item['@id']] = item;
      }
      return tree;
    }
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, {
      path='',
      url='',
      workspace=undefined,
      set_current=true,
      force=false
    }) => {

      url = url || utils.makeURL(path);
      url = workspace ? `${url}?workspace=${workspace}` : url;

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
      commit('CLEAR_CURRENT_THREAD');
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
    },

    PATCH: ({ commit, state }, { url, model }) => {

      axios
        .patch(
          url,
          headers={'Prefer': 'return=representation'}  // return the updated context from server.
        )
        .then(response => {
          console.log(`PATCH: ${url}`);
          commit('UPDATE_CONTEXT', { context: response.data });
        })
        .catch(error => {
          console.log(`Error while PATCH for context: ${url}`);
          console.log(error);
        });
    },

  },

  mutations: {

    ADD_CONTEXT: (state, { context }) => {
      context._loaded = new Date();
      state.items.push(context);
      console.log('ADD_CONTEXT');
    },

    UPDATE_CONTEXT: (state, { context }) => {
      context._loaded = new Date();
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i]['@id'] === context['@id']) {
          state.items[i] = context;
        }
      }
      console.log(`UPDATE_CONTEXT: ${context['@id']}`);
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      console.log('SET_CURRENT_CONTEXT');
      state.current_context = context;
    },

    SET_CURRENT_THREAD: (state, { thread }) => {
      console.log('SET_CURRENT_THREAD');
      state.current_thread = thread;
    },

    CLEAR_CURRENT_THREAD: (state) => {
      state.current_thread = {};
    }

  }
};
