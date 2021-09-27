<template lang="pug">
  .specialist.pb-5
    .container-fluid
      .row
        .col-12.px-0.mb-4
          div.marketplace__head.marketplace__head_bg
            h2.marketplace__title Specialist Marketplace
            p.marketplace__subtitle Find the right consultant for the right job
      .container(v-if="specialist")
        h3.standard-text.grey-text.mb-4
          span(@click="backToMarket") Specialist Marketplace
          span.divider /
          span.font-weight-bold {{ userName }}
        .card
          .card-title.px-3.px-xl-5.mb-0
            h3.middle-text.grey-text Specialist Profile
          .card-body.px-3.px-xl-5
            .row.py-2
              .col-lg-2.col-3.pl-5.avatar
                UserAvatar(:user="specialist" size100 customClass="avatar-placeholder size100 none-fit")
              .col-lg-10.col-9
                .row
                  .col-md-7.col
                    h3.standard-text
                      span.link.middle-text {{ specialist.first_name }} {{ specialist.last_name }}
                    .d-inline.intro-text(v-if="userLocationAndIndustries") {{ userLocationAndIndustries }}
                    .d-flex.py-2
                      StarsRating(:rate="Math.floor(Math.random() * 5)")
                  .col-md-5.col.justify-content-end
                    .d-flex.align-items-center.justify-content-lg-end
                      b-button(variant="dark" @click="$emit('directMessage')") Message
              .offset-lg-2.col-lg-10.col
                b-card-text.m-t-1.grey-text(v-if="specialist.description") {{specialist.description}}
                .d-flex.justify-content-between
                SpecialistFigures(:specialist="specialist")
            div(v-if="specialist.skills.length > 0")
              hr
              h3.middle-text.grey-text.mb-3.semibold Skills
              div.pb-2
                .badge.badge-default.m-r-1(v-for="(skill, index) in specialist.skills" :key="index") {{ skill.name }}
            div(v-if="specialist.work_experiences.length > 0")
              hr
              h3.middle-text.grey-text.mb-3.semibold Experience
              div
                .row.mb-3(v-for="(item, index) in specialist.work_experiences" :key="index")
                  .col
                    .card
                      .card-body
                        .row
                          .col
                            h3.middle-text.semibold.grey-text {{ item.job_title }}
                            p {{ item.company }} | {{ formatDateExperience(item) }}
                        .row
                          .col
                            div {{ item.description }}

</template>
<script>
import SpecialistMixin from '@/mixins/SpecialistMixin'
import { DateTime } from 'luxon'
export default {
  mixins: [SpecialistMixin],
  computed: {
    specialist() {
      return this.$store.getters['marketplace/currentSpecialist']
    }
  },
  async mounted () {
    const id = this.$route.params['specialistID']
    await this.$store.dispatch('marketplace/getSpecialistsById', id)
  },
  methods: {
    formatDateExperience(item) {
      if (item.start_date && item.end_date) {
        const formatStartDate = DateTime.fromISO(item.start_date).toFormat('MMMM yyyy')
        const formatEndDate = DateTime.fromISO(item.end_date).toFormat('MMMM yyyy')
        return `${formatStartDate} - ${formatEndDate}`
      }
    },
    backToMarket() {
      this.$router.push('/specialistmarketplace')
    }
  }
}
</script>

<style>
@import "../marketplace/styles.css";
.divider {
  color: #FFC900;
  font-size: 16px;
  font-weight: bold;
  margin: 0 7px;
}

@media screen and (max-width: 600px) {
  .avatar {
    padding-left: 0 !important;
    position: relative;
    left: 10px;
  }

  .specialist-infor-icon {
    display: none;
  }

  .jurisdictions {
    padding-left: 0 !important;
  }
}
</style>
