<template>
  <div>
    <h1>event</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">
        next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },

    ...mapState(['events', 'eventsTotal'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      page: this.page,
      limit: 3
    })
  }
}
</script>
