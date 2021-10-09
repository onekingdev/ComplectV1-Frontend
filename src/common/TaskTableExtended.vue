<template lang="pug">
  .policy-details.position-relative
    h3.policy-details__title Tasks
    .policy-actions
      TaskFormModal(:defaults="taskDefaults" v-if="createButton" @saved="$emit('saved')" :businessId="businessId || 0")
        button.btn.btn-dark New Task
    .policy-details__body
      table.table.task_table
        thead
          tr
            th(width="45%")
              span.pointer(@click="toggleSorting('body')")
                | Name
                b-icon.ml-2(icon='chevron-expand')
            th
              span.pointer(@click="toggleSorting('assignee_name')")
                | Assignee
                b-icon.ml-2(icon='chevron-expand')
            th
              span.pointer(@click="toggleSorting('remind_at')")
                | Start Date
                b-icon.ml-2(icon='chevron-expand')
            th
              span.pointer(@click="toggleSorting('end_date')")
                | Due Date
                b-icon.ml-2(icon='chevron-expand')
            th(width="35px")
        tbody.text-dark(v-if="tasksSorted && tasksSorted.length")
          tr(v-for="task in tasksSorted" :key="task.id")
            td
              b-icon.pointer.m-r-1(font-scale="1" :icon="task.done_at ? 'check-circle-fill' : 'check-circle'" @click="toggleDone(task)" v-bind:class="{ done_task: task.done_at }")
              TaskFormModal.link(:id="taskFormModalId(task)" :task-id="task.id" :businessId="businessId || 0" @saved="$emit('saved')")
                span(v-if="!task.done_at" ) {{ task.body }}
                s(v-else) {{ task.body }}
            td {{ task.assignee_name || '' }}
            td {{ task.remind_at | asDate }}
            td {{ task.end_date | asDate }}
            td.actions
              b-dropdown(size="sm" variant="light" class="m-0 p-0" right)
                template(#button-content)
                  b-icon(icon="three-dots")
                b-dropdown-item-button(v-b-modal="taskFormModalId(task)") Edit
                TaskDeleteConfirmModal(:id="taskDeleteConfirmModalId(task)" @deleteConfirmed="deleteTask(task)")
                  b-dropdown-item-button Delete
      EmptyState(v-if="!loading && !tasksSorted.length")
</template>

<script>
import Loading from '@/common/Loading/Loading'
import TaskFormModal from '@/common/TaskFormModal'
import TaskDeleteConfirmModal from '@/common/TaskDeleteConfirmModal'
import EtaggerMixin from '@/mixins/EtaggerMixin'
import axios from '@/services/axios'

export default {
  mixins: [EtaggerMixin()],
  props: {
    tasks: {
      type: Array,
      required: true
    },
    taskDefaults: {
      type: Object,
      default: () => ({})
    },
    createButton: {
      type: Boolean,
      default: true
    },
    businessId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      sortField: null,
      sortDirection: 1
    }
  },
  methods: {
    async toggleDone(task) {
      let target_state = (!(!!task.done_at)).toString()
      try {
        await this.$store.dispatch('reminders/updateTaskStatus', { id: task.id, done: target_state })
          .then(response => {
            const text = task.done_at ? 'Task has been marked as incomplete.' : 'Task has been marked as complete.'
            this.toast('Success', text)
            this.$emit('saved')
          }).catch(error => {
            this.toast('Error', task.done_at ? 'Task has not been marked as incomplete. Please try again.' : 'Task has not been marked as complete. Please try again.', true )
          })
      } catch (error) {
        console.error('error catch in task Item', error)
        this.toast('Error', `${error.message}`, true)
      }
    },
    toggleSorting(field, startDescending = false) {
      const initialDirection = startDescending ? -1 : 1
      this.sortDirection = this.sortField === field ? -1 * this.sortDirection : initialDirection
      this.sortField = field
    },
    async deleteTask({ id }) {
      try {
        await axios.delete(`/reminders/${id}`)
        this.toast('Success', 'Task has been deleted.')
        this.$emit('saved')
      } catch (e) {
        this.toast('Error', 'Task has not been deleted. Please try again.', true)
      }
    },
    taskFormModalId: task => `TaskFormModal_${task.id}`,
    taskDeleteConfirmModalId: task => `TaskDeleteConfirmModal_${task.id}`,
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    tasksSorted() {
      if (this.sortField) {
        const compare = (aField, bField) => {
          const [a, b] = [aField[this.sortField], bField[this.sortField]]
          return a > b ? this.sortDirection : (a < b ? (this.sortDirection * -1) : 0)
        }
        return this.tasks.sort(compare)
      }
      return this.tasks
    }
  },
  components: {
    Loading,
    TaskFormModal,
    TaskDeleteConfirmModal,
  },
}
</script>

<style>
  @import "../business/policies/styles.css";
</style>
