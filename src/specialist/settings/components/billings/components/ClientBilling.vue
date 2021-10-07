<template lang="pug">
  div
    div(v-if="!stripeAccount.last4")
      p Choose how you want to get paid
      .card.mb-2
        .card-body
          .row
            .col
              .d-flex.align-items-center
                .d-block
                  h5.mb-0 You have no client billing methods yet.
                  p.mb-0 Add how you would like to receive your funds.
            .col
              .d-flex.justify-content-end.align-items-center.h-100
                b-button(
                  type="button"
                  variant="dark"
                  @click="$emit('openComponent', 'SelectBilling')"
                ) Add Method
    .card.mb-2(v-if="stripeAccount.last4")
      .card-body
        .row
          .col
            .d-flex.align-items-center
              img.bank-icon(src='@/assets/bank-connected-grey.svg')
              .d-block.ml-4
                h5: strong Bank account
                p.mb-0 ******** {{ stripeAccount.last4 }}
          .col
            .d-flex.justify-content-end.align-items-center
              b-button.btn.mr-2(type='button' variant='default') Edit
              b-button.btn.font-weight-bold(type='button' variant='default') Remove
    
</template>

<script>
  export default {
    name: "billingMethod",
    props: ["stripeAccount"]
  }
</script>

<style>
.bank-icon {
  width: 28px;
  height: 28px;
}
ion-icon.billing {
  font-size: 2rem;
}
</style>
