import EventService from '@/services/EventService'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {},
    count: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, total) {
      state.eventsTotal = total
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(res => {
        commit('Add_EVENT', res.data)
      })
    },
    fetchEvents({ commit }, { page, limit }) {
      EventService.getEvents(page, limit)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchEvent({ commit, getters }, id) {
      console.log('fetchevent happend')
      let event = getters.getEventById(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(err => {
            console.log(err.response)
          })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
}
