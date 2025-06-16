import UserService from "@/services/user.service"

export const user = {
  namespaced: true,
  state: {
    message: { text: '', type: '' },
    user: {
      id: null,
      name: '',
      email: '',
      createdAt: '',
      role: '',
      isActive: false,
    }
  },
  getters: {
    MESSAGE: function (state) {
      return state.message
    },
    USER: function (state) {
      return state.user
    }
  },
  actions: {
    changeName: async function ({ dispatch, commit }, payload) {
      const data = await UserService.updateName(payload)
      if (!data) {
          dispatch('auth/logout', null, { root: true })
      } else {
          data.isError ? commit('CHANGE_NAME_FAIL', data) : dispatch('updateUser', payload.id)
      }
    },
    changeEmail: async function ({ dispatch, commit }, payload) {
      const data = await UserService.updateEmail(payload)
      if (!data) {
          dispatch('auth/logout', null, { root: true })
      } else {
          data.isError ? commit('CHANGE_EMAIL_FAIL', data) : dispatch('auth/logout', null, { root: true })
      }
    },
    changePassword: async function ({ dispatch, commit }, payload) {
      const data = await UserService.updatePassword(payload)
      if (!data) {
          dispatch('auth/logout', null, { root: true })
      } else {
          data.isError ? commit('CHANGE_PASSWORD_FAIL', data) : dispatch('auth/logout', null, { root: true })
      }
    },
    updateUser: async function ({ dispatch, commit }, id) {
      const data = await UserService.updateUser(id)
      if (!data) {
          dispatch('auth/logout', null, { root: true })
      } else {
          data.isError ? commit('UPDATE_USER_FAIL', data) : dispatch('resetUser', null, { root: true })
      }
    },
    deleteAccount: async function ({ dispatch, commit }, user) {
      const data = await UserService.deleteUser(user)
      if (!data) {
          dispatch('auth/logout', null, { root: true })
      } else {
          data.isError ? commit('DELETE_USER_FAIL', data) : dispatch('auth/logout', null, { root: true })   
      }
    },
    clearMessage: async function ({ commit }) {
      await commit('CLEAR_MESSAGE')
    }
  },
  mutations: {
    CHANGE_NAME_FAIL: function (state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    CHANGE_EMAIL_FAIL: function (state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    CHANGE_PASSWORD_FAIL: function (state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    UPDATE_USER_FAIL: function (state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    DELETE_USER_FAIL: function (state, data) {
      state.message.type = 'danger'
      state.message.text = data.message
    },
    CLEAR_MESSAGE: function (state) {
      state.message.type = ''
      state.message.text = ''
    }
  }
}
