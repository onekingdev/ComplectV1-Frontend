<template lang="pug">
  .page
    Get(currentBusiness="/api/businesses/current"): template(v-slot="{ currentBusiness }")
      .page-header
        h2.page-header__title
          b Welcome,&nbsp;
          template(v-if="currentAccount.first_name")
            | {{currentAccount.first_name}} {{currentAccount.last_name}}
          template(v-else)
            | {{currentBusiness.contact_first_name}} {{currentBusiness.contact_last_name}}
      div.p-x-40.p-b-40
        .row
          .col
            .dashboard
              .card.calendar
                Calendar(v-bind="{pdfUrl}" @saved="newEtag" :etag="etag")
              .card.upcoming.h-100
                UpcomingTasks(@saved="newEtag" :etag="etag")
</template>

<script>
import { mapGetters } from "vuex"
import Calendar from './Calendar'
import UpcomingTasks from '@/business/dashboard/UpcomingTasks'

const endpointProjectsUrl = '/api/local_projects/'
const pdfUrl = '/reminders.csv'

export default {
  data() {
    return {
      etag: Math.random(),
      projects: []
    }
  },
  methods: {
    newEtag() {
      this.etag = Math.random()
    },
    refetch() {
      fetch(this.$store.getters.backendUrl + endpointProjectsUrl, this.$store.getters.authHeaders)
        .then(response => response.json())
        .then(result => this.projects = result)
    },
  },
  computed: {
    pdfUrl: () => pdfUrl,
    ...mapGetters({
      currentAccount: 'roles/currentAccount',
    }),
  },
  watch: {
    etag: {
      handler: function() {
        this.refetch()
      },
      immediate: true
    }
  },
  components: {
    Calendar,
    UpcomingTasks,
  }
}
</script>
