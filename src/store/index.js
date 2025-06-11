import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import { auth } from '@/store/auth.module'
import { tona } from '@/store/data.module'
import { user } from '@/store/user.module'
import { team } from '@/store/team.module'

const localDB = new VuexPersistence({
  supportCircular: true,
  storage: window.localStorage
})
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
    },
    RESET_USER: function (state) {
      state.user = null
      state.loggedIn = false
      const user = localStorage.getItem('user')
      if (user.length > 0) {
        state.loggedIn = true
        state.user = JSON.parse(user)
      }
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
    },
    resetUser: async function ({ commit }) { await commit('RESET_USER') }
  },
  modules: {
    auth,
    tona,
    user,
    team
  },
  plugins: [localDB.plugin]
})
