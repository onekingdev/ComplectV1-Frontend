<template lang="pug">
  div
    Loading
    .card
      .card-title.p-20
        h2.card-title__name Payments
      .card-body.white-card-body(v-if="payments")
        .payments
          .payments__item
            p.payments__name.mb-1 This month ({{ thisMonthText }})
            h3.payments__coast ${{ this.payments.processed_this_month }}
          .payments__item
            p.payments__name.mb-1 Upcoming (Next 30 Days)
            h3.payments__coast ${{ this.payments.upcoming_30_days }}
          .payments__item
            p.payments__name.mb-1 YTD
            h3.payments__coast ${{ this.payments.processed_ytd }}
          .payments__item
            p.payments__name.mb-1 Total (All Time)
            h3.payments__coast ${{ this.payments.processed_total }}
</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import { DateTime } from 'luxon'

  export default {
    components: {
      Loading,
    },
    data() {
      return {
        paymentInfor: null
      }
    },
    computed: {
      userType() {
        return this.$store.getters.userType
      },
      thisMonthText() {
        const date = DateTime.fromJSDate(new Date())
        return date.toFormat('MMM yyyy')
      },
      loading() {
        return this.$store.getters.loading;
      },
      payments() {
        if (this.userType === 'specialists') return this.$store.getters.specialistPayments
        return this.$store.getters.businessPayments
      }
    },
  }
</script>
