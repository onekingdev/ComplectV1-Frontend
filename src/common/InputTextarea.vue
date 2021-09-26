<template lang="pug">
  div
    label.form-label(:class="{ 'required':  required}")
      slot
    textarea.form-control(v-bind="{value,placeholder,rows}" @input="$emit('input', $event.target.value)" @keyup.enter="$emit('submit')")
    Errors(:errors="errors")
</template>

<script>
export default {
  props: {
    value: String,
    errors: Array,
    placeholder: String,
    required: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    }
  }
}
</script>