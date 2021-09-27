<template lang="pug">
  .row.py-2
    .col-lg-2.col-3
      UserAvatar(:user="specialist" size100 customClass="avatar-placeholder size100 none-fit")
    .col-lg-10.col-9
      .row
        .col-md-9.col
          h3.mb-1
            a.link.middle-text(:href="`/business/specialist-profile/${specialist.id}`") {{ userName }}
          .d-inline(v-if="userLocationAndIndustries") {{ userLocationAndIndustries }}
          .d-flex.py-2
            StarsRating(:rate="Math.floor(Math.random() * 5)")
          .d-flex.pt-2(v-if="specialist.skills.length > 0")
          .badge.badge-default.m-r-1.mb-1(v-for="(skill, index) in specialist.skills" :key="index") {{ skill.name }}
        .col-md-3.col.justify-content-end
          .d-flex.align-items-center.justify-content-lg-end
            b-button(variant="dark") Message
    .offset-lg-2.col-lg-10.col.mt-2
      div.mt-1(v-if="specialist.description") {{specialist.description}}
      .d-flex.justify-content-between
      SpecialistFigures(:specialist="specialist")
</template>

<script>
import SpecialistMixin from '@/mixins/SpecialistMixin'
export default {
  name: 'SpecialistPanel',
  mixins: [SpecialistMixin],
  props: {
    specialist: {
      type: Object,
      required: true
    }
  }
}
</script>
