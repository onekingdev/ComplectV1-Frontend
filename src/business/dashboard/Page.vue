<template lang="pug">
  SpecialistPage(v-if="isTeamMemberUser")
  .page(v-else)
    Get(currentBusiness="/api/businesses/current"): template(v-slot="{ currentBusiness }")
      .page-header
        h2.page-header__title
          b Welcome,&nbsp;
          template(v-if="currentUser.first_name")
            | {{currentUser.first_name}} {{currentUser.last_name}}
          template(v-else)
            | {{currentUser.contact_first_name}} {{currentUser.contact_last_name}}
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
import SpecialistPage from '@/specialist/dashboard/Page'

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
      currentUser: 'getUser'
    }),
    isTeamMemberUser() {
      const userType = localStorage.getItem('app.currentUser.seatRole')
      return !!userType
    }
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
    SpecialistPage
  }
}
</script>
