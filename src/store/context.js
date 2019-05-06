import Vue from 'vue';
import axios from 'axios';
import config from '@/config';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    items: {},
    current_context: new config.GenericContextModel({}),
    current_case: new config.GenericContextModel({})
  },

  actions: {
    LOAD_CONTEXT: ({ commit, state }, {
      path='',
      url='',
      set_current=false,
      force=false
    }) => {
      return new Promise((resolve, reject) => {
        url = url || utils.makeURL(path);
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
            resolve(response);
          })
          .catch(error => {
            console.log(`Error while LOAD_CONTEXT for context: ${url}`);
            console.log(error);
            reject(error);
          });
      });
    },

    PATCH: ({ dispatch, commit, state }, { url=null, context=null, model=null }) => {
      return new Promise((resolve, reject) => {
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
            resolve(response);
          })
          .catch(error => {
            console.log(`Error while PATCH for context: ${url}`);
            console.log(error);
            reject(error);
          });
      });
    },

    POST: ({ dispatch, commit, state }, { parent_url, context }) => {
      return new Promise((resolve, reject) => {
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
            parent_url,
            model
            // {headers: {'Prefer': 'return=representation'}},  // return the updated context from server.
          )
          .then(response => {
            console.log(`POST at: ${parent_url}`);
            dispatch('LOAD_CONTEXT', { url: parent_url, force: true });
            // commit('ADD_CONTEXT', { context: response.data });
            resolve(response);
          })
          .catch(error => {
            console.log(`Error while POST at context: ${parent_url}`);
            console.log(error);
            reject(error);
          });
      });
    }

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
      if (context['@type'] == 'Case') {
        state.current_case = context;
        console.log(`SET_CURRENT_CONTEXT - Case: ${context['@id']}`);
      }
    }

  }
};
