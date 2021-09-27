const redirectWithToast = (url, toast, title = null) => window.location.href = `${url}#toast=${encodeURIComponent(toast)}&#title=${encodeURIComponent(title)}`

const extractToastMessage = () => {
  const toast = window.location.hash.split('&')
  const message = toast[0] && toast[0].match(/#toast=(.+)/)
  const title = toast[1] && toast[1].match(/#title=(.+)/)

  if (message && message[1] || title && title[1]) {
    history.replaceState(null, null, ' ')
    return {
      title: decodeURI(title && title[1] || ''),
      message: decodeURI(message && message[1] || '')
    }
  }
}

export { redirectWithToast, extractToastMessage }