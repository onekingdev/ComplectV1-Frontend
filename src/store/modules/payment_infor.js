import axios from '../../services/axios'

export default {
  state: {
    businessPayments: {},
    specialistPayments: {}
  },
  mutations: {
    SET_PAYMENT_INFOR(state, payload) {
      state[`${payload.type}Payments`] = payload.data
    }
  },
  actions: {
    getAllPaymentProcess({state, commit, rootState}, payload) {
      const url = '/business/financials/processed'
      return axios
        .get(`${url}`)
        .then(response => {
          return response.data
        })
        .catch(err => err)
    },
    getPaymentInfor({state, commit, rootState}, payload) {
      const prefix = payload.type === 'business' ? 'business' : 'specialist'
      const url = `/${prefix}/financials/payments`
      return axios
        .get(`${url}`)
        .then(response => {
          if (response.data) commit('SET_PAYMENT_INFOR', {type: payload.type, data: response.data})
          return response.data
        })
        .catch(err => err)
    },
    getAnnualBudget({state, commit, rootState}) {
      const url = '/business/financials/budget'
      return axios
        .get(`${url}`)
        .then(response => {
          return response.data
        })
        .catch(err => err)
    },
    updateAnnualBudget({state, commit, rootState}, payload) {
      const url = '/business/financials/annual_budget'
      return axios
        .patch(`${url}`, {annual_budget: payload})
        .then(response => {
          return response.data
        })
        .catch(err => err)
    },
    getRevenue({state, commit, rootState}) {
      const url = 'specialist/financials/revenue'
      return axios
        .get(`${url}`)
        .then(response => {
          return response.data
        })
        .catch(err => err)
    },
    updateRevenue({state, commit, rootState}, payload) {
      const url = 'specialist/financials/annual_revenue'
      return axios
        .patch(`${url}`, {annual_revenue: payload})
        .then(response => {
          return response.data
        })
        .catch(err => err)
    }
  },
  getters: {
    businessPayments: state => state.businessPayments,
    specialistPayments: state => state.specialistPayments
  },
}
