<template lang="pug">
  div
    .row(v-for="(currentRequest, reqIdx) in currentExam.exam_requests" :key="reqIdx")
      template(v-for="(file, fileIndex) in currentRequest.exam_request_files")
        .col-md-6.m-b-1(:key="`${currentRequest.id}--${file}-${fileIndex}`")
          .file-card
            div.mr-2
              b-icon.file-card__icon(icon="file-earmark-text-fill" font-scale="2")
            div.ml-0.mr-auto
              p.file-card__name: b {{ file.name }}
              a.file-card__link.link(:href="file.file_url.split('?')[0]" target="_blank") Download
            div.ml-auto.align-self-start.actions
              b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
                template(#button-content)
                  b-icon(icon="three-dots")
                b-dropdown-item.delete(@click="removeFile(currentRequest.id, file.id)") Delete file
    .row(v-if="!countDocuments")
      .col
        EmptyState

</template>

<script>
  export default {
    props: ['currentExam'],
    computed: {
      countDocuments() {
        let count = 0
        this.currentExam.exam_requests.map(req => {
          count += req.exam_request_files.length
        })
        return count
      }
    },
    methods: {
      async removeFile(requestId, fileID) {
        const data = {
          id: this.currentExam.id,
          request: {id: requestId},
          file: {id: fileID},
        }

        try {
          await this.$store.dispatch('exams/deleteExamRequestFile', data)
            .then(response => {
              this.toast('Success', `File has been deleted.`)
              this.$emit('saved')
              this.$bvModal.hide(this.modalId)
            })
            .catch(error => this.toast('Error', error.message, true))
        } catch (error) {
          this.toast('Error', error.message, true)
        }
      },
    }
  }
</script>

<style scoped>
  .link {
    max-width: 400px;
    word-break: break-all;
  }
</style>
