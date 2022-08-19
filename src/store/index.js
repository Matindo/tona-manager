import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tournament: {},
    tournaments: []
  },
  getters: {
    TOURNAMENT: function (state) {
      return state.tournament
    },
    TOURNAMENTS: function (state) {
      return state.tournaments
    }
  },
  mutations: {
    SET_TOURN: function (state, payload) {
      state.tournament = payload
    },
    SET_TOURNS: function (state, payload) {
      state.tournaments = payload
    },
    END_TOURN: function (state) {
      state.tournament.status = 'Completed'
    }
  },
  actions: {
    SET_TOURNAMENT: function (context, payload) {
      context.commit('SET_TOURN', payload)
    },
    SET_TOURNAMENTS: function (context, payload) {
      context.commit('SET_TOURNS', payload)
    },
    END_TOURNAMENT: function (context) {
      context.commit('END_TOURN')
    }
  },
  modules: {
  }
})
