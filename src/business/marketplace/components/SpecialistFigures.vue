<template lang="pug">
  ul.list-group.list-group-horizontal.w-100.project-figures.specialist-figures.mt-2
    li.list-group-item.small-text
      ion-icon.float-left.mt-3.mr-3.specialist-infor-icon(name="cash-outline")
      span.small-text.text-uppercase Hourly rate
      br
      b.font-14 {{ specialist.min_hourly_rate | usdWhole }}
    li.list-group-item.small-text
      ion-icon.float-left.mt-3.mr-3.specialist-infor-icon(name="analytics-outline")
      span.small-text.text-uppercase Experience
      br
      b.font-14 {{ experienceOptions[specialist.experience] }}
    li.list-group-item.small-text
      ion-icon.float-left.mt-3.mr-3.specialist-infor-icon(name="earth-outline")
      span.small-text.text-uppercase Jurisdiction
      br
      div.jurisdictions.font-14 {{ specialist.jurisdictions | names }}
</template>

<script>
import { FIXED_PAYMENT_SCHEDULE_OPTIONS, MINIMUM_EXPERIENCE_OPTIONS } from '@/common/ProjectInputOptions'

export default {
  props: {
    specialist: {
      type: Object,
      required: true
    }
  },
  computed: {
    paymentScheduleReadable() {
      return FIXED_PAYMENT_SCHEDULE_OPTIONS[this.specialist.payment_schedule]
    },
    experienceOptions() {
      return MINIMUM_EXPERIENCE_OPTIONS
    }
  }
}
</script>
<style scoped>
.jurisdictions {
  padding-left: 27px;
  font-weight: bold;
}
</style>
