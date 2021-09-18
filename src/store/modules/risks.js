// import * as business from '../../services/business'
//
// const mapAuthProviders = {
//   business: {
//     login: jwt.login,
//     register: jwt.register,
//     currentAccount: jwt.currentAccount,
//     logout: jwt.logout,
//     createPolicy: jwt.createPolicy,
//   },
// }

// class Risk {
//   constructor(created_at, description, id, name, position, sections = null, src_id, status, updated_at) {
//     this.created_at = created_at,
//       this.description = description,
//       this.id = id,
//       this.name = name,
//       this.position = position,
//       this.sections = sections,
//       this.srcId = src_id,
//       this.status = status,
//       this.updated_at = updated_at
//   }
// }
import axios from '../../services/axios'

const headersBusinessId = () => ({ headers: {
  'Accept': 'application/json',
  'business_id': window.localStorage["app.business_id"],
}})

export default {
  state: {
    risks: [],
    currentRisk: {}
  },
  mutations: {
    // RISKS
    updatetRisksList(state, payload) {
      state.risks = payload;
    },
    addRisk(state, payload) {
      state.risks.push(payload)
    },
    updateRisk(state, payload) {
      const index = state.risks.findIndex(record => record.id === payload.id);
      state.risks.splice(index, 1, payload)
    },
    deleteRisk(state, payload) {
      const index = state.risks.findIndex(record => record.id === payload.id);
      state.risks.splice(index, 1)
    },
    updateCurrentRisk(state, payload) {
      state.currentRisk = payload
    }
  },
  actions: {
    // RISKS
    async getRisks ({commit, rootGetters}) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const endpointUrl = '/business/risks'
        const data = (await axios.get(endpointUrl, headersBusinessId())).data
        commit('updatetRisksList', data)
        commit("setLoading", false)
        return data
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
    async createRisk({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const endpointUrl = '/business/risks'
        const res = await axios.post(endpointUrl, payload, headersBusinessId())
        commit("addRisk", {...res.data});
        commit("setLoading", false)
        return res.data
      } catch (error) {
        const firstAttr = Object.keys(error.data)[0],
          errorText = (firstAttr && error.data[firstAttr].length)
            ? `Error: ${firstAttr} - ${error.data[firstAttr][0]}`
            : `Could\'t publish Risk ${error.message}`
        commit("setError", errorText);
        commit("setLoading", false);
        throw new Error(errorText);
      }
    },
    async updateRisk({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const endpointUrl = '/business/risks'
        const res = await axios.put(`${endpointUrl}/${payload.id}`, payload, headersBusinessId())
        commit("updateRisk", {...res.data});
        commit("updateCurrentRisk", res.data);
        commit("setLoading", false)
        return res.data
      } catch (error) {
        const firstAttr = Object.keys(error.data)[0],
          errorText = (firstAttr && error.data[firstAttr].length)
            ? `Error: ${firstAttr} - ${error.data[firstAttr][0]}`
            : `Could\'t update Risk ${error.message}`
        commit("setError", errorText);
        commit("setLoading", false);
        throw new Error(errorText);
      }
    },
    async deleteRisk({ commit, getters }, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const endpointUrl = '/business/risks'
        const data = await axios.delete(`${endpointUrl}/${payload.id}`, headersBusinessId())
        commit("deleteRisk", {...data});
        commit("setLoading", false)
        return data
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw new Error(`Could't delete Risk`)
      }
    },
    async getRiskById ({commit, getters}, payload) {
      commit("clearError");
      commit("setLoading", true);

      try {
        const endpointUrl = '/business/risks/'
        const data = await axios.get(`${endpointUrl}${payload.riskId}`, headersBusinessId())
        commit('updateCurrentRisk', data)
        commit("setLoading", false)
        return data
      } catch (error) {
        commit("setError", error.message);
        commit("setLoading", false);
        throw error;
      }
    },
  },
  getters: {
    // RISKS
    risksList(state) {
      return state.risks.sort((a, b) => a.id - b.id);
    },
    riskById (state) {
      return riskId => {
        return state.risks.find(risk => risk.id === riskId)
      }
    },
    getCurrentRisk(state) {
      return state.currentRisk
    }
  },
};
