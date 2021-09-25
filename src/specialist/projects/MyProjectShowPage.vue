<template lang="pug">
  Get(:project="projectUrl" :etag="etag"): template(v-slot="{project}")
    CommonHeader(:title="project.title" :sub="project.business.business_name" :breadcrumbs="['Projects', project.title]")
      router-link.btn.btn-outline-dark.float-right(v-if="showTimesheetBtn(project)" :to="timesheetUrl") My Timesheet
    Get(v-if="isApproved(project)" :localProject="projectUrl + '/local'"): template(v-slot="{localProject}"): b-tabs(v-model="tab" content-class="mt-0")
      b-tab(title="Overview")
        .white-card-body.p-y-1
          .container
            .row.p-x-1
              .col-sm-12
                ChangeContractAlerts(:project="project" @saved="newEtag" for="Specialist")
              .col-md-8.col-sm-12
                PropertiesTable(title="Project Details" :properties="acceptedOverviewProps(localProject)")
              .col-md-4.col-sm-12.pl-0
                .card
                  .card-header.d-flex.justify-content-between
                    h3.m-y-0 Collaborators
                    a.link.btn(@click="viewContract()") View All
                  .card-body
                    table.rating_table
                      thead
                        tr
                          th
                            | Name
                            b-icon.ml-2(icon='chevron-expand')
                          th
                      tbody
                        tr(v-for="contract in getContractsByLocalProject(localProject)" :key="contract._key")
                          td
                            .d-flex.align-items-center.mb-3
                              div
                                UserAvatar.userpic_small.mr-2(:user="contract.specialist")
                              div.d-flex.flex-column
                                b {{ contract.specialist.first_name }} {{ contract.specialist.last_name }}
                                span {{ contract.specialist.seat_role }}
                          td
                            b-dropdown.float-right(text="..." variant="default" right)
                              b-dropdown-item(@click="viewContract(contract)") View Contract
          .container.m-t-1
            .row.p-x-1
              .col-md-12
                DiscussionCard(:project-id="project.local_project_id" :token="accessToken")
      b-tab(title="Tasks")
      b-tab(title="Documents")
        DocumentList(:project="project")
      b-tab(title="Collaborators")
        .white-card-body.p-y-1
          .container
            .row.p-x-1
              .col-sm-12
                .card(v-if="!showingContract")
                  .card-header.d-flex.justify-content-between
                    h3.m-y-0 Collaborators
                  .card-body
                    table.rating_table
                      tbody
                        tr(v-for="contract in getContractsByLocalProject(localProject)" :key="contract._key")
                          td
                            button.btn.btn-default.float-right(@click="showingContract = contract") View Contract
                            img.m-r-1.userpic_small(v-if="contract.specialist.photo" :src="contract.specialist.photo")
                            b {{ contract.specialist.first_name }} {{contract.specialist.last_name }},
                            |  Specialist
                          td
                div(v-else)
                  .row: .col-sm-12
                    button.btn.btn-dark.float-right(v-if="!isContractComplete(showingContract)" v-b-modal.EndContractModal) End Contract
                      b-modal.fade(id="EndContractModal" title="End Contract")
                        p ℹ️ Ending this contract will remove you as a collaborator to the project, revoke any permissions granted due to the project, and payout the full contract price.
                        p: b Do you want to continue?
                        .card
                          .card-body
                            .row
                              .col-sm
                                img.m-r-1.userpic_small(v-if="showingContract.specialist.photo" :src="showingContract.specialist.photo")
                                h3 {{ showingContract.specialist.first_name }} {{showingContract.specialist.last_name }}
                                p Specialist
                              .col-sm
                                span.float-right Outstanding Due <br> {{ 500 | usdWhole }}
                          .card-body
                            p
                              b Job Name
                              span.float-right {{ showingContract.title }}
                            p
                              b Payment Schedule
                              span.float-right {{ readablePaymentSchedule(showingContract.payment_schedule) }}
                            p
                              b Payment Method
                              span.float-right Transfer to Visa
                          .card-body
                            p.text-right.text-muted *Invoice will be automatically deducted.
                        template(slot="modal-footer")
                          button.btn(@click="$bvModal.hide('EndContractModal')") Cancel
                          Post(:action="completeUrl(showingContract)" :model="{}" @saved="completeSuccess" @errors="completeErrors")
                            button.btn.btn-dark.m-r-1 Confirm
                    Breadcrumbs.m-y-1(:items="['Collaborators', `${showingContract.specialist.first_name} ${showingContract.specialist.last_name}`]")
                  .row
                    .col-sm-12
                      PropertiesTable(title="Contract Details" :properties="proposalProps(showingContract)")
                        EditContractModal(v-if="!isContractComplete(showingContract)" :project="showingContract" @saved="newEtag(), tab = 0")
      //- b-tab(title="Activity")
    b-tabs(v-else)
      b-tab(title="Overview")
        .white-card-body.p-y-1
          .container
            .row.p-x-1
              .col-md-12
                PropertiesTable(title="Post Details" :properties="overviewProps(project)")
      b-tab(title="Proposal")
        .white-card-body.p-y-1
          .container
            .row.p-x-1
              .col-md-12
                Get(:application="applicationUrl(project.id)" :callback="setApplication"): template(v-slot="{application}")
                PropertiesTable(v-if="application" title="Proposal" :properties="proposalPropsData")
                  EditProposalModal(v-if="application" :project-id="project.id" :application-id="application.id" :proposal="application" :project="project")
                    button.btn.btn-outline-dark.float-right Edit
</template>

<script>
import { readablePaymentSchedule, fields } from '@/common/ProposalFields'
import ChangeContractAlerts from '@/common/projects/ChangeContractAlerts'
import DiscussionCard from '@/common/projects/DiscussionCard'
import EditContractModal from '@/common/projects/EditContractModal'
import DocumentList from '@/common/projects/DocumentList'
import EditProposalModal from '@/specialist/projects/EditProposalModal'
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

const isContractComplete = contract => contract.status === 'complete'

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
    }
  },
  computed: {
    ...mapGetters(['accessToken', 'getUser']),
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
      return project => 'hourly' === project.pricing_type
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
    }
  },
  components: {
    ChangeContractAlerts,
    DiscussionCard,
    DocumentList,
    EditContractModal,
    EditProposalModal
  }
}
</script>
