import utils from '@/utils';

export default {
  namespaced: true,

  state: {
    messages: []
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
