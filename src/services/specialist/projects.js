import axios from '../../services/axios'

const END_POINT = '/specialist/projects/my'

export async function getProjects() {
  return axios
    .get(`${END_POINT}`)
    .then(response => {
      if (response) {
        return response
      }
      return response
    })
    .catch(err => err)
}


export async function createProject(payload) {
  return await axios.post(`${END_POINT}`, payload)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err)
}

export async function getCurrentProposal(payload) {
  const projectId = payload.projectId
  return await axios.get('/api/specialist/projects/' + projectId + '/applications/my')
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}

export function createProposal(payload) {
  const projectId = payload.projectId
  const data = payload.data
  return axios.post(`/specialist/projects/${projectId}/applications`, data)
    .then(response => {
      return response.data
    })
    .catch(err => err.data)
}

export async function updateProposal(payload) {
  const projectId = payload.projectId
  const id = payload.id
  const data = payload.data
  return await axios.put(`/specialist/projects/${projectId}/applications/${id}`, data)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}

export async function deleteTimeSheet(payload) {
  const projectId = payload.projectId
  const id = payload.id
  return await axios.delete(`/specialist/projects/${projectId}/timesheets/${id}`)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}

export async function updateEndContract(payload) {
  const projectId = payload.projectId
  const params = payload.params
  return await axios.patch(`/projects/${projectId}/end/${payload.endRequestId}`, params)
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}
