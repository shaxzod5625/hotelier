import Vue from 'vue'
import Vuex from 'vuex'
import api from '../service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: [],
  },
  mutations: {
    SET_USERS(state, user) {
      state.user = user;
    }
  },
  actions: {
    async loadUsers({commit}) {
      let response = await api().get('/user/login');
      let user = response.data.data;
      commit('SET_USERS', user.map(u => u.attributes))
    }
  },
  modules: {
  }
})
