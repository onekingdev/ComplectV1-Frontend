<template lang="pug">
  .alert.alert-info(v-if="project.end_request")
    h4.alert-heading Contract completion confirmation requested.
    div(v-if="project.end_request.requester.startsWith('Specialist')")
      p Specialist has requested to complete the contract early.
      EndContractModal(:project="project" @saved="$emit('saved')" @errors="$emit('errors', $event)" :right="false")
        button.btn.btn-light Approve
      button.btn.btn-light.m-l-1(@click="denyEndcontract()") Deny
    div(v-else)
      p You have requested to complete the contract early.
</template>

<script>
import EndContractModal from '../EndContractModal'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    url() {
      return '/api/business/projects/' + this.project.id + '/ends/' + this.project.end_request.id
    }
  },
  methods: {
    async denyEndcontract() {
      const payload = {
        projectId: this.project.id,
        endRequestId: this.project.end_request.id
      }
      const res = await this.$store.dispatch('projects/denyContract', payload)
      if (res && res.success) {
        this.$emit('deny')
      } else {
        this.toast('Error', 'Contract early termination request has not been denied. Please try again.')
      }
    }
  },
  components: {
    EndContractModal
  }
}
</script>
