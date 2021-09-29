<template lang="pug">
  .container.pt-3
    Get(:project="`/api/business/projects/${projectId}`"): template(v-slot="{project}")
      Breadcrumbs(:items="['Projects', project.title, 'Project Timesheet']")
      .card.mt-3
        .card-header
          h1.project-title Project Timesheet
        .card-body
          Get(:timesheets="url('URL_API_PROJECT_TIMESHEETS', project.id)" :etag="etag" :callback="enrichTimesheets"): template(v-slot="{timesheets}")
            table.table
              thead
                tr
                  th Date of Entry
                  th Status
                  th Total Time
                  th Total Due
                  th Payment to Date
                  th
              tbody
                tr(v-for="timesheet in timesheets" :key="timesheet.id")
                  td
                    a(v-b-modal="`TimesheetModal${timesheet.id}`" href="#") {{ timesheet.created_at | asDate }}
                    b-modal(:id="`TimesheetModal${timesheet.id}`" title="Entry Details")
                      label.form-label Date of Entry
                      p {{ today | asDate }}
                      .row(v-for="(row, i) in timesheet.time_logs" :key="i")
                        .col-sm-12
                          hr
                          label.form-label Description
                          p {{ row.description }}
                        .col-md-4
                          label.form-label Date
                          p {{ row.date | asDate }}
                        .col-md-4
                          label.form-label Hours
                          p {{ row.hours }}
                      hr
                      p.text-right Total Due: {{ totalDue(timesheet.time_logs) | usdWhole }}
                      template(slot="modal-footer")
                        button.btn.btn-link(@click="$bvModal.hide(`TimesheetModal${timesheet.id}`)") Cancel
                        Post(:model="{dispute:1}" v-bind="buttonConfig(timesheet.id)" @saved="saved(timesheet, 'Disputed')")
                          button.btn.btn-outline-dark Reject
                        Post(:model="{approve:1}" v-bind="buttonConfig(timesheet.id)" @saved="saved(timesheet, 'Approved')")
                          button.btn.btn-dark Approve
                  td
                    span.badge(:class="statusClasses(timesheet.status)") {{ timesheet.status }}
                  td {{ totalTime(timesheet.time_logs) | minToHour }}
                  td {{ totalDue(timesheet.time_logs) | usdWhole }}
                  td {{ timesheet.payment_to_date | usdWhole }}
                  td &hellip;
            EmptyState.text-center(v-if="timesheets.length < 1")
            
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'
import EtaggerMixin from '@/mixins/EtaggerMixin'

const today = () => DateTime.local().toISODate()

export default {
  mixins: [EtaggerMixin()],
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  methods: {
    saved(timesheet, message) {
      this.toast(message, message)
      this.$bvModal.hide(`TimesheetModal${timesheet.id}`)
      this.newEtag()
    },
    totalDue(timeLogs) {
      const ammounts = timeLogs.map(item => parseInt(item.total_amount))
      return ammounts.reduce((a, b) => a + b, 0)
    },
    totalTime(timeLogs) {
      const ammounts = timeLogs.map(item => parseInt(item.hours))
      return ammounts.reduce((a, b) => a + b, 0) * 60
    },
    statusClasses(status) {
      const classes = {
        pending: 'badge-secondary',
        submitted: 'badge-warning',
        approved: 'badge-success',
        disputed: 'badge-danger',
        charged: 'badge-dark'
      }

      return classes[status] ? classes[status] : ''
    },
  },
  computed: {
    ...mapGetters(['url', 'accessToken']),
    enrichTimesheets() {
      return timesheets => timesheets.map(t => ({
        ...t,
        total_time: 0,
        total_due: 0,
        payment_to_date: 0
      }))
    },
    buttonConfig() {
      return timesheetId => ({
        action: this.url('URL_API_PROJECT_TIMESHEETS', this.projectId) + '/' + timesheetId,
        method: 'PUT'
      })
    },
    today
  }
}
</script>
<style scoped>
.project-title {
  font-size: 20px;
}
</style>
