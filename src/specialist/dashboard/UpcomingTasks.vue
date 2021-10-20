<template lang="pug">
  div
    .card-header.d-flex.justify-content-between
      h3.upcoming__header.m-y-0 Upcoming
      TaskFormModal(@saved="$emit('saved')")
        button.btn.btn-dark.float-end New Task
    .card-body.p-x-20.p-y-30
      b.upcoming__title.d-flex.justify-content-between.m-b-10(role="button" v-b-toggle.upcoming_tasks_collapse="")
        | Tasks
        ion-icon(name="chevron-down-outline")
      b-collapse#upcoming_tasks_collapse(:visible="true")
        TaskTable.upcoming__table(:tasks="tasks" :shortTable="true" @saved="$emit('saved')")
        .d-flex.justify-content-end.mb-2(v-if="tasks.length")
          router-link.link.upcoming__more(:to='moreTaskUrl') More
      b.upcoming__title.d-flex.justify-content-between.m-b-10(role="button" v-b-toggle.upcoming_projects_collapse="")
        | Projects
        ion-icon(name="chevron-down-outline")
      b-collapse#upcoming_projects_collapse(:visible="true")
        ProjectTable(:projects="projects")
        .d-flex.justify-content-end(v-if="projects.length")
          router-link.link.upcoming__more(:to='moreProjectUrl') More
</template>

<script>
const LIMIT_OF_ARRAY_TASKS = 10
const LIMIT_OF_ARRAY_PROJECTS = 5

const endpointUrl = '/api/reminders/'
const overdueEndpointUrl = '/api/overdue_reminders'

import TaskTable from '@/common/TaskTable'
import ProjectTable from './ProjectTable'
import TaskFormModal from '@/common/TaskFormModal'
import { DateTime } from 'luxon'

export default {
  props: {
    etag: Number
  },
  data() {
    return {
      tasks: [],
      projects: []
    }
  },
  created() {
    this.refetch()
  },
  computed: {
    userType() {
      return localStorage.getItem('app.currentUser.seatRole')
    },
    moreTaskUrl() {
      return this.userType ? '/business/reminders' : '/specialist/reminders'
    },
    moreProjectUrl() {
      return this.userType ? '/business/projects' : '/specialist/my-projects'
    }
  },
  methods: {
    refetch() {
      const fromTo = DateTime.local().startOf('week').toSQLDate() + '/' + DateTime.local().endOf('week').toSQLDate()

      let tasks = []
      let projects = []

      const headers = this.$store.getters.authHeaders.headers
      const business_id = window.localStorage["app.business_id"]
      if (business_id) headers.business_id = JSON.parse(business_id)

      fetch(this.$store.getters.backendUrl + overdueEndpointUrl, {headers: headers})
        .then(response => response.json())
        .then(result => {
          tasks = result.tasks
        }).then(fetch(`${this.$store.getters.backendUrl}${endpointUrl}${fromTo}?upcoming_tab=true`, this.$store.getters.authHeaders)
        .then(response => response.json())
        .then(result => {
          tasks = tasks.concat(result.tasks)
          projects = result.projects
          this.tasks = tasks.filter(task => !task.done_at)
          this.projects = projects.slice(0, LIMIT_OF_ARRAY_PROJECTS)
        })
      )
    },
  },
  components: {
    TaskFormModal,
    TaskTable,
    ProjectTable
  },
  watch: {
    etag: {
      handler: function(newVal, outline) {
        this.refetch()
      }
    }
  }
}
</script>
