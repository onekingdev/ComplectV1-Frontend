<template lang="pug">
  .alert.alert-warning(v-if="hasPendingTimesheets")
    h4.alert-heading Timesheet approval is required
    p A new timesheet has been submitted for approval.
    router-link.btn.btn-light(:to="url('URL_PROJECT_TIMESHEETS', project.id)") View
</template>

<script>
import { mapGetters } from 'vuex'

const STATUS_PENDING = 'pending'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['url']),
    hasPendingTimesheets() {
      return this.project.timesheets.find(t => STATUS_PENDING === t.status)
    }
  }
}
</script>
