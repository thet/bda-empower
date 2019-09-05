import {
  mdiFolder,
  mdiViewList,
  mdiViewDashboard,
  mdiComment,
  mdiForum
} from '@mdi/js';
import axios from 'axios';
import config from '@/config';
import utils from '@/utils';
import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    items: {},
    current_context: new config.GenericContextModel({}),
    current_case: new config.GenericContextModel({})
  },

  actions: {
    async LOAD_CONTEXT({ commit, state }, {
      path='',
      url='',
      set_current=false,
      force=false
    }) {
      url = url || utils.makeURL(path);
      path = path || utils.makePath(url);

      if (!force && state.items[path]) {
        utils.logger.debug(`LOAD_CONTEXT - using cache: ${path}`);
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: state.items[path] });
        }
        return;
      }

      try {
        utils.logger.debug(`LOAD_CONTEXT: ${url}`);
        const response = await axios.get(url);
        let context = response.data;
        context.workspace = utils.getattr(context.workspace, 'token', '');
        context.items = context.items.map(it => {
          switch (it['@type']) {
            case 'Folder':
              it.icon = mdiFolder;
              break;
            case 'Cases':
              it.icon = mdiViewList;
              break;
            case 'Case':
              it.icon = mdiViewDashboard;
              break;
            case 'Contribution':
              it.icon = mdiComment;
              break;
            default:
              it.icon = mdiForum;
          }
          return it;
        });

        commit('ADD_CONTEXT', { context: context });
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: context });
        }
      } catch (error) {
        utils.logger.error(`Error while LOAD_CONTEXT for: ${url}`);
        utils.logger.error(error);
      }
    },

    async PATCH({ dispatch, commit, state }, { url=null, context=null, model=null }) {
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
      try {
        utils.logger.debug(`PATCH: ${url}`);
        const response = await axios.patch(
          url,
          model
          // {headers: {'Prefer': 'return=representation'}},  // return the updated context from server.
        );
        dispatch('LOAD_CONTEXT', { url: url, force: true });
        // commit('ADD_CONTEXT', { context: response.data });
      } catch (error) {
        utils.logger.error(`Error while PATCH for context: ${url}`);
        utils.logger.error(error);
      }
    },

    async POST({ dispatch, commit, state }, { parent_url, context }) {
      let model = JSON.parse(JSON.stringify(context));
      // Clean the data with what we want need to save
      let post_model = new config[`${context['@type']}Model`]({});
      for (let attr in model) {
        if (!(attr in post_model)) {
          delete model[attr];
        }
      }

      try {
        utils.logger.debug(`POST at: ${parent_url}`);
        const response = await axios.post(
          parent_url,
          model
          // {headers: {'Prefer': 'return=representation'}},  // return the updated context from server.
        );
        dispatch('LOAD_CONTEXT', { url: parent_url, force: true });
        commit('ADD_CONTEXT', { context: response.data });
      } catch (error) {
        utils.logger.error(`Error while POST at context: ${parent_url}`);
        utils.logger.error(error);
      }
    },

  },

  mutations: {

    ADD_CONTEXT: (state, { context }) => {
      context._loaded = new Date();
      Vue.set(state.items, utils.makePath(context['@id']), context);
      utils.logger.debug(`ADD_CONTEXT: ${context['@id']}`);
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      state.current_context = context;
      utils.logger.debug(`SET_CURRENT_CONTEXT: ${context['@id']}`);
      if (context['@type'] == 'Case') {
        state.current_case = context;
        utils.logger.debug(`SET_CURRENT_CONTEXT - Case: ${context['@id']}`);
      }
    }

  }
};
