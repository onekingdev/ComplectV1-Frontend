<template lang="pug">
  div
    b-modal.fade#DenyProposalConfirm(title="Reject Proposal")
      .row
        .col-md-1.text-center.px-0
          b-icon.mt-1.ml-3(icon="exclamation-triangle-fill" variant="warning" width="25" height="25")
        .col
          div
            p.m-b-10 You are rejecting the terms of this proposal. The specialist will be notified and removed from your applicant pool.
            p.mb-0: strong Do you want to continue?

      template(#modal-footer="{ hide }")
        button.btn.btn-link(@click="$emit('back')") Cancel
        Post(:action="denyUrl" :model="{}" @saved="$emit('denied', application.project.local_project_id)")
          button.btn.btn-dark Confirm
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true
    },
    projectId: {
      type: Number,
      required: true
    }
  },
  computed: {
    denyUrl() {
      return `/api/business/projects/${this.projectId}/applications/${this.application.id}/hide`
    }
  }
}
</script>
