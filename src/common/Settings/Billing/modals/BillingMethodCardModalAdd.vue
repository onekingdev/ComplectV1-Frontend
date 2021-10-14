<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="Add Card")
      .row
        .col
          stripe-element-card(ref="elementRef" :pk="pk" @token="tokenCreated")
          .row
            .col.text-right
              b-button(v-show="loading" type='button' variant='none')
                .lds-ring.lds-ring-small
                  div
                  div
                  div
                  div
      template(slot="modal-footer")
        button.btn.btn-link(@click="$bvModal.hide(modalId)") Cancel
        button.btn.btn-dark(@click="submit") Save
</template>

<script>
  import { StripeCheckout, StripeElementCard  } from '@vue-stripe/vue-stripe';
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')

  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      },
      billingMethod: {
        type: String,
        default: ''
      },
      userType: {
        type: String,
        default: ''
      }
    },
    components: {
      StripeCheckout,
      StripeElementCard
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        cardDetail: {
          nameOnCard: '',
          cardNumber: '',
          expDate: '',
          expDateYear: '',
          CVV: '',
          country: '',
          zip: '',
        },
        errors: {}
      }
    },
    methods: {
      submit(e) {
        e.preventDefault();
        this.$refs.elementRef.submit()
      },
      async tokenCreated (token) {
        try {
          const dataToSend = {
            userType: this.userType,
            stripeToken: token.id,
          }

          await this.$store.dispatch('settings/generatePaymentMethod', dataToSend)
            .then(response => {
              this.$emit('complitedPaymentMethod', response)
              this.toast('Success', `Payment method has been added.`)
            })
            .catch(error => {
              console.error(error)
              this.toast('Error', `Payment method has not been added. Please try again.`, true)
            })
        } catch (error) {
          console.error(error)
        }
      },
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      pk() {
        return this.$store.getters.staticCollection.STRIPE_PUBLISHABLE_KEY
      }
    },
  }
</script>
