<template lang="pug">
  .card(v-if="subscription")
    .card-body
      .row
        .col
          h5.mb-0 {{ subscription.title }}
          p {{ activeUserMember.length }} active users
        .col
          .d-flex.justify-content-end
            PlanCancelModal.mr-2(:date="subscription.next_payment_date")
              b-button.btn.btn-link(type='button') Cancel Plan
            PlanModalEdit(:plan="usePlan")
              b-button.btn.mr-2(type='button' variant='default') Edit Plan
            b-button.btn(type='button' variant='dark' @click="$emit('openComponent', 'SelectPlan')") Upgrade
      template(v-if="!isFreePlan")
        hr(v-if="!isFreePlan")
        .row
          .col ${{ cost }}, billed {{ `${subscription.interval}ly` }} to {{ paymentCardType }} {{ paymentCard }}
          .col.text-right(v-if="subscription.next_payment_date") Next payment date {{ subscription.next_payment_date }}
</template>

<script>
    import PlanModalEdit from "../modals/PlanModalEdit";
    import PlanCancelModal from "../modals/PlanCancelModal";
    import { mapGetters, mapActions } from "vuex"
    export default {
      name: "Plan",
      components: {PlanCancelModal, PlanModalEdit},
      data() {
        return {
          subscription: null,
        };
      },
      computed: {
        ...mapGetters({
          users: 'settings/employees'
        }),
        usePlan() {
          return {
            users: this.activeUserMember.length
          }
        },
        activeUserMember () {
          return this.users.filter(user => user.active === true )
        },
        cost() {
          return this.subscription.amount_in_cents / 100
        },
        isFreePlan() {
          return this.subscription.plan === 'free'
        },
        paymentCardType() {
          if (this.subscription.kind_of === 'ccc') return 'Visa'
          return ''
        },
        paymentCard() {
          return `**** **** **** ${this.subscription.last4}`
        },
      },
      async mounted() {
        this.getSubscription()
        await this.getEmployees()
      },
      methods: {
        ...mapActions({
          getSubscriptionInfor: 'settings/getSubscriptionInfor',
          getEmployees: 'settings/getEmployees',
        }),
        async getSubscription() {
          const res = await this.getSubscriptionInfor()
          if (res && res.data) {
            const length = res.data.length
            this.subscription = res.data[length - 1]
          }
        }
      },
    }
</script>

<style scoped>

</style>
