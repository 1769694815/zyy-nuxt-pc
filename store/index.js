export const state = () => {
  return {
    userToken: ''
  }
}

export const mutations = {
  SET_TOKEN (state, userToken) {
    state.userToken = userToken || ''
  }
}

export const getters = {
  isAuth (state) {
    return !!state.userToken
  },
  logUser (state) {
    return state.userToken
  }
}