<template lang="pug">
  div.p-x-40.p-y-20
    .row
      .col-12.m-b-20
        Payments
    .row
      .col-xl-12.col-12.m-b-20
        AnnualBudget

</template>

<script>
import AnnualBudget from "@/common/Financial/AnnualBudget"
import Payments from "@/common/Financial/Payments"

export default {
  components: {
    Payments,
    AnnualBudget,
  },
  created() {
    this.$store.dispatch('getPaymentInfor', {type: 'business'})
  }
}
</script>


