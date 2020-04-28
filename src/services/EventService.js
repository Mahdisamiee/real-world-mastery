import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  onDownloadProgress() {
    console.log('downloading files')
  },
  headers: {
    Accept: 'application/json',
    common: {
      Authorization: 'something'
    },
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  }
}
