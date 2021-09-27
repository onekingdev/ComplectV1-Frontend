<template lang="pug">
  .page.custom-project-layout-style
    Get.d-flex.flex-column.flex-grow-1(:etag="etag" :project="`/api/local_projects/${projectId}`" currentBusiness="/api/businesses/current"): template(v-slot="{project,currentBusiness}")
      CommonHeader(section="Projects" :title="project.title" :sub="currentBusiness.business_name")
        .d-flex.justify-content-end
          p.m-b-2: ShowOnCalendarToggle(:project="project")
        .page-header__actions
          div
            router-link.m-r-1.btn.btn-default(v-if="project.visible_project" :to='viewHref(project.visible_project)' target="_blank") View Post
            router-link.m-r-1.btn.btn-default(v-else :to='postHref(project)') Post Project
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
                  EndContractNotice(:project="marketProject" @saved="contractEnded")
                  ChangeContractAlerts(:project="marketProject" @saved="newEtag" for="Business")
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
                    table.rating_table.collaborators_table(v-if="getContracts(project.projects).length")
                      thead
                        tr
                          th.fw-400.p-b-05
                            | Name
                            b-icon.ml-2(icon='chevron-expand')
                          th.p-b-05
                      tbody
                        tr(v-for="contract in getContracts(project.projects)" :key="contract.specialist.id")
                          td
                            .d-flex.align-items-center.mb-3
                              div
                                UserAvatar.userpic_small.mr-2(:user="contract.specialist")
                              div.d-flex.flex-column.fw-600.fs-14
                                span {{ contract.specialist.first_name }} {{ contract.specialist.last_name }}
                                span {{ contract.specialist.seat_role }}
                          td
                            b-dropdown.float-right(text="..." variant="default" right)
                              b-dropdown-item(@click="viewContract(contract)") View Contract
                    .applications(v-if="!getContracts(project.projects).length")
                      .applications__body.applications__body_center.applications__body_m-h-200
                        ion-icon.applications__icon.m-b-10(name="people-outline")
                        p.empty-state__text.mb-0 No collaborators
            .row
              .col-md-12
                DiscussionCard(:project-id="project.id" :token="token")
        b-tab.h-100(title="Tasks")
          .card-body.card-body_full-height.h-100: .card
            TaskTableExtended(:tasks="incompleteTasks(project)" :task-defaults="taskDefaults(project)" @saved="newEtag")
            h3.pointer(v-if="completedTasks(project).length" @click="completedTasksOpen = !completedTasksOpen")
              span.caret(:class="{caret_rotated:!completedTasksOpen}")
              | Completed Tasks
            b-collapse.m-t-1(v-if="completedTasks(project).length" v-model="completedTasksOpen")
              TaskTableExtended(:tasks="completedTasks(project)" :task-defaults="taskDefaults(project)" :create-button="false" @saved="newEtag")
        b-tab.h-100(title="Documents")
          .card-body.card-body_full-height.h-100: .card
            DocumentList(:project="project")
        b-tab.h-100(title="Collaborators")
          .card-body.card-body_full-height
            .row
              .col-sm-12
                .card(v-if="!showingContract")
                  .card-header.d-flex.justify-content-between
                    h3.m-y-0 Collaborators
                    Get(:etag="etag" :collaborators="`/api/business/team_members`" :callback="getActiveCollaboratorOptions" ): template(v-slot="{collaborators}")
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
                          Post(:action="'/api/local_projects/' + project.id + '/specialists'" :model="{id}" @saved="newEtag()")
                            button.btn.btn-dark Create
                  .card-body
                    .p-20.collaborator(v-for="contract in getContracts(project.projects)" :key="contract.specialist.id")
                      .d-flex.justify-content-between.align-items-center
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
                              //- p {{contract}}
                            
                            //- MessagesModal(v-bind="{ contract, modalId, confirmModalId, projectId }")
                              b-dropdown-item Message
                            b-dropdown-item Message
                            EditRoleModal(:specialist="contract.specialist" :inline="false" @saved="accepted")
                              b-dropdown-item Edit Role
                          button.btn.btn-primary(@click="showingContract = contract") View Contract
                    .applications(v-if="!getContracts(project.projects).length")
                      .applications__body.applications__body_center.applications__body_m-h-200
                        ion-icon.applications__icon.m-b-10(name="people-outline")
                        p.empty-state__text.mb-0 No collaborators
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
                      EditContractModal(:project="showingContract" :inline="true" @saved="newEtag(), tab = 0")
                        b-dropdown-item Edit Role
                      b-dropdown-item(:to="`/business/projects/${showingContract.id}/timesheets`" target="_blank") View Timesheet
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

const TOKEN = localStorage.getItem('app.currentUser.token') ? JSON.parse(localStorage.getItem('app.currentUser.token')) : ''
const isContractComplete = contract => contract.status === 'complete'

export default {
  mixins: [EtaggerMixin()],
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
    }
  },
  created() {
    this.modalId = 'modal_' + Math.random().toFixed(9) + Math.random().toFixed(7)
  },
  methods: {
    contractEnded() {
      this.newEtag()
      this.toast('Success', 'Contract early termination request has been submitted.')
    },
    taskSaved() {
      this.toast('Success', 'Task created')
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
      return collaborators.filter(item => item.active).map(({ id, first_name, last_name }) => ({ id: id, label: `${first_name} ${last_name}`}))
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
  },
  computed: {
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
    applicationsUrl() {
      return this.$store.getters.url('URL_API_PROJECT_APPLICATIONS', this.projectId)
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
    TaskTableExtended
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
