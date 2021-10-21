<template lang="pug">
  .row
    .col
      .card.settings__card
        .card-title.px-3.px-xl-5.py-xl-4.mb-0
          h3.mb-0 Billing
        .card-body.white-card-body.px-3.px-xl-5
          .settings___card--internal.p-y-1
            .row.m-b-20
              .col
                h4.mb-0 Client Billing
              .col.text-right
                b-button(type='button' variant='dark' @click="openComponent('SelectBilling')") Add Methhod
            .row
              .col
                ClientBilling(@openComponent="openComponent" :stripeAccount="stripeAccount")
          .settings___card--internal.p-y-1
            .row.m-b-20(v-if='!loading')
              .col
                h4.mb-0 Payment Method
              .col.text-right
                plaid-link(env='sandbox' :publicKey='plaidPK' clientName='Test App' product='auth' v-bind='{ onSuccess }')
                  template(slot='button' slot-scope='props')
                    a.btn.btn-default.d-none(ref="bank" @click="props.onClick") Add Bank Account
                BillingMethodModalAdd(@selected="addMethod")
                  b-button.btn.mr-2.font-weight-bold(type='button' variant='dark') New Method
                BillingMethodCardModalAdd(:billingMethod="billingMethod" :userType="userType" @complitedPaymentMethod="addPaymentMethod")
                  b-button.d-none(ref="special") Card add
            .row
              .col
                Loading
                PaymentMethod(v-if='!loading' :paymentMethods="paymentMethods")

          .settings___card--internal.p-y-1(v-if='!loading')
            .row
              .col
                h4.mb-0 Invoices
              .col.text-right
                Download.d-none(:pdfUrl="pdfUrl")
            .row
              .col
                InvoicesTable(:invoices="invoices")
                div(v-if="!invoices && invoices.length") Invoices not avaliable
</template>

<script>
  import { mapGetters, mapActions } from "vuex"
  import Loading from '@/common/Loading/Loading'
  import InvoicesTable from "@/common/Settings/Billing/InvoicesTable";
  import PaymentMethod from "./components/PaymentMethod";
  import BillingMethodModalAdd from "@/common/Settings/Billing/modals/BillingMethodModalAdd";
  import BillingMethodCardModalAdd from "@/common/Settings/Billing/modals/BillingMethodCardModalAdd";
  import ClientBilling from "./components/ClientBilling";
  import Download from '@/common/Dashboard/components/Download'
  import PlaidLink from "vue-plaid-link"

  const pdfUrl = '/specialist/reminders.csv'

  export default {
    components: {
      BillingMethodCardModalAdd,
      BillingMethodModalAdd,
      PaymentMethod,
      InvoicesTable,
      Loading,
      ClientBilling,
      Download,
      PlaidLink
    },
    data() {
      return {
        userType: 'specialist',
        billingMethod: '',
        invoices: []
        // paymentMethods: []
      };
    },
    methods: {
      ...mapActions({
        getPaymentMethod: "settings/getPaymentMethod",
        getStripeAccount: "stripe_accounts/getStripeAccount"
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
      },
      async getInvoices() {
        const res = await this.$store.dispatch('getInvoices')
        if (res) this.invoices = res
      }
    },
    computed: {
      ...mapGetters({
        loading: 'loading',
        paymentMethods: 'settings/paymentMethods',
        stripeAccount: 'stripe_accounts/stripeAccount'
      }),
      plaidPK() {
        return this.$store.getters.staticCollection.PLAID_PUBLIC_KEY;
      },
      pdfUrl: () => pdfUrl,
    },
    async mounted() {
      this.getInvoices()
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

      this.getStripeAccount().then(response => {
        this.stripeAccount = response;
      }).catch(error => error);
    }
  };
</script>
