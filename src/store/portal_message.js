import utils from '@/utils';


function get_default_state() {
  return {
    messages: []
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  actions: {
    async RESET_STATE({ commit }) {
      commit('RESET_STATE');
    },
  },

  mutations: {

    RESET_STATE(state) {
      Object.assign(state, get_default_state());
    },

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
