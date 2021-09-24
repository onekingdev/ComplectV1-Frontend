<template lang="pug">
  .row.py-2
    .col-lg-2.col-3
      UserAvatar(:user="specialist" size100)
    .col-lg-10.col-9
      .row
        .col-md-9.col
          h3.m-b-1
            a.link.middle-text(:href="specialist.resume_url" @click="openDetails(project.id)" target="_blank") {{ specialist.first_name }} {{ specialist.last_name }}
          .d-inline(v-if="userLocationAndIndustries") {{ userLocationAndIndustries }}
          .d-flex.py-2
            StarsRating(:rate="Math.floor(Math.random() * 5)")
          .d-flex.pt-2
          .badge.badge-default.m-r-1 Auditing
          .badge.badge-default.m-r-1 Compilance Reporting
          .badge.badge-default.m-r-1 Mock Interviews
        .col-md-3.col.justify-content-end
          .d-flex.align-items-center.justify-content-lg-end
            b-button(variant="default" @click="$emit('directMessage')") Message
    .offset-lg-2.col-lg-10.col
      b-card-text.m-t-1(v-if="specialist.description") {{specialist.description}}
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
  },
  data() {
    return {
      experienceOptions: ['Junior', 'Intermediate', 'Expert'],
    }
  },
  computed: {
    userLocationAndIndustries() {
      const user = this.specialist
      console.log('user', user)
      let location = user.city
      
      if (user.state) {
        location = location ? `${location}, ${user.state}` : user.state
      }

      if (user.industries.length > 0) {
        const industriesNames = user.industries.map(item => item.name).join(' ')
        location = location ? `${location} | ${industriesNames}` : industriesNames
      }

      return location
    }
  }
}
</script>
