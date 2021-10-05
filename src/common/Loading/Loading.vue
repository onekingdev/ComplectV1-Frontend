<template lang="pug">
  .loading(v-if="loading" :class="{ absolute: absolute }")
    .lds-ring(v-show="spinner")
      div
      div
      div
      div
</template>

<script>
  export default {
    props: ['absolute'],
    data() {
      return {
        spinner: false
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      }
    },
    mounted() {
      setTimeout(() => {
        this.spinner = true
      }, 5000)
    }
  }
</script>
