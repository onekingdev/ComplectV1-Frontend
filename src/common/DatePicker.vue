<template lang="pug">
  b-input-group.mb-1
    b-form-input(v-bind="datepickerInputOptions" @input="input" :value="formattedDate")
    b-input-group-append
      b-form-datepicker(v-bind="datepickerOptions" @input="input" :show-decade-nav="false" :hide-header="true" button-only right)
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
    formattedDate() {
      if(!this.value) return this.value
      const options = {year: 'numeric', month: 'numeric', day: 'numeric' };
      return new Date(this.value).toLocaleString('en-US', options)
    },
    datepickerInputOptions() {
      return {
        placeholder: 'MM/DD/YYYY',
        value: this.value
      }
    },
    datepickerOptions() {
      return {
        ...this.datepickerInputOptions,
        ...this.options,
        hideHeader: true,
        showDecadeNav: false,
      }
    }
  }
}
</script>
