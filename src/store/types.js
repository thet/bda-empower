import axios from 'axios';

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

    LOAD_TYPE: ({ commit, state }, { url, type, force=false }) => {
      url = `${url}/@types/${type}`;

      if (!force && state.types[type]) {
        console.log(`ALREADY LOADED TYPE: ${type}`);
        return;
      }

      axios
        .get(url)
        .then(response => {
          console.log(`LOADED TYPE: ${url}`);
          commit('ADD_TYPE', { type: type, schema: response.data });
        })
        .catch(error => {
          console.log(`Error while LOAD_TYPE ${url}`);
          console.log(error);
        });
    }

 },

  mutations: {

    ADD_TYPE: (state, { type, schema }) => {
      state.types.push({
        type: type,
        schema: schema,
        _loaded: new Date()
      });
      console.log(`ADD_TYPE ${type}`);
    },

    CLEAR_TYPES: (state) => {
      state.types = [];
    }

  }
};
