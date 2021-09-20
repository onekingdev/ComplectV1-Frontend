<template lang="pug">
  .loading(v-if="loading" :class="{ absolute: absolute }")
    .lds-ring
      div
      div
      div
      div
</template>

<script>
  export default {
    props: ['absolute'],
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
    }
  }
</script>
