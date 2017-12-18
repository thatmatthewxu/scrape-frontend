import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state () {
      return {
        item: {},
        loading: false,
        error: null
      }
    },
    getters: {
      GET_ITEM: (state) => {
        return state.item
      },
      GET_LOADING (state) {
        return state.loading
      },
      GET_ERROR (state) {
        return state.error
      }
    },
    mutations: {
      SET_ITEM (state, payload) {
        state.item = payload
      },
      SET_LOADING (state, payload) {
        state.loading = payload
      },
      SET_ERROR (state, payload) {
        state.error = payload
      }
    },
    actions: {
      async SCRAPE_ITEM_BY_API ({commit}, payload) {
        commit('SET_LOADING', true)
        this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', ['post'])
        try {
          const item = await this.$axios.$post('/scrape', {
            url: payload.url
          })
          commit('SET_ITEM', item)
          commit('SET_LOADING', false)
        } catch (error) {
          let errorMessage = error.errorMessage
          commit('SET_LOADING', false)
          commit('SET_ERROR', errorMessage)
          console.log(errorMessage)
        }
      }
    }
  })
}

export default createStore