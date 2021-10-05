import store from '@/store/globalStore'
import loadLocalStorageToken from './loadLocalStorageToken'
import isDenyRoute from './filterByPlan'
const plan = store.getters['roles/currentPlan']
const domain = store.getters['roles/domain']

const getDashboardPath = store => store.getters.userType.indexOf('business') === 0 ? '/business' : '/specialist'

const AccessGuard = (to, from, next) => {
  loadLocalStorageToken(store)
  const userAuth = !!store.state.auth.loggedIn
  if (!userAuth) next({ name: 'sign-in'})
  else if (to.fullPath === '/') next({ path: getDashboardPath(store) })
  else next()
}

const BusinessGuard = (to, from, next) => {
  if (domain !== 'business') next(`/unauthorized`)
  if (isDenyRoute(to.name, plan)) next(`/access-denied`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  if (domain !== 'specialist') next(`/unauthorized`)
  else next()
}

export { AccessGuard, BusinessGuard, SpecialistGuard}
