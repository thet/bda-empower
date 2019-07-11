import axios from 'axios';

export default {
  namespaced: true,

  state: {
    messages: []
  },

  actions: {

    ADD_MESSAGE: ({ commit, state }, { title, text, type }) => {
      url = `${url}/@types/${type}`;

      if (!force && state.types[type]) {
        console.log(`LOAD_TYPE - using cache: ${type}`);
        return;
      }

      axios
        .get(url)
        .then(response => {
          console.log(`LOAD_TYPE: ${type}, ${url}`);
          commit('ADD_TYPE', { type: type, schema: response.data });
        })
        .catch(error => {
          console.log(`Error while LOAD_TYPE ${url}`);
          console.log(error);
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
      console.log(`ADD_MESSAGE ${title} ${text} ${type}`);
    },

    REMOVE_OLDEST_MESSAGE: (state) => {
      let msg = state.shift();
      console.log(`REMOVE OLDEST MESSAGE: ${msg.title} ${msg.text} ${msg.type}`);
    },

    CLEAR_MESSAGES: (state) => {
      state.messages = [];
      console.log(`CLEAR MESSAGES`);
    }

  }
};
