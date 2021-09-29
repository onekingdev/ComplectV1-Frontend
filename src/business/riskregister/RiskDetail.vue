<template lang="pug">
  .page
    div(v-if="loading")
      Loading
    .page-header(v-if="!loading && riskComputed && riskComputed.id")
      .page-header__title
        h2.fs-16 {{ pageTitle }}
        .d-flex.mt-2
          b-badge.badge-risk.custom-badge.mr-1(:variant="badgeVariant(riskComputed.risk_level)")
            b-icon-exclamation-triangle-fill.mr-2
            | {{ showLevel(riskComputed.risk_level)  }}
          b.risk-name.fs-14.fw-400 {{ riskComputed.name }}
      .page-header__actions
        b-dropdown.actions__dropdown.actions__dropdown_tasks(variant="default", right)
          template(#button-content)
            | Actions
            ion-icon.ml-2(name="chevron-down-outline" size="small")
          RiskModalDelete(@deleteConfirmed="deleteRisk" :risk-id="riskComputed.id" :inline="false")
            b-dropdown-item.delete Delete
    .card-body.card-body_full-height(v-if="!loading && riskComputed && riskComputed.id")
      div.mb-3
        b-card-group(deck)
          b-card(header-tag='header' header-class='d-flex')
            template(#header)
              h3.mb-0.fs-20.fw-400 Risk Details
              RisksAddEditModal.ml-auto(:riskId="riskComputed.id" :inline="false")
                button.btn.btn-primary Edit
            b-card-text
              .row
                .col-lg-2.col-md-3.col-3.pr-0.risk-details-column
                  b-list-group.text-secondary
                    b-list-group-item.border.border-white.pb-0.pt-0 Title
                    b-list-group-item.border.border-white.pb-0 Impact
                    b-list-group-item.border.border-white.pb-0 Likelihood
                .col.pl-0
                  b-list-group
                    b-list-group-item.border.border-white.pb-0.pt-0 {{ riskComputed.name }}
                    b-list-group-item.border.border-white.pb-0 {{ showLevel(riskComputed.impact) }}
                    b-list-group-item.border.border-white.pb-0 {{ showLevel(riskComputed.likelihood) }}
      div
        b-card-group(deck)
          b-card(header-tag='header' header-class='d-flex')
            template(#header)
              h3.mb-0.fs-20.fw-400 Controls
              RiskContols.ml-auto(:riskId="riskComputed.id" :inline="false")
                button.btn.btn-primary {{ !riskComputed.compliance_policies.length ? 'New' : 'Edit' }} Control
            b-card-text
              PoliciesTable(:riskPolicies="riskComputed.compliance_policies" @deleteControl="updateRisk")
</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import RiskModalDelete from "./Modals/RiskModalDelete";
  import RisksAddEditModal from '@/common/Modals/RisksAddEditModal'
  import RiskContols from './Modals/RiskContols'
  import PoliciesTable from './PoliciesTable'

  export default {
    props: ['riskId'],
    components: {
      Loading,
      RiskModalDelete,
      RisksAddEditModal,
      RiskContols,
      PoliciesTable
    },
    data() {
      return {
        pageTitle: 'Risk Register',
        levelOptions: ['Low', 'Medium', 'High'],
        risk: {
          compliance_policies: [],
          created_at: "",
          id: null,
          impact: null,
          likelihood: null,
          name: "",
          risk_level: null,
          updated_at: "",
        },
      }
    },
    methods: {
      deleteRisk() {
        console.log('delete risk', this.riskId)
      },
      badgeVariant(num) {
        if (num === 0) return 'success'
        if (num === 1) return 'warning'
        if (num === 2) return 'danger'
      },
      showLevel(num) {
        // this.riskLevelColor(num)
        return this.levelOptions[num]
      },
      updateRisk(policyId) {
        const index = this.risk.compliance_policies.findIndex(record => record.id === policyId);
        this.riskComputed.compliance_policies.splice(index, 1)

        this.riskComputed.compliance_policy_ids = this.riskComputed.compliance_policies.map(policy => policy.id)

        this.$store
          .dispatch('updateRisk', {...this.riskComputed})
          .then(response => {
            console.log('response', response)
            this.toast('Success', 'Risk has been updated.')
          })
          .catch(error => {
            console.error(error)
            this.toast('Error', `Risk has not been updated. Please try again. ${error}`)
          })
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      riskComputed() {
        return this.$store.getters.getCurrentRisk;
        // const id = this.riskId;
        // return this.$store.getters.riskById(id);
      },
    },
    watch: {

    },
    mounted() {
      // console.log(this.riskId)
      this.$store
        .dispatch("getRiskById", { riskId: this.riskId })
        .then((response) => {
          // this.risk = response;
          console.log('response mounted getRiskById', response);
        })
        .catch((err) => {
          console.error(err);
          this.toast('Error', err.message)
        })
        .finally(() => {
          // AFTER PREV REQUEST SEND NEW
          this.$store
            .dispatch("getPolicies")
            .then((response) => {
              console.log('response mounted getPolicies', response);
            })
            .catch((err) => {
              console.error(err);
              this.toast('Error', err.message)
            });
        })
    },

  };
</script>

<style scoped>
  @import "./styles.css";

  .page-header {
    border-bottom: 1px solid #dee2e6;
  }
  .custom-badge {
    display: inline-flex !important;
  }

  .risk-details-column {
    padding-left: 5px;
  }
  .list-group-item {
    padding-left: 0
  }

  .risk-name {
    position: relative;
    top: 2px;
  }
  
  .no-results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 20rem;
  }
  
  .no-results__title {
    font-size: 1.3rem;
  }
  
  .no-results svg {
    margin-bottom: 4rem;
  }
</style>
