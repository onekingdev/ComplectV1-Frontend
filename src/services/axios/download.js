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

// This directive accepts either string URL or `{ URL: filename }` object
const downloadDirective = {
  inserted(el, { value }) {
    const filenameFromUrl = url => url.split('\\').pop().split('/').pop()
    const valueEntry = typeof value === 'object' ? value : { [value]: filenameFromUrl(value) }
    const [url, filename] = Object.entries(valueEntry)[0]
    if (url.indexOf('http') === 0) {
      el.href = url
      el.target = '_blank'
    } else {
      el.addEventListener('click', () => downloadBinary(`..${url}`, filename))
    }
  }
}

export { downloadBinary, downloadDirective }