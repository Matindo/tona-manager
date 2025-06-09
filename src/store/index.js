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
    ADD_TOURN: function (state, tourn) {
      state.tournaments.push(tourn)
    },
    SET_TOURNS: function (state, payload) {
      state.tournaments = payload
    },
    SET_SEARCH_RESULTS: function (state, payload) {
      state.searchResults = payload
    },
    SET_TEAMS: function (state, payload) {
      state.teams = payload
      localStorage.setItem('tourn_teams', JSON.stringify(state.teams))
    },
    END_TOURN: function (state) {
      state.tournament.status = 'Completed'
    },
    LOGOUT_USER: function (state) {
      state.user = { live: false }
    },
    SAVE_DATA: function (state) {
      localStorage.setItem('tournaments', JSON.stringify(state.tournaments))
      localStorage.setItem('teams', JSON.stringify(state.teams))
    }
  },
  actions: {
    INITIALIZE: function (context) {
      if (localStorage.getItem('tournaments')) {
        const tourns = JSON.parse(localStorage.getItem('tournaments'))
        context.commit('SET_TOURNS', tourns)
      }
      if (localStorage.getItem('teams')) {
        const teams = JSON.parse(localStorage.getItem('teams'))
        context.commit('SET_TEAMS', teams)
      }
    },
    SET_TOURNAMENT: function (context, payload) {
      context.commit('SET_TOURN', payload)
    },
    CREATE_TOURNAMENT: function (context, payload) {
      context.commit('ADD_TOURN', payload)
      context.commit('SAVE_DATA')
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
      context.commit('SAVE_DATA')
    },
    SIGNOUT_USER: function (context) {
      context.commit('LOGOUT_USER')
    },
    TERMINATE: function (context) {
      context.commit('SAVE_DATA')
    }
  },
  modules: {
  }
})
