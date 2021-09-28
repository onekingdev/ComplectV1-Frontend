<template lang="pug">
  .alert.alert-warning(v-if="hasSubmittedTimesheets")
    h4.alert-heading Timesheet approval requested
    p Specialist has submitted a timesheet for your approval.
    router-link.btn.btn-light(:to="url('URL_PROJECT_TIMESHEETS', project.id)") View
</template>

<script>
import { mapGetters } from 'vuex'

const STATUS_SUBMITTED = 'submitted'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['url']),
    hasSubmittedTimesheets() {
      return this.project.timesheets.find(t => STATUS_SUBMITTED === t.status)
    }
  }
}
</script>
