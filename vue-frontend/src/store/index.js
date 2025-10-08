import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import DataService from "@/services/data.service";

import { auth } from "@/store/auth.module";
import { tona } from "@/store/tona.module";
import { user } from "@/store/user.module";
import { team } from "@/store/team.module";

const localDB = new VuexPersistence({
  supportCircular: true,
  storage: window.localStorage,
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tournaments: [],
    teams: [],
    active: false,
    searchResults: [],
    message: { type: "", text: "" },
  },
  getters: {
    SEARCH_RESULTS: function (state) {
      return state.searchResults;
    },
    TEAMS: function (state) {
      return state.teams;
    },
    TOURNAMENTS: function (state) {
      return state.tournaments;
    },
    MESSAGE: function (state) {
      return state.message;
    },
    ACTIVE: function (state) {
      return state.active;
    },
  },
  mutations: {
    SET_TOURNS: function (state, payload) {
      state.tournaments = payload;
    },
    SET_SEARCH_RESULTS: function (state, payload) {
      state.searchResults = payload;
    },
    SET_TEAMS: function (state, payload) {
      state.teams = payload;
      localStorage.setItem("tourn_teams", JSON.stringify(state.teams));
    },
    SET_MESSAGE: function (state, payload) {
      state.message.type = payload.type;
      state.message.text = payload.text;
    },
    END_TOURN: function (state) {
      state.tournament.status = "Completed";
    },
    LOGOUT_USER: function (state) {
      state.user = { live: false };
    },
    SAVE_DATA: function (state) {
      localStorage.setItem("tournaments", JSON.stringify(state.tournaments));
      localStorage.setItem("teams", JSON.stringify(state.teams));
    },
    RESET_USER: function (state) {
      state.user = null;
      state.loggedIn = false;
      const user = localStorage.getItem("user");
      if (user.length > 0) {
        state.loggedIn = true;
        state.user = JSON.parse(user);
      }
    },
  },
  actions: {
    INITIALIZE: async function (context) {
      if (localStorage.getItem("tournaments")) {
        const tourns = JSON.parse(localStorage.getItem("tournaments"));
        context.commit("SET_TOURNS", tourns);
      } else {
        await context.dispatch("FETCH_TOURNS");
      }
      if (localStorage.getItem("teams")) {
        const teams = JSON.parse(localStorage.getItem("teams"));
        context.commit("SET_TEAMS", teams);
      } else {
        await context.dispatch("FETCH_TEAMS");
      }
    },
    REFRESH_DATA: async function (context) {
      await context.dispatch("FETCH_TOURNS");
      await context.dispatch("FETCH_TEAMS");
    },
    FETCH_TOURNS: async function (context) {
      const result = await DataService.getTournaments();
      if (!result.isError) {
        context.dispatch("SET_TOURNAMENTS", result.tourns);
      } else {
        context.dispatch("SET_MESSAGE", {
          type: "danger",
          text: result.message,
        });
      }
    },
    FETCH_TEAMS: async function (context) {
      const result = await DataService.getAllTeams();
      if (!result.isError) {
        console.log("Fetch-teams success");
        context.dispatch("SET_TEAMS", result.teams);
      } else {
        console.log("Fetch-teams error");
        context.dispatch("SET_MESSAGE", {
          type: "danger",
          text: result.message,
        });
      }
    },
    SET_TOURNAMENTS: function (context, payload) {
      context.commit("SET_TOURNS", payload);
    },
    SET_SEARCH_RESULTS: function (context, payload) {
      context.commit("SET_SEARCH_RESULTS", payload);
    },
    SET_TEAMS: function (context, payload) {
      context.commit("SET_TEAMS", payload);
    },
    END_TOURNAMENT: function (context) {
      context.commit("END_TOURN");
      context.commit("SAVE_DATA");
    },
    SIGNOUT_USER: function (context) {
      context.commit("LOGOUT_USER");
    },
    TERMINATE: function (context) {
      context.commit("SAVE_DATA");
    },
    resetUser: async function ({ commit }) {
      await commit("RESET_USER");
    },
  },
  modules: {
    auth,
    tona,
    user,
    team,
  },
  plugins: [localDB.plugin],
});
