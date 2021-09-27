<template lang="pug">
  div
    button.dropdown-item(v-b-modal="'DeleteProjectModal'") Delete
    b-modal#DeleteProjectModal.fade(title="Delete Project")
      .row(v-if="hasSpecialist")
        .col-md-1.text-center.px-0
          b-icon.mt-1.ml-3(icon="exclamation-triangle-fill" variant="warning" width="25" height="25")
        .col
          div
            p.m-b-10 The project cannot be deleted while there is still an active contract in progress. To continue, please end the contract with:
            p.mb-0: strong {{ specialistName }}
      .row(v-else)
        .col-md-1.text-center.px-0
          img.mt-1.ml-3(src='@/assets/error_20.svg' width="25" height="25")
        .col
          div.fs-14
            p This will remove the project and all of its related tasks, documents, and activity from your records.
            p.mb-0: strong Do you want to continue?

      template(#modal-footer="{ hide }")
        button.btn.btn-link(@click="hide") Cancel
        Delete(v-if="!hasSpecialist" :url="deleteUrl" @deleted="deleted")
          button.btn.btn-dark Confirm
</template>

<script>
import { redirectWithToast } from '@/common/Toast'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleted() {
      this.$bvModal.hide('DeleteProjectModal')
      redirectWithToast('/business/projects', 'Project has been deleted.', 'Success')
    }
  },
  computed: {
    hasSpecialist() {
      return this.project.projects[0] && this.project.projects[0].specialist_id && this.project.projects[0].specialist
    },
    specialistName() {
      return this.hasSpecialist && `${this.hasSpecialist.first_name} ${this.hasSpecialist.last_name}`
    },
    deleteUrl() {
      return `/api/local_projects/${this.project.id}`
    }
  }
}
</script>
