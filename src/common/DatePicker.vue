<template lang="pug">
  b-input-group.mb-1
    b-form-input(placeholder="MM/DD/YYYY" @input="input" :value="formattedDate")
    b-input-group-append
      b-form-datepicker(v-bind="datepickerOptions" @input="input" button-only right)
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
    datepickerOptions() {
      return {
        ...this.options,
        hideHeader: true,
        showDecadeNav: false,
      }
    }
  }
}
</script>
