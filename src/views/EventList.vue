<template>
  <div>
    <h1>event for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
        next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },

    ...mapState(['event', 'user'])
  },
  created() {
    // this.$store.dispatch('event/fetchEvents', { page: this.page, limit: 3 })
    this.fetchEvents({ page: this.page, limit: 3 })
  },
  methods: {
    ...mapActions('event', ['fetchEvents'])
  }
}
</script>
