<template lang="pug">
  .documents-list-card
    h3.document-heading Documents
    .upload-actions(v-if="!disabled")
      input.input-file(type="file" id="files" ref="inputFile" hidden multiple @change="selectFile")
      a.btn.btn-dark(@click="uploadFile") Upload
    Get(:documents="url" :etag="etag"): template(v-slot="{documents}"): .document-body
      Loading
      table.table(v-if="!loading")
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
              b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                template(#button-content)
                  b-icon(icon="three-dots")
                b-dropdown-item(@click="downloadDocument(document)") Download
                CommonDeleteModal.ml-auto(v-if="canDelete(document)" title="Delete Document" :content="deleteModalContent" @deleteConfirmed="deleteDocument(document)", :inline="false")
                  b-dropdown-item Delete
      EmptyState(v-if="!loading && !documents.length")
</template>

<script>
import EtaggerMixin from '@/mixins/EtaggerMixin'
import CommonDeleteModal from '@/common/Modals/CommonDeleteModal'
import { DateTime } from 'luxon'
const uploadFile = async function(store, url, file) {
  const formData  = new FormData()
  formData.append('file', file)
  const headers = store.getters.authHeaders.headers
  store.commit("setLoading", true)
  if (window.localStorage["app.business_id"]) headers['business_id'] = window.localStorage["app.business_id"]
  return await fetch(store.getters.backendUrl + url, {
    method: 'POST',
    body: formData,
    headers: headers
  })
}

export default {
  mixins: [EtaggerMixin()],
  props: {
    project: {
      type: Object,
      required: false
    },
    disabled: {
      type: Boolean
    },
    review: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      files: []
    }
  },
  components: {
    CommonDeleteModal
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

        if (i === files.length - 1) {
          this.toast('Document Upload', message, !success)
          this.files = []
        }
        this.newEtag()

        if (i === files.length - 1) this.$store.commit("setLoading", false)
      }
    },
    selectFile(event) {
      let uploadedFiles = this.$refs.inputFile.files;
      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.files.push(uploadedFiles[i]);
      }

      this.onFileChanged(this.files)
    },
    uploadFile() {
      let fileInputElement = this.$refs.inputFile
      fileInputElement.click()
    },
    canDelete(document) {
      return this.currentUser.id === document.owner_id
    },
    documentUrl(document) {
      if (document.url.includes('https://')) return document.url
      return `${this.$store.getters.backendUrl}/${document.url}`
    },
    downloadDocument(document) {
      window.open(this.documentUrl(document), 'self')
    },
    getDocumentUrl(document) {
      return `/uploads/${document.file_data.storage}/${document.file_data.id}`
    },
    formatDate(document) {
      const date = DateTime.fromISO(document.created_at)
      if (!date.invalid) {
        return date.toFormat('MM/dd/yyyy')
      }
      
      return ''
    },
    payloadDelete(document) {
      const payload = { documentId: document.id }
      if (this.review) payload.reviewId = this.review.id
      if (this.project) payload.localProjectId = this.project.id
      return payload
    },
    async deleteDocument(document) {
      const data = this.payloadDelete(document)
      const res = await this.$store.dispatch(this.deletePatch, data)
      if (res.data.id) {
        this.toast('Success', 'Document has been deleted.')
        this.newEtag()
      } else {
        this.toast('Error', 'Document has not been deleted. Please try again.')
      }
    }
  },
  computed: {
    deleteModalContent() {
      if (this.review) return 'This will remove the document from this internal review and all of its associated content.'
      if (this.project) return 'This will remove the document from this project and all of its associated content.'
      return ''
    },
    loading() {
      return this.$store.getters.loading
    },
    url() {
      if (this.review) return `/api/business/annual_reports/${this.review.id}/documents`
      if (this.project) return `/api/projects/${this.project.id}/documents`
      return ''
    },
    currentUser() {
      return this.$store.getters.getUser
    },
    deletePatch() {
      if (this.review) return 'annual/deleteDocumentReview'
      if (this.project) return 'projects/deleteDocument'
      return ''
    }
  }
}
</script>
<style scoped>
.upload-actions {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
}

.document-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.25rem;
}

.document-heading {
  margin-bottom: 0;
  padding: 1.25rem;
  font-size: 1.25rem;
  color: #303132;
  border-bottom: solid 1px #e9ebee;
}
</style>