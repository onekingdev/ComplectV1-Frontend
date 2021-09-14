import store from '@/store/globalStore'

// Need to know how get current user type / bad unstable temp solution
const userType = localStorage.getItem('app.currentUser.userType') ? JSON.parse(localStorage.getItem('app.currentUser.userType')) : ''

const plans = ['free', 'business', 'team']
const roles = ['basic', 'trusted', 'admin']

const AuthGuard = (to, from, next) => {
  if(!store.getters['roles/currentPlan']) next({ name: 'sign-in'})
  else if (store.getters['roles/currentPlan'] === 'free') next(`/access-denied`)
  else next()
}

const BusinessGuard = (to, from, next) => {
  if (userType !== 'business') next(`/access-denied`)
  else next()
}

const SpecialistGuard = (to, from, next) => {
  if (userType !== 'specialists') next(`/access-denied`)
  else next()
}

export { AuthGuard, BusinessGuard, SpecialistGuard}
