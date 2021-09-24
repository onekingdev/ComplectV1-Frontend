<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" :title="taskId ? task.body : 'New task'" :size="taskId ? 'xl' : 'md'" @show="resetTask")
      b-row
        div(:class="taskId ? 'col-lg-6 pr-2' : 'col'")
          InputText(v-model="task.body" :errors="errors.body" placeholder="Name") Task Name

          Get(v-if="isBusiness" v-bind="optionsToFetch"): template(v-slot="{projects,reviews,policies,exams, specialists, team_members}")
            label.m-t-1.form-label Link to
            ComboBox(:value="linkToValue" @input="inputLinkTo" :options="linkToOptions(projects, reviews, policies, exams)" placeholder="Select projects, internal reviews, or policies to link the task to" :tree-props="{ disableBranchNodes: true }")
            .form-text.text-muted Optional
            Errors(:errors="errors.linkable_type || errors.linkable_id")

            label.m-t-1.form-label Assignee
            ComboBox(:value="assigneeValue" @input="inputAssigneeTo" :options="assigneeOptions(specialists, team_members)" placeholder="Select an assignee" :tree-props="{ disableBranchNodes: true }")
            .form-text.text-muted Optional
            Errors(:errors="errors.assignee")

          b-row.m-t-1(no-gutters)
            .col-sm.m-r-1
              label.form-label.required Start Date
              DatePicker(v-model="task.remind_at" :options="datepickerOptions")
              Errors(:errors="errors.remind_at")
            .col-sm
              label.form-label.required Due Date
              DatePicker(v-model="task.end_date" :options="datepickerOptions")
              Errors(:errors="errors.end_date")

          b-row.m-t-1(no-gutters)
            .col-sm
              label.form-label Repeats
              Dropdown(v-model="task.repeats" :options="repeatsOptions")
            //- Daily
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_DAILY")
              label.form-label Every
              input.form-control(type="number" min="1" max="1000" step="1" v-model="task.repeat_every")
              .form-text Day(s)
            //- Weekly
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_WEEKLY")
              label.form-label Every
              input.form-control(type="number" min="1" max="1000" step="1" v-model="task.repeat_every")
              .form-text Week(s)
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_WEEKLY")
              label.form-label Day
              Dropdown(v-model="task.repeat_on" :options="daysOfWeek")
            //- Monthly
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_MONTHLY")
              label.form-label Every
              input.form-control(type="number" min="1" max="1000" step="1" v-model="task.repeat_every")
              .form-text Month(s)
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_MONTHLY")
              label.form-label On
              Dropdown(v-model="task.on_type" :options="['Day', 'First', 'Second', 'Third', 'Fourth']")
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_MONTHLY")
              label.form-label Day
              input.form-control(v-model="task.repeat_on" v-if="task.on_type === 'Day'" type="number" min="1" max="31" step="1")
              Dropdown(v-model="task.repeat_on" v-else :options="daysOfWeek")
            //- Yearly
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_YEARLY")
              label.form-label Every
              Dropdown(v-model="task.repeat_every" :options="months")
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_YEARLY")
              label.form-label On
              Dropdown(v-model="task.on_type" :options="['Day', 'First', 'Second', 'Third', 'Fourth']")
            .col-sm.m-l-1(v-if="task.repeats === repeatsValues.REPEAT_YEARLY")
              label.form-label Day
              input.form-control(v-model="task.repeat_on" v-if="task.on_type === 'Day'" type="number" min="1" max="31" step="1")
              Dropdown(v-model="task.repeat_on" v-else :options="daysOfWeek")
          Errors(:errors="errors.repeats || errors.repeat_every || errors.repeat_on || errors.on_type")

          b-row(v-if="task.repeats" no-gutters)
            .col-sm-6.m-r-1
              label.form-label End By Date
              DatePicker(v-model="task.end_by")
              Errors(:errors="errors.end_by")

          InputTextarea.m-t-1(v-model="task.description" :rows="taskId ? 7 : 3" :errors="errors.description") Description
          .form-text.text-muted Optional

        .col-lg-6.pl-2(v-if="taskId")
          .card-body.white-card-body.messages-border.h-100.p-0
            b-tabs.special-navs-messages(content-class="m-20" class="p-0")
              b-tab(title="Comments" ref="comments" active)
                b-row
                  .col.text-center
                    Get(:messages="`/api/reminders/${taskId}/messages`" :etag="etagMessages"): template(v-slot="{ messages }"): .card-body.p-0
                      Messages(:messages="messages" ref="Messages" @created="scrollMessages")
              b-tab(title="Files")
                //- @todo restrict deletion for specialist/by condition
                b-row
                  .col
                    .card-body.p-0
                      b-form-group
                        label
                          a.btn.btn-default Upload
                          input(type="file" name="file" @change="onFileChanged" style="display: none")
                        Get(:documents="url" :etag="etag" :callback="filterMessagesWithUploads"): template(v-slot="{documents}")
                          .row(v-for="document in documents" :key="document.id"): .col-md-12.m-b-1
                            .file-card
                              div
                                b-icon.file-card__icon(icon="file-earmark-text-fill")
                              .ml-0.mr-auto
                                p.file-card__name {{ document.file_name }}
                                a.file-card__link.link(v-download="document") Download
                              .ml-auto.my-auto.align-self-start.actions
                                b-dropdown(size="sm" class="m-0 p-0" right)
                                  template(#button-content)
                                    b-icon(icon="three-dots")
                                  b-dropdown-item.delete Delete
            hr.m-0
            b-row
              .col
                .card-body.p-20.position-relative
                  label.form-label Comment
                  textarea-autosize.w-100.form-control.d-block(v-model="message.message" :min-height="100")
                  Errors(:errors="messageErrors.message")
                  Post(:action="`/api/reminders/${taskId}/messages`" :model="{ message }" @errors="messageErrors = $event" @saved="messageSaved")
                    button.btn.btn-primary.save-comment-btn Send

      template(v-if="!taskId" slot="modal-footer")
        .d-flex.justify-content-between
          div
            button.btn.btn-link.m-r-1(@click="$bvModal.hide(modalId)") Cancel
            button.btn.btn-dark(@click="submit()") Create
      template(v-if="task.done_at && taskId" slot="modal-footer")
        span.mr-2
          b-icon.m-r-1.pointer(icon="check-circle-fill" class="done_task")
          b Completed on {{ task.done_at | asDate }}
        button.btn.btn-default(@click="toggleDone(task)") Mark as Incomplete

      template(v-else-if="taskId" slot="modal-footer")
        TaskDeleteConfirmModal.mr-auto(v-if="null === occurenceId" :inline="false" @deleteConfirmed="deleteTask(task)")
          button.btn.btn-outline-danger Delete Task
        b-dropdown.mr-auto(v-else-if="taskId" variant="outline-danger" text="Delete Task")
          TaskDeleteConfirmModal(:inline="false" @deleteConfirmed="deleteTask(task, true)")
            b-dropdown-item Delete Occurence
          TaskDeleteConfirmModal(:inline="false" @deleteConfirmed="deleteTask(task)")
            b-dropdown-item Delete Series
        button.btn.btn-default(@click="toggleDone(task)") Mark as Complete
        button.btn.btn-dark(v-if="!taskId" @click="submit()") Save
        button.btn.btn-dark(v-else-if="null === occurenceId" @click="submit(true)") Save
        b-dropdown.font-weight-bold(v-else variant="dark" text="Save")
          b-dropdown-item(@click="submit(true)") Save Occurence
          b-dropdown-item(@click="submit()") Save Series
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { DateTime } from 'luxon'
import { splitReminderOccurenceId } from '@/common/TaskHelper'
import Messages from '@/common/Messages'
import EtaggerMixin from '@/mixins/EtaggerMixin'
import TaskDeleteConfirmModal from './TaskDeleteConfirmModal'

const rnd = () => Math.random().toFixed(10).toString().replace('.', '')
const toOption = id => ({ id, label: id })
const index = (text, i) => ({ text, value: 1 + i })

const initialTask = defaults => ({
  body: null,
  linkable_id: null,
  linkable_type: null,
  assignee_type: null,
  assignee_id: null,
  remind_at: null,
  end_date: null,
  end_by: null,
  repeats: REPEAT_NONE,
  repeat_every: null,
  repeat_on: null,
  on_type: null,
  description: "",
  ...(defaults || {})
})

const REPEAT_NONE = null,
  REPEAT_DAILY = 'Daily',
  REPEAT_WEEKLY = 'Weekly',
  REPEAT_MONTHLY = 'Monthly',
  REPEAT_YEARLY = 'Yearly',
  REPEAT_LABELS = {
    [REPEAT_NONE]: 'Does not repeat',
    [REPEAT_DAILY]: 'Daily',
    [REPEAT_WEEKLY]: 'Weekly',
    [REPEAT_MONTHLY]: 'Monthly',
    [REPEAT_YEARLY]: 'Yearly',
  },
  REPEAT_OPTIONS = [REPEAT_NONE, REPEAT_DAILY, REPEAT_WEEKLY, REPEAT_MONTHLY, REPEAT_YEARLY]

export default {
  mixins: [
    EtaggerMixin(),
    EtaggerMixin('etagMessages'),
  ],
  props: {
    id: String,
    taskId: Number,
    occurenceId: Number,
    remindAt: String,
    inline: {
      type: Boolean,
      default: true
    },
    defaults: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      modalId: this.id || `modal_${rnd()}`,
      task: initialTask(this.defaults),
      errors: [],
      message: {
        message: null
      },
      messageErrors: {},
    }
  },
  methods: {
    ...mapActions({
        getEmployees: 'settings/getEmployees',
        getEmployeesSpecialists: 'settings/getEmployeesSpecialists',
    }),
    async onFileChanged(event) {
      const file = event.target.files && event.target.files[0],
        store = this.$store
      const uploadFile = async function(url, file) {
        const formData  = new FormData()
        formData.append('message[file]', file)
        formData.append('message[message]', '')
        return await fetch(store.getters.backendUrl+url, {
          method: 'POST',
          body: formData,
          ...store.getters.authHeaders
        })
      }
      if (file) {
        const success = (await uploadFile(this.url, file)).ok
        const message = success ? 'Document has been uploaded.' : 'Document has not been uploaded.'
        this.toast('Document has not been uploaded.', message, !success)
        this.newEtag()
      }
    },
    filterMessagesWithUploads(messages) {
      return messages.filter(message => message.file_url && message.file_name)
    },
    messageSaved() {
      this.toast('Comment sent')
      this.newEtagMessages()
      this.message.message = null
      this.messageErrors = {}
      this.scrollMessages()
    },
    scrollMessages() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.Messages.$refs.MessagesContainer
        messagesContainer && setTimeout(() => messagesContainer.scrollTop = messagesContainer.scrollHeight, 500)
      })
    },
    linkToOptions(projects, reviews, policies, exams) {
      const mapLinkProperty = (property, type) => ({ [property]: label, id }) => ({ id: `${type}|${id}`, label }),
        optionsBranch = (label, items, type, property) => ({ ...toOption(label), children: items.map(mapLinkProperty(property, type)) })
      return [
        optionsBranch('Projects', projects || [], 'LocalProject', 'title'),
        optionsBranch('Internal Reviews', reviews || [], 'AnnualReport', 'name'),
        optionsBranch('Policies', policies || [], 'CompliancePolicy', 'name'),
        optionsBranch('Exams', exams || [], 'Exam', 'name'),
      ]
    },
    inputLinkTo(value) {
      const [type, id] = value.split('|')
      this.task.linkable_type = type
      this.task.linkable_id = id
    },
    inputAssigneeTo(value) {
      const [type, id] = value.split('|')
      this.task.assignee_type = type
      this.task.assignee_id = id
    },
    assigneeOptions(specialists, team_members) {
      const specialistsOptions = specialists.map((item) => {
        return {
          id: `Specialist|${item.id}`,
          label: `${item.first_name} ${item.last_name}`
        }
      })
      const teamMemberOptions = team_members.filter(item => item.active).map((item) => {
        return {
          id: `TeamMember|${item.id}`,
          label: `${item.first_name} ${item.last_name}`
        }
      })
      return [
        { id: 'Specialists', label: 'Specialists', children: specialistsOptions},
        { id: 'Team member', label: 'Team member', children: teamMemberOptions},
      ]
    },
    deleteTask(task, deleteOccurence) {
      const occurenceParams = deleteOccurence ? `?oid=${this.occurenceId}` : ''
      fetch(this.$store.getters.backendUrl + '/api/reminders/' + this.taskId + occurenceParams, {
        method: 'DELETE',
        ...this.$store.getters.authHeaders
      }).then(response => {
        if (response.status === 204 || response.status === 200) {
          this.$emit('deleted')
          this.toast('Success', 'Task has been deleted.')
          this.$bvModal.hide(this.modalId)
        } else {
          console.error(response.status)
          this.toast('Error', 'Task has not been deleted. Please try again.', true )
        }
      })
    },
    async toggleDone(task) {
      const fixedId = task.id
      const { taskId, oid } = splitReminderOccurenceId(task.id)
      const oidParam = oid !== null ? `&oid=${oid}` : ''                               // BACK RETURNS 404 with this
      let target_state = (!(!!task.done_at)).toString()

      try {
        await this.$store.dispatch('reminders/updateTaskStatus', { fixedId, id: taskId, done: target_state, oidParam })
          .then(response => {
            this.$bvModal.hide(this.modalId)
            this.toast('Success', this.task.done_at && this.taskId ? 'Task has been marked as incomplete.' : 'Task has been marked as complete.')
          })
          .catch(error => this.toast('Error', this.task.done_at && this.taskId ? 'Task has not been marked as incomplete. Please try again.' : 'Task has not been marked as complete. Please try again.', true ))
      } catch (error) {
        this.toast('Error', `${error.message}`, true)
      }
    },
    validate() {
      this.errors = {}
      if (this.task.remind_at && this.task.end_date) {
        if (this.task.remind_at > this.task.end_date) this.$set(this.errors, 'end_date', ['Date must not occur before start date'])
      }
    },
    createNewTask(saveOccurence) {
      const toId = (!saveOccurence && this.taskId) ? `/${this.taskId}` : ''
      const occurenceParams = saveOccurence && this.occurenceId ? `?oid=${this.occurenceId}&src_id=${this.taskId}` : ''
      
      fetch(this.$store.getters.backendUrl + '/api/reminders' + toId + occurenceParams, {
        method: 'POST',
        headers: { ...this.$store.getters.authHeaders.headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(this.task)
      }).then(response => {
        if (response.status === 422) {
          response.json().then(errors => this.errors = errors.errors)
        } else if (response.status === 201 || response.status === 200) {
          this.$emit('saved')
          this.toast('Success', this.taskId ? 'Task has been updated.' : 'Task has been created.')
          this.$bvModal.hide(this.modalId)
          this.resetTask()
        } else {
          this.toast('Error', this.taskId ? 'Task has not been updated. Please try again.' : 'Task has not been created. Please try again.')
        }
      })
    },
    updateTask() {
      const data = {
        id: this.taskId,
        task: {
          ...this.task
        },
      }
      this.$store.dispatch("reminders/updateTask", data)
        .then(res => {
          if (res) {
            this.toast('Success', 'Task has been updated.')
            this.$emit('saved')
            this.$bvModal.hide(this.modalId)
          }
        })
        .catch(error => this.toast('Error', 'Task has not been updated. Please try again.'))
    },
    submit(saveOccurence) {
      this.validate()
      if (Object.keys(this.errors).length > 0) return
      if (this.taskId) {
        this.updateTask()
        return
      }
      this.createNewTask(saveOccurence)
    },
    resetTask() {
      if (this.taskId) {
        fetch(`${this.$store.getters.backendUrl}/api/reminders/${this.taskId}`, {
          method: 'GET',
          ...this.$store.getters.authHeaders
        }).then(response => response.json())
          .then(result => this.task = result)
      } else {
        const withRemindAt = this.remindAt ? { remind_at: this.remindAt } : {}
        this.task = initialTask({ ...this.defaults, ...withRemindAt })
      }
    }
  },
  computed: {
    ...mapGetters({
      employees: 'settings/employees',
      employeesSpecialists: 'settings/employeesSpecialists'
    }),
    linkToValue() {
      return this.task.linkable_type && this.task.linkable_id ? `${this.task.linkable_type}|${this.task.linkable_id}` : null
    },
    assigneeValue() {
      return this.task.assignee_type && this.task.assignee_id ? `${this.task.assignee_type}|${this.task.assignee_id}` : null
    },
    url() {
      return `/api/reminders/${this.taskId || ''}/messages`
    },
    optionsToFetch() {
      return this.isBusiness
        ? {
            projects: '/api/local_projects',
            reviews: '/api/business/annual_reports',
            policies: '/api/business/compliance_policies',
            exams: '/api/business/exams',
            specialists: '/api/business/team_members/specialists',
            team_members: '/api/business/team_members'
          }
        : {}
    },
    daysOfWeek() {
      return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(index)
    },
    months() {
      return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(index)
    },
    repeatsValues() {
      return {REPEAT_NONE, REPEAT_DAILY, REPEAT_WEEKLY, REPEAT_MONTHLY, REPEAT_YEARLY}
    },
    repeatsOptions: () => REPEAT_OPTIONS.map(value => ({ value, text: REPEAT_LABELS[value] })),
    isBusiness() {
      return 'business' === this.$store.getters.appModule
    },
    datepickerOptions() {
      return {
        min: new Date().toISOString()
      }
    },
    editorToolbar() {
      return [["bold", "italic", "underline"], ["blockquote"], [{ list: "bullet" }], ["link"]]
    }
  },
  watch: {
    'task.remind_at': {
      handler: function(value, oldVal) {
        const start = DateTime.fromSQL(value), end = DateTime.fromSQL(this.task.end_date)
        if (!start.invalid && (end.invalid || (end.startOf('day') < start.startOf('day')))) {
          this.task.end_date = value
        }
      }
    },
  },
  components: {
    Messages,
    TaskDeleteConfirmModal,
  },
  // async mounted() {
  //     try {
  //       await this.getEmployees()
  //       await this.getEmployeesSpecialists()
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  }
</script>


<style>
.modal-footer .btn.dropdown-toggle {
  font-weight: bold
}
</style>