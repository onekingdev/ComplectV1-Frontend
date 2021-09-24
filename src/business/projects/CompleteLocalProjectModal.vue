<template lang="pug">
  .d-inline-block
    button.btn.btn-dark(v-b-modal="'CompleteLocalProjectModal'") Mark as Complete
    b-modal#CompleteLocalProjectModal.fade(title="Complete Project" :hide-footer="!!hasSpecialist")
      .row(v-if="hasSpecialist")
        col-md-1.text-center.px-0
          b-icon.mt-1.ml-3(icon="exclamation-triangle-fill" width="25" height="25" variant="warning")
        .col
          p.paragraph.m-b-10 The project can't be completed because there is still a contract in progres. To continue, please end the contract with:
          p.paragraph.mb-0
            b strong {{ specialistName }}
      .row(v-else)
        .col-md-1.text-center.px-0
          b-icon.mt-1.ml-3(icon="check-circle-fill" width="25" height="25" variant="success")
        .col
          p.paragraph.m-b-10 This will mark the project as complete and close the project to further edits.
          p.paragraph.mb-0
            b Do you want to continue?

      template(#modal-footer="{ hide }")
        button.btn.btn-link(@click="hide") Cancel
        Put(:action="url" :model="{ status: 'complete' }" @saved="hide(), completed()")
          button.btn.btn-dark Confirm
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    completed() {
      this.toast('Success', 'Project has been marked as complete.')
      this.$emit('saved')
      this.redirect('/business/projects')
    }
  },
  computed: {
    url() {
      return '/api/local_projects/' + this.project.id + '/complete'
    },
    hasSpecialist() {
      return this.project.projects[0] && this.project.projects[0].specialist_id && this.project.projects[0].specialist
    },
    specialistName() {
      return this.hasSpecialist && `${this.hasSpecialist.first_name} ${this.hasSpecialist.last_name}`
    }
  }
}
</script>
