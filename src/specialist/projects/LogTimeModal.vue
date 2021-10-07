<template lang="pug">
  div
    div(v-b-modal="modalId")
      slot
    b-modal.fade(:id="modalId" :title="modalTitle" @close="hideModal")
      label.form-label.date-entry Date of Entry
      div.mb-1 {{ today }}
      .row.log-item(v-for="(row, i) in entry.time_logs_attributes.filter(item => !item['_destroy'])" :key="i")
        .col-11.col-sm-11.mb-2
          button.btn.btn__close.float-right.remove-log(v-if="i" @click="removeRow(i, row)")
            b-icon(icon="x", font-scale="1")
          InputText(v-model="row.description" :errors="errors['time_logs.description']" placeholder="Describe the task") Description
        .col-6.col-sm-6
          InputDate(v-model="row.date" :errors="errors['time_logs.date']") Date
        .col-5.col-sm-5
          InputText(v-model="row.hours" :errors="errors['time_logs.hours']") Hours
        .col-md-12(v-if="i !== entry.time_logs_attributes.length - 1")
          hr
      hr
      button.btn.btn-default(@click="addRow")
        b-icon.mr-2(icon="plus-circle-fill")
        | New Entry
      span.float-right.total-due Total Due: {{ totalDue | usdWhole }}
      template(slot="modal-footer")
        button.btn.btn-link(@click="hideModal") Cancel
        Post(:action="timesheetsUrl" :method="method" :model="{...entry,status:'pending'}" @errors="errors = $event" @saved="saved('draft')")
          button.btn.btn-outline-dark Save as Draft
        Post(:action="timesheetsUrl" :method="method" :model="{...entry,status:'submitted'}" @errors="errors = $event" @saved="saved('submit')")
          button.btn.btn-dark {{ buttonSaveText }}
</template>
<script>
import { DateTime } from 'luxon'

const initialEntry = () => ({ time_logs_attributes: [newEntryRow()] })
const newEntryRow = () => ({
  description: null,
  date: today(),
  hours: 0
})
const today = () => DateTime.local().toISODate()
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    modalId: {
      type: String,
      required: true
    },
    timesheet: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      entry: initialEntry(),
      errors: {},
      isTableVisible: true,
      today: DateTime.local().toFormat('MM/dd/yyyy')
    }
  },
  methods: {
    hideModal() {
      this.resetEntry()
      this.$bvModal.hide(this.modalId)
    },
    resetEntry() {
      this.errors = {}
      this.entry = initialEntry()
      this.today = DateTime.local().toFormat('MM/dd/yyyy')
    },
    addRow() {
      this.entry.time_logs_attributes.push(newEntryRow())
    },
    removeRow(i, timesheet) {
      if (timesheet.id) {
        timesheet['_destroy'] = true
        this.$set(this.entry.time_logs_attributes, i, timesheet)
      } else {
        this.entry.time_logs_attributes.splice(i, 1)
      }
    },
    showMessage(payload) {
      if (payload === 'draft') this.toast('Success', 'Timesheet has been saved.')
      if (payload === 'submit') this.toast('Success', 'Timesheet has been submitted.')
    },
    saved(payload) {
      this.showMessage(payload)
      this.$emit('saved', payload)
      this.resetEntry()
      this.$bvModal.hide(this.modalId)
      Object.assign(this.entry, initialEntry())
    }
  },
  computed: {
    modalTitle() {
      return this.timesheet ? 'Edit Log Time' : 'Log Time'
    },
    buttonSaveText() {
      return this.timesheet ? 'Submit' : 'Submit'
    },
    timesheetsUrl() {
      const baseUrl = this.$store.getters.url('URL_API_PROJECT_TIMESHEET', this.project.id)
      return this.timesheet ? `${baseUrl}/${this.timesheet.id}` : baseUrl
    },
    method() {
      return this.timesheet ? 'PUT' : 'POST'
    },
    totalDue() {
      const totalHours = this.entry.time_logs_attributes
                            .map(item => (parseFloat(item.hours) || 0))
                            .reduce((previousValue, currentValue) => previousValue + currentValue )
      return (totalHours * this.project.hourly_rate) || 0
    }
  },
  watch: {
    timesheet (value) {
      if (value) {
        Object.assign(this.entry, value)
        this.entry.time_logs_attributes = value.time_logs.map(item => {
          return {...item, hours: parseInt(item.hours)}
        })
        this.today = DateTime.fromISO(this.entry.created_at).toFormat('MM/dd/yyyy')
      } else {
        this.resetEntry()
      }
    },
  }
}
</script>
<style scoped>
.total-due {
  font-weight: 600;
  position: relative;
  top: 7px;
}

.remove-log {
  position: relative;
  top: 35px;
  right: -39px;
}

.date-entry {
  margin-top: -10px;
  display: block;
}
</style>
