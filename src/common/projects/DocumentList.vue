<template lang="pug">
  .documents-list-card
    h3.document-heading Documents
    .upload-actions
      input.input-file(type="file" id="files" ref="inputFile" hidden multiple @change="selectFile")
      a.btn.btn-dark(@click="uploadFile") Upload
    Get(:documents="url" :etag="etag"): template(v-slot="{documents}"): .document-body
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
              b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                template(#button-content)
                  b-icon(icon="three-dots")
                b-dropdown-item(@click="downloadDocument(document)") Download
                CommonDeleteModal.ml-auto(v-if="canDelete(document)" title="Delete Document" content="This will remove the document from this project and all of its associated content." @deleteConfirmed="deleteDocument(document)", :inline="false")
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
      const isDevEnv = this.$store.getters.isDevEnv
      if (isDevEnv) return `${this.$store.getters.backendUrl}/${document.url}`
      return document.url
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
    async deleteDocument(document) {
      const res = await this.$store.dispatch('projects/deleteDocument', { localProjectId: this.project.id, documentId: document.id })
      if (res.data.id) {
        this.toast('Success', 'Document has been deleted.')
        this.newEtag()
      } else {
        this.toast('Error', 'Document has not been deleted. Please try again.')
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    url() {
      return `/api/projects/${this.project.id}/documents`
    },
    currentUser() {
      return this.$store.getters.getUser
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