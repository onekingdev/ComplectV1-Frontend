<template lang="pug">
  .container
    .card.m-t-2
      .card-header
        .col-md-12
          h3 Create Proposal
      .card-body
        Get(:project='`/api/specialist/projects/${projectId}`' :callback="projectLoaded"): template(v-slot="{project}"): div.row.pl-3
          .col-md-6
            h3 Terms
            .row
              .col-sm: InputDate(v-model="form.starts_on" :errors="errors.starts_on") Start Date
              .col-sm: InputDate(v-model="form.ends_on" :errors="errors.ends_on") Due Date
            InputSelect.m-t-1(v-model="form.pricing_type" :errors="errors.pricing_type" :options="pricingTypesOptions" :required="true") Pricing Type
            div(v-if="isFixedBudget")
              InputText.m-t-1(v-model="form.fixed_budget" :errors="errors.fixed_budget" :required="true") Fixed Budget
              InputSelect.m-t-1(v-model="form.fixed_payment_schedule" :errors="errors.fixed_payment_schedule" :options="fixedPaymentScheduleOptions" :required="true") Payment Schedule
            div(v-else)
              InputText.m-t-1(v-model="form.hourly_rate" :errors="errors.hourly_rate" :required="true") Hourly Rate
              InputText.m-t-1(v-model="form.estimated_hours" :errors="errors.estimated_hours" :required="true") Estimated Hours
              InputSelect.m-t-1(v-model="form.hourly_payment_schedule" :errors="errors.hourly_payment_schedule" :options="hourlyPaymentScheduleOptions" :required="true") Payment Schedule
            hr
            h3 Role
            InputTextarea.m-t-1(v-model="form.role_details" :errors="errors.role_details" :rows="4" :required="true") Role Details
            InputTextarea.m-t-1(v-model="form.key_deliverables" :errors="errors.key_deliverables" :rows="4" :required="true") Key Deliverables
            h3.m-t-1 Attachments
            .card.m-b-1
              .card-body
                p Attach a cover letter, resume, or other document here. Limited to only one file.
                div.mb-2(v-if="form.document")
                  span.font-weight-bold {{ form.document.name }}
                label
                  a.btn.btn-light Upload File
                  input.d-none(type="file" accept="application/pdf" @change="pickFile")
            .text-right
              button.m-r-1.btn(@click="back") Cancel
              button.m-r-1.btn.btn-default(@click="submit(true)") Save Draft
              //- PostMultipart(:action="`/api/specialist/projects/${projectId}/applications`" :model="form" @errors="errors = $event" @saved="saved")
              button.btn.btn-dark(@click="submit()") Submit Proposal
          .col-md-6
            .card
              ProjectDetails(:project="project")
</template>

<script>
import ProjectDetails from './ProjectDetails'
import { DateTime } from 'luxon'
import {
  PRICING_TYPES_OPTIONS,
  FIXED_PAYMENT_SCHEDULE_OPTIONS_FILTERED,
  HOURLY_PAYMENT_SCHEDULE_OPTIONS_FILTERED,
} from '@/common/ProjectInputOptions'

const FIXED_BUDGET = Object.keys(PRICING_TYPES_OPTIONS)[0]
const HOURLY_RATE = Object.keys(PRICING_TYPES_OPTIONS)[1]
const MAX_FILE_SIZE = 2 // MB

const initialForm = (project) => ({
  // hourly_rate: null,
  starts_on: (project && project.starts_on) || null,
  ends_on: (project && project.ends_on ) || null,
  pricing_type: (project && calcPricingType(project)) || null,
  fixed_budget: (project && project.est_budget) || null,
  fixed_payment_schedule: (project && project.pricing_type == "fixed" && project.payment_schedule) || null,
  hourly_rate: (project && project.hourly_rate) || null,
  hourly_payment_schedule: (project && project.pricing_type == "hourly" && project.payment_schedule) || null,
  estimated_hours: null,
  message: null,
  key_deliverables: null,
  role_details: null,
  document: null,
})
const calcPricingType = function(project) {
  if (project.pricing_type == "fixed") {
    return FIXED_BUDGET
  } else if (project.pricing_type == "hourly") {
    return HOURLY_RATE
  }
}

export default {
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      form: initialForm(),
      errors: {},
      project: null,
    }
  },
  methods: {
    validate() {
      this.errors = {}
      const projectStartDate = DateTime.fromISO(this.project.starts_on)
      const projectEndDate = DateTime.fromISO(this.project.ends_on)
      const proposalStartDate = DateTime.fromISO(this.form.starts_on)
      const proposalEndDate =  DateTime.fromISO(this.form.ends_on)
      if (proposalStartDate < projectStartDate) this.$set(this.errors, 'starts_on', [`Date must be after ${projectStartDate.toFormat('MM/dd/yyyy')}`])
      if (projectEndDate < proposalEndDate) this.$set(this.errors, 'ends_on', [`Date must be before ${projectEndDate.toFormat('MM/dd/yyyy')}`])
      if (!this.form.role_details) this.$set(this.errors, 'role_details', ['Required field'])
      if (!this.form.key_deliverables) this.$set(this.errors, 'key_deliverables', ['Required field'])
      if (this.isFixedBudget) {
        if (!this.form.fixed_budget) this.$set(this.errors, 'fixed_budget', ['Required field'])
        if (!this.form.fixed_payment_schedule) this.$set(this.errors, 'fixed_payment_schedule', ['Required field'])
      } else {
        if (!this.form.hourly_rate) this.$set(this.errors, 'fixed_budget', ['Required field'])
        if (!this.form.hourly_payment_schedule) this.$set(this.errors, 'fixed_payment_schedule', ['Required field'])
        if (!this.form.estimated_hours) this.$set(this.errors, 'estimated_hours', ['Required field'])
      }

      if (this.form.document) {
        const fileSize = this.form.document.size / 1024 / 1024
        if (fileSize > MAX_FILE_SIZE) {
          this.toast('Error', 'Document has not been uploaded. File size must be less than 2MB.', true)
          this.$set(this.errors, 'document', ['File size must be less than 2MB.'])
        }
        const type = this.form.document.type
        if (type !== "application/pdf") {
          this.toast('Error', 'Document has not been uploaded. Invalid file type.', true)
          this.$set(this.errors, 'document', ['Invalid file type.'])
        }
      }
    },
    submitData(forDraft = false) {
      const fields = Object.keys(this.form)
      const formData = new FormData()
      for (let i = 0; i < fields.length; i++) {
        const field = fields[i]
        if (field !== 'document') formData.append(field, this.form[field])
      }
      if (this.form.document) formData.append('document', this.form.document)
      if (forDraft) {
        formData.append('status', 'draft')
      } else {
        formData.append('status', 'published')
      }

      return formData
    },
    submit(forDraft = false) {
      this.validate()
      if (Object.keys(this.errors).length > 0) return
      const root = this.$root
      this.$store.dispatch('projects/submitProposal', { projectId: this.projectId, data: this.submitData(forDraft) })
        .then(res => {
          if (res && res['prerequisites']) {
            this.toast('Error', res['prerequisites'][0], true)
          } else {
            this.$router.push('/specialist/my-projects/', () => root.toast('Proposal sent', ' '))
          }
        })
    },
    pickFile(event) {
      this.form.document = event.target.files[0]
    },
    projectLoaded(payload) {
      this.project = payload
      Object.assign(this.form, initialForm(payload))
      return payload
    },
    calcPricingType
  },
  computed: {
    pricingTypesOptions: () => PRICING_TYPES_OPTIONS,
    fixedPaymentScheduleOptions() {
      return FIXED_PAYMENT_SCHEDULE_OPTIONS_FILTERED(this.form.starts_on, this.form.ends_on)
    },
    hourlyPaymentScheduleOptions() {
      return HOURLY_PAYMENT_SCHEDULE_OPTIONS_FILTERED(this.form.starts_on, this.form.ends_on)
    },
    isFixedBudget() {
      return FIXED_BUDGET === this.form.pricing_type
    },
  },
  components: {
    ProjectDetails
  }
}
</script>
