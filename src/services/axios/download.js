import axios from './index'

const forceDownload = (response, filename) => {
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}

const downloadBinary = (url, filename) => axios.get(url, { responseType: 'blob' })
  .then(response => forceDownload(response, filename))

const downloadDirective = {
  inserted(el, binding) {
    const url = binding.value.file_url
    if (url.indexOf('http') === 0) {
      el.href = url
      el.target = '_blank'
    } else {
      el.addEventListener('click', () => downloadBinary(`..${binding.value.file_url}`, binding.value.file_name))
    }
  }
}

export { downloadBinary, downloadDirective }