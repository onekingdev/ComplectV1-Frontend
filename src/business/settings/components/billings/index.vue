<template lang="pug">
  .row
    .col
      .card.settings__card
        .card-title.px-3.px-xl-5.mb-0
          h3.mb-0 Billing
        .card-body.white-card-body.px-3.px-xl-5
          .settings___card--internal.p-y-1
            .row.m-b-20(v-if='!loading')
              .col
                h4.semibold-text Payment Method
              .col.text-right
                plaid-link(env='sandbox' :publicKey='plaidPK' clientName='Test App' product='auth' v-bind='{ onSuccess }')
                  template(slot='button' slot-scope='props')
                    a.btn.btn-default.d-none(ref="bank" @click="props.onClick") Add Bank Account
                BillingMethodModalAdd(@selected="addMethod")
                  b-button.btn.mr-2.font-weight-bold(type='button' variant='default') Add Method
                BillingMethodCardModalAdd(:billingMethod="billingMethod" @complitedPaymentMethod="addPaymentMethod")
                  b-button.d-none(ref="special") Card add
            .row
              .col
                Loading
                PaymentMethod(v-if='!loading' :paymentMethods="paymentMethods")

          .settings___card--internal.p-y-1(v-if='!loading')
            .row.m-b-10
              .col
                h4.semibold-text Invoices
              .col.text-right.d-none
                Download.d-none(:pdfUrl="pdfUrl" right)
            .row
              .col
                InvoicesTable(:invoices="invoices")
                div(v-if="!invoices && invoices.length") No invoices avaliable
</template>

<script>
  import { mapGetters, mapActions } from "vuex"
  import Loading from '@/common/Loading/Loading'
  import InvoicesTable from "./components/InvoicesTable";
  import PaymentMethod from "./components/PaymentMethod";
  import BillingMethodModalAdd from "./modals/BillingMethodModalAdd";
  import BillingMethodCardModalAdd from "./modals/BillingMethodCardModalAdd";
  import PlaidLink from "vue-plaid-link";
  import Download from '@/common/Dashboard/components/Download'

  const pdfUrl = '/business/reminders.csv'

  export default {
    components: {
      BillingMethodCardModalAdd,
      BillingMethodModalAdd,
      PaymentMethod,
      InvoicesTable,
      Loading,
      PlaidLink,
      Download,
    },
    data() {
      return {
        userType: 'business',
        billingMethod: '',
      };
    },
    methods: {
      ...mapActions({
        getPaymentMethod: 'settings/getPaymentMethod'
      }),
      addMethod(value) {
        this.billingMethod = value
        if (this.billingMethod === 'ba') this.$refs.bank.click()
        if (this.billingMethod === 'cc') this.$refs.special.click()
      },
      addPaymentMethod (response) {
        this.paymentMethods.push(response)
      },
      openComponent (value) {
        this.$emit('openComponent', value)
      },
      onSuccess (publicToken, metadata) {
        const data = {
          userType: this.userType,
          plaid: {
            payment_source_ach: {
              plaid_token: publicToken,
              plaid_account_id: metadata.account_id,
              plaid_institution: metadata.institution.name
            }
          }
        }

        console.log('data', data)

        this.$store.dispatch('generatePaymentMethod', data)
          .then(response => {
            this.paymentMethods.push(response)
            localStorage.setItem('app.currentUser.paymentMethod', JSON.stringify(data));
            this.toast('Success', `Payment method successfully added!`)
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        paymentMethods: 'settings/paymentMethods'
      }),
      plaidPK() {
        return this.$store.getters.staticCollection.PLAID_PUBLIC_KEY;
      },
      invoices() {
        return []
      },
      pdfUrl: () => pdfUrl,
    },
    async mounted() {
      this.$store.dispatch('getStaticCollection')
      try {
        const data = {
          userType: this.userType,
        }
        await this.getPaymentMethod(data)
          .then(response => response)
          .catch(error => console.error(error))
      } catch (error) {
        console.error(error)
      }
    }
  };
</script>
