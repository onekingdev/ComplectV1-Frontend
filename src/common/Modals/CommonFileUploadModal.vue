<template lang="pug">
  div(:class="{'d-inline-block':inline}")
    div(v-b-modal="modalId" :class="{'d-inline-block':inline}")
      slot

    b-modal.fade(:id="modalId" title="Upload file" @close="hideModal")
      .row
        .col-12.m-y-1
          div.dropbox.w-100(for="files" @drop="drop" @dragover="dragover")
            input.input-file(type="file" id="files" ref="inputFile" hidden multiple @change="selectFile")
            p Drag your file(s) here
              br
              | OR
              br
              button.btn.btn-default.text-bold(@click="uploadFile") Upload
      .row
        .col-12
          .file-card(v-if="files" v-for="(file, key) in files")
            div.mr-2
              b-icon.file-card__icon(icon="file-earmark-text-fill" font-scale="2")
            div.ml-0.mr-auto
              p.file-card__name: b {{ file.name }}
              .file-card__link.link Download
            div.ml-auto.align-self-start
              button.btn.btn__close.file-card__close(@click="removeFile(key)")
                b-icon(icon="x" font-scale="1")

      template(slot="modal-footer")
        button.btn.btn-link(@click="hideModal") Cancel
        button.btn.btn-dark(@click="submit") Add
</template>

<script>
  const rnd = () => Math.random().toFixed(10).toString().replace('.', '')

  export default {
    props: {
      inline: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        modalId: `modal_${rnd()}`,
        files: [],
      }
    },
    methods: {
      async submit(e) {
        e.preventDefault();

        if (!this.files.length) {
          this.toast('Error', `Please add minimal 1 file!`, true)
          return
        }

        this.$emit('add', this.files)
        this.hideModal()
      },
      dragover(event) {
        event.preventDefault()
      },
      drop(event) {
        event.preventDefault()
        this.$refs.inputFile.files = event.dataTransfer.files
        this.selectFile()
      },
      selectFile(event) {
        let uploadedFiles = this.$refs.inputFile.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push(uploadedFiles[i]);
        }
      },
      uploadFile() {
        let fileInputElement = this.$refs.inputFile
        fileInputElement.click()
      },
      removeFile(key){
        this.files.splice( key, 1 );
      },
      hideModal() {
        this.files = []
        this.$bvModal.hide(this.modalId)
      }
    },
  }
</script>
