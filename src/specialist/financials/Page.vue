<template lang="pug">
  div.p-x-40.p-y-20
    .row
      .col-12.m-b-20
        Payments
    .row
      //- .col-xl-7.col-12.m-b-20
      //-   ComplianceSpend
      .col-xl-5.col-12.m-b-20
        AnnualBudget

</template>

<script>
  import Payments from "@/common/Financial/Payments";
  // import ComplianceSpend from "./components/ComplianceSpend";
  import AnnualBudget from "@/common/Financial/AnnualBudget";
  // import Payments from "./components/Payments";

  export default {
    components: {
      Payments,
      // ComplianceSpend,
      AnnualBudget,
    },
    created() {
      this.$store.dispatch('getPaymentInfor', {type: 'specialist'})
    },
  };
</script>

