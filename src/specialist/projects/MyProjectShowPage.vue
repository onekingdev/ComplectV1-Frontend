<template lang="pug">
.page.custom-project-layout-style
  Get.d-flex.flex-column.flex-grow-1(:project="projectUrl" :etag="etag"): template(v-slot="{project}")
    CommonHeader(section="Jobs" :title="project.title" :sub="project.business.business_name")
      router-link.btn.btn-dark.align-self-end.my-timesheet(v-if="showTimesheetBtn(project)" :to="timesheetUrl" target="_blank") My Timesheet
      a.btn.btn__close.back-to-projects(href="/specialist/my-projects")
        b-icon(icon="x")
    Get(v-if="isApproved(project)" :localProject="projectUrl + '/local'" :etag="etag"): template(v-slot="{localProject}"): b-tabs.special-navs(content-class="mt-0 h-100" v-model="tab")
      b-tab(title="Detail")
        .card-body.card-body_full-height
          .row
            .col-sm-12
              ChangeContractAlerts(:project="project" @saved="newEtag" for="Specialist")
              CommonContractAlerts(:project="project" for="Specialist")
              EndContractNotice(:project="project" from="Business" @saved="newEtag" @deny="denyContract")
          .row
            .col-md-8.col-sm-12.m-b-2
              PropertiesTable(title="Project Details" :properties="acceptedOverviewProps(project)")
            .col-md-4.col-sm-12.m-b-2
              .card
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
                            div.mr-2
                              UserAvatar.userpic_small(:user="ownerObject(localProject.owner)")
                            div.d-flex.flex-column.fs-14
                              b {{ ownerName(localProject.owner) }}
                      tr(v-for="specialist in filterCollaborators(localProject)" :key="specialist.id")
                        td
                          .d-flex.align-items-center.mb-3
                            div.mr-2
                              UserAvatar.userpic_small(:user="specialist")
                            div.d-flex.flex-column.fs-14
                              b {{ specialist.first_name }} {{ specialist.last_name }}
                      tr(v-for="contract in getContractsByLocalProject(localProject)" :key="contract._key")
                        td
                          .d-flex.align-items-center.mb-3
                            div.mr-2
                              UserAvatar.userpic_small(:user="contract.specialist")
                            div.d-flex.flex-column.fs-14
                              b {{ contract.specialist.first_name }} {{ contract.specialist.last_name }}
                              span {{ contract.specialist.seat_role }}
                        td
                          b-dropdown.float-right(text="..." variant="default" right)
                            b-dropdown-item(@click="viewContract(contract)") View Contract

          .row
            .col-md-12
              DiscussionCard(:project-id="project.local_project_id" :token="accessToken" :disabled="project.status == 'Complete'")
      b-tab(title="Tasks")
        .card-body.card-body_full-height.h-100: .card
          TaskTableExtended(:tasks="localProject.reminders" :task-defaults="taskDefaults(localProject)" :businessId="localProject.business_id" :createButton="!isContractComplete(project)" @saved="newEtag")
      b-tab(title="Documents")
        .card-body.card-body_full-height.h-100: .card
          DocumentList(:project="localProject" :disabled="project.status == 'Complete'")
      b-tab(title="Collaborators")
        .card-body.card-body_full-height
          .row
            .col-sm-12
              .card(v-if="!showingContract")
                .card-header.d-flex.justify-content-between
                  h3.m-y-0 Collaborators
                .card-body
                  table.table
                    tbody
                      tr
                        td.pb-3
                          UserAvatar.userpic_small.mr-2(:user="ownerObject(localProject.owner)")
                          b {{ ownerName(localProject.owner) }}
                        td
                      tr(v-for="specialist in filterCollaborators(localProject)" :key="specialist.id")
                        td.pb-3
                          UserAvatar.userpic_small.mr-2(:user="specialist")
                          b {{ specialist.first_name }} {{ specialist.last_name }}
                        td
                      tr(v-for="contract in getContractsByLocalProject(localProject)" :key="contract._key")
                        td.pb-3
                          button.btn.btn-default.float-right(v-if="project.status !== 'Complete'" @click="showingContract = contract") View Contract
                          UserAvatar.userpic_small.mr-2(:user="contract.specialist")
                          b {{ contract.specialist.first_name }} {{contract.specialist.last_name }},
                          |  Specialist
                        td
              div(v-else)
                .row: .col-sm-12
                  EndContractModal(:project="showingContract" @saved="completeSuccess")
                    button.btn.btn-dark.float-right(v-if="!isContractComplete(showingContract)") End Contract
                  Breadcrumbs.m-y-1(:items="['Collaborators', `${showingContract.specialist.first_name} ${showingContract.specialist.last_name}`]")
                .row
                  .col-sm-12
                    PropertiesTable(title="Contract Details" :properties="proposalProps(showingContract)")
                      EditContractModal(v-if="!isContractComplete(showingContract)" :project="showingContract" @saved="newEtag(), tab = 0")
    template(v-else)
      div.gray-border
      b-tabs
        b-tab(title="Detail")
          .p-y-1
            .container
              .row.p-x-1
                .col-md-12
                  PropertiesTable(title="Post Details" :properties="overviewProps(project)")
        b-tab(title="Proposal")
          .p-y-1
            .container
              .row.p-x-1
                .col-md-12
                  Get(:application="applicationUrl(project.id)" :callback="setApplication"): template(v-slot="{application}")
                  PropertiesTable(v-if="application" title="Proposal" :properties="proposalPropsData")
                    EditProposalModal(v-if="application" :project-id="project.id" :application-id="application.id" :proposal="application" :project="project")
                      button.btn.btn-dark.float-right Edit
</template>

<script>
import { readablePaymentSchedule, fields } from '@/common/ProposalFields'
import ChangeContractAlerts from '@/common/projects/ChangeContractAlerts'
import CommonContractAlerts from '@/common/projects/CommonContractAlerts'
import EndContractNotice from '@/business/projects/alerts/EndContractNotice.vue'
import DiscussionCard from '@/common/projects/DiscussionCard'
import EditContractModal from '@/common/projects/EditContractModal'
import EndContractModal from '@/business/projects/EndContractModal'
import DocumentList from '@/common/projects/DocumentList'
import EditProposalModal from '@/specialist/projects/EditProposalModal'
import TaskTableExtended from "@/common/TaskTableExtended";
import EtaggerMixin from '@/mixins/EtaggerMixin'
import { mapGetters } from 'vuex'

const overviewProps = project => {
  return [{ name: 'Owner', value: project.business && project.business.business_name },
    { name: 'Title', value: project.title },
    { name: 'Start Date', value: project.starts_on, filter: 'asDate' },
    { name: 'Due Date', value: project.ends_on, filter: 'asDate' },
    { name: 'Description', value: project.description },
    { name: 'Role Details', value: project.role_details },
    { name: 'Industry', value: project.industries, filter: 'names' },
    { name: 'Jurisdiction', value: project.jurisdictions, filter: 'names' },
    { name: 'Minimum Experience', value: project.minimum_experience, filter: 'capital' },
    { name: 'Former Regulator', value: project.only_regulators, filter: 'yesNo' },
    { name: 'Skills', value: project.skills, filter: 'names' },
    {
      name: project.pricing_type === 'fixed' ? 'Estimated Budget' : 'Hourly Rate',
      value: project.pricing_type === 'fixed' ? project.est_budget : project.hourly_rate,
      filter: 'usdWhole'
    },
    { name: 'Payment Schedule', value: readablePaymentSchedule(project.payment_schedule) }]
}

const acceptedOverviewProps = project => [
  { name: 'Title', value: project.title },
  { name: 'Start Date', value: project.starts_on, filter: 'asDate' },
  { name: 'Due Date', value: project.ends_on, filter: 'asDate' },
  { name: 'Description', value: project.description },
  { name: 'Role Details', value: project.role_details },
]

const isContractComplete = contract => contract.status === 'Complete'
const TOKEN = localStorage.getItem('app.currentUser.token') ? JSON.parse(localStorage.getItem('app.currentUser.token')) : ''
export default {
  mixins: [EtaggerMixin()],
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tab: 0,
      showingContract: null
    }
  },
  methods: {
    contractEnded() {
      this.newEtag()
    },
    denyContract() {
      this.newEtag()
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
    filterCollaborators(project) {
      const collaborators = project.collaborators
      const contracts = this.getContractsByLocalProject(project)
      const specialistIds = contracts.map(item => {
        if (item.specialist) return item.specialist.id
      })

      return collaborators.filter(item => !specialistIds.includes(item.id))
    },
    isApproved(project) {
      return this.getUser.id === project.specialist_id
    },
    overviewProps,
    acceptedOverviewProps,
    readablePaymentSchedule,
    proposalProps: fields,
    isContractComplete,
    setApplication(application) {
      this.$store.commit('projects/SET_CURRENT_PROPOSAL', application)
    },
    applicationUrl(projectId) {
      return '/api/specialist/projects/' + projectId + '/applications/my'
    },
    showEditModal() {
      this.$bvModal.show('EditProposalModal')
    },
    getContractsByLocalProject(localProject) {
      return localProject.projects.filter(lp => lp.specialist)
        .map(project => ({...project, _key: `${project.id}_${project.specialist.id}` }))
    },
    completeUrl(project) {
      return '/api/projects/' + project.id + '/end'
    },
    completeSuccess() {
      this.$bvModal.hide('EndContractModal')
      this.toast('Success', 'Contract early termination request has been submitted.')
    },
    completeErrors(errors) {
      errors.length && this.toast('Error', 'Contract early termination request has not been submitted. Please try again.')
    },
    viewContract(collaborator) {
      this.tab = 3
      this.showingContract = collaborator || null
    },
    taskDefaults(localProject) {
      return {
        linkable_id: localProject.id,
        linkable_type: 'LocalProject'
      }
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    accessToken() {
      return TOKEN
    },
    application() {
      return this.$store.getters['projects/currentProposal']
    },
    projectUrl() {
      return this.$store.getters.url('URL_API_MY_PROJECT', this.id)
    },
    timesheetUrl() {
      return this.$store.getters.url('URL_PROJECT_TIMESHEET', this.id)
    },
    showTimesheetBtn() {
      return project => 'hourly' === project.pricing_type && this.isApproved(project) && !this.isContractComplete(project)
    },
    proposalPropsData() {
      if (!this.application) return []
      const newProps = []
      const application = this.application
      const props = this.proposalProps(application)
      for(let i = 0; i < props.length; i++) {
        const item = props[i]
        if (item.name !== 'Attachments') {
          newProps.push(item)
        } else {
          const isDevEnv = this.$store.getters.isDevEnv
          const url = application.attachment ? (isDevEnv ? `${this.$store.getters.backendUrl}/${application.attachment.url}` : application.attachment.url) : ''
          const value = application.attachment && application.attachment.name ? application.attachment.name : ''
          const prop = {
            name: 'Attachments',
            value: value,
            url: url,
            type: 'link'
          }

          newProps.push(prop)
        }
      }
      return newProps
    },
    localProject() {
      return {
        id: this.project.local_project_id
      }
    }
  },
  components: {
    ChangeContractAlerts,
    CommonContractAlerts,
    EndContractNotice,
    DiscussionCard,
    DocumentList,
    EditContractModal,
    EditProposalModal,
    EndContractModal,
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

.gray-border {
  border-bottom: 1px solid #dee2e6;
}

.my-timesheet {
  position: relative;
  top: 27px;
  left: -72%;
}

.back-to-projects {
  position: relative;
  top: -8px;
}
</style>
