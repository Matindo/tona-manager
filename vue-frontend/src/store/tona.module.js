import TonaService from '@/services/tona.service'

export const tona = {
  namespaced: true,
  state: {
    message: { type: '', text: '' },
    tournament: {
      id: null,
      name: '',
      region: '',
      type: '',
      start: '',
      status: '',
      teams: []
    }
  },
  getters: {
    MESSAGE: function (state) {
      return state.message;
    },
    TOURNAMENT: function (state) {
      return state.tournament;
    }
  },
  actions: {
    createTona: async function ({ commit }, payload) {
      const data = await TonaService.addTournament(payload)
      data.isError ? commit('CREATE_TONA_FAIL', data) : commit('CREATE_TONA_SUCCESS', data)
    },
    setTona: async function ({ commit }, id) {
      const tournament = JSON.parse(localStorage.getItem('tournament'))
      if (tournament && tournament.tournament_id === id) {
        commit('SET_TONA_SUCCESS', tournament)
        console.log("loaded tournament from storage")
      } else {
        const data = await TonaService.getTournament(id)
        if (data.isError) {
          commit('SET_TONA_FAIL', data)
          console.log("fail", data.message)
        } else {
          commit('SET_TONA_SUCCESS', data.tourn)
          console.log("loaded tournament from db")
          localStorage.setItem('tournament', JSON.stringify(data.tourn))
        }
      }
    },
    fetchTeams: async function ({ commit }) {
      const teams = JSON.parse(localStorage.getItem('tournamentTeams'))
      if (teams && teams.length > 0) {
        let correctTeams = true
        const tourn_teams = JSON.parse(localStorage.getItem('tournament')).teams
        teams.forEach((team) => {
          if (!tourn_teams.includes(team.team_id)) {
            correctTeams = false
          }
        })
        if (correctTeams) {
          commit('SET_TEAMS_SUCCESS', teams)
          console.log("loaded teams from storage")
        }
      } else {
        localStorage.removeItem('tournamentTeams')
        const tourn = JSON.parse(localStorage.getItem('tournament')).tournament_id
        const result = await TonaService.getTournamentTeams(tourn)
        if (result.isError) {
          commit('SET_TEAMS_FAIL', result)
        } else {
          commit('SET_TEAMS_SUCCESS', result.teams)
          localStorage.setItem('tournamentTeams', JSON.stringify(result.teams))
          console.log("loaded teams from db")
        }
      }
    },
    updateTona: async function ({ commit }, payload) {
      const data = await TonaService.updateTona(payload);
      data.isError ? commit('UPDATE_TONA_FAIL', data) : commit('UPDATE_TONA_SUCCESS', data);
    },
    deleteTona: async function ({ commit }, id) {
      const data = await TonaService.deleteTona(id);
      data.isError ? commit('DELETE_TONA_FAIL', data) : commit('DELETE_TONA_SUCCESS', id);
    }
  },
  mutations: {
    CREATE_TONA_SUCCESS(state, data) {
      state.message.type = 'success';
      state.message.text = 'Tournament created successfully';
      state.tournament = data.tournament;
    },
    CREATE_TONA_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    },
    SET_TONA_SUCCESS(state, data) {
      state.message.type = 'info'
      state.message.text = 'Tournament loaded successfully',
      state.tournament = data
    },
    SET_TONA_FAIL(state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    SET_TEAMS_SUCCESS: function (state, payload) {
      state.tournament.teams = payload
      state.message.text = "Successfully loaded tournament teams"
      state.message.type = "success"
    },
    SET_TEAMS_FAIL: function (state, payload) {
      state.message.text = payload.message
      state.message.type = "danger"
    },
    UPDATE_TONA_SUCCESS(state, data) {
      state.message.type = 'success';
      state.message.text = 'Tona updated successfully';
      state.tona = data.tona;
    },
    UPDATE_TONA_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    },
    DELETE_TONA_SUCCESS(state, id) {
      state.message.type = 'success';
      state.message.text = 'Tona deleted successfully';
      if (state.tournament.id === id) {
        state.tournament = { id: null, name: '', region: '', type: '', start: '', status: '', teams: [] };
      }
    },
    DELETE_TONA_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    }
  }
}