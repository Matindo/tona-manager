import AuthService from '@/services/auth.service'

export const auth = {
    namespaced: true,
    state: {
      message: { type: '', text: ''}
    },
    getters: {
        MESSAGE: function (state) {
          return state.message
        }
    },
    actions: {
      authenticate: async function ({ dispatch }) {
        await AuthService.authenticate()
        dispatch('resetUser', null, { root: true })
      },
      login: async function ({ commit }, user) {
        const data = await AuthService.login(user)
        data.isError ? await commit('LOGIN_FAILURE', data) : await commit('LOGIN_SUCCESS', data)
      },
      logout: async function ({ dispatch, commit }) {
        const data = await AuthService.logout()
        data.isError ? await commit('LOGOUT_FAILURE', data) : await dispatch('resetUser', null, { root: true })
      },
      register: async function ({ commit }, user) {
        const data = await AuthService.register(user)
        data.isError ? await commit('REGISTER_FAILURE', data) : await commit('REGISTER_SUCCESS', data)
      },
      clearMessage: async function ({ commit }) {
        await commit('CLEAR_MESSAGE')
      }
    },
    mutations: {
      LOGIN_SUCCESS: function (state, data) {
        state.message.type = 'success'
        state.message.text = 'Logged in'
      },
      LOGIN_FAILURE: function (state, data) {
        state.message.type = 'danger'
        state.message.text = data.message
      },
      LOGOUT_FAILURE: function (state, data) {
        state.message.type = 'danger'
        state.message.text = data.message
      },
      REGISTER_SUCCESS: function (state, data) {
        state.message.type = 'success'
        state.message.text = data.message
      },
      REGISTER_FAILURE: function (state, data) {
        state.message.type = 'danger'
        state.message.text = data.message
      },
      CLEAR_MESSAGE: function (state) {
        state.message.type = ''
        state.message.text = ''
      }
    }
}