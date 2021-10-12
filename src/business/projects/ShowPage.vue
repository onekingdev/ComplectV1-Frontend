<template lang="pug">
  .page.custom-project-layout-style
    Get.d-flex.flex-column.flex-grow-1(:etag="etag" :project="`/api/local_projects/${projectId}`" currentBusiness="/api/businesses/current"): template(v-slot="{project,currentBusiness}")
      Get(v-if="project.visible_project" :applications="applicationsUrl(project.visible_project.id)" :callback="setApplications")
      CommonHeader(section="Projects" :title="project.title" :sub="currentBusiness.business_name")
        .d-flex.justify-content-end
          p.m-b-2: ShowOnCalendarToggle(:project="project")
        .page-header__actions
          div
            template(v-if="currentRole !== 'basic'")
              router-link.m-r-1.btn.btn-default(v-if="project.visible_project" :to='viewHref(project.visible_project)' target="_blank") View Post
              button.m-r-1.btn.btn-default(v-else @click="postProject(project)") Post Project
            CompleteLocalProjectModal.m-r-1(:project="project" @saved="newEtag")
            button.btn.btn__close(@click="backToList")
              b-icon(icon="x")
      b-tabs.special-navs(content-class="mt-0 h-100" v-model="tab")
        template(#tabs-end)
          b-dropdown(variant="light")
            template(#button-content)
              | Actions
              b-icon.ml-2(icon="chevron-down")
            li: LocalProjectModal(@saved="newEtag" :project-id="project.id" :inline="false")
              button.dropdown-item Edit
            li: DeleteLocalProjectModal(:project="project")
        b-tab(title="Detail" active)
          .card-body.card-body_full-height
            .row
              .col-sm-12
                ApplicationsNotice(:project="project.visible_project" v-if="project.visible_project")
                Get(v-for="marketProject in project.projects" :etag="etag" :marketProject="`/api/business/projects/${marketProject.id}`" :key="marketProject.id"): template(v-slot="{marketProject}")
                  TimesheetsNotice(:project="marketProject")
                  EndContractNotice(:project="marketProject" @saved="contractEnded" @deny="denyContract")
                  ChangeContractAlerts(:project="marketProject" @saved="newEtag" for="Business")
                  CommonContractAlerts(:project="marketProject" for="Business")
            .row
              .col-md-8.col-sm-12.m-b-2
                .card
                  ProjectDetails(:project="project" @saved="newEtag")
              .col-md-4.col-sm-12.m-b-2
                .card.card-body_full-height
                  .card-header.d-flex.justify-content-between
                    h3.m-y-0 Collaborators
                    a.link.btn(@click="viewContract()") View All
                  .card-body
                    table.rating_table.collaborators_table
                      thead
                        tr
                          th.fw-400.p-b-05
                            | Name
                            b-icon.ml-2(icon='chevron-expand')
                          th.p-b-05
                      tbody
                        tr
                          td
                            .d-flex.align-items-center.mb-3
                              div
                                UserAvatar.userpic_small.mr-2(:user="ownerObject(project.owner)")
                              div.d-flex.flex-column.fw-600.fs-14
                                span {{ ownerName(project.owner) }}
                          td
                        tr(v-for="specialist in filterCollaborators(project)" :key="specialist.id")
                          td
                            .d-flex.align-items-center.mb-3
                              div
                                UserAvatar.userpic_small.mr-2(:user="specialist")
                              div.d-flex.flex-column.fw-600.fs-14
                                span {{ specialist.first_name }} {{ specialist.last_name }}
                          td
                            b-dropdown.float-right(text="..." variant="default" right)
                              CommonDeleteModal(title="Delete Collaborator" content="This will remove the collaborator from this project and all of its associated content." @deleteConfirmed="deleteColaborator(project, specialist)", :inline="false")
                                b-dropdown-item Delete
                        tr(v-for="contract in getContracts(project.projects)" :key="contract.specialist.id")
                          td
                            .d-flex.align-items-center.mb-3
                              div.mr-2
                                UserAvatar.userpic_small(:user="contract.specialist")
                              div.d-flex.flex-column.fw-600.fs-14
                                span {{ contract.specialist.first_name }} {{ contract.specialist.last_name }}
                                span {{ contract.specialist.seat_role }}
                          td
                            b-dropdown.float-right(text="..." variant="default" right)
                              b-dropdown-item(@click="viewContract(contract)") View Contract
            .row
              .col-md-12
                DiscussionCard(:project-id="project.id" :token="token")
        b-tab.h-100(title="Tasks")
          .card-body.card-body_full-height.h-100.px-5: .card
            TaskTableExtended(:tasks="project.reminders" :task-defaults="taskDefaults(project)" @saved="newEtag")
        b-tab.h-100(title="Documents")
          .card-body.card-body_full-height.h-100.px-5: .card
            DocumentList(:project="project")
        b-tab.h-100(title="Collaborators")
          .card-body.card-body_full-height
            .row
              .col-sm-12
                .card(v-if="!showingContract")
                  .card-header.d-flex.justify-content-between
                    h3.m-y-0 Collaborators
                    Get(:etag="etag" :collaborators="`/api/assignee_team_member`" :callback="getActiveCollaboratorOptions" ): template(v-slot="{collaborators}")
                      button.btn.btn-primary.float-right(v-b-modal="'AddCollaboratorModal'") New Collaborator
                      b-modal#AddCollaboratorModal(title="New Collaborator" :project="project")
                        p.fs-14 Select a user to add.
                        p.fs-14
                          strong Note:&nbsp;
                          | An unlimited amount of employees can be added to the project but only one specialist can be actively working on a project at a time.
                        label.m-t-1.form-label Select User
                        ComboBox(v-model="id" :options="collaborators")
                        template(#modal-footer="{ hide }")
                          button.btn.btn-link(@click="hide") Cancel
                          button.btn.btn-dark(@click="addNewCollaborator(id)") Create
                          //- Post(:action="'/api/local_projects/' + project.id + '/specialists'" :model="{id}" @saved="addNewCollaborator()" @errors="addNewCollaborator()")
                            button.btn.btn-dark Create
                  .card-body
                    .p-20.collaborator
                      .d-flex.justify-content-between.align-items-center.mb-3
                        .d-flex.align-items-center
                          div
                            UserAvatar.userpic_small.mr-2(:user="ownerObject(project.owner)")
                          div.d-flex.flex-column
                            b.collaborator__name {{ ownerName(project.owner) }}
                      .d-flex.justify-content-between.align-items-center.mb-3(v-for="specialist in filterCollaborators(project)" :key="specialist.id")
                        .d-flex.align-items-center
                          div
                            UserAvatar.userpic_small.mr-2(:user="specialist")
                          div.d-flex.flex-column
                            b.collaborator__name {{ specialist.first_name }} {{ specialist.last_name }}
                        .d-flex.justify-content-end
                          CommonDeleteModal(title="Delete Collaborator" content="This will remove the collaborator from this project and all of its associated content." @deleteConfirmed="deleteColaborator(project, specialist)", :inline="false")
                            button.btn.btn-primary(@click="showingContract = contract") Delete
                      .d-flex.justify-content-between.align-items-center.mb-3(v-for="contract in getContracts(project.projects)" :key="contract.specialist.id")
                        .d-flex.align-items-center
                          div
                            UserAvatar.userpic_small.mr-2(:user="contract.specialist")
                          div.d-flex.flex-column
                            b.collaborator__name {{ contract.specialist.first_name }} {{ contract.specialist.last_name }}
                            span {{ contract.specialist.seat_role }}
                        .d-flex.justify-content-end
                          b-dropdown.bg-white.mr-2(variant="light", right)
                            template(#button-content)
                              | Actions
                              b-icon.ml-2(icon="chevron-down")
                            MessagesModal(v-if="getApplication(contract)" v-bind="{ modalId, confirmModalId, projectId }" :application="getApplication(contract)")
                              b-dropdown-item Message
                            EditRoleModal(:specialist="contract.specialist" :inline="false" @saved="accepted")
                              b-dropdown-item Edit Role
                          button.btn.btn-primary(@click="showingContract = contract") View Contract
                div(v-else)
                  .row(v-if="!isContractComplete(showingContract)"): .col-sm-12
                    EndContractModal(:project="showingContract" @saved="contractEnded")
                      button.btn.btn-dark.float-right End Contract
                    b-dropdown.m-x-1.float-right(variant="default")
                      template(#button-content)
                        | Actions
                        b-icon.ml-2(icon="chevron-down")
                      b-dropdown-item(@click="showingContract = null") Back
                      b-dropdown-item(v-b-modal="'IssueModal'") Report Issue
                      EditRoleModal(:specialist="showingContract.specialist" :inline="false" @saved="accepted")
                        b-dropdown-item Edit Role
                      b-dropdown-item(v-if="showTimeSheet(showingContract)" :to="`/business/projects/${showingContract.id}/timesheets`" target="_blank") View Timesheet
                    IssueModal(:project-id="showingContract.id" :token="token")
                    Breadcrumbs.m-y-1(:items="['Collaborators', `${showingContract.specialist.first_name} ${showingContract.specialist.last_name}`]")
                  .row(v-else): .col-sm-12
                    Breadcrumbs.m-y-1(:items="['Collaborators', `${showingContract.specialist.first_name} ${showingContract.specialist.last_name}`]")
                  .row: .col-sm-12
                    PropertiesTable(title="Contract Details" :properties="contractDetails(showingContract)")
                      EditContractModal(v-if="!isContractComplete(showingContract)" :project="showingContract" @saved="newEtag(), tab = 0")
</template>

<script>
import { fields, readablePaymentSchedule } from '@/common/ProposalFields'
import DiscussionCard from '@/common/projects/DiscussionCard'
import ApplicationsNotice from './alerts/ApplicationsNotice'
// import DueDateNotice from './alerts/DueDateNotice'
import TimesheetsNotice from './alerts/TimesheetsNotice'
import EndContractNotice from './alerts/EndContractNotice'
import ProjectDetails from './ProjectDetails'
import DocumentList from '@/common/projects/DocumentList'
import EtaggerMixin from '@/mixins/EtaggerMixin'
import LocalProjectModal from './LocalProjectModal'
import CompleteLocalProjectModal from './CompleteLocalProjectModal'
import DeleteLocalProjectModal from './DeleteLocalProjectModal'
import EndContractModal from './EndContractModal'
import ShowOnCalendarToggle from './ShowOnCalendarToggle'
import ChangeContractAlerts from '@/common/projects/ChangeContractAlerts'
import EditContractModal from '@/common/projects/EditContractModal'
import TaskFormModal from '@/common/TaskFormModal'
import TaskTableExtended from "@/common/TaskTableExtended";
import IssueModal from './IssueModal'
import EditRoleModal from './EditRoleModal'
import MessagesModal from '@/common/Messages/MessagesModal'
import CommonContractAlerts from '@/common/projects/CommonContractAlerts'
import FreeBusinessMixin from '@/mixins/FreeBusinessMixin'
import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'

const TOKEN = localStorage.getItem('app.currentUser.token') ? JSON.parse(localStorage.getItem('app.currentUser.token')) : ''
const isContractComplete = contract => contract.status === 'complete'

export default {
  mixins: [EtaggerMixin(), FreeBusinessMixin],
  props: {
    projectId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tab: 0,
      showingContract: null,
      role: '',
      id: null,
      modalId: null,
      completedTasksOpen: true,
      applications: null,
      applicationMessage: null,
    }
  },
  async created() {
    this.modalId = 'modal_' + Math.random().toFixed(9) + Math.random().toFixed(7)
  },
  methods: {
    filterCollaborators(project) {
      const collaborators = project.collaborators
      const contracts = this.getContracts(project.projects)
      const specialistIds = contracts.map(item => {
        if (item.specialist) return item.specialist.id
      })

      return collaborators.filter(item => !specialistIds.includes(item.id))
    },
    ownerName(owner) {
      if (owner.contact_first_name) return `${owner.contact_first_name} ${owner.contact_last_name}`
      if (owner.first_name) return `${owner.first_name} ${owner.last_name}`
      return ''
    },
    ownerObject(owner) {
      return {
        photo: owner.photo,
        first_name: owner.contact_first_name ? owner.contact_first_name : owner.first_name,
        last_name: owner.contact_last_name ? owner.contact_last_name : owner.last_name,
      }
    },
    setApplications(payload) {
      this.applications = payload
    },
    getApplication(contract) {
      if (!this.applications) return null
      const application = this.applications.find(item => item.specialist_id === contract.specialist.id)
      return application
    },
    contractEnded() {
      this.newEtag()
      this.toast('Success', 'Contract early termination request has been submitted.')
    },
    denyContract() {
      this.newEtag()
      this.toast('Success', 'Contract early termination request has been denied.')
    },
    taskSaved() {
      this.toast('Success', 'Task has been updated.')
    },
    getContracts(projects) {
      return projects.filter(project => !!project.specialist)
    },
    viewContract(collaborator) {
      this.tab = 3
      this.showingContract = collaborator || null
    },
    contractDetails: fields,
    readablePaymentSchedule,
    isContractComplete,
    getActiveCollaboratorOptions(collaborators) {
      return collaborators.map(({ id, first_name, last_name }) => ({ id: id, label: `${first_name} ${last_name}`}))
    },
    accepted(id, role) {
      fetch(`${this.$store.getters.backendUrl}/api/business/specialist_roles/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `${TOKEN}`,  'Accept': 'application/json',  'Content-Type': 'application/json' },
        body: JSON.stringify({ "specialist": { "role": `${role}` } })
      })
        .then(response => response.json())
        .then(result => this.toast('Success', 'Role has been assigned.'))
        .catch(error => console.error(error))
    },
    backToList() {
      this.$router.push({ name: "projects" });
    },
    showTimeSheet(contract) {
      if (contract.fixed_budget) return false
      return true
    },
    applicationsUrl(projectId) {
      return this.$store.getters.url('URL_API_PROJECT_APPLICATIONS', projectId)
    },
    postProject(project) {
      if (this.isBusinessFreeWithoutPayment) {
        this.toast('Error', 'Job posting cannot be created. Please add a payment method in order to post a job.', true)
      } else {
        this.$router.push(this.postHref(project))
      }
    },
    async addNewCollaborator(id) {
      const res = await this.$store.dispatch('projects/addLocalProjectCollaborator', { id: id, localProjectId: this.projectId })
      if (res && res.id) {
        this.$bvModal.hide('AddCollaboratorModal')
        this.toast('Success', 'A collaborator has added.')
        this.newEtag()
        this.id = null
      } else {
        if (res.errors && res.errors.local_projects_specialist) {
          this.toast('Errors', 'Collaborator is existed.', true)
        }
      }
    },
    async deleteColaborator(project, specialist) {
      const payload = {
        localProjectId: project.id,
        specialistId: specialist.id
      }
      const res = await this.$store.dispatch('projects/removeLocalProjectCollaborator', payload)
      if (res && res.status === 'ok') {
        this.toast('Success', 'A collaborator has been deleted.')
        this.newEtag()
      } else {
        this.toast('Error', 'Can not delete collaborator. Please try again.')
      }
    }
  },
  computed: {
    currentRole() {
      return this.$store.getters['roles/currentRole']
    },
    taskDefaults() {
      return project => ({
        linkable_id: project.id,
        linkable_type: 'LocalProject'
      })
    },
    postHref() {
      return project => this.$store.getters.url('URL_POST_LOCAL_PROJECT', project.id)
    },
    viewHref() {
      return project => this.$store.getters.url('URL_PROJECT_POST', project.id)
    },
    hireUrl() {
      return project => this.$store.getters.url('URL_API_PROJECT_HIRES', project.id)
    },
    confirmModalId() {
      return (this.modalId || '') + '_confirm'
    },
    incompleteTasks() {
      return project => project.reminders.filter(task => !task.done_at)
    },
    completedTasks() {
      return project => project.reminders.filter(task => task.done_at)
    },
    token: () => TOKEN
  },
  components: {
    ApplicationsNotice,
    ChangeContractAlerts,
    DiscussionCard,
    LocalProjectModal,
    CompleteLocalProjectModal,
    DeleteLocalProjectModal,
    TimesheetsNotice,
    EndContractNotice,
    EndContractModal,
    ProjectDetails,
    ShowOnCalendarToggle,
    DocumentList,
    EditContractModal,
    IssueModal,
    EditRoleModal,
    TaskFormModal,
    MessagesModal,
    TaskTableExtended,
    CommonContractAlerts,
    CommonDeleteModal
  }
}
</script>




<style lang="scss">
.custom-project-layout-style {
  .page-header, .special-navs .nav-tabs {
    background: #fff;
  }
  .special-navs .nav-tabs {
    border-top: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
    display: flex;
    .btn-group {
      margin: auto 2.5rem auto auto;
    }
  }
  .card {
    height: 100%
  }
  .collaborator {
    border-bottom: 1px solid #dee2e6;
    &:last-child {
      border: none;
    }
    &__name {
      font-weight: 600
    }
  }
}
</style>
