<template lang="pug">
  ul.list-group.list-group-horizontal.w-100.project-figures.mt-3
    li.list-group-item(v-if="project.pricing_type === 'fixed'")
      ion-icon.float-left.mt-3.mr-3(name="cash-outline")
      span.small-text Estimated Budget
      br
      b {{ project.est_budget | usdWhole }}, Fixed
    li.list-group-item(v-else)
      ion-icon.float-left.mt-3.mr-3(name="cash-outline")
      span.small-text Hourly
      br
      b {{ project.hourly_rate | usdWhole }} - {{ project.upper_hourly_rate | usdWhole }}
    li.list-group-item
      ion-icon.float-left.mt-3.mr-3(name="cash-outline")
      span.small-text Payment Schedule
      br
      b {{ paymentScheduleReadable }}
    li.list-group-item.jurisdictions
      ion-icon.float-left.mt-3.mr-3(name="earth-outline")
      span.small-text Jurisdiction
      br
      b {{ project.jurisdictions | names }}
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
<style scoped>
.small-text {
  font-size: 12px;
  text-transform: uppercase;
  color: #797B7E;
}

.jurisdictions {
  width: 40%;
}
</style>
