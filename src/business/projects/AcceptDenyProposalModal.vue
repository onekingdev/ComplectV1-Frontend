<template lang="pug">
  b-modal.fade(:id="id" title="Set Role")
    p.fs-14 Please confirm the applicant you wish to hire.
    .card
      .card-body
        SpecialistDetails(:specialist="application.specialist")
        InputSelect.m-t-1(v-model="role" :options="specialistRoleOptions") Select Role
        .form-text.text-muted Determines the permissions to grant the specialist
    template(#modal-footer="{ hide }")
      button.btn.btn-link(@click="hide") Cancel
      Post(:action="hireUrl + '?job_application_id=' + application.id" :model="{role}" @saved="$emit('saved', application.project.local_project_id, role)")
        button.btn.btn-dark Confirm
</template>

<script>
import SpecialistDetails from './SpecialistDetails'
import { SPECIALIST_ROLE_OPTIONS } from '@/common/ProjectInputOptions'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    application: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      role: Object.keys(SPECIALIST_ROLE_OPTIONS)[0]
    }
  },
  computed: {
    specialistRoleOptions: () => SPECIALIST_ROLE_OPTIONS,
    hireUrl() {
      return this.$store.getters.url('URL_API_PROJECT_HIRES', this.application.project.id)
    }
  },
  components: {
    SpecialistDetails
  }
}
</script>
