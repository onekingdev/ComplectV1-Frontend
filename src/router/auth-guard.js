import store from '@/store/globalStore'
import loadLocalStorageToken from './loadLocalStorageToken'

// Need to know how get current user type / bad unstable temp solution
// const userType = localStorage.getItem('app.currentUser.userType') ? JSON.parse(localStorage.getItem('app.currentUser.userType')) : ''
// const userAuth = localStorage.getItem('app.currentUser.token')

const plans = ['free', 'business', 'team']
const roles = ['basic', 'trusted', 'admin']

const AccessGuard = (to, from, next) => {
  loadLocalStorageToken(store)

  const userAuth = !!store.state.auth.loggedIn
  if (!userAuth) next({ name: 'sign-in'})
  else next()
  // else if (store.getters['roles/currentPlan'] === 'free') next(`/access-denied`)
}

const BusinessGuard = (to, from, next) => {
  const userType = store.getters.userType
  if (`${userType}`.indexOf('business') !== 0) next(`/access-denied`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  const userType = store.getters.userType
  if (`${userType}`.indexOf('specialist') !== 0) next(`/access-denied`)
  else next()
}

export { AccessGuard, BusinessGuard, SpecialistGuard}
