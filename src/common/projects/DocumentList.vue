<template lang="pug">
  .documents-list-card
    h3.policy-details__title Documents
    .policy-actions
      a.btn.btn-dark Upload
    Get(:documents="url" :etag="etag"): template(v-slot="{documents}"): .policy-details__body
      table.table
        thead
          tr
            th(width="45%") Name
            th Owner
            th Size
            th Last Modified
        tbody.text-dark(v-if="documents.length")
          tr(v-for="document in documents" :key="document.id")
            td Filename
            td Owner
            td Size
            td Date
      EmptyState(v-if="!loading && !documents.length")
</template>

<script>
import EtaggerMixin from '@/mixins/EtaggerMixin'

const uploadFile = async function(url, file) {
  const formData  = new FormData()
  formData.append('file', file)
  return await fetch(this.$store.getters.backendUrl+url, {
    method: 'POST',
    body: formData
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
  methods: {
    async onFileChanged(event) {
      const file = event.target.files && event.target.files[0]
      if (file) {
        const success = (await uploadFile(this.url, file)).ok
        const message = success ? 'Document has been uploaded.' : 'Document has not been uploaded. Please try again.'
        this.toast('Document Upload', message, !success)
        this.newEtag()
      }
    },
    getDocumentUrl(document) {
      return `/uploads/${document.file_data.storage}/${document.file_data.id}`
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