<template lang="pug">
.project-figures.mt-3
  .figure
    .head
      ion-icon.icon(name="cash-outline")
      .label
        template(v-if="project.pricing_type === 'fixed'") Estimated Budget
        template(v-else) Hourly
    .content
      template(v-if="project.pricing_type === 'fixed'") {{ project.est_budget | usdWhole }}, Fixed
      template(v-else) {{ project.hourly_rate | usdWhole }} - {{ project.upper_hourly_rate | usdWhole }}
  .figure
    .head
      ion-icon.icon(name="cash-outline")
      .label Payment Schedule
    .content {{ paymentScheduleReadable }}
  .figure
    .head
      ion-icon.icon(name="earth-outline")
      .label Jurisdiction
    .content {{ project.jurisdictions | names }}
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
  // gap: 1rem;
  .figure {
    flex: 1 0 0;
    padding: 1rem 0;
    padding-right: 1rem;
    + .figure {
      padding-left: 1rem;
      border-left: 1px solid #eee;
    }
    .head {
      display: flex;
      // flex-wrap: wrap;
      align-items: center;
      .icon {
        flex-shrink: 0;
        margin-right: 0.7rem;
      }
      .label {
        font-size: 12px;
        color: #797b7e;
        line-height: 1.3;
        text-transform: uppercase;
      }
    }
    .content {
      margin-top: 0.5rem;
      font-weight: bold;
    }
  }
}
</style>
