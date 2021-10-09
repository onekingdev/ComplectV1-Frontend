<template lang="pug">
  div.h-100
    Loading
    .card.financial-card.h-100.m-b-20
      .card-title.financial-card__title.p-x-20
        h2.card-title__name Annual Budget
        .card-title__actions
          b-dropdown#dropdown-form.m-2(ref='dropdown' variant="dark" right)
            template(#button-content)
              span.fw-700 Edit
            b-dropdown-form(style="width: 240px;")
              b-form-input.mb-2#dropdown-form-annual-budget(v-model="newAnnualBudget" type="number" size='sm' placeholder='Annual budget')
              Errors(:errors="errors.annualBudget")
              b-button(variant='primary' size='sm' @click='update') Save
      .card-body.white-card-body.financial-card__body(v-if="annualBudget")
        .chart
          .d-flex.justify-content-end.mb-3
            p.financial-card__info.mb-0
              b Left:&nbsp;
              span.financial-card__sum ${{ this.annualBudget.current }}
          AnnualBudgetChart(:annualBudget="annualBudget")
</template>

<script>
import Loading from '@/common/Loading/Loading'
import AnnualBudgetChart from './AnnualBudgetChart'

export default {
  components: {
    Loading,
    AnnualBudgetChart,
  },
  data() {
    return {
      annualBudget: {
        current: 0,
        goal: 0
      },
      newAnnualBudget: '',
      errors: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.newAnnualBudget) this.errors['annualBudget'] = ['Required field']
      // if (this.newAnnualBudget > this.annualBudget.current) {
      //   this.errors['annualBudget'] = ['Value must less than charges paid YTD value']
      // }
    },
    async getData() {
      const endPoint = this.isSpecialist ? 'getRevenue' : 'getAnnualBudget'
      const res = await this.$store.dispatch(endPoint)

      if (res) {
        this.annualBudget = {current: res.processed_ytd, goal: this.isSpecialist ? res.annual_revenue_goal : res.annual_budget}
      }
    },
    async update() {
      this.validate()
      if (Object.keys(this.errors).length > 0) return
      const endPoint = this.isSpecialist ? 'updateRevenue' : 'updateAnnualBudget'
      const res = await this.$store.dispatch(endPoint, this.newAnnualBudget)
      if (res) {
        this.$refs.dropdown.hide(true)
        this.newAnnualBudget = ''
        this.annualBudget = {current: res.processed_ytd, goal: this.isSpecialist ? res.annual_revenue_goal : res.annual_budget}
      }
    }
  },
  computed: {
    isSpecialist() {
      return this.userType === 'specialists'
    },
    userType() {
      return this.$store.getters.userType
    },
    loading() {
      return this.$store.getters.loading
    },
  },
}
</script>

