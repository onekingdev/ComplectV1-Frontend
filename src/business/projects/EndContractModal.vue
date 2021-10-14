<template lang="pug">
  div.d-inline-block(:class="{ 'float-right': right }")
    div.d-inline-block(v-b-modal="modalId"): slot
    b-modal.fade(:id="modalId" title="End Contract" no-stacking)
      .row.m-b-20
        .col-md-1.text-center.px-0
          b-icon.mt-1.ml-3(icon="exclamation-triangle-fill" scale="1.5" variant="warning")
        .col
          p.paragraph.m-b-10 Ending this contract will remove this specialist as a collaborator to the project, revoke their permissions to access your account, and payout the full contract price.
          p.paragraph.mb-0
            b Do you want to continue?
      .card
        .card-title.p-20
          UserAvatar(:user="project.specialist")
          .d-block.ml-3
            h5.mb-0.link {{ project.specialist.first_name }} {{project.specialist.last_name }}
            p.mb-0 {{ project.specialist.location }}
          .d-block.ml-auto.text-right
            span Outstanding Due
            h4 {{ totalFee | usdWhole }}
        .card-body
          dl.row.mb-0
            dt.col-sm-3.label Job Name
            dd.col-sm-9.text-right {{ project.title }}
          dl.row.mb-0
            dt.col-sm-3.label Payment Schedule
            dd.col-sm-9.text-right {{ readablePaymentSchedule(project.payment_schedule) }}
          dl.row.mb-0
            dt.col-sm-3.label Payment Method
            dd.col-sm-9.text-right Transfer to Visa
        .card-footer.bg-white
          p.text-right.text-muted.mb-0 *This total does not reflect processing fees.
      template(#modal-footer="{ hide }")
        button.btn.btn-link(@click="hide") Cancel
        Post(:action="confirmUrl" :model="params" :method="confirmMethod" @saved="contractEnded" @errors="$emit('errors', $event)")
          button.btn.btn-dark Confirm
    b-modal(:id="modalId + '_review'" title="Write a Review")
      p Please rate your experience and review your experience with the {{ targetUser }}.
      InputRating(v-model="review.value" :errors="errors.value") Rating
      InputTextarea(v-model="review.review" :errors="errors.review" placeholder="Describe your overall experience and any notes regarding the engagement")
      template(#modal-footer="{ hide }")
        button.btn.btn-link(@click="hide") Cancel
        button.btn.btn-dark(v-if="review.value === null" title="Please rate your experience" disabled) Submit
        Post(v-else :action="ratingUrl" :model="review" @saved="ratingSaved" @errors="submitErrors")
          button.btn.btn-dark Submit
</template>

<script>
import { readablePaymentSchedule } from '@/common/ProposalFields'

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    endRequest: {
      type: Object,
      required: false
    },
    right: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      modalId: 'EndContractModal_' + Math.random().toFixed(12).replace('.', ''),
      review: {
        value: null,
        review: null
      },
      errors: {}
    }
  },
  methods: {
    readablePaymentSchedule,
    submitErrors(errors) {
      this.errors = errors
    },
    contractEnded() {
      this.$emit('saved')
      this.$bvModal.hide(this.modalId)
      this.$bvModal.show(this.modalId + '_review')
    },
    ratingSaved() {
      this.$bvModal.hide(this.modalId + '_review')
      this.toast('Success', 'Thank you for your rating.')
      this.$emit('rating')
    }
  },
  computed: {
    targetUser() {
      const userType = this.$store.getters.userType
      if (userType === 'specialists') return 'business'
      return 'specialist'
    },
    submitDisabled() {
      const threeOrLessStars = this.review.value && this.review.value <= 3,
        emptyReview = this.review.review === null || this.review.review === ''
      return this.review.value === null || (threeOrLessStars && emptyReview)
    },
    confirmMethod() {
      if (this.endRequest) return 'PATCH'
      return 'POST'
    },
    params() {
      if (this.endRequest) return { confirm: true }
      return {}
    },
    confirmUrl() {
      if (this.endRequest) return `/api/projects/${this.project.id}/end/${this.endRequest.id}`
      return this.completeUrl
    },
    completeUrl() {
      return '/api/projects/' + this.project.id + '/end'
    },
    ratingUrl() {
      return '/api/projects/' + this.project.id + '/rating'
    },
    timeSheetHours() {
      if (this.project.timesheets.length < 1) return 0
      const approvedTimesheet = this.project.timesheets.filter(item => item.status === 'approved')
      let totalHours = 0
      for(let i = 0; i < approvedTimesheet.length; i++) {
        approvedTimesheet[i].time_logs.forEach(item => totalHours += parseFloat(item.hours))
      }

      return totalHours
    },
    totalFee() {
      if (this.project.pricing_type === 'fixed') return parseInt(this.project.fixed_budget)
      if (this.project.pricing_type === 'hourly') return (this.timeSheetHours * parseFloat(this.project.hourly_rate)).toFixed(2)
      return 0
    }
  }
}
</script>
