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
import qs from 'qs';


function get_default_state() {
  return {
    items: {},
    current_context: new config.GenericContextModel({}),
    current_case: new config.GenericContextModel({})
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  actions: {
    async LOAD_CONTEXT({ dispatch, commit, state }, {
      path='',
      url='',
      set_current=false,
      set_case=false,
      force=false
    }) {
      path = path ? path : utils.makePath(url);

      let context = null;

      if (!force && state.items[path]) {
        utils.logger.debug(`LOAD_CONTEXT - using cache: ${path}`);
        context = state.items[path];
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: context });
          if (context.current_case) {
            dispatch('LOAD_CONTEXT', { url: context.current_case, set_case: true });
          }
        }
        if (set_case) {
          commit('SET_CURRENT_CASE', { context: context });
        }
        return context;
      }

      try {
        utils.logger.debug(`LOAD_CONTEXT: ${path}`);
        const response = await axios.get(path, {
          params: {
            metadata_fields: [
              'workspace',
              'workspace_root',
              'UID',
              'created',
              'modified'
            ]
          },
          paramsSerializer: params => {
            // serialzie arrays for Zope to recognize them as such.
            // See: https://stackoverflow.com/a/51444749/1337474
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
        });
        context = response.data;
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
        context['@id'] = utils.cleanURL(context['@id']);

        commit('ADD_CONTEXT', { context: context });
        if (set_current) {
          commit('SET_CURRENT_CONTEXT', { context: context });
          if (context.current_case) {
            dispatch('LOAD_CONTEXT', { url: context.current_case, set_case: true });
          }
        }
        if (set_case) {
          commit('SET_CURRENT_CASE', { context: context });
        }
      } catch (error) {
        utils.logger.error(`Error while LOAD_CONTEXT for: ${url}`);
        utils.logger.error(error);
      }
      return context;
    },

    async PATCH({}, { url=null, context=null, model=null }) {
      let ret;
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
      const path = utils.makePath(url);
      try {
        utils.logger.debug(`PATCH: ${path}`);
        const response = await axios.patch(
          path,
          model
        );
        ret = response.data;
      } catch (error) {
        utils.logger.error(`Error while PATCH for context: ${path}`);
        utils.logger.error(error);
      }
      return ret;
    },

    async POST({}, { parent_url, context }) {
      let ret;
      let model = JSON.parse(JSON.stringify(context));
      // Clean the data with what we want need to save
      let post_model = new config[`${context['@type']}Model`]({});
      for (let attr in model) {
        if (!(attr in post_model)) {
          delete model[attr];
        }
      }

      const parent_path = utils.makePath(parent_url);
      try {
        utils.logger.debug(`POST at: ${parent_path}`);
        const response = await axios.post(
          parent_path,
          model
        );
        ret = response.data;
      } catch (error) {
        utils.logger.error(`Error while POST at context: ${parent_path}`);
        utils.logger.error(error);
      }
      return ret;
    },

    async DELETE({}, { context }) {
      const path = utils.makePath(context['@id']);
      let ret = null;
      try {
        utils.logger.debug(`DELETE at: ${path}`);
        const response = await axios.delete(path);
        ret = response.data;
      } catch (error) {
        utils.logger.error(`Error while DELETE at context: ${path}`);
        utils.logger.error(error);
      }
      return ret;
    },

    async LOAD_FILES({}, { url }) {
      const path = utils.makePath(url);
      try {
        const response = await axios.get(path);
        return response.data.items.filter(it => it['@type'] === 'Image' || it['@type'] === 'File');
      } catch (error) {
        utils.logger.error(`Error while LOAD_FILES for: ${path}`);
        utils.logger.error(error);
      }
    },

    async SAVE_FILES({}, { url, files }) {
      const path = utils.makePath(url);
      try {
        utils.logger.debug(`SAVE_FILES at: ${path}`);
        for (let file of files) {
          const type_ = utils.image_or_file(file.file);
          const file_data = {
            data: file.src.split(',')[1], // strip off metadata
            encoding: 'base64',
            filename: file.file.name,
            'content-type': file.file.type
          };
          const file_model = {
            title: file.file.name,
            '@type': utils.capitalize(type_)
          }
          file_model[type_] = file_data;
          await axios.post(path, file_model);
        }
      } catch (error) {
        utils.logger.error(`Error while SAVE_FILES at: ${path}`);
        utils.logger.error(error);
      }
    },

    async DELETE_FILE({}, { url }) {
      const path = utils.makePath(url);
      try {
        utils.logger.debug(`DELETE_FILE at: ${path}`);
        await axios.delete(path);
      } catch (error) {
        utils.logger.error(`Error while DELETE_FILE at: ${path}`);
        utils.logger.error(error);
      }
    },

    async RESET_STATE({ commit }) {
      commit('RESET_STATE');
    },

  },

  mutations: {

    RESET_STATE(state) {
      Object.assign(state, get_default_state());
    },

    ADD_CONTEXT: (state, { context }) => {
      context._loaded = new Date();
      Vue.set(state.items, utils.makePath(context['@id']), context);
      utils.logger.debug(`ADD_CONTEXT: ${context['@id']}`);
    },

    SET_CURRENT_CONTEXT: (state, { context }) => {
      state.current_context = context;
      utils.logger.debug(`SET_CURRENT_CONTEXT: ${context['@id']}`);
    },

    SET_CURRENT_CASE: (state, { context }) => {
      state.current_case = context;
      utils.logger.debug(`SET_CURRENT_CASE: ${context['@id']}`);
    }

  }
};
