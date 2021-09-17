<template lang="pug">
  div.h-100
    Loading
    .card.financial-card.h-100.m-b-20
      .card-title.financial-card__title.p-20
        h2.card-title__name Compliance Spend
      .card-body.white-card-body.financial-card__body(v-if="payments")
        .chart
          .d-flex.justify-content-end.mb-3
            p.financial-card__info.mb-0
              b YTD:&nbsp;
              span.financial-card__sum ${{ payments.processed_ytd }}
          ComplianceSpendChart
</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import ComplianceSpendChart from "./ComplianceSpendChart";

  export default {
    components: {
      ComplianceSpendChart,
      Loading,
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      payments() {
        return this.$store.getters.businessPayments
      }
    },
  }
</script>

<style scoped>

</style>
