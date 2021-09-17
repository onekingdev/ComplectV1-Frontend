import axios from '../../services/axios'

const END_POINT = '/specialist/work_experiences'

export default {
  actions: {
    getWorkExperiences({state, commit, rootState}, payload) {
      return axios
        .get(`${END_POINT}`)
        .then(response => {
          if (response) {
            return response.data
          }
          return response
        })
        .catch(err => err)
    },
    createWorkExperiences({state, commit, rootState}, payload) {
      return axios
        .post(`${END_POINT}`, payload)
        .then(response => {
          if (response) {
            return response.data
          }
          return response
        })
        .catch(err => err)
    },
    updateWorkExperiences({state, commit, rootState}, payload) {
      return axios
        .patch(`${END_POINT}/${payload.id}`, payload.work_experience)
        .then(response => {
          if (response) {
            return response.data
          }
          return response
        })
        .catch(err => err)
    },
    deleteWorkExperience({state, commit, rootState}, payload) {
      return axios
        .delete(`${END_POINT}/${payload.id}`)
        .then(response => {
          if (response) {
            return response.data
          }
          return response
        })
        .catch(err => err)
    }
  }
} 
