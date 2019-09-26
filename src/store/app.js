import axios from 'axios';
import utils from '@/utils';


function get_default_state() {
  return {
    app_refresh_key: Date.now()
  };
}

export default {

  namespaced: true,

  state: get_default_state(),

  actions: {

    RESET_STATE({ commit }) {
      commit('RESET_STATE');
    },

 },

  mutations: {

    RESET_STATE(state) {
      Object.assign(state, get_default_state());
    },

  }

};

