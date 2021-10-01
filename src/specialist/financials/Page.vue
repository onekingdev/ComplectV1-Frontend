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
import Payments from "@/common/Financial/Payments"
import AnnualBudget from "@/common/Financial/AnnualBudget"

export default {
  components: {
    Payments,
    AnnualBudget,
  },
  created() {
    this.$store.dispatch('getPaymentInfor', {type: 'specialist'})
  },
};
</script>

