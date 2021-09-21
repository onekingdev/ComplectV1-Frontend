<template lang="pug">
  .page-header.p-y-20
    .d-flex.flex-column
      Breadcrumbs.mb-2(v-if="breadcrumbs" :items="breadcrumbs")
      h2.page-header__breadcrumbs(v-if="section") {{ section }}
      h2.page-header__title.my-0.ml-0.mb-2 {{ title }}
      p(v-if="sub") {{ sub }}
    .page-header__actions.flex-column
        slot
</template>

<script>
export default {
  props: {
    section: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
    },
    sub: {
      type: String
    }
  }
}
</script>
