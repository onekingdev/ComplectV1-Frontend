<template lang="pug">
  b-input-group.mb-1
    b-form-input(v-bind="datepickerInputOptions" @input="input" :show-decade-nav="false" :hide-header="true")
    b-input-group-append
      b-form-datepicker(v-bind="datepickerOptions" @input="input" :show-decade-nav="false" :hide-header="true" locale="en-US" button-only right)
</template>

<script>
export default {
  props: {
    value: {},
    options: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    input(val) {
      this.$emit('input', val)
    }
  },
  computed: {
    datepickerInputOptions() {
      return {
        placeholder: 'MM/DD/YYYY',
        value: this.value,
      }
    },
    datepickerOptions() {
      return {
        dateFormatOptions: { month: 'numeric', day: 'numeric', year: 'numeric' },
        ...this.datepickerInputOptions,
        hideHeader: true,
        showDecadeNav: false,
        ...this.options
      }
    }
  }
}
</script>
