<template lang="pug">
  .documents-list-card
    h3.policy-details__title Documents
    .policy-actions
      CommonFileUploadModal(@add="onFileChanged")
        a.btn.btn-dark Upload
    Get(:documents="url" :etag="etag"): template(v-slot="{documents}"): .policy-details__body
      table.table
        thead
          tr
            th(width="45%") Name
            th Owner
            th Size
            th Last Modified
            th
        tbody.text-dark(v-if="documents.length")
          tr(v-for="document in documents" :key="document.id")
            td {{ document.file_data.metadata.filename }}
            td {{ document.owner_name }}
            td {{ document.file_data.metadata.size ? document.file_data.metadata.size : 0 | formatBytes }}
            td {{ formatDate(document) }}
            td
              a.link(:href="documentUrl(document)") Download
      EmptyState(v-if="!loading && !documents.length")
</template>

<script>
import EtaggerMixin from '@/mixins/EtaggerMixin'
import CommonFileUploadModal from '@/common/Modals/CommonFileUploadModal'
import { DateTime } from 'luxon'
const uploadFile = async function(store, url, file) {
  const formData  = new FormData()
  formData.append('file', file)
  return await fetch(store.getters.backendUrl + url, {
    method: 'POST',
    body: formData,
    ...store.getters.authHeaders
  })
}

export default {
  mixins: [EtaggerMixin()],
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    CommonFileUploadModal
  },
  filters: {
    formatBytes(bytes,decimals) {
      if(bytes == 0) return '0 Bytes'
      let k = 1024,
          dm = decimals || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
  },
  methods: {
    async onFileChanged(files) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i]
        const success = (await uploadFile(this.$store, this.url, file)).ok
        const message = success ? 'Document has been uploaded.' : 'Document has not been uploaded. Please try again.'

        if (i === files.length - 1) this.toast('Document Upload', message, !success)
        this.newEtag()
      }
    },
    documentUrl(document) {
      const isDevEnv = this.$store.getters.isDevEnv
      if (isDevEnv) return `${this.$store.getters.backendUrl}/${document.url}`
      return document.url
    },
    getDocumentUrl(document) {
      return `/uploads/${document.file_data.storage}/${document.file_data.id}`
    },
    formatDate(document) {
      const date = DateTime.fromISO(document.created_at)
      if (!date.invalid) {
        return date.toFormat('dd/MM/yyyy')
      }
      
      return ''
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    url() {
      return `/api/projects/${this.project.id}/documents`
    }
  }
}
</script>