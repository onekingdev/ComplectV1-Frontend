<template lang="pug">
  .row
    .col-sm-2.pr-0
      UserAvatar(:user="specialist")
    .col-sm.pl-0
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
