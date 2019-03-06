import Vuex from 'vuex'

let store = () => new Vuex.Store({
  state: {
    personal_tab: 1
  },
  mutations: {
    changePersonalTab (state, index) {
      state.personal_tab = index
    }
  }
})

export default store
