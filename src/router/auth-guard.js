import store from '@/store/globalStore'
import loadLocalStorageToken from './loadLocalStorageToken'
const appModule = store.getters.appModule


const AccessGuard = (to, from, next) => {
  loadLocalStorageToken(store)
  const userAuth = !!store.state.auth.loggedIn
  if (!userAuth) next({ name: 'sign-in'})
  else next()
}

const BusinessGuard = (to, from, next) => {
  if (appModule !== 'business') next(`/access-denied`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  if (appModule !== 'specialist') next(`/access-denied`)
  else next()
}

export { AccessGuard, BusinessGuard, SpecialistGuard}
