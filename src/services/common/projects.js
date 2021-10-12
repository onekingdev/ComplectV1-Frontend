import axios from '../../services/axios'

export async function getProjects(endpointUrl) {
  return axios
    .get(endpointUrl)
    .then(response => {
      if (response) {
        return response
      }
      return response
    })
    .catch(err => err)
}


export async function createProject(endpointUrl, payload) {
  return await axios.post(endpointUrl, payload)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err)
}

export async function deletePostProject(endpointUrl, payload) {
  return await axios.delete(endpointUrl, payload)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err)
}

export async function deleteDocument(payload) {
  const endpointUrl = `/projects/${payload.localProjectId}/documents/${payload.documentId}`
  return await axios.delete(endpointUrl, payload)
    .then(response => {
      if (response) {
        return response
      }
      return false
    })
    .catch(err => err)
}

export async function addCollaborator(payload) {
  const endpointUrl = '/local_projects/' + payload.localProjectId + '/specialists'
  return await axios.post(endpointUrl, { id: payload.id })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}

export async function removeCollaborator(payload) {
  const endpointUrl = '/local_projects/' + payload.localProjectId + '/specialists/' + payload.specialistId
  return await axios.delete(endpointUrl, { id: payload.id })
    .then(response => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => err)
}
