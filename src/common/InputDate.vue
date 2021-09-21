<template lang="pug">
  div
    label.form-label(:class="labelKlass")
      slot
    DatePicker(
      :value="value"
      :options="options"
      :placeholder="placeholder"
      @input="$emit('input', $event)"
    )
    Errors(:errors="errors")
</template>

<script>
export default {
  props: {
    labelKlass: String,
    value: String,
    errors: Array,
    placeholder: String,
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>