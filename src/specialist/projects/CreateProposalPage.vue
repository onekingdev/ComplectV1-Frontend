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
              .col-sm: InputDate(v-model="form.starts_on" :errors="errors.starts_on" labelKlass="required") Start Date
              .col-sm: InputDate(v-model="form.ends_on" :errors="errors.ends_on" labelKlass="required") Due Date
            InputSelect.m-t-1(v-model="form.pricing_type" :errors="errors.pricing_type" :options="pricingTypesOptions" :required="true" @input="changePaymentType") Pricing Type
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
              button.m-r-1.btn.btn-default(@click="submit(true)") Save as Draft
              button.btn.btn-dark(@click="submit()") Submit
          .col-md-6
            .card
              ProjectDetails(:project="project")
</template>

<script>
import ProjectDetails from './ProjectDetails'
import ProposalMixin from '@/mixins/ProposalMixin'
import {
  PRICING_TYPES_OPTIONS
} from '@/common/ProjectInputOptions'

const FIXED_BUDGET = Object.keys(PRICING_TYPES_OPTIONS)[0]
const HOURLY_RATE = Object.keys(PRICING_TYPES_OPTIONS)[1]

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
  status: 'published'
})
const calcPricingType = function(project) {
  if (project.pricing_type == "fixed") {
    return FIXED_BUDGET
  } else if (project.pricing_type == "hourly") {
    return HOURLY_RATE
  }
}

export default {
  mixins: [ProposalMixin],
  data() {
    return {
      form: initialForm(),
      project: null,
    }
  },
  methods: {
    async submit(forDraft = false) {
      this.validate()
      if (Object.keys(this.errors).length > 0) return
      if (forDraft) this.form.status = 'draft'
      const res = await this.$store.dispatch('projects/submitProposal', { projectId: this.projectId, data: this.submitData(forDraft) }) 
      if (res.id) {
        const text = forDraft ? 'Proposal has been saved.' : 'Proposal has been submitted.'
        this.toast('Success', text)
        setTimeout(() => {
          this.$router.push('/specialist/my-projects/')
        }, 2000)
      } else {
        if (forDraft) this.toast('Error', 'Proposal has not been saved. Please try again.', true)
        const firstField = Object.keys(res)[0]
        const text = res[firstField]
        this.toast('Error', text, true)
      }
    },
    projectLoaded(payload) {
      this.project = payload
      Object.assign(this.form, initialForm(payload))
      return payload
    },
    calcPricingType
  },
  components: {
    ProjectDetails
  }
}
</script>
