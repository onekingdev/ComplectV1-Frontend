/** @deprecated Refactor  */
export default function loadLocalStorageToken(store) {
  const token = localStorage.getItem('app.currentUser.token')

  if (token) {
    store.commit('UPDATE_TOKEN', token)
    store.commit('UPDATE_LOGIN_STATUS', true)
  } else {
    store.commit('UPDATE_TOKEN', '')
    store.commit('UPDATE_LOGIN_STATUS', false)
    localStorage.removeItem('app.currentUser')
    localStorage.removeItem('app.currentUser.token')
    localStorage.removeItem('app.currentUser.userType')
  }
}