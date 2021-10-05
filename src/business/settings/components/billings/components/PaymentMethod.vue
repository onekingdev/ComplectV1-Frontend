<template lang="pug">
  div
    .card.mb-2(v-if="paymentMethods && !paymentMethods.length")
      .card-body
        h5.text-center No payment methods
    .card.mb-2(v-for="payment in paymentMethods" :key="payment.id")
      .card-body
        .row
          .col
            .d-flex.align-items-center
              img(v-if="isBankAccount(payment)" src="@/assets/bank-connected.svg" class="bank")
              img(v-else-if="payment.last4" src="@/assets/credit-card-connected.svg" class="credit-card")
              ion-icon.payment(v-if="!payment.brand" name="logo-paypal")
              .d-block.ml-4
                h5(v-if="payment.last4"): strong {{ paymentName(payment) }}
                  span(v-if="payment.primary") (Primary)
                p.mb-0 {{ '**** **** **** ' + payment.last4 }} {{ payment.brand }} {{ payment.email }}
          .col
            .d-flex.justify-content-end.align-items-center.h-100
              b-button.btn.mr-2.font-weight-bold(v-if="!payment.primary" type='button' variant='default' @click="makePrimary(payment.id)") Make Primary
              b-button.btn.mr-2.font-weight-bold(type='button' variant='default' @click="deletePaymentMethod(payment.id)") Delete
</template>

<script>
  export default {
    name: "paymentMethod",
    props:['paymentMethods'],
    components: {},
    data() {
      return {
        userType: 'business'
      }
    },
    methods: {
      isBankAccount(payment) {
        return payment.type === 'PaymentSource::Ach'
      },
      paymentName(payment) {
        if (this.isBankAccount(payment)) return 'Bank Account'
        return 'Credit Card'
      },
      async makePrimary(cardId) {
        try {
          const dataToSend = {
            userType: this.userType,
            id: cardId,
          }
          await this.$store.dispatch('settings/makePrimaryPaymentMethod', dataToSend)
            .then(response => this.toast('Success', `The primary card successfully changed!`) )
            .catch(error => {
              console.error(error)
              this.toast('Error', `Something wrong! ${error}`, true)
            })
        } catch (e) {
          console.error(error)
        }
      },
      async deletePaymentMethod(cardId) {
        try {
          const dataToSend = {
            userType: this.userType,
            id: cardId,
          }
          await this.$store.dispatch('settings/deletePaymentMethod', dataToSend)
            .then(response => {
              if (response.status === "ok") this.toast('Success', `${response.message.message}`)
            })
            .catch(error => {
              console.error(error)
              this.toast('Error', `Something wrong! ${error}`, true)
            })
        } catch (e) {
          console.error(error)
        }
      },
    },
    mounted() {

    }
  }
</script>
<style>
  ion-icon.payment {
    font-size: 2rem;
  }

  .bank {
    width: 24px;
    position: relative;
    top: -4px;
  }

  .credit-card {
    width: 25px;
  }
</style>
