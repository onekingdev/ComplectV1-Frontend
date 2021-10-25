<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="Edit Plan" size="lg" @shown="getData")
      Loading
      b-row.m-b-2(v-if="!loading")
        b-col(cols="8").pr-0
          b-row
            b-col
              p Your organization currently has {{ plan.users }} active users
          b-row.m-b-2
            b-col(class="pr-1")
              label.form-label Billing Plan
              ComboBox(V-model="plan.billingPlan" :options="linkToOptions" placeholder="Select a billing plan" @input="selectPlan")
              Errors(:errors="errors.billingPlan")
            b-col(class="pl-1")
              label.form-label Additional Users
              input.form-control(v-model="additionalUsers" type="number" placeholder="Users" ref="input" min="0" @keyup.enter="submit")
              Errors(:errors="errors.count")
        b-col
          b-card.mb-2
            b-card-text
              p.form-label.text-uppercase.mb-0 Users
              p
                b ${{ cost }}
                | /month
              p.form-label.text-uppercase.mb-0 Total
              p
                b ${{ summary.total }}
                | /{{ summary.type }}
              p.text-success.mb-0(v-if="showDiscount") You saved ${{ summary.discount }}
      b-row(v-if="!loading")
        b-col
          h5.mb-3 Payment method
          b-form-group.px-2(v-slot='{ ariaDescribedby }')
            b-form-radio(v-for="(paymentMethod, i) in paymentMethods" :key="i" v-model='selectedPaymentSourceId' :aria-describedby='ariaDescribedby' name='radiosPaymentMethods' :value='paymentMethod.id') **** **** **** {{ paymentMethod.last4 }} {{ paymentMethod.brand }}
          Errors(:errors="errors.selectedPaymentSourceId")
      template(slot="modal-footer")
        button.btn.btn-link(@click="$bvModal.hide(modalId)") Cancel
        button.btn.btn-dark(@click="submit") Save
</template>

<script>
import { mapGetters, mapActions } from "vuex"

const toOption = id => ({ id, label: id })
const rnd = () => Math.random().toFixed(10).toString().replace('.', '')
export default {
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      modalId: `modal_${rnd()}`,
      errors: [],
      selectedPaymentSourceId: '',
      showDiscount: false,
      selectedPlan: '',
      additionalUsers: 0,
    }
  },
  methods: {
    ...mapActions({
      getPaymentMethod: 'settings/getPaymentMethod',
      createNewSeatSubscription: 'settings/createNewSeatSubscription'
    }),
    focusInput() {
      this.$refs.input.focus();
    },
    validate() {
      this.errors = {}
      if (!this.selectedPlan) this.$set(this.errors, 'billingPlan', ['Required field'])
      if (!this.selectedPaymentSourceId) this.$set(this.errors, 'selectedPaymentSourceId', ['Required field'])
      if (this.additionalUsers < 1) this.$set(this.errors, 'count', ['Please enter the minimum number of 1'])
    },
    async submit (e) {
      e.preventDefault();
      this.validate()
      if (Object.keys(this.errors).length > 0) return

      const payload = {
        plan: this.selectedPlan,
        quantity: this.additionalUsers,
        payment_source_id: this.selectedPaymentSourceId
      }
      this.$store.commit("setLoading", true);
      const result = await this.createNewSeatSubscription(payload)
      if (result.success) {
        this.toast('Success', 'You have add more users successfully.')
        this.$bvModal.hide(this.modalId)
        this.$store.commit("setLoading", false);
      } else {
        this.$store.commit("setLoading", false);
        this.toast('Error', 'You can not add more users. Please try again.')
      }
    },
    selectPlan(value) {
      if (value==='anually') {
        this.showDiscount = true
        this.selectedPlan = 'seats_annual'
      }
      if (value==='monthly' || value === '') {
        this.showDiscount = false
        this.selectedPlan = 'seats_monthly'
      }
    },
    async getData () {
      try {
        const data = {
          userType: 'business',
        }
        await this.getPaymentMethod(data)
          .then(response => response)
          .catch(error => console.error(error))
      } catch (error) {
        console.error(error)
        this.toast('Error', error.message, true)
      }
    },
  },
  computed: {
    ...mapGetters({
      paymentMethods: 'settings/paymentMethods'
    }),
    loading() {
      return this.$store.getters.loading;
    },
    linkToOptions() {
      return [
        {
          id: 'monthly',
          label: 'Billed monthly',
        },
        {
          id: 'anually',
          label: 'Billed annually',
        }
      ]
    },
    coastAnnually() {
      return 10
    },
    coastMonthly() {
      return 15
    },
    cost() {
      const billingType = this.selectedPlan
      if (billingType === 'seats_annual') return this.coastAnnually
      if (billingType === 'seats_monthly') return this.coastMonthly

      return 0
    },
    summary() {
      const billingType = this.selectedPlan
      const usersCoast = this.additionalUsers * this.cost

      const summary = {
        total: usersCoast,
        type: 'month'
      }

      if (billingType === 'seats_annual') {
        summary.total = usersCoast * 12
        summary.discount = Math.abs((this.coastAnnually - this.coastMonthly) * 12) * this.additionalUsers
        summary.type = 'year'
      }

      return summary
    }
  }
}
</script>

<style scoped>
  .form-label {
    color: #828487;
  }
</style>
