<template lang="pug">
  .container-fluid.px-0
    top-bar
    main#main-content
      router-view
</template>

<script>
  import TopBar from '@/components/Bars/TopNavBar.vue'
  export default {
    components: { TopBar },
  }
</script>
