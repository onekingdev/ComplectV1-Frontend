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
