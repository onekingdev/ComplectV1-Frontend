<template lang="pug">
.project-figures.mt-3
  .figure
    .head
      ion-icon.icon(name="cash-outline")
      .label Estimated Budget
    .content {{ project.est_budget | usdWhole }}$233, Fixed
  .figure
    .head
      ion-icon.icon(name="cash-outline")
      .label Payment Schedule
    .content {{ project.est_budget | usdWhole }}$233, Fixed
  .figure
    .head
      ion-icon.icon(name="earth-outline")
      .label Jurisdiction
    .content {{ project.est_budget | usdWhole }}$233, Fixed
  
  //- .figure
  //-   ion-icon(name="cash-outline")
  //-   span.small-text Payment Schedule
  //-   div.font-weight-bold.d-flex {{ project.est_budget | usdWhole }}$233, Fixed
  //- .figure
  //-   ion-icon(name="earth-outline")
  //-   span.small-text Jurisdiction
  //-   div.font-weight-bold.d-flex {{ project.est_budget | usdWhole }}$233, Fixed
 
  //- ul.list-group.list-group-horizontal.w-100.project-figures.mt-3
    li.list-group-item(v-if="project.pricing_type === 'fixed'")
      ion-icon.custom-icon.float-left.mt-3.mr-3(name="cash-outline")
      span.small-text Estimated Budget
      div.font-weight-bold.d-flex {{ project.est_budget | usdWhole }}, Fixed
    li.list-group-item(v-else)
      ion-icon.custom-icon.float-left.mt-3.mr-3(name="cash-outline")
      .small-text Hourly
      br
      b.d-flex {{ project.hourly_rate | usdWhole }} - {{ project.upper_hourly_rate | usdWhole }}
    li.list-group-item
      ion-icon.custom-icon.float-left.mt-3.mr-3(name="cash-outline")
      span.small-text Payment Schedule
      div.font-weight-bold.d-flex {{ paymentScheduleReadable }}
    li.list-group-item.jurisdictions
      ion-icon.custom-icon.float-left.mt-3.mr-3(name="earth-outline")
      span.small-text Jurisdiction
      br
      b.d-flex {{ project.jurisdictions | names }}
</template>

<script>
import { FIXED_PAYMENT_SCHEDULE_OPTIONS } from '@/common/ProjectInputOptions'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    paymentScheduleReadable() {
      return FIXED_PAYMENT_SCHEDULE_OPTIONS[this.project.payment_schedule]
    }
  }
}
</script>
<style lang="scss" scoped>
.project-figures {
  width: 100%;
  display: flex;
  gap: 1rem;
  .figure {
    flex: 1 0 auto;
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .icon {
        margin-right: 0.5rem;
      }
    }
  }
}

// .list-group {
//   display: flex
// }
// .small-text {
//   font-size: 12px;
//   text-transform: uppercase;
//   color: #797B7E;
//   line-height: 1.3;
// }

// .jurisdictions {
//   width: 40%;
// }

// .custom-icon {
//   margin-right: 10px !important;
// }

/* @media screen and (max-width: 786px) {
  .custom-icon {
    display: none;
  }
} */
</style>
