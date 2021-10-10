import { mapGetters, mapActions } from 'vuex'

export default {
  async mounted() {
    try {
      const data = {
        userType: 'business',
      }
      await this.getPaymentMethod(data)
        .then(response => response)
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    ...mapActions({
      getPaymentMethod: 'settings/getPaymentMethod'
    }),
  },
  computed: {
    ...mapGetters({
      paymentMethods: 'settings/paymentMethods'
    }),
    currentPlan() {
      return this.$store.getters['roles/currentPlan']
    },
    isBusinessFreeWithoutPayment() {
      return this.currentPlan === 'free' && this.paymentMethods.length < 1
    }
  }
}
