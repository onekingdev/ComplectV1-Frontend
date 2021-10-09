<template lang="pug">
  div
    button.btn.btn-dark(v-b-modal="'EditProposalModal'") Edit
    b-modal(id="EditProposalModal" title="Edit Proposal")
      ModelLoader(:url='`/api/specialist/projects/${projectId}/applications/${applicationId}`' :default="initialForm" @loaded="loaded"): div.row
        .col-md-12
          h3 Terms
          .row
            .col-sm: InputDate(v-model="form.starts_on" :errors="errors.starts_on" labelKlass="required") Start Date
            .col-sm: InputDate(v-model="form.ends_on" :errors="errors.ends_on" labelKlass="required") Due Date
          InputSelect.m-t-1(v-model="form.pricing_type" :required="true" :errors="errors.pricing_type" :options="pricingTypesOptions" @input="changePaymentType") Pricing Type
          div(v-if="isFixedBudget")
            InputText.m-t-1(v-model="form.fixed_budget" :required="true" :errors="errors.fixed_budget") Fixed Budget
            InputSelect.m-t-1(v-model="form.fixed_payment_schedule" :required="true" :errors="errors.fixed_payment_schedule" :options="fixedPaymentScheduleOptions") Payment Schedule
          div(v-else)
            InputText.m-t-1(v-model="form.hourly_rate" :required="true" :errors="errors.hourly_rate") Hourly Rate
            InputText.m-t-1(v-model="form.estimated_hours" :required="true" :errors="errors.estimated_hours") Estimated Hours
            InputSelect.m-t-1(v-model="form.hourly_payment_schedule" :required="true" :errors="errors.hourly_payment_schedule" :options="hourlyPaymentScheduleOptions") Payment Schedule
          hr
          h3 Role
          InputTextarea.m-t-1(v-model="form.role_details" :required="true" :errors="errors.role_details" :rows="4") Role Details
          InputTextarea.m-t-1(v-model="form.key_deliverables" :required="true" :errors="errors.key_deliverables" :rows="4") Key Deliverables
          h3.m-t-1 Attachments
          .card.m-b-1
            .card-body
              label
                  a.btn.btn-light Upload
                  input.d-none(type="file" accept="application/pdf" @change="pickFile")
              FileUpload(v-if="form.document" :file="fileObject" @delete="removeFile")
      template(#modal-footer="{ hide }")
        a.m-r-1.btn(@click="hide") Cancel
        button.btn.btn-dark(@click="saved") Submit
</template>

<script>
import ProposalMixin from '@/mixins/ProposalMixin'
import {
  PRICING_TYPES_OPTIONS,
} from '@/common/ProjectInputOptions'

const FIXED_BUDGET = Object.keys(PRICING_TYPES_OPTIONS)[0]
const HOURLY_RATE = Object.keys(PRICING_TYPES_OPTIONS)[1]

const specialAttributes = project => ({
  fixed_payment_schedule: (project && project.pricing_type == "fixed" && project.payment_schedule) || null,
  hourly_payment_schedule: (project && project.pricing_type == "hourly" && project.payment_schedule) || null,
})
const initialForm = (project) => ({
  starts_on: (project && project.starts_on) || null,
  ends_on: (project && project.ends_on ) || null,
  payment_schedule: (project && project.payment_schedule) || null,
  pricing_type: (project && calcPricingType(project)) || null,
  hourly_rate: (project && project.hourly_rate) || null,
  fixed_budget: (project && project.fixed_budget) || null,
  estimated_hours: null,
  key_deliverables: null,
  role_details: null,
  document: null,
  status: 'published',
  ...specialAttributes(project)
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
  props: {
    project: {
      type: Object
    },
    applicationId: {
      type: Number,
      required: true
    },
    proposal: {
      type: Object
    }
  },
  data() {
    return {
      form: initialForm(this.proposal)
    }
  },
  methods: {
    async saved() {
      this.validate()
      if (Object.keys(this.errors).length > 0) return
      const formData = this.submitData()
      if (!this.form.document) {
        formData.append('document', null)
      } else {
        if (!this.form.document.lastModified) formData.delete('document')
      }
      const res = await this.$store.dispatch('projects/updateProposal', { projectId: this.projectId, id: this.applicationId, data: formData})
      if (res && res['prerequisites']) {
        this.toast('Error', res['prerequisites'][0], true)
      } else {
        this.$store.commit('projects/SET_CURRENT_PROPOSAL', res)
        this.$bvModal.hide('EditProposalModal')
        this.toast('Success', 'Proposal has been submitted.')
      }
    },
    loaded(result) {
      Object.assign(this.form, { ...result, ...specialAttributes(result) })
      this.form.document = this.proposal.attachment
    },
    initialForm,
    calcPricingType
  },
  computed: {
    attachmentUrl() {
      if (!this.proposal.attachment.url) return ''
      const isDevEnv = this.$store.getters.isDevEnv
      if (isDevEnv) return `${this.$store.getters.backendUrl}/${this.proposal.attachment.url}`
      return this.proposal.attachment.url
    }
  },
}
</script>
