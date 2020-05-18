import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [],
    count: 0
  },
  mutations: {},
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(res => {
        commit('Add_Event', res.data)
      })
    }
  },
  modules: {},
  getters: {}
})
