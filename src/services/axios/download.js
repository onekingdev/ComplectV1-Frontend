import axios from './index'

const forceDownload = (response, filename) => {
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}

const download = (url, filename) => axios.get(url, { responseType: 'blob' })
  .then(response => forceDownload(response, filename))

export default download