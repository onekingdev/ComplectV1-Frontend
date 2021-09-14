import store from '@/store/globalStore'

const AuthGuard = (to, from, next) => {
  if(!store.getters['roles/currentPlan']) next({ name: 'sign-in'})
  else if (store.getters['roles/currentPlan'] === 'free') next(`/access-denied`)
  else next()
}

const BusinessGuard = (to, from, next) => {
  if (store.getters['roles/currentPlan'] !== 'business') next(`/access-denied`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  // console.log(store.getters['roles/roles'])
  // console.log(store.getters['roles/currentRole'])
  // console.log(store.getters['roles/businessID'])
  // console.log(store.getters['roles/currentAccount'])
  console.log(store.getters['roles/currentRole'])
  if (store.getters['roles/currentPlan'] !== 'specialist_pro') next(`/access-denied`)
  else next()
}

export { AuthGuard, BusinessGuard, SpecialistGuard}
