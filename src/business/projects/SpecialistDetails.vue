<template lang="pug">
  .row
    .col-sm-2.pr-0.m-r-1
      UserAvatar(:user="specialist" size70)
    .col-sm.m-t-05
      h3.fw-600.fs-20 {{ specialist.first_name }} {{ specialist.last_name }}
      StarsRating(:rate="specialist.ratings_average")
</template>

<script>
import StarsRating from '@/business/marketplace/components/StarsRating'
export default {
  components: {StarsRating},
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-placeholder {
  width: 100px;
  height: 100px;
}
</style>
