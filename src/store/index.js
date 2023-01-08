import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tournament: {},
    tournaments: [],
    user: { live: false },
    searchResults: [],
    teams: []
  },
  getters: {
    TOURNAMENT: function (state) {
      return state.tournament
    },
    TOURNAMENTS: function (state) {
      return state.tournaments
    },
    USER: function (state) {
      return state.user
    },
    SEARCH_RESULTS: function (state) {
      return state.searchResults
    },
    TEAMS: function (state) {
      return state.teams
    }
  },
  mutations: {
    SET_TOURN: function (state, payload) {
      state.tournament = payload
    },
    SET_TOURNS: function (state, payload) {
      state.tournaments = payload
    },
    SET_SEARCH_RESULTS: function (state, payload) {
      state.searchResults = payload
    },
    SET_TEAMS: function (state, payload) {
      state.teams = payload
    },
    END_TOURN: function (state) {
      state.tournament.status = 'Completed'
    },
    LOGOUT_USER: function (state) {
      state.user = { live: false }
    }
  },
  actions: {
    SET_TOURNAMENT: function (context, payload) {
      context.commit('SET_TOURN', payload)
    },
    SET_TOURNAMENTS: function (context, payload) {
      context.commit('SET_TOURNS', payload)
    },
    SET_SEARCH_RESULTS: function (context, payload) {
      context.commit('SET_SEARCH_RESULTS', payload)
    },
    SET_TEAMS: function (context, payload) {
      context.commit('SET_TEAMS', payload)
    },
    END_TOURNAMENT: function (context) {
      context.commit('END_TOURN')
    },
    SIGNOUT_USER: function (context) {
      context.commit('LOGOUT_USER')
    }
  },
  modules: {
  }
})
