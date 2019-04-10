import Vue from 'vue';
import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    items: {},
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
    workspace_threads: {
      'case': {}, //new config.ThreadModel(),
      'analysis': {}, //new config.ThreadModel(),
      'strategy': {}, //new config.ThreadModel(),
      'action': {}, //new config.ThreadModel(),
      'evaluation': {} // new config.ThreadModel()
    }
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, {
      path='',
      url='',
      workspace=undefined,
      set_current=false,
      force=false
    }) => {

      url = url || utils.makeURL(path);
      url = workspace ? `${url}?workspace=${workspace}` : url;
      path = path || utils.makePath(url);

      if (!force && state.items[path]) {
        console.log(`LOAD_CONTEXT - using cache: ${path}`);
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: state.items[path] });
        }
        return;
      }

      axios
        .get(url)
        .then(response => {
          console.log(`LOAD_CONTEXT: ${url}`);

          let context = response.data;
          context.items = context.items.map(it => {
            switch (it['@type']) {
              case 'Folder':
                it.icon = 'folder';
                break;
              case 'Cases':
                it.icon = 'view_list';
                break;
              case 'Case':
                it.icon = 'dashboard';
                break;
              case 'Contribution':
                it.icon = 'comment';
                break;
              default:
                it.icon = 'chat_bubble';
            }
            return it;
          });

          commit('ADD_CONTEXT', { context: context });
          if (set_current) {
            commit('SET_CURRENT_CONTEXT', { context: context });
          }
        })
        .catch(error => {
          console.log(`Error while LOAD_CONTEXT for context: ${url}`);
          console.log(error);
        });
    },

    LOAD_THREAD: ({ commit, state }, { url, workspace=undefined }) => {
      commit(
        'CLEAR_THREAD',
        { workspace: workspace });
      axios
        .get(
          url,
          { params: { workspace: workspace }}
        )
        .then(response => {
          console.log(`LOAD_THREAD: ${url}, workspace ${workspace}`);
          commit(
            'SET_THREAD',
            {
              thread: response.data,
              workspace: workspace
            });
        })
        .catch(error => {
          console.log(`Error while LOAD_THREAD at: ${url}`);
          console.log(error);
        });
    },

    PATCH: ({ dispatch, commit, state }, { url=null, context=null, model=null }) => {

      if (context) {
        url = context['@id'];
        model = JSON.parse(JSON.stringify(context));

        // Clean the data with what we want need to save
        let patch_model = new config[`${context['@type']}Model`]({});
        for (let attr in model) {
          if (!(attr in patch_model)) {
            delete model[attr];
          }
        }
      }

      axios
        .patch(
          url,
          model
          // {headers: {'Prefer': 'return=representation'}},  // return the updated context from server.
        )
        .then(response => {
          console.log(`PATCH: ${url}`);
          dispatch('LOAD_CONTEXT', { url: url, force: true });
          // commit('ADD_CONTEXT', { context: response.data });
        })
        .catch(error => {
          console.log(`Error while PATCH for context: ${url}`);
          console.log(error);
        });
    },

    POST: ({ dispatch, commit, state }, { url, context }) => {

      let model = JSON.parse(JSON.stringify(context));
      // Clean the data with what we want need to save
      let post_model = new config[`${context['@type']}Model`]({});
      for (let attr in model) {
        if (!(attr in post_model)) {
          delete model[attr];
        }
      }

      axios
        .post(
          url,
          model
          // {headers: {'Prefer': 'return=representation'}},  // return the updated context from server.
        )
        .then(response => {
          console.log(`POST at: ${url}`);
          dispatch('LOAD_CONTEXT', { url: url, force: true });
          // commit('ADD_CONTEXT', { context: response.data });
        })
        .catch(error => {
          console.log(`Error while POST at context: ${url}`);
          console.log(error);
        });
    },
  },

  mutations: {

    ADD_CONTEXT: (state, { context }) => {
      context._loaded = new Date();
      Vue.set(state.items, utils.makePath(context['@id']), context);
      console.log(`ADD_CONTEXT: ${context['@id']}`);
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      state.current_context = context;
      console.log(`SET_CURRENT_CONTEXT: ${context['@id']}`);
    },

    SET_THREAD: (state, { thread, workspace }) => {
      Vue.set(state.workspace_threads, workspace, thread);
      console.log(`SET_THREAD - workspace ${workspace}`);
    },

    CLEAR_THREAD: (state, { workspace=undefined }) => {
      if (! workspace) {
        state.workspace_threads = {};
        console.log('CLEAR_THREAD - all threads');
      } else {
        Vue.set(state.workspace_threads, workspace, {})
        console.log(`CLEAR_THREAD - workspace ${workspace}`);
      }
    }

  }
};
