import axios from 'axios';
import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    messages: []
  },

  actions: {

    ADD_MESSAGE: ({ commit, state }, { title, text, type }) => {
      url = `${url}/@types/${type}`;

      if (!force && state.types[type]) {
        utils.logger.debug(`LOAD_TYPE - using cache: ${type}`);
        return;
      }

      axios
        .get(url)
        .then(response => {
          utils.logger.debug(`LOAD_TYPE: ${type}, ${url}`);
          commit('ADD_TYPE', { type: type, schema: response.data });
        })
        .catch(error => {
          utils.logger.error(`Error while LOAD_TYPE ${url}`);
          utils.logger.error(error);
        });
    }

 },

  mutations: {

    ADD_MESSAGE: (state, { title, text, type }) => {
      state.messages.push({
        title: title,
        text: text,
        type: type,
      });
      utils.logger.debug(`ADD_MESSAGE ${title} ${text} ${type}`);
    },

    REMOVE_OLDEST_MESSAGE: (state) => {
      let msg = state.shift();
      utils.logger.debug(`REMOVE OLDEST MESSAGE: ${msg.title} ${msg.text} ${msg.type}`);
    },

    CLEAR_MESSAGES: (state) => {
      state.messages = [];
      utils.logger.debug(`CLEAR MESSAGES`);
    }

  }
};
