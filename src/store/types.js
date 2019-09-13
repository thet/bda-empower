import axios from 'axios';
import utils from '@/utils';

export default {

  namespaced: true,

  state: {
    types: []
  },

  getters: {
    types: state => {
      let types = {};
      for (let type of state.types) {
        types[type['type']] = type;
      }
      return types;
    }
  },

  actions: {

    async LOAD_TYPE({ commit, state }, { url, type, force=false }) {
      url = `${url}/@types/${type}`;
      if (!force && state.types[type]) {
        utils.logger.debug(`LOAD_TYPE - using cache: ${type}`);
        return;
      }
      try {
        utils.logger.debug(`LOAD_TYPE: ${type}, ${url}`);
        const response = await axios.get(url);
        commit('ADD_TYPE', { type: type, schema: response.data });
      } catch (error) {
        utils.logger.error(`Error while LOAD_TYPE ${url}`);
        utils.logger.error(error);
      }
    },

 },

  mutations: {

    ADD_TYPE: (state, { type, schema }) => {
      state.types.push({
        type: type,
        schema: schema,
        _loaded: new Date()
      });
      utils.logger.debug(`ADD_TYPE ${type}`);
    },

    CLEAR_TYPES: (state) => {
      state.types = [];
      utils.logger.debug(`CLEAR_TYPE ${type}`);
    }

  }

};
