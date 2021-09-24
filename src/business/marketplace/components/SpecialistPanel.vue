<template lang="pug">
  .row.py-2
    .col-lg-2.col-3
      UserAvatar(:user="specialist" size100)
    .col-lg-10.col-9
      .row
        .col-md-9.col
          h3.m-b-1
            a.link(v-if="specialist.resume_url" v-download="specialist.resume_url" target="_blank") {{ specialist.first_name }} {{ specialist.last_name }}
            span(v-else) {{ specialist.first_name }} {{ specialist.last_name }}
          h6.pb-1.card-subtitle.text-muted.mb-2  {{ specialist.location }} |
          .d-inline(v-if="specialist.industries" v-for="ind in specialist.industries") &nbsp;{{ ind.name }}&nbsp;
          .d-flex.py-2
            StarsRating(:rate="Math.floor(Math.random() * 5)")
          .d-flex.py-2
          .badge.badge-default.m-r-1 Auditing
          .badge.badge-default.m-r-1 Compilance Reporting
          .badge.badge-default.m-r-1 Mock Interviews
        .col-md-3.col.justify-content-end
          .d-flex.align-items-center.justify-content-lg-end
            b-icon.linkedin.mr-3(icon='linkedin' font-scale="1.5")
            b-button(variant="default" @click="$emit('directMessage')") Message
    .offset-lg-2.col-lg-10.col
      b-card-text.m-t-1 {{specialist.description}}
      .d-flex.justify-content-between
      SpecialistFigures(:specialist="specialist")
</template>

<script>
import SpecialistFigures from './SpecialistFigures'
import StarsRating from './StarsRating'

export default {
  components: {
    SpecialistFigures,
    StarsRating
  },
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
}
</script>
