// import store from '@/store/globalStore'

// Need to know how get current user type / bad unstable temp solution
// const userType = localStorage.getItem('app.currentUser.userType') ? JSON.parse(localStorage.getItem('app.currentUser.userType')) : ''
// const userAuth = localStorage.getItem('app.currentUser.token')

const plans = ['free', 'business', 'team']
const roles = ['basic', 'trusted', 'admin']

const AccessGuard = (to, from, next) => {
  // if(!userAuth) next({ name: 'sign-in'})
  // else if (store.getters['roles/currentPlan'] === 'free') next(`/access-denied`)
  // else next()
  next()
}

const BusinessGuard = (to, from, next) => {
  // if (userType !== 'businesses') next(`/access-denied`)
  // else next()
  next()
}

const SpecialistGuard = (to, from, next) => {
  // if (userType !== 'specialists') next(`/access-denied`)
  // else next()
  next()
}

export { AccessGuard, BusinessGuard, SpecialistGuard}
