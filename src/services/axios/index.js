import instance from 'axios'
// import Vue from 'vue';
import store from '@/store/globalStore'
// import { createToast } from "../../mixins/ToasterMixin";
import backendUrl from '@/services/axios/backendUrl'

const axios = instance.create({
  baseURL: backendUrl + '/api',
  timeout: 10000,
  headers: {'Accept': 'application/json'}
})

axios.interceptors.request.use((request) => {
  // const accessToken = store.get('accessToken')
  const accessToken = store.getters['accessToken']
  if (accessToken) {
      request.headers.Authorization = `${accessToken}`
      // request.headers.AccessToken = accessToken
  }
  const businessId = window.localStorage.getItem('app.business_id')
  if (businessId && (typeof businessId !== "undefined")) {
    if (request.url.indexOf("/reminders") !== 0) {
      request.headers.business_id = JSON.parse(businessId)
    }
  }

  const jwtToken = window.localStorage.getItem('app.currentUser.token')
  if (jwtToken) {
      request.headers['Authorization'] = `${JSON.parse(jwtToken)}`
      // request.headers['X-Auth-Token'] = jwtToken
  }

  return request
})

axios.interceptors.response.use(undefined, (error) => {
  // Errors handling
  const { response } = error
  const { data, status, statusText, message } = response
  if (data) {
    // console.log('data interceprots', data)
    // createToast.toast('Error', data, true)
  }

  // const vm = new Vue.extend({})
  // vm.$bvToast.toast(`Server call returned error: ${message}`, {
  //   title: `${statusText} (${status})`,
  //   variant: 'danger',
  // });

  throw response
})

export default axios