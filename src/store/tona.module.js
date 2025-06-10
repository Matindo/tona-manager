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
    }
  },
  getters: {
    MESSAGE: function (state) {
      return state.message;
    },
    TOURN: function (state) {
      return state.tournament;
    }
  },
  actions: {
    createTona: async function ({ commit }, payload) {
      const data = await TonaService.createTona(payload);
      data.isError ? commit('CREATE_TONA_FAIL', data) : commit('CREATE_TONA_SUCCESS', data);
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
      state.message.text = 'Tona created successfully';
      state.tona = data.tona;
    },
    CREATE_TONA_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
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
      if (state.tona.id === id) {
        state.tona = { id: null, name: '', region: '', type: '', start: '', status: '' };
      }
    },
    DELETE_TONA_FAIL(state, data) {
      state.message.type = 'danger';
      state.message.text = data.message;
    }
  }
}