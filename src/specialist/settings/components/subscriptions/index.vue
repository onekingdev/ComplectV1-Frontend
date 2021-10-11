<template lang="pug">
  div
    .row
      .col
        Loading
    .row(v-if='!loading')
      .col
        .card.settings__card
          .card-title.px-3.px-xl-5.py-xl-4.mb-0
            h3.mb-0 Subscriptions
          .card-body.white-card-body.px-3.px-xl-5
            .settings___card--internal.p-y-1
              .row
                .col-md-12
                  h4.m-b-20 Plan
              .row
                .col
                  EmptyPlan(v-if="freePlan")
                  Plan(v-else)
</template>

<script>
  import Loading from '@/common/Loading/Loading'
  import Plan from "./components/Plan";
  import EmptyPlan from "./components/EmptyPlan";

  export default {
    components: {
      Plan,
      EmptyPlan,
      Loading,
    },
    data() {
      return {

      };
    },
    methods: {

    },
    computed: {
      loading() {
        return this.$store.getters.loading;
      },
      freePlan() {
        return this.$store.getters['roles/currentPlan'] === 'free'
      }
    },
  };
</script>
