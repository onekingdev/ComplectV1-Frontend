<template lang="pug">
  div.container.pt-3
    Get(:project="projectUrl" :callback="setProject"): template(v-slot="{project}")
    template(v-if="project")
      Breadcrumbs.my-2(:items="['Jobs', project.title, 'My Timesheet']")
      h4.mb-4.project-title {{ project.title }}
    Get(v-if="isTableVisible" :timesheets="timesheetsUrl" :callback="enrich"): template(v-slot="{timesheets}")
      .card
        .card-header
          h1.project-title My Timesheet
          button.btn.btn-dark.float-right(v-if="project.status !== 'Complete'" @click="openModal") Log Time
        .card-body
          table.table.table-responsive-sm
            thead
              tr
                th Date of Entry
                th Status
                th Total Time
                th.text-right Total Due
                th.text-right Payment to Date
                th
            tbody
              tr(v-for="row in timesheets" :key="row.id")
                td.text-blue.long-column {{ row.created_at | asDate }}
                td
                  span.badge(:class="statusClasses(row.status)") {{ row.status }}
                td {{ row.total_duration | minToHour }}
                td.text-right {{ row.total_due | usdWhole }}
                td.text-right {{ row.payment_to_date | usdWhole }}
                td.text-right
                  .actions
                    b-dropdown.option-btn(size="sm" variant="none" class="m-0 p-0" right :disabled="!canDelete(row) && !canEdit(row)")
                      template(#button-content)
                        b-icon(icon="three-dots")
                      b-dropdown-item(v-b-modal.timesheets-modal v-if="canEdit(row)" @click="editEntryItem(row)") Edit
                      CommonDeleteModal.ml-auto(title="Delete Timesheet" content="You are deleting this timesheet from your records. This action is not reversible." @deleteConfirmed="removeTimesheet(row)", :inline="false")
                        b-dropdown-item(v-if="canDelete(row)").delete Delete
          EmptyState(v-if="timesheets.length < 1")
    LogTimeModal(modalId="timesheets-modal" v-if="project" :project="project" @saved="saved" :timesheet="editEntry")
</template>

<script>
import LogTimeModal from './LogTimeModal'
import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'
const totalDuration = rows => rows.reduce((result, row) => result + 60 * (row.hours || 0), 0)
const totalDue = (minutes, pricePerHour) => Math.ceil((minutes / 60) * (pricePerHour || 0))
const ALLOW_STATUSES = ['pending', 'disputed']
export default {
  components: {
    LogTimeModal,
    CommonDeleteModal
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      editEntry: null,
      isTableVisible: true,
      project: null
    }
  },
  methods: {
    setProject(project) {
      this.project = project
    },
    openModal() {
      this.editEntry = null
      this.$bvModal.show('timesheets-modal')
    },
    editEntryItem(timesheetLog) {
      this.editEntry = timesheetLog
    },
    enrich(timesheets) {
      return timesheets.map(row => ({
        ...row,
        total_duration: totalDuration(row.time_logs),
        total_due: totalDue(totalDuration(row.time_logs), row.time_logs[0]['hourly_rate'] || 0),
        payment_to_date: 0 // @todo payment_to_date calculation
      }))
    },
    async removeTimesheet(timesheet) {
      const res = await this.$store.dispatch('projects/deleteTimeSheet', { projectId: this.id, id: timesheet.id })
      if (res.id) {
        this.reloadTable()
        this.toast('Success', 'Timesheet has been deleted.')
      } else {
        this.toast('Error', 'Timesheet has been deleted.', true)
      }
    },
    saved(payload) {
      this.reloadTable()
    },
    reloadTable() {
      this.isTableVisible = false, setTimeout(() => this.isTableVisible = true, 0)
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
    canEdit(timesheet) {
      return ALLOW_STATUSES.includes(timesheet.status)
    },
    canDelete(timesheet) {
      return ALLOW_STATUSES.includes(timesheet.status)
    }
  },
  computed: {
    projectUrl() {
      return this.$store.getters.url('URL_API_MY_PROJECT', this.id)
    },
    timesheetsUrl() {
      return this.$store.getters.url('URL_API_PROJECT_TIMESHEET', this.id)
    },
  }
}
</script>
<style scoped>
.project-title {
  font-size: 18px;
}

.text-blue {
  color:#0479FF;
}

.long-column {
  width: 38%;
}
</style>
