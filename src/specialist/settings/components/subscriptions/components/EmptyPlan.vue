<template lang="pug">
  .card.info-board.w-100
    .card-body.p-0
      .d-flex.align-items-center
        b-icon.info-board__icon(icon="shop")
        .d-flex.flex-column
          h3.info-board__title Get hired for your next big job
          p.info-board__subtitle.mb-0 Sign up for our All Access Membership and unlock the compliance job board, enjoy automated billing, and access to client compliance program management tools.
      .d-flex.align-items-center.justify-content-end.m-t-2
        a.btn.btn-default.m-r-1(href="http://www.complect.com/specialists" target="_blank" rel="noopener noreferrer") More information
        router-link.btn.btn-dark.no-wrap(:to='`/${domain}/settings/billings`')
          | Upgrade Now
          b-icon.ml-2(icon="chevron-right")
</template>

<script>
  export default {
    name: "Plan",
    components: {},
    computed: {
      domain() {
        return this.$store.getters['roles/domain']
      }
    }
  }
</script>

<style >
  ion-icon.plan__icon {
    font-size: 44px;
  }
</style>
