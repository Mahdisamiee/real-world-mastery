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
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(res => {
          commit('ADD_EVENT', res.data)
          let notification = {
            type: 'success',
            message: 'your event created successfully!'
          }
          dispatch('notification/add', notification, { root: true })
        })
        .catch(err => {
          let notification = {
            type: 'error',
            message: 'your event did not created successfully!' + err.message
          }
          dispatch('notification/add', notification, { root: true })
          throw err
        })
    },
    fetchEvents({ commit, dispatch }, { page, limit }) {
      EventService.getEvents(page, limit)
        .then(response => {
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
        })
        .catch(err => {
          let notification = {
            type: 'error',
            message: 'there was a problem to fetching events!!! :' + err.message
          }
          dispatch('notification/add', notification, { root: true })
        })
    },
    fetchEvent({ commit, getters, dispatch }, id) {
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
            let notification = {
              type: 'error',
              message: 'there was a problem to fetching event!!!! :' + err.message
            }
            dispatch('notification/add', notification, { root: true })
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
