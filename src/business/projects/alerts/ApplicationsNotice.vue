<template lang="pug">
  Get(v-if="show" :applications='apiUrl' :callback="getApplications"): template(v-slot="{applications}")
    div
      Notifications.m-b-20(:notify="applications")
        router-link.btn.btn-default.m-r-2(:to="viewPostUrl" target="_blank") View

</template>

<script>
import Notifications from "@/common/Notifications/Notifications";
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    Notifications,
  },
  methods: {
    getApplications(applications) {
      let notify = {}

      if (applications.length > 0) {
        const isAre = applications.length > 1 ? 'are' : 'is'
        const applicationsText = applications.length > 1 ? 'applications' : 'application'
        notify = {
          show: 'show',
          mainText: `${applications.length} ${ applicationsText } received.`,
          subText: `There ${ isAre } currently ${applicationsText} for your project.`,
          variant: 'warning',
          dismissible: true,
          icon: null,
          scale: 2,
        }
       return notify
      }

      if (this.project.status_business === 'published') {
        notify = {
          show: 'show',
          mainText: `Your job is currently posted on the job board as of ${ this.$options.filters.asDate(this.project.created_at) }.`,
          subText: 'Keep an eye out! Specialists may reach out to you soon.',
          variant: 'primary',
          dismissible: true,
          icon: null,
          scale: 2,
        }
      } else {
        notify = {
          show: 'show',
          mainText: `Your job posting is currently in draft`,
          subText: 'Finish the posting to submit it to our job board.',
          variant: 'primary',
          dismissible: true,
          icon: null,
          scale: 2,
        }
      }

      return notify
    }
  },
  computed: {
    show() {
      return !this.project.specialist_id
    },
    apiUrl() {
      return this.$store.getters.url('URL_API_PROJECT_APPLICATIONS', this.project.id)
    },
    viewPostUrl() {
      return this.$store.getters.url('URL_PROJECT_POST', this.project.id)
    }
  }
}
</script>
