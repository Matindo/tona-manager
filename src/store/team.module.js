import TeamService from '@/services/team.service';

export const team = {
  namespaced: true,
  state: {
    message: { type: '', text: '' },
    team: {
      id: null,
      name: '',
      rep: '',
      members: []
    }
  },
  getters: {
    MESSAGE: function (state) {
      return state.message;
    },
    TEAM: function (state) {
      return state.team;
    }
  },
  actions: {
    getTeam: async function ({ commit }, id) {
      const data = await TeamService.getTeam(id);
      data.isError ? commit('GET_TEAM_FAIL', data) : commit('GET_TEAM_SUCCESS', data);
    },
    addTeamMember: async function ({ commit }, payload) {
      const data = await TeamService.addTeamMember(payload.teamId, payload.member);
      data.isError ? commit('ADD_TEAM_MEMBER_FAIL', data) : commit('ADD_TEAM_MEMBER_SUCCESS', data);
    },
    editTeamMember: async function ({ commit }, payload) {
      const data = await TeamService.editTeamMember(payload.teamId, payload.member);
      data.isError ? commit('EDIT_TEAM_MEMBER_FAIL', data) : commit('EDIT_TEAM_MEMBER_SUCCESS', data);
    }
  },
  mutations: {
    GET_TEAM_SUCCESS(state, data) {
      state.message.type = 'success';
      state.message.text = 'Team retrieved successfully';
      state.team = data.team;
    },
    GET_TEAM_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    },
    ADD_TEAM_MEMBER_SUCCESS(state, data) {
      state.message.type = 'success';
      state.message.text = 'Member added successfully';
      state.team.members.push(data.member);
    },
    ADD_TEAM_MEMBER_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    },
    EDIT_TEAM_MEMBER_SUCCESS(state, data) {
      state.message.type = 'success';
      state.message.text = 'Member updated successfully';
      const index = state.team.members.findIndex(member => member.id === data.member.id);
      if (index !== -1) {
        state.team.members.splice(index, 1, data.member);
      }
    },
    EDIT_TEAM_MEMBER_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    }
  }
};