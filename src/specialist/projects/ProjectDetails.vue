<template lang="pug">
  div
    .card-body
      h4.semibold-text.mb-4.mt-3 Project Details
      h5 {{ project.title }}
      dl.row.m-t-2
        dt.col-sm-3 Location
        dd.col-sm-9 {{ location }}
        dt.col-sm-3 Industry
        dd.col-sm-9 {{ project.industries | names }}
        dt.col-sm-3 Start Date
        dd.col-sm-9 {{ project.starts_on | asDate }}
        dt.col-sm-3 End Date
        dd.col-sm-9 {{ project.ends_on | asDate }}
        dt.col-sm-3 Min. Experience
        dd.col-sm-9 {{ experience }}
        dt.col-sm-3 Description
        dd.col-sm-9 {{ project.description }}
        dt.col-sm-3 Role Details
        dd.col-sm-9 {{ project.role_details }}
      ProjectFigures(:project="project")
    hr(v-if="project.skills && project.skills.length > 0")
    .card-body.pb-4(v-if="project.skills && project.skills.length > 0")
      h4.m-t-1.semibold-text.py-2 Skills
      p
        .badge.badge-default.m-r-1(v-for="skill in project.skills") {{ skill.name }}
    hr.mt-5
    .card-body
      h4.m-t-1.semibold-text.py-2 Client Details
      ClientDetails(:business="project.business")
</template>

<script>
import ClientDetails from './ClientDetails'
import ProjectFigures from './ProjectFigures'
const EXPERIENCES = {
  '0': 'Junior',
  '1': 'Intermediate',
  '2': 'Expert'
}

const LOCATION_TYPES = {
  'remote': 'Remote',
  'remote_and_travel': 'Remote + Travel',
  'onsite': 'Travel'
}
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    location() {
      if (!this.project) return ''
      return `${LOCATION_TYPES[this.project.location_type]}, ${this.project.location}`
    },
    experience() {
      if (!this.project) return ''
      return EXPERIENCES[this.project.minimum_experience]
    }
  },
  components: {
    ClientDetails,
    ProjectFigures
  }
}
</script>
<style scoped>
/deep/ .card-body {
  padding: 0 1.875rem !important;
}
</style>
