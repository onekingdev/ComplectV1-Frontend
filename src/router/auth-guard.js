import store from '@/store/globalStore'
import loadLocalStorageToken from './loadLocalStorageToken'
const appModule = store.getters.appModule

const getDashboardPath = store => store.getters.userType.indexOf('business') === 0 ? '/business' : '/specialist'

const AccessGuard = (to, from, next) => {
  loadLocalStorageToken(store)
  const userAuth = !!store.state.auth.loggedIn
  if (!userAuth) next({ name: 'sign-in'})
  else if (to.fullPath === '/') next({ path: getDashboardPath(store) })
  else next()
}

const BusinessGuard = (to, from, next) => {
  return next()
  if (appModule !== 'business') next(`/unauthorized`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  if (appModule !== 'specialist') next(`/unauthorized`)
  else next()
}

export { AccessGuard, BusinessGuard, SpecialistGuard}
