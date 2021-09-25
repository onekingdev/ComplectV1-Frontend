<template lang="pug">
  .file-card
    div.mr-2
      b-icon.file-card__icon(icon="file-earmark-text-fill" font-scale="2")
    div.ml-0.mr-auto
      p.file-card__name: b {{ file.name }}
      a.file-card__link.link(:href="file.url" target="_blank") Download
    div.ml-auto.align-self-start.actions
      b-dropdown(size="sm" variant="none" class="m-0 p-0" right)
        template(#button-content)
          b-icon(icon="three-dots")
        b-dropdown-item.delete(@click="removeFile()") Delete
</template>
<script>
export default {
  props: {
    file: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeFile() {
      this.$emit('delete', this.file)
    }
  }
}
</script>
