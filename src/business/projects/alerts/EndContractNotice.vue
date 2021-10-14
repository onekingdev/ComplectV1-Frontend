<template lang="pug">
  .alert.alert-info(v-if="isShowNotice")
    h4.alert-heading Contract completion confirmation requested.
    div
      p {{ requester }} has requested to complete the contract early.
      EndContractModal(:project="project" :endRequest="project.end_request" @saved="approveEndContract()" @rating="ratingCallback()" @errors="$emit('errors', $event)" :right="false")
        button.btn.btn-light Approve
      button.btn.btn-light.m-l-1(@click="denyEndcontract()") Deny
</template>

<script>
import EndContractModal from '../EndContractModal'

export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    from: {
      type: String,
      required: true
    }
  },
  computed: {
    url() {
      return '/api/business/projects/' + this.project.id + '/ends/' + this.project.end_request.id
    },
    requester() {
      if (!this.project.end_request) return ''
      const endRequest = this.project.end_request
      if (endRequest.requester === 'Business') return this.project.business.business_name
      if (endRequest.requester === 'Specialist') return `${this.project.specialist.first_name} ${this.project.specialist.last_name}`
      return ''
    },
    isShowNotice() {
      if (!this.project.end_request) return false
      return this.project.end_request.requester === this.from
    }
  },
  methods: {
    async approveEndContract() {
      this.toast('Success', 'Contract early termination request has been approved.')
    },
    async denyEndcontract() {
      const payload = {
        projectId: this.project.id,
        endRequestId: this.project.end_request.id,
        params: { deny: true }
      }
      const res = await this.$store.dispatch('projects/updateEndContract', payload)
      if (res && res.success) {
        this.toast('Success', 'Contract early termination request has been denied.')
        this.$emit('deny')
      } else {
        this.toast('Error', 'Contract early termination request has not been denied. Please try again.')
      }
    },
    ratingCallback() {
      this.$emit('saved')
    }
  },
  components: {
    EndContractModal
  }
}
</script>
